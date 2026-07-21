import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ searchTerm, setSearchTerm, selectedLang, setSelectedLang }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const languages = ['All', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Other'];

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="brand-logo">
          <span className="logo-bracket">&lt;</span>
          snippetVault
          <span className="logo-bracket">/&gt;</span>
        </Link>
      </div>

      {isHomePage && (
        <div className="navbar-center">
          <input
            type="text"
            className="search-input"
            placeholder="Search snippets by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      )}

      <div className="navbar-right">
        <button className="btn btn-primary" onClick={() => navigate('/add')}>
          + New Snippet
        </button>
      </div>
    </nav>
  );
}