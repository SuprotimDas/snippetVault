import React from 'react';
import { useNavigate } from 'react-router-dom';
import { snippetApi } from '../services/snippetApi';
import SnippetForm from '../components/SnippetForm';

export default function AddSnippet() {
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
      await snippetApi.create(formData);
      navigate('/');
    } catch (err) {
      alert('Error creating new snippet');
    }
  };

  return (
    <div className="page-wrapper animate-fade">
      <SnippetForm 
        formTitle="Initialize New Code Snippet"
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}