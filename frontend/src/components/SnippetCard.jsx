import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SnippetCard({ snippet, onOpenDeleteModal, onToggleFav }) {
  const navigate = useNavigate();
  const truncatedDesc = snippet.description.length > 95 
    ? snippet.description.substring(0, 92) + '...' 
    : snippet.description;

  return (
    <div className="snippet-card">
      <div className="card-header">
        <span className="badge badge-lang">{snippet.language}</span>
        <button 
          className={`fav-button ${snippet.favorite ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleFav(snippet); }}
          title={snippet.favorite ? "Remove from favorites" : "Mark as favorite"}
        >
          ★
        </button>
      </div>
      
      <h3 className="card-title">{snippet.title}</h3>
      <span className="badge badge-cat">{snippet.category}</span>
      <p className="card-desc">{truncatedDesc}</p>

      <div className="card-footer">
        <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/snippet/${snippet._id}`)}>
          View
        </button>
        <button className="btn btn-sm btn-accent" onClick={() => navigate(`/edit/${snippet._id}`)}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onOpenDeleteModal(snippet._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}