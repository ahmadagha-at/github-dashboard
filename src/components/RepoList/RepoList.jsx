import './RepoList.css';

export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="repo-list-container">
      <h3>Repositories ({repos.length})</h3>
      <div className="repo-grid">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-card">
            <div className="repo-header">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer" 
                className="repo-title"
              >
                {repo.name}
              </a>
              <span className={`repo-badge ${repo.private ? 'private' : 'public'}`}>
                {repo.private ? '🔒 Private' : '🌐 Public'}
              </span>
            </div>
            
            <p className="repo-description">
              {repo.description || 'No description provided.'}
            </p>

            <div className="repo-footer">
              {repo.language && <span className="repo-lang">● {repo.language}</span>}
              <span className="repo-stars">⭐ {repo.stargazers_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}