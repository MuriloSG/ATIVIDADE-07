import { useState } from "react";
import { FaSearch } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center border border-gray-300 rounded-md p-2"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Digite o nome..."
        className="outline-none px-2 py-1 w-full"
      />
      <button
        type="submit"
        className="ml-2 p-1 text-gray-500 hover:text-gray-700"
      >
        <FaSearch size={20} />
      </button>
    </form>
  );
};

export default Search;
