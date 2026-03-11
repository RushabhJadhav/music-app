import { Routes, Route } from "react-router";
import Home from "../../pages/Home";
import Artists from "../../pages/Artists";
import Album from "../../pages/Album";

const Main = () => {
    return (
        <div className="col-span-10 row-span-8 border-yellow-300">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/artist:id" element={<Artists />}></Route>
                <Route path="/album:id" element={<Album />}></Route>
            </Routes>
        </div>
    )
}

export default Main;