import React, { useRef, useEffect } from 'react';

interface OpenCvLoaderProps {
    version?: string;
}

export const OpenCvLoader: React.FC<OpenCvLoaderProps> = ({
    version: string='4.8.1'
}) => {
    useEffect(() => {
        const loadScript = (url: string): Promise<Event> => {

        };
    });
};