import { Route, Routes } from "react-router";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
    </Routes>
  )
};

export default AppRoutes;