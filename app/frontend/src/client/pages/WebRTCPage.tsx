import React, { useRef, useEffect, useState } from "react";
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

    // const initializeOepnCV = (videoElement: HTMLVideoElement) => {
    //     let classifier = new cv.CascadeClassifier(),
    //         faceCascadeFile = '/static/opencv/facefile/haarcascade_frontalface_default.xml',
    //         utils = new Utils('errorMessage'),
    //         interval: number|null = null;

    //     utils.createFileFromUrl('haarcascade_frontalface_default.xml', faceCascadeFile, () => {
    //         classifier.load('haarcascade_frontalface_default.xml');

    //         videoElement.addEventListener('play', () => {
    //             const width = videoElement.videoWidth,
    //                 height = videoElement.videoHeight;
    //             canvasRef.current.width = width;
    //             canvasRef.current.height = height;

    //             const context = canvasRef.current.getContext('2d');
    //             const src = new cv.Mat(height, width, cv.CV_8UC4);
    //             const gray = new cv.Mat();

    //             interval = setInterval(() => {
    //                 context?.drawImage(videoElement, 0, 0, width, height);
    //                 const imageData = context?.getImageData(0, 0, width, height);

    //                 if (imageData) {
    //                     src.data.set(imageData.data);
    //                     cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    //                     let faces = new cv.RectVector();
    //                     classifier.detectMultiScale(gray, faces);

    //                     for (let i = 0; i < faces.size(); i++) {
    //                         let face = faces.get(i);
    //                         context?.strokeRect(face.x, face.y, face.width, face.height);
    //                     }
    //                 }
    //             }, 100);
    //         });
    //     });
    // };


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
                utils = new Utils('errorMessage');

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
                    canvasRef.current.width = width;
                    canvasRef.current.height = height;

                    const context = canvasRef.current.getContext('2d');
                    const src = new cv.Mat(height, width, cv.CV_8UC4);
                    const gray = new cv.Mat();

                    interval = setInterval(() => {
                        context?.drawImage(videoRef.current, 0, 0, width, height);
                        const imageData = context?.getImageData(0, 0, width, height);

                        if (imageData) {
                            src.data.set(imageData.data);
                            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

                            let faces = new cv.RectVector();
                            classifier.detectMultiScale(gray, faces);

                            for (let i = 0; i < faces.size(); i++) {
                                let face = faces.get(i);
                                context?.strokeRect(face.x, face.y, face.width, face.height);
                            }
                        }
                    }, 100);
                });
            });

            return () => {
                if (interval) {
                    clearInterval(interval);
                }

                setVideoReady(false);
            }
        }
    }, [isCvLoaded, isVideoReady]);

    return (
        <div>
            <OpenCvLoader version="4.8.1" onScriptsLoaded={handleOpenCvLoaded} />
            <video ref={videoRef} autoPlay playsInline></video>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
};
