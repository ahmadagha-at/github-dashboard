 # GitHub Dashboard
A modern, high-performance React dashboard designed to analyze and explore GitHub profiles and repositories.

---

## 🔐 Login & Authentication

Authentication in this application is handled directly via a **GitHub Personal Access Token (PAT)**.

### What is a Personal Access Token (PAT)?

A Personal Access Token is an encrypted security credential generated directly by GitHub (e.g., starting with `ghp_...`). It acts as a digital key for third-party applications, completely replacing the need to enter a traditional username and password.

## 🔑 How to Get Your GitHub Personal Access Token (PAT)

To log in and manage your repositories through the app, you need a Personal Access Token with the required scopes:

1. Go to your **GitHub Account Settings**.
2. Scroll down and click on **Developer settings** (in the left sidebar).
3. Select **Personal access tokens** ➔ **Tokens (classic)**.
4. Click **Generate new token** ➔ **Generate new token (classic)**.
5. Give your token a note/description (e.g., `GitHub Dashboard`).
6. Select the permissions (scopes) you want to grant the app (e.g., `repo` for public/private repository access and deletion).
7. Click **Generate token** at the bottom and copy your token.

### Why is this method secure?

1. **Zero Password Exposure:** Your actual GitHub password is never entered, stored, or transmitted anywhere in this app.

2. **Direct Browser-to-GitHub Communication:** Your token is sent exclusively over an encrypted HTTPS connection directly from your browser to GitHub's official APIs (`https://api.github.com`). No intermediate backend servers are involved.

3. **Granular Permissions:** You retain full control over what the token can access by assigning specific scopes (e.g., `repo`, `read:user`) when generating it on GitHub.

4. **Instant Revocation:** You can revoke or delete your token at any time from your GitHub Account Settings without needing to change your password.

---

## 🔄 PAT vs. OAuth2 (Access Token & Refresh Token)

Understanding how a Personal Access Token differs from the standard OAuth2 token lifecycle:

### 1. Access Token + Refresh Token (Standard OAuth2)

In a traditional OAuth2 workflow (typically involving a backend server):

* **Access Token:** A short-lived credential (usually valid for a few hours) used to authorize individual API requests.

* **Refresh Token:** A long-lived, securely stored token used exclusively to fetch a *new* Access Token automatically once the current one expires, without forcing the user to log in again.

* **Architecture Requirement:** Requires a secure backend server to safely store the `Client Secret` and manage token exchanges.


### 2. Personal Access Token (PAT)

In a client-side Single Page Application (SPA) like this React project:

* **All-in-One Token:** A PAT serves directly as the Access Token. It does **not** rely on a Refresh Token or a backend server.

* **Configurable Lifespan:** You define its expiration date manually on GitHub (e.g., 30 days, 90 days, or no expiration).

* **Manual Renewal:** Once a PAT expires, you simply generate a new token from your GitHub settings and paste it into the app.

---

## 🚀 Features & Technical Highlights

Once authenticated with a Personal Access Token (PAT), the full management suite is unlocked:

* **Profile & Repositories:** Access personal profile metrics alongside both **Public and Private repositories**.

* **Interactive Data Visualization:** Dynamic language distribution breakdown visualized through responsive **Recharts** donut charts.

* **Multi-Filter & Optimization:** Simultaneous real-time filtering (Search, Visibility, Status, Language) optimized with **React `useMemo`** for instant UI response and high rendering efficiency.

* **Live Repository Management:** Direct write access to update repository states (Toggle Public/Private visibility & Archive/Unarchive status) via **GitHub `PATCH` endpoints**.

