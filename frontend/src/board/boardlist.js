import React, { useState, useEffect } from 'react';
import './boardlist.css';
import { useNavigate, useParams } from 'react-router-dom';

function BoardList() {
    const { boardName } = useParams();  // URL에서 boardName을 가져옴
    const [posts, setPosts] = useState([]);  // 게시글 목록 상태
    const [isWritingPost, setIsWritingPost] = useState(false);  // 글쓰기 상태
    const navigate = useNavigate();

    // 게시판 데이터 불러오기
    useEffect(() => {
        fetch(`/posts`)  // boardName을 포함한 경로로 요청
            .then(response => {
                if (!response.ok) {
                    throw new Error('게시글을 불러오는 데 실패했습니다.');
                }
                return response.json();
            })
            .then(posts => {
                if (Array.isArray(posts)) {  // API 응답이 배열인지 확인
                    setPosts(posts);  // 받아온 게시글 목록을 상태에 저장
                } else {
                    throw new Error('게시글 데이터가 배열이 아닙니다.');
                }
            })
            .catch(error => {
                console.error(error);
                // 에러 처리 (예: 사용자에게 알림 표시)
            });
    }, [boardName]);  // boardName이 변경될 때마다 게시글을 새로 불러옵니다.

    const goToCreatePost = () => {
        setIsWritingPost(true);
        navigate(`/create-post`);
    };

    return (
        <div>
            <header>
                <img src="/png/back.png" alt="back" className="back" onClick={() => navigate('/board')} />
                <h1>{boardName} 게시판</h1>
                <img
                    src="/png/menu.png"
                    alt="menuicon"
                    className="menu"
                    onClick={() => navigate('/menu1')} // 메뉴 페이지로 이동
                />
            </header>
                
            <div id="mainContainer2">
                <div id="postListContainer">
                    <div className="searchContainer">
                        <textarea id="search" placeholder="키워드를 입력하세요."></textarea>
                        <img id="search-btn" src="/png/Search.png"></img>
                    </div>
                    <div className="createNlist">
                        <div>
                            <img src="/png/pencil.png" alt="pencil" />
                            <button id="createpost-btn" onClick={goToCreatePost}>글 작성</button>
                        </div>
                        <select id="alignBar" defaultValue="1">
                            <option value="1">최신순</option>
                            <option value="2">인기순</option>
                        </select>
                    </div>
                    <ul id="postList">
                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map((post, index) => (
                                <li key={index}>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{post.title}</span>
                                    <span style={{ display: 'block', marginTop: '5px' }}>
                                        좋아요: {post.likes}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>게시글이 없습니다.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BoardList;
