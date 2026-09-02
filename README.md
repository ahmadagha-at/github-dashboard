 # GitHub Dashboard

> **Status:** 🛠️ **In Active Development**

A modern, high-performance React dashboard designed to analyze and explore GitHub profiles and repositories.



---



## 🔐 Login & Authentication



Authentication in this application is handled directly via a **GitHub Personal Access Token (PAT)**.



### What is a Personal Access Token (PAT)?

A Personal Access Token is an encrypted security credential generated directly by GitHub (e.g., starting with `ghp_...`). It acts as a digital key for third-party applications, completely replacing the need to enter a traditional username and password.



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



## 🚀 Post-Login Features



Once authenticated with a valid token, the full feature set of the application is unlocked:



* **Increased Rate Limits:** Your API limit expands from 60 unauthenticated requests to **5,000 requests per hour**.

* **Profile & Analytics:** View your personal stats, profile details, and search for any other GitHub user.

* **Repository Management:** Access both public repositories and your own **private repositories**.

* **Execute API Actions:** Perform real-time interactions with the GitHub API (filtering repositories, inspecting commit histories, and analyzing language distributions). 

