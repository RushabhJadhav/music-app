import { Route, Routes } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Artists from "../pages/Artists";
import Album from "../pages/Album";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/artist/:id" element={<Artists />} />
        <Route path="/album/:id" element={<Album />} />
      </Route>
    </Routes>
  )
};

export default AppRoutes;