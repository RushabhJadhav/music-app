import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  
  return (
    <div className="bg-gray-600 h-screen grid grid-cols-12 grid-rows-12 relative">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
};

export default App;