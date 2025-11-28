// 리포맷(Reformat) - 문서를 정렬하는 것은 정렬하려는 코드를 블럭을 잡고 (Ctrl + A)
// 리포맷 단축키 Ctrl + Alt + L 을 누르면, 리포맷이 동작하면서 코드를 정렬해줌

import { Reset } from "styled-reset";
import Home from "./routes/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Coin from "./routes/Coin.jsx";

function App() {
    return (
            <BrowserRouter>      {/* react-router를 실제 적용하기 위해 최상단에 BrowserRouter 호출 */}
                <Reset />
                <Routes>
                    <Route path={"/coin/:id/*"} element={<Coin />} />
                    <Route path={"/"} element={<Home />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;
