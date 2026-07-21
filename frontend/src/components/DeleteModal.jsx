import React from 'react';

export default function DeleteModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3 className="modal-title">Purge Directive</h3>
        <p className="modal-body text-dim">
          Are you sure you want to delete this snippet permanently? This operational rollback cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete Snippet
          </button>
        </div>
      </div>
    </div>
  );
}