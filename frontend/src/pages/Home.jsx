import React, { useEffect, useState } from 'react';
import { snippetApi } from '../services/snippetApi';
import SnippetCard from '../components/SnippetCard';
import DeleteModal from '../components/DeleteModal';

export default function Home({ searchTerm, selectedLang }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const payload = await snippetApi.getAll();
      setSnippets(payload.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFav = async (snippet) => {
    try {
      const updated = { ...snippet, favorite: !snippet.favorite };
      await snippetApi.update(snippet._id, updated);
      setSnippets(snippets.map(s => s._id === snippet._id ? updated : s));
    } catch (err) {
      alert('Failed to update asset criteria preferences.');
    }
  };

  const triggerOpenModal = (id) => {
    setTargetId(id);
    setDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    try {
      await snippetApi.delete(targetId);
      setSnippets(snippets.filter(s => s._id !== targetId));
      setDeleteModalOpen(false);
    } catch (err) {
      alert('Error finalizing entry deletion sequence.');
    }
  };

  const filteredSnippets = snippets.filter(item => {
    const matchTitle = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLang = selectedLang === 'All' || item.language === selectedLang;
    return matchTitle && matchLang;
  });

  const totalCount = snippets.length;
  const favCount = snippets.filter(s => s.favorite).length;
  
  const getMostUsedLanguage = () => {
    if (snippets.length === 0) return 'None';
    const mapping = {};
    snippets.forEach(s => mapping[s.language] = (mapping[s.language] || 0) + 1);
    return Object.keys(mapping).reduce((a, b) => mapping[a] > mapping[b] ? a : b);
  };

  if (loading) return <div className="system-status-pane">Syncing active system codebases...</div>;
  if (error) return <div className="system-status-pane error-state">Core API Error: {error}</div>;

  return (
    <div className="home-dashboard-container">
      <section className="dashboard-stats-grid">
        <div className="stat-card">
          <span className="stat-label">System Snippets</span>
          <span className="stat-val text-primary">{totalCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Starred Node Links</span>
          <span className="stat-val text-fav">{favCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Primary Stack Type</span>
          <span className="stat-val text-accent">{getMostUsedLanguage()}</span>
        </div>
      </section>

      <h2 className="section-title">All Repository Objects</h2>

      {filteredSnippets.length === 0 ? (
        <div className="empty-search-fallback">
          <p>No valid snippets match your current dashboard search matrix configuration.</p>
        </div>
      ) : (
        <div className="snippets-layout-grid">
          {filteredSnippets.map(snippet => (
            <SnippetCard 
              key={snippet._id}
              snippet={snippet}
              onToggleFav={handleToggleFav}
              onOpenDeleteModal={triggerOpenModal}
            />
          ))}
        </div>
      )}

      <DeleteModal 
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={executeDelete}
      />
    </div>
  );
}