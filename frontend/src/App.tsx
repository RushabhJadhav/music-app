import Main from "./components/layout/Main";
import Header from "./components/layout/Header";
import LeftSideBar from "./components/layout/LeftSideBar";
import MusicPlayer from "./components/layout/MusicPlayer";

const App = () => {
  
  return (
    <div className="bg-gray-600 h-screen grid grid-cols-12 grid-rows-12 relative">
      <Header />
      <LeftSideBar />
      <Main />
      <MusicPlayer />
    </div>
  )
}

export default App;