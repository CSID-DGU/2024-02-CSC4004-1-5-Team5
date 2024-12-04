import React from 'react';
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import Login from './login/login';
import Signup from './signup/signup';
import MainPage from './main/mainpage';
import StartPage from './start/start'
import SelectPage from './select/select'
import CalenPage from './calen/calen'
import Menu1 from "./main/menu1";
import Menu2 from "./main/menu2";
import CheckList from "./check/check"
import MyChecklist from "./list/mychecklist"
import Board from "./board/board";
import BoardMenu from "./board/board-menu";
import Post from "./board/post";
import BoardList from "./board/boardlist";
import CreatePost from "./board/create-post";
import EditPost from "./board/edit-post";
import HotPosts from "./board/hotpostlist";
import AllBoard from "./board/allboard"

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
                    <Route path="/menu2" element={<Menu2 />} />
                    <Route path="/mychecklist" element={<MyChecklist />} />
                    <Route path="/checklist/:checklistId" element={<CheckListWrapper />} />
                    <Route path="/posts/:postId" element={<Post />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/boardMenu" element={<BoardMenu />} />
                    <Route path="/allboard" element={<AllBoard />} />
                    <Route path="/boardlist/:boardName" element={<BoardList />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/hotposts" element={<HotPosts />} />
                    <Route path="/edit-post/:postId" element={<EditPost />} />
                </Routes>
        </Router>
    );
}

const CheckListWrapper = () => {
    const { checklistId } = useParams();
    return <CheckList checklistId={checklistId} />;
};
export default App;