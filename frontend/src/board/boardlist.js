// boardlist.js
import React, { useState, useEffect } from 'react';
import './board.css';
import { useParams, useNavigate } from 'react-router-dom';

function BoardList() {
    const { boardName } = useParams();  // URL에서 나라명을 가져옴
    const [posts, setPosts] = useState([]);
    const [isWritingPost, setIsWritingPost] = useState(false);  // 글쓰기 상태
    const navigate = useNavigate();

    // 게시판 데이터 불러오기
    useEffect(() => {
        if (boardName) {
            fetch(`/api/posts/${boardName}`)  // 해당 나라의 게시글 가져오기
                .then(response => response.json())
                .then(posts => renderPostList(posts));
        }
    }, [boardName]);

    const renderPostList = (posts) => {
        setPosts(posts);  // 받아온 게시글 목록을 상태에 저장
    };

    const goToCreatePost = () => {
        setIsWritingPost(true);
        // 글쓰기 페이지로 이동 (나중에 상세 구현)
        navigate(`/create-post/${boardName}`);
    };

    return (
        <div>
            <header>
                <img src="/png/back.png" alt="back" className="back" />
                <h1>{boardName.toUpperCase()} 게시판</h1>
                <img
                    src="/png/menu.png"
                    alt="menuicon"
                    className="menu"
                    onClick={() => navigate('/menu1')} // 메뉴 페이지로 이동
                />
            </header>
            <div id="mainContainer">
                <div id="postListContainer">
                    <div className="searchContainer">
                        <textarea id="search" placeholder="키워드를 입력하세요."></textarea>
                        <button id="search-btn" style={{ backgroundImage: "/png/Search.png" }}></button>
                    </div>
                    <div className="createNlist">
                        <div>
                            <img src="/png/pencil.png" alt="pencil" />
                            <button id="createpost-btn" onClick={goToCreatePost}>글 작성</button>
                        </div>
                        <select id="alignBar" value={1}>
                            <option value="1">최신순</option>
                            <option value="2">인기순</option>
                        </select>
                    </div>
                    <h2 id="boardTitle">{boardName.toUpperCase()} 게시판</h2>
                    <ul id="postList">
                        {posts.map((post, index) => (
                            <li key={index}>
                                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{post.title}</span>
                                <span style={{ display: 'block', marginTop: '5px' }}>
                                    좋아요: {post.likes} 댓글: {post.comments.length}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BoardList;
