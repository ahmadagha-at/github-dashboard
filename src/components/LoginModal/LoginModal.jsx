import { useState } from 'react';
import './LoginModal.css';

export default function LoginModal({ onLogin }) {
  const [tokenInput, setTokenInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedToken = tokenInput.trim();

    if (trimmedToken) {
      // Direct login: passes token up to App.jsx without redirect
      onLogin(trimmedToken);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1 className="login-title">
          GitHub <span>Dashboard</span>
        </h1>
        <p className="login-subtitle">
          Enter your GitHub Personal Access Token to log in directly. No redirect or password required.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Paste your ghp_... token here"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            className="token-input"
            required
          />

          <button type="submit" className="github-btn">
            Sign In with Token
          </button>
        </form>
      </div>
    </div>
  );
}