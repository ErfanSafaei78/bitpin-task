import { useTheme } from "../contexts/ThemeContext";

export const Header = () => {

  const {theme, toggleTheme} = useTheme();

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm navbar-${theme} bg-${theme}`}
    >
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          Bitpin Trading Platform
        </a>
        <button
          className={`btn ${
            theme === "light" ? "btn-outline-dark" : "btn-outline-light"
          }`}
          onClick={toggleTheme}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
};
