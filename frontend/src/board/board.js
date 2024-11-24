// board.js
import React, { useState } from 'react';
import './board.css';
import { useNavigate } from 'react-router-dom';

function Board() {
    const [selectedBoard, setSelectedBoard] = useState(null);
    const navigate = useNavigate();

    /* // 나라별 분류 추가
    const selectBoard = (boardName) => {
        setSelectedBoard(boardName);
        // 게시판 선택 후 해당 게시판 페이지로 이동
        navigate(`/boardlist/${boardName}`);  // 나라명을 포함한 경로로 이동
    };
    */
    const selectBoard = (boardName) => {
        setSelectedBoard(boardName);
        // 게시판 선택 후 해당 게시판 페이지로 이동
        navigate(`/boardlist/${boardName}`);  // boardName을 경로에 포함
    };
    
    
    return (
        <div>
            <header>
                <img src="png/back.png" alt="back" className="back" />
                <h1>게시판</h1>
                <img
                    src="png/menu.png"
                    alt="menuicon"
                    className="menu"
                    onClick={() => navigate('/menu1')} // 메뉴 페이지로 이동
                />
            </header>
            <div id="mainContainer">
                <div id="boardSelection">
                    <span className="postsList" onClick={() => alert('내가 쓴 글')}>
                        <img src="png/post.png" alt="post" />
                        <button>내가 쓴 글</button>
                    </span>
                    <span className="postsList" onClick={() => alert('댓글 단 글')}>
                        <img src="png/chats.png" alt="chats" />
                        <button>댓글 단 글</button>
                    </span>
                    <span className="postsList" onClick={() => navigate('/hotposts')}>
                        <img src="png/bestpost.png" alt="bestpost" />
                        <button>BEST 게시글</button>
                    </span>
                    <hr />
                    <button onClick={() => selectBoard('germany')}>독일 게시판</button>
                    <button onClick={() => selectBoard('malaysia')}>말레이시아 게시판</button>
                    <button onClick={() => selectBoard('unitedStates')}>미국 게시판</button>
                    <button onClick={() => selectBoard('vietnam')}>베트남 게시판</button>
                    <button onClick={() => selectBoard('spain')}>스페인 게시판</button>
                    <button onClick={() => selectBoard('singapore')}>싱가포르 게시판</button>
                    <button onClick={() => selectBoard('unitedKingdom')}>영국 게시판</button>
                    <button onClick={() => selectBoard('italy')}>이탈리아 게시판</button>
                    <button onClick={() => selectBoard('indonesia')}>인도네시아 게시판</button>
                    <button onClick={() => selectBoard('japan')}>일본 게시판</button>
                    <button onClick={() => selectBoard('china')}>중국 게시판</button>
                    <button onClick={() => selectBoard('canada')}>캐나다 게시판</button>
                    <button onClick={() => selectBoard('taiwan')}>타이완 게시판</button>
                    <button onClick={() => selectBoard('thailand')}>태국 게시판</button>
                    <button onClick={() => selectBoard('france')}>프랑스 게시판</button>
                    <button onClick={() => selectBoard('philippines')}>필리핀 게시판</button>
                    <button onClick={() => selectBoard('australia')}>호주 게시판</button>
                    <button onClick={() => selectBoard('hongkong')}>홍콩 게시판</button>
                </div>
            </div>
        </div>
    );
}

export default Board;
