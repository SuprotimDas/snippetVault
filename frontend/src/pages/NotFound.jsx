import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <h1 className="err-code">404</h1>
      <h2 className="err-msg">Execution Frame Fault: Address Context Missing</h2>
      <p className="text-dim">The dynamic pointer parameter you referenced does not map to a recognized application component state.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Re-route to Baseline Home
      </button>
    </div>
  );
}