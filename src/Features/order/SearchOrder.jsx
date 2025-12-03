import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        className="w-28 rounded-full bg-sky-600 px-4 py-2 text-center text-sm text-sky-50 transition-all duration-300 outline-none placeholder:text-sky-200 hover:scale-110 focus:ring-2 focus:ring-sky-700 focus:outline-none sm:absolute sm:left-1/2 sm:w-64 sm:-translate-x-1/2 sm:focus:w-72"
        placeholder="Search order by number "
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></input>
    </form>
  );
}

export default SearchOrder;
