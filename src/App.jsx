import {Reset} from 'styled-reset';
import {BrowserRouter, Route, Routes} from 'react-router';
import Home from './routes/Home.jsx';
import Coin from './routes/Coin.jsx';

function App() {

    return (
            <BrowserRouter>
                <Reset />
                <Routes>
                    <Route path="/coin/:id" element={<Coin />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;



// 리턴을 이렇게해도 되지만, 이렇게하면 라우팅이 안된다
// <>
//     <Reset />
//     <Home />
// </>