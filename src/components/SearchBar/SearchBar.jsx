import "./SearchBar.css";

function SearchBar({ usernameQuery, onChange, onSubmit }) {

  return (
    <form className="SearchBar" onSubmit={onSubmit} role="search" aria-label="GitHub">
      <label className="SearchBar-label" htmlFor="username-search">Search by username</label>
      <input
        className="SearchBar-input"
        id="username-search"
        type="search"
        value={usernameQuery}
        onChange={onChange}
        placeholder="Search by username"
      />
      <button className="SearchBar-button" disabled={!usernameQuery}>Search</button>
    </form>

  );
}

export default SearchBar;
