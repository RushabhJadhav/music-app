import { UserIcon } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import SearchResults from '../ui/SearchResults';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsSearchVisible, setShowResults } from '../../store/slices/fetchSong/songSlice';
import { useEffect, useRef } from 'react';

const Header = () => {
    const isSearchVisible = useAppSelector(selectIsSearchVisible);
    const dispatch = useAppDispatch();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                dispatch(setShowResults(false));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);

    return (
        <header className="border-b-2 p-4 flex justify-between items-center col-span-12 row-span-1">
            <h2>Boka Tunes</h2>
            <div className="relative" ref={searchRef}>
                <SearchBar />
                { isSearchVisible && <SearchResults /> }
            </div>
            <UserIcon className="cursor-pointer select-none" />
        </header>
    )
}

export default Header;