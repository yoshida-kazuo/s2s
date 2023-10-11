import React, { useEffect } from 'react';
import { loadScript } from '../scriptLoader';

interface OpenCvLoaderProps {
    baseUrl?: string;
    version?: string;
    scriptName?: string;
    onScriptsLoaded?: () => void;
}

export const OpenCvLoader: React.FC<OpenCvLoaderProps> = ({
    version = '4.8.0',
    scriptName = 'opencv.js',
    baseUrl = '/static/opencv/js',
    onScriptsLoaded = () => {}
}) => {
    const fullUrl = `${baseUrl}/${version}`;

    useEffect(() => {
        const loadOpenCv = async() => {
            try {
                if (typeof cv === 'undefined') {
                    await loadScript(`${fullUrl}/${scriptName}`);
                }

                if (typeof Utils === 'undefined') {
                    await loadScript(`${fullUrl}/utils.js`);
                }

                onScriptsLoaded();
            } catch(error) {
                console.error("Error loading scripts:", error);
            }
        }

        loadOpenCv();
    }, [version, baseUrl, scriptName, onScriptsLoaded]);

    return null;
};
