import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SnippetForm({ initialValues, onSubmit, formTitle }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    language: initialValues?.language || 'JavaScript',
    category: initialValues?.category || 'Frontend',
    description: initialValues?.description || '',
    code: initialValues?.code || '',
    favorite: initialValues?.favorite || false
  });

  const [errors, setErrors] = useState({});

  const languages = ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Other'];
  const categories = ['DSA', 'Frontend', 'Backend', 'Database', 'DevOps', 'System Design', 'Other'];

  const validate = () => {
    let localErrors = {};
    if (!formData.title.trim()) localErrors.title = 'Title field is required';
    if (!formData.description.trim()) localErrors.description = 'Provide a brief summary breakdown';
    if (!formData.code.trim()) localErrors.code = 'Core functional code cannot be empty';
    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="form-card-container">
      <h2 className="page-heading">{formTitle}</h2>
      <form onSubmit={handleFormSubmit} className="interactive-form">
        <div className="form-group">
          <label>Snippet Title</label>
          <input 
            type="text" 
            className={`form-control ${errors.title ? 'input-error' : ''}`}
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="e.g., Quick Debounce Function"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Language Platform</label>
            <select 
              className="form-control"
              value={formData.language}
              onChange={e => setFormData({...formData, language: e.target.value})}
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Architecture Category</label>
            <select 
              className="form-control"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Context Description</label>
          <textarea 
            className={`form-control ${errors.description ? 'input-error' : ''}`}
            rows="3"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            placeholder="Explain what this specific code logic optimizes..."
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Source Code</label>
          <textarea 
            className={`form-control code-editor-textarea ${errors.code ? 'input-error' : ''}`}
            rows="10"
            value={formData.code}
            onChange={e => setFormData({...formData, code: e.target.value})}
            placeholder="// Paste your clean code block right here..."
          />
          {errors.code && <span className="error-text">{errors.code}</span>}
        </div>

        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="favorite" 
            checked={formData.favorite}
            onChange={e => setFormData({...formData, favorite: e.target.checked})}
          />
          <label htmlFor="favorite">Bookmark as Priority Favorite</label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Engine Payload
          </button>
        </div>
      </form>
    </div>
  );
}