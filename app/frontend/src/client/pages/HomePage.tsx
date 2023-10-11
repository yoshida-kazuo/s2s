import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Apps</h1>
            <Link to="/webrtc">Go to WebRTC Page</Link>
        </div>
    );
};

export default HomePage;
