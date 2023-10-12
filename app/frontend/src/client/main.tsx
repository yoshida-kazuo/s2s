import './main.scss';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, WebRTCPage } from './pages';

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/webrtc" element={<WebRTCPage />} />
      </Routes>
    </Suspense>
  </Router>
);
