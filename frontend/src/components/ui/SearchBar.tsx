import { SearchIcon } from "lucide-react";

const SearchBar = () => {

  return (
    <div className="border-2 px-2 py-1 flex rounded-sm">
      <SearchIcon />
      <input className="pl-2 min-w-3.5 outline-0 align-middle" type="text" placeholder="Search songs" />
    </div>
  )
};

export default SearchBar;