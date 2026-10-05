import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchUser() {
    if (username.trim() === "") {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username.trim()}`
      );

      if (!response.ok) {
        throw new Error("GitHub user not found.");
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="github-page">
      <div className="github-container">
        <header className="github-header">
          <div>
            <h1>GitHub User Search</h1>
            <p>Search for a GitHub user and explore their profile.</p>
          </div>
        </header>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchUser();
              }
            }}
          />

          <button onClick={searchUser} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {user && (
          <section className="profile-card">
            <div className="profile-top">
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="avatar"
              />

              <div className="profile-info">
                <h2>{user.name || user.login}</h2>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{user.login}
                </a>

                <p>
                  {user.bio || "This user doesn't have a bio."}
                </p>
              </div>
            </div>

            <div className="profile-stats">
              <div>
                <span>Repositories</span>
                <strong>{user.public_repos}</strong>
              </div>

              <div>
                <span>Followers</span>
                <strong>{user.followers}</strong>
              </div>

              <div>
                <span>Following</span>
                <strong>{user.following}</strong>
              </div>
            </div>

            <div className="profile-details">
              {user.location && (
                <div>
                  <span>Location</span>
                  <strong>{user.location}</strong>
                </div>
              )}

              {user.company && (
                <div>
                  <span>Company</span>
                  <strong>{user.company}</strong>
                </div>
              )}

              {user.blog && (
                <div>
                  <span>Website</span>
                  <a
                    href={
                      user.blog.startsWith("http")
                        ? user.blog
                        : `https://${user.blog}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;