import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { snippetApi } from '../services/snippetApi';
import SnippetForm from '../components/SnippetForm';

export default function EditSnippet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    snippetApi.getOne(id)
      .then(res => {
        setSnippet(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed fetching requested snippet.');
        navigate('/');
      });
  }, [id, navigate]);

  const handleFormSubmit = async (formData) => {
    try {
      await snippetApi.update(id, formData);
      navigate(`/snippet/${id}`);
    } catch (err) {
      alert('Updating snippet failed.');
    }
  };

  if (loading) return <div className="system-status-pane">Loading snippet data...</div>;

  return (
    <div className="page-wrapper animate-fade">
      <SnippetForm 
        formTitle={`Edit Snippet: ${snippet.title}`}
        initialValues={snippet}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}