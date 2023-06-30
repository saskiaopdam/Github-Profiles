import { useState } from "react";
import Switch from "react-switch";

import "./App.css";

import octocatLogo from "./assets/Octocat.png";
import ProfileDisplay from "./components/ProfileDisplay/ProfileDisplay";
import SearchBar from "./components/SearchBar/SearchBar";
import { useThemeContext } from "./context/theme-context";

function App() {
  const { theme, toggleTheme } = useThemeContext();
  const [usernameQuery, setUsernameQuery] = useState("");
  const [userFound, setUserFound] = useState(undefined);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUserInfo = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/users/${usernameQuery}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setUserFound(false);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
      setUserFound(true);
      if (user) {
        fetchRepos();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRepos = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/users/${usernameQuery}/repos`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRepos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setUsernameQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // necessery if no action is defined on form?
    fetchUserInfo();
  };

  return (
    <div className={`App ${theme}`}>
      <header className={`App-header ${theme}`}>
        <span className="Switch-label">toggle theme</span>
        <Switch onChange={toggleTheme} checked={theme === "dark-theme"} />
      </header>
      <main>
        <section className="App-section">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="Octocat-logo"
              src={octocatLogo}
              alt="GitHub's Octocat logo"
            />
          </a>
          <h1 className="App-section-title">GitHub Profiles</h1>
          <SearchBar
            usernameQuery={usernameQuery}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          {error && userFound === false && <p>{error}</p>}
          {isLoading && <p>Loading...</p>}
          {userFound && <p>Scroll down to see the profile.</p>}
          {userFound === false && <p>Invalid username. Please try again.</p>}
        </section>
        <section className="App-section">
          <h1 className="App-section-title">Profile Info</h1>
          <ProfileDisplay userFound={userFound} user={user} repos={repos} />
        </section>
      </main>
      <footer className={`App-footer ${theme}`}>
        <small>an iLab project</small>
      </footer>
    </div>
  );
}

export default App;
