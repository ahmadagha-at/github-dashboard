import './ProfileCard.css';

export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="profile-card">
      <img src={user.avatar_url} alt={user.login} className="profile-avatar" />
      <div className="profile-info">
        <h2>{user.name || user.login}</h2>
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noreferrer" 
          className="profile-username"
        >
          @{user.login}
        </a>
        {user.bio && <p className="profile-bio">{user.bio}</p>}
        
        <div className="profile-stats">
          <div>
            <span className="stat-value">{user.public_repos}</span>
            <span className="stat-label">Repos</span>
          </div>
          <div>
            <span className="stat-value">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div>
            <span className="stat-value">{user.following}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}