import { UserIcon, SearchIcon } from 'lucide-react';

const Header = () => {
    return (
        <header className="border-b-2 p-4 flex justify-between items-center col-span-12 row-span-1">
            <h2>Boka Tunes</h2>
            <div className="border-2 px-2 py-1 flex rounded-sm">
                <SearchIcon />
                <input className="pl-2 min-w-3.5 outline-0 align-middle" type="text" placeholder="Search songs" />
            </div>
            <UserIcon className="cursor-pointer select-none" />
        </header>
    )
}

export default Header;