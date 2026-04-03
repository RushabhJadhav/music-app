import { useAppSelector } from "../../store/hooks";
import { selectSearchResults, selectSearchStatus } from "../../store/slices/fetchSong/songSlice";

const SearchResults = () => {
  const results = useAppSelector(selectSearchResults);
  const status = useAppSelector(selectSearchStatus);

  if (status === 'loading') {
    return (
      <div className="absolute border-2 w-full mt-1 rounded-sm bg-white z-50 p-4 text-center">
        Loading...
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="absolute border-2 w-full mt-1 rounded-sm bg-white z-50 p-4 text-center text-red-500">
        Error fetching results.
      </div>
    );
  }

  if (status === 'succeeded' && results.length === 0) {
    return (
      <div className="absolute border-2 w-full mt-1 rounded-sm bg-white z-50 p-4 text-center">
        No results found.
      </div>
    );
  }

  return (
    <div className="absolute border-2 w-full mt-1 rounded-sm bg-white z-50 max-h-96 overflow-y-auto shadow-lg">
      {results.map((item: any) => (
        <div 
          key={item.id} 
          className="p-2 flex items-center hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
        >
          <img 
            src={item.image[1]?.url || item.image[0]?.url} 
            alt={item.name} 
            className="w-12 h-12 mr-3 rounded object-cover flex-shrink-0" 
          />
          <div className="flex flex-col overflow-hidden text-black">
            <span 
              className="font-semibold truncate text-sm" 
              dangerouslySetInnerHTML={{ __html: item.name }}
            />
            <span className="text-xs text-gray-600 truncate">
              {item.artists.primary.map((a: any) => a.name).join(', ')}
            </span>
            <span 
              className="text-[10px] text-gray-400 truncate"
              dangerouslySetInnerHTML={{ __html: item.album.name }}
            />
          </div>
          <div className="ml-auto text-[10px] bg-gray-200 px-1 rounded self-start mt-1">
            {item.type}
          </div>
        </div>
      ))}
    </div>
  )
};

export default SearchResults;