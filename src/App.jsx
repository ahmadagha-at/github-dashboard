import { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal/LoginModal';
// import SearchBar from './components/SearchBar/SearchBar';
// import ProfileCard from './components/ProfileCard/ProfileCard';
// import RepoList from './components/RepoList/RepoList';
import './App.css';

export default function App() {
  // Check if a token already exists in localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem('github_token') || '';
  });

  const [activeUser, setActiveUser] = useState('octocat');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !token) {
      window.history.replaceState({}, document.title, '/');
      handleLogin(code);
    }
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
    <div className="app-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1 className="title">Welcome to GitHub Dashboard!</h1>
      <button onClick={handleLogout} className="search-button">
        Logout
      </button>
    </div>
  );
}