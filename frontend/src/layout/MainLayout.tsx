import Main from "../components/layout/Main";
import Header from "../components/layout/Header";
import MusicPlayer from "../components/layout/MusicPlayer";
import LeftSideBar from "../components/layout/LeftSideBar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <LeftSideBar />
      <Main />
      <MusicPlayer />
    </>

  )
};

export default MainLayout;