import { useState, useEffect } from 'react';
import axios from 'axios';

import LoginModal from './components/LoginModal/LoginModal';
import ProfileCard from './components/ProfileCard/ProfileCard';
import RepoList from './components/RepoList/RepoList';
import LanguageChart from './components/LanguageChart/LanguageChart';

import './App.css';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('github_token') || '');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user profile and repositories
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
          axios.get('https://api.github.com/user/repos?sort=updated&per_page=20', config),
        ]);

        setUser(userResponse.data);
        setRepos(reposResponse.data);
      } catch (err) {
        console.error('API Error:', err);
        setError('Invalid token or network error.');
        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [token]);

  // Handler to update repository settings (Visibility / Archive state)
  const handleUpdateRepo = async (repoName, updatedData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send PATCH request to update settings on GitHub
      const response = await axios.patch(
        `https://api.github.com/repos/${user.login}/${repoName}`,
        updatedData,
        config
      );

      // Update local state instantly with the response data
      setRepos((prevRepos) =>
        prevRepos.map((repo) =>
          repo.name === repoName ? { ...repo, ...response.data } : repo
        )
      );
    } catch (err) {
      console.error('Failed to update repository:', err);
      alert('Failed to update repository settings.');
    }
  };

  const handleLogin = (newToken) => {
    localStorage.setItem('github_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setToken('');
    setUser(null);
    setRepos([]);
  };

  // IF NOT LOGGED IN
  if (!token) {
    return <LoginModal onLogin={handleLogin} />;
  }

  // IF LOGGED IN
  return (
  <div className="app-container">
    <header className="dashboard-header">
      <h1>GitHub Dashboard</h1>
      <button onClick={handleLogout} className="search-button">
        Logout
      </button>
    </header>

    {loading && <div className="loader">Loading GitHub data...</div>}
    {error && <div className="error-message">{error}</div>}

    {!loading && (
      <>
        <ProfileCard user={user} />
        {/* Language Chart component inserted here */}
        <LanguageChart repos={repos} />
        <RepoList repos={repos} onUpdateRepo={handleUpdateRepo} />
      </>
    )}
  </div>
);
}