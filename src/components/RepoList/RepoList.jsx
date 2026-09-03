import { useState, useMemo } from 'react';
import './RepoList.css';

export default function RepoList({ repos, onUpdateRepo }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('all'); // 'all', 'public', 'private'
  const [archiveFilter, setArchiveFilter] = useState('all'); // 'all', 'active', 'archived'
  const [languageFilter, setLanguageFilter] = useState('all');

  if (!repos || repos.length === 0) return null;

  // Extract unique languages dynamically from the fetched repos
  const availableLanguages = useMemo(() => {
    const languages = repos.map((r) => r.language).filter(Boolean);
    return ['all', ...new Set(languages)];
  }, [repos]);

  // Combined filtering logic applied simultaneously
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      // 1. Text Search Filter
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Visibility Filter
      const matchesVisibility =
        visibilityFilter === 'all' ||
        (visibilityFilter === 'private' && repo.private) ||
        (visibilityFilter === 'public' && !repo.private);

      // 3. Archive Filter
      const matchesArchive =
        archiveFilter === 'all' ||
        (archiveFilter === 'archived' && repo.archived) ||
        (archiveFilter === 'active' && !repo.archived);

      // 4. Language Filter
      const matchesLanguage =
        languageFilter === 'all' || repo.language === languageFilter;

      return matchesSearch && matchesVisibility && matchesArchive && matchesLanguage;
    });
  }, [repos, searchTerm, visibilityFilter, archiveFilter, languageFilter]);

  return (
    <div className="repo-list-container">
      {/* Search and Combined Multi-Filters Control Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />

        <div className="filter-selects">
          {/* Visibility Filter */}
          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Visibility</option>
            <option value="public">Public Only</option>
            <option value="private">Private Only</option>
          </select>

          {/* Archive Status Filter */}
          <select
            value={archiveFilter}
            onChange={(e) => setArchiveFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="archived">Archived Only</option>
          </select>

          {/* Language Filter */}
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="filter-select"
          >
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'all' ? 'All Languages' : lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="repo-list-header">
        <h3>
          Repositories ({filteredRepos.length} of {repos.length})
        </h3>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="no-repos">No repositories match your active filters.</div>
      ) : (
        <div className="repo-grid">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className={`repo-card ${repo.archived ? 'archived' : ''}`}
            >
              <div className="repo-header">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-title"
                >
                  {repo.name}
                </a>

                <div className="repo-badges">
                  {repo.archived && (
                    <span className="repo-badge archive-badge">📦 Archived</span>
                  )}
                  <span className={`repo-badge ${repo.private ? 'private' : 'public'}`}>
                    {repo.private ? '🔒 Private' : '🌐 Public'}
                  </span>
                </div>
              </div>

              <p className="repo-description">
                {repo.description || 'No description provided.'}
              </p>

              <div className="repo-footer">
                <div className="repo-meta">
                  {repo.language && <span className="repo-lang">● {repo.language}</span>}
                  <span className="repo-stars">⭐ {repo.stargazers_count}</span>
                </div>

                <div className="repo-actions">
                  <button
                    className="action-btn visibility-btn"
                    onClick={() => onUpdateRepo(repo.name, { private: !repo.private })}
                    title="Toggle repository visibility"
                  >
                    {repo.private ? 'Make Public' : 'Make Private'}
                  </button>

                  <button
                    className="action-btn archive-btn"
                    onClick={() => onUpdateRepo(repo.name, { archived: !repo.archived })}
                    title="Toggle repository archive state"
                  >
                    {repo.archived ? 'Unarchive' : 'Archive'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}