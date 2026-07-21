const API_URL = 'http://localhost:5000/api/snippets';

export const snippetApi = {
  getAll: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to retrieve snippets registry.');
    return res.json();
  },

  getOne: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Snippet lookup failed or ID non-existent.');
    return res.json();
  },

  create: async (snippetData) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snippetData),
    });
    if (!res.ok) throw new Error('Could not persist new snippet schema data.');
    return res.json();
  },

  update: async (id, snippetData) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snippetData),
    });
    if (!res.ok) throw new Error('Patch update transaction aborted by server.');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Deletion directive dropped by endpoint database.');
    return res.json();
  }
};