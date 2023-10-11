import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { HomePage, WebRTCPage } from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/webrtc" element={<WebRTCPage />} />
      </Routes>
    </Router>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
