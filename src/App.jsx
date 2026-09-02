import { useState, useEffect } from 'react';
import axios from 'axios';

import LoginModal from './components/LoginModal/LoginModal';
import ProfileCard from './components/ProfileCard/ProfileCard';
import RepoList from './components/RepoList/RepoList';
// import SearchBar from './components/SearchBar/SearchBar';
// import ProfileCard from './components/ProfileCard/ProfileCard';
// import RepoList from './components/RepoList/RepoList';
import './App.css';

export default function App() {

  const [token, setToken] = useState(() => localStorage.getItem('github_token') || '');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchGitHubData = async () => {
      setLoading(true);
      setError('');

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [userResponse, reposResponse] = await Promise.all([
          axios.get('https://api.github.com/user', config),
          axios.get('https://api.github.com/user/repos?sort=updated&per_page=10', config),
        ]);

        setUser(userResponse.data);
        setRepos(reposResponse.data);
      } catch (err) {
        console.error('API Error:', err);
        setError('Invalid token or network error. Please check your token and try again.');

        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [token]);

  // Login handler: Saves the token
  const handleLogin = (newToken) => {
    localStorage.setItem('github_token', newToken);
    setToken(newToken);
  };

  // Logout handler: Deletes the token
  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setToken('');
    setUser(null);
    setRepos([]);
  };

  // IF NOT LOGGED IN: Render Login Screen
  if (!token) {
    return <LoginModal onLogin={handleLogin} />;
  }

  // IF LOGGED IN: Render Main Dashboard
  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>GitHub Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      {loading && <div className="loader">Loading GitHub data...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && (
        <>
          <ProfileCard user={user} />
          <RepoList repos={repos} />
        </>
      )}
    </div>
  );
}