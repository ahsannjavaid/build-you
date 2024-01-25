import React, { useState } from "react";

export default function SearchForm({ FilteringSearch }) {
    const [searched, setSearched] = useState("");

  return (
    <form className="d-flex">
      <input
        onChange={(event) => setSearched(event.target.value)}
        value={searched}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button
        onClick={(event) => FilteringSearch(event, searched)}
        className="btn btn-outline-danger"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
