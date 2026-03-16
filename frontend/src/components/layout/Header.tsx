import { UserIcon } from 'lucide-react';
import SearchBar from '../ui/SearchBar';

const Header = () => {
    return (
        <header className="border-b-2 p-4 flex justify-between items-center col-span-12 row-span-1">
            <h2>Boka Tunes</h2>
            <SearchBar />
            <UserIcon className="cursor-pointer select-none" />
        </header>
    )
}

export default Header;