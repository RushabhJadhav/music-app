import { SearchIcon } from "lucide-react";
import { fetchSearchResults, setQuery, clearResults } from "../../store/slices/fetchSong/songSlice";
import { type ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useDebounce } from "../../hooks/useDebounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(fetchSearchResults(debouncedSearchTerm));
      dispatch(setQuery(debouncedSearchTerm));
    } else {
      dispatch(clearResults());
      dispatch(setQuery(""));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="border-2 px-2 py-1 flex rounded-sm">
      <SearchIcon />
      <input 
        className="pl-2 min-w-3.5 outline-0 align-middle"
        type="text"
        placeholder="Search songs"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
};

export default SearchBar;