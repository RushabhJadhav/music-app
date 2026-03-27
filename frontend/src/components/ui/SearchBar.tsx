import { SearchIcon } from "lucide-react";
import { fetchSong } from "../../store/slices/fetchSong/songSlice";
import type { ChangeEvent } from "react";
import { useAppDispatch } from "../../store/hooks";

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handleSearch = ((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchSong(e.target.value));
  })

  return (
    <div className="border-2 px-2 py-1 flex rounded-sm">
      <SearchIcon />
      <input 
        className="pl-2 min-w-3.5 outline-0 align-middle"
        type="text"
        placeholder="Search songs"
        onChange={handleSearch}
      />
    </div>
  )
};

export default SearchBar;