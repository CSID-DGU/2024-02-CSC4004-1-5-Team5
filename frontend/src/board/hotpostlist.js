import React, { useState, useEffect } from 'react';
import './boardlist.css';
import { useNavigate, useParams } from 'react-router-dom';

function HotPosts() {
    const [posts, setPosts] = useState([]);  // 게시글 목록 상태
    const navigate = useNavigate();

    // 인기 게시글 데이터 불러오기
    useEffect(() => {
        fetch('posts/popular')  // 인기 게시글을 불러오는 API 호출
            .then(response => {
                if (!response.ok) {
                    throw new Error('인기 게시글을 불러오는 데 실패했습니다.');
                }
                return response.json();
            })
            .then(posts => {
                if (Array.isArray(posts)) {  // API 응답이 배열인지 확인
                    setPosts(posts);  // 받아온 인기 게시글 목록을 상태에 저장
                } else {
                    throw new Error('게시글 데이터가 배열이 아닙니다.');
                }
            })
            .catch(error => {
                console.error(error);
                // 에러 처리 (예: 사용자에게 알림 표시)
            });
    }, []);  // boardName에 관계없이 최초 한 번만 실행

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);  // 게시글 ID를 포함한 URL로 이동
    };

    return (
        <div  className="board_overlay">
            <header id="titleContainer">
                <img src="/png/back.png" alt="back" className="back" onClick={() => navigate('/board')} />
                <h1>인기 게시판</h1>
                <img
                    src="/png/menu.png"
                    alt="menuicon"
                    className="menu"
                    onClick={() => navigate('/menu1')} // 메뉴 페이지로 이동
                />
            </header>
                
            <div id="mainContainer2">
                <div id="postListContainer">
                    <ul id="postList">
                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map((post, index) => (
                                <li key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
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

export default HotPosts;
