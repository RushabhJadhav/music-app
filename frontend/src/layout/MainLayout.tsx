import Header from "../components/layout/Header";
import MusicPlayer from "../components/layout/MusicPlayer";
import LeftSideBar from "../components/layout/LeftSideBar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Header />
      <LeftSideBar />
      <main className="col-span-10 row-span-8 border-yellow-300">
        <Outlet />
      </main>
      <MusicPlayer />
    </>

  )
};

export default MainLayout;