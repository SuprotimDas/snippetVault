import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddSnippet from './pages/AddSnippet';
import EditSnippet from './pages/EditSnippet';
import ViewSnippet from './pages/ViewSnippet';
import NotFound from './pages/NotFound';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');

  return (
    <Router>
      <div className="app-shell dark-theme">
        <Navbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedLang={selectedLang} 
          setSelectedLang={setSelectedLang} 
        />
        <main className="main-viewport-content">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} selectedLang={selectedLang} />} />
            <Route path="/add" element={<AddSnippet />} />
            <Route path="/snippet/:id" element={<ViewSnippet />} />
            <Route path="/edit/:id" element={<EditSnippet />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}