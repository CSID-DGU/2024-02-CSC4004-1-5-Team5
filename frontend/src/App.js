import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './login/login';
import Signup from './signup/signup';
import MainPage from './main/mainpage';
import StartPage from './start/start'
import SelectPage from './select/select'
import CalenPage from './calen/calen'
import Menu1 from "./menu/menu1";
import Menu2 from "./menu/menu2";
import Board from "./board/board";
import Post from "./board/post";
import BoardList from "./board/boardlist";

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/start" element={<StartPage />} />
                    <Route path="/calen" element={<CalenPage />} />
                    <Route path="/select" element={<SelectPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/menu1" element={<Menu1 />} />
                    <Route path="/menu1" element={<Menu2 />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/posts/:postId" element={<Post />} />
                    <Route path="/boardlist/:boardName" element={<BoardList />} />


                </Routes>
        </Router>
    );
}

export default App;
