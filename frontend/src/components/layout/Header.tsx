import { UserIcon } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import SearchResults from '../ui/SearchResults';
import { useAppSelector } from '../../store/hooks';
import { selectSearchQuery } from '../../store/slices/fetchSong/songSlice';

const Header = () => {
    const searchQuery = useAppSelector(selectSearchQuery);

    return (
        <header className="border-b-2 p-4 flex justify-between items-center col-span-12 row-span-1">
            <h2>Boka Tunes</h2>
            <div className="relative">
                <SearchBar />
                { searchQuery && <SearchResults /> }
            </div>
            <UserIcon className="cursor-pointer select-none" />
        </header>
    )
}

export default Header;