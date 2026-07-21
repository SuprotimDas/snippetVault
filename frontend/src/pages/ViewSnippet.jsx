import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { snippetApi } from '../services/snippetApi';
import DeleteModal from '../components/DeleteModal';

export default function ViewSnippet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    snippetApi.getOne(id)
      .then(res => {
        setSnippet(res.data);
        setLoading(false);
      })
      .catch(() => {
        navigate('/not-found');
      });
  }, [id, navigate]);

  const handleCopyCode = () => {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmedDelete = async () => {
    try {
      await snippetApi.delete(id);
      setDeleteOpen(false);
      navigate('/');
    } catch (err) {
      alert('Error deleting snippet.');
    }
  };

  if (loading) return <div className="system-status-pane">Loading snippet details...</div>;

  return (
    <div className="view-snippet-container">
      <div className="view-header-bar">
        <div className="view-header-meta">
          <button className="back-nav-arrow" onClick={() => navigate('/')}>&larr; Return Dashboard</button>
          <h1 className="view-title">{snippet.title}</h1>
          <div className="meta-badge-row">
            <span className="badge badge-lang">{snippet.language}</span>
            <span className="badge badge-cat">{snippet.category}</span>
            {snippet.favorite && <span className="star-indicator">★ Bookmarked</span>}
          </div>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-accent" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button className="btn btn-danger" onClick={() => setDeleteOpen(true)}>Delete</button>
        </div>
      </div>

      <div className="view-description-panel">
        <h3>Description</h3>
        <p>{snippet.description}</p>
      </div>

      <div className="code-viewer-panel">
        <div className="code-panel-header">
          <span className="terminal-dot-indicators"></span>
          <span className="panel-tab-title">{snippet.language.toLowerCase()}_source.log</span>
          <button className="copy-action-btn" onClick={handleCopyCode}>
            {copied ? '✔ Copied Payload!' : '📋 Copy Source Code'}
          </button>
        </div>
        <pre className="code-viewport">
          <code>{snippet.code}</code>
        </pre>
      </div>

      <DeleteModal 
        isOpen={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleConfirmedDelete}
      />
    </div>
  );
}