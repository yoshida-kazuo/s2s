import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { OpenCvLoader } from "../utils/opencv/openCvLoader";

export const WebRTCPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null),
        canvasRef = useRef<HTMLCanvasElement>(null),
        [isCvLoaded, setCvLoaded] = useState(false),
        [isVideoReady, setVideoReady] = useState(false),
        handleOpenCvLoaded = () => {
            setCvLoaded(true);
        };
    let localStream = useRef<MediaStream|null>(null),
        interval: number | null = null;

    useEffect(() => {
        if (isCvLoaded) {
            navigator.mediaDevices
                .getUserMedia({video: true, audio: true})
                .then((stream) => {
                    localStream = stream;

                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        setVideoReady(true);
                    }
                })
                .catch((err) => {
                    console.error('Error accessing media devices.', err);
                });

            return () => {
                if (localStream) {
                    localStream.getTracks().forEach(track => track.stop());
                }

                setCvLoaded(false);
            }
        }
    }, [isCvLoaded]);

    useEffect(() => {
        if (isCvLoaded && isVideoReady) {
            let classifier = new cv.CascadeClassifier(),
                faceCascadeFileUrl = '/static/opencv/facefile',
                faceCascadeFile = 'haarcascade_frontalface_default.xml',
                // faceCascadeFile = 'haarcascade_mcs_mouth.xml',
                utils = new Utils('errorMessage'),
                matSrc = null,
                matGray = null,
                matDst = null;

            /** yabai */
            try {
                cv.FS_unlink(faceCascadeFile);
            } catch (err) {
                //
            }

            utils.createFileFromUrl(faceCascadeFile, `${faceCascadeFileUrl}/${faceCascadeFile}`, () => {
                classifier.load(faceCascadeFile);

                videoRef.current.addEventListener('play', () => {
                    const width = videoRef.current.videoWidth,
                        height = videoRef.current.videoHeight;

                    const context = canvasRef.current.getContext('2d');
                    canvasRef.current.width = width;
                    canvasRef.current.height = height;

                    matSrc = new cv.Mat(height, width, cv.CV_8UC4);
                    matGray = new cv.Mat();

                    interval = setInterval(() => {
                        context?.clearRect(0, 0, width, height);

                        matDst = new cv.Mat(
                            height,
                            width,
                            cv.CV_8UC4,
                            new cv.Scalar(0, 0, 0, 0)
                        );

                        context?.clearRect(0, 0, width, height);
                        context?.drawImage(videoRef.current, 0, 0, width, height);
                        const imageData = context?.getImageData(0, 0, width, height);

                        if (imageData) {
                            matSrc.data.set(imageData.data);
                            cv.cvtColor(matSrc, matGray, cv.COLOR_RGBA2GRAY);

                            const faces = new cv.RectVector();
                            // classifier.detectMultiScale(matGray, faces);
                            const scaleFactor = 1.3;
                            const minNeighbors = 6;
                            const minSize = new cv.Size(50, 50);
                            // const maxSize = new cv.Size(200, 200);
                            // classifier.detectMultiScale(matGray, faces, scaleFactor, minNeighbors, 0, minSize, maxSize);
                            classifier.detectMultiScale(
                                matGray,
                                faces,
                                scaleFactor,
                                minNeighbors,
                                0,
                                minSize
                            );

                            for (let i = 0; i < faces.size(); i++) {
                                let face = faces.get(i);

                                cv.rectangle(
                                    matDst,
                                    new cv.Point(face.x, face.y),
                                    new cv.Point(face.x + face.width, face.y + face.height),
                                    [255, 0, 0, 255]
                                );
                            }
                            cv.imshow(canvasRef.current, matDst);
                        }

                        // matDst.delete();
                    }, 200);
                });
            });

            return () => {
                if (interval) {
                    clearInterval(interval);
                    matSrc.delete();
                    matGray.delete();
                    matDst.delete();
                }

                setVideoReady(false);
            }
        }
    }, [isCvLoaded, isVideoReady]);

    return (
        <>
            <div>
                <h1>Apps</h1>
                <Link to="/">Go to Home Page</Link>
            </div>
            <div className="relative">
                <OpenCvLoader version="4.8.0" onScriptsLoaded={handleOpenCvLoaded} />
                <video ref={videoRef} className="absolute top-0 left-0 z-10 -scale-x-100" autoPlay playsInline></video>
                <canvas ref={canvasRef} className="absolute top-0 left-0 z-20 -scale-x-100"></canvas>
            </div>
        </>
    )
};
