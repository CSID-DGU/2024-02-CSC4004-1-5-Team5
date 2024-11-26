import React, { useState, useEffect } from 'react';
import './boardlist.css';
import { useNavigate, useParams } from 'react-router-dom';

function BoardList() {
    const { boardName } = useParams();  // URL에서 boardName을 가져옴
    const [posts, setPosts] = useState([]);  // 게시글 목록 상태
    const [sortOrder, setSortOrder] = useState('1');  // 정렬 순서 (기본값: 최신순)
    const navigate = useNavigate();

    // 쿠키에서 memberId 가져오기
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

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
                    // 정렬 처리
                    const sortedPosts = sortPosts(posts, sortOrder);
                    setPosts(sortedPosts);  // 정렬된 게시글 목록을 상태에 저장
                } else {
                    throw new Error('게시글 데이터가 배열이 아닙니다.');
                }
            })
            .catch(error => {
                console.error(error);
                // 에러 처리 (예: 사용자에게 알림 표시)
            });
    }, [boardName, sortOrder]);  // boardName이나 sortOrder가 변경될 때마다 게시글을 새로 불러옴

    // 정렬 함수
    const sortPosts = (posts, order) => {
        if (order === '1') {
            // 최신순 (createdAt을 기준으로 정렬)
            return posts.sort((a, b) => {
                const dateA = new Date(a.createdAt);  // createdAt을 Date 객체로 변환
                const dateB = new Date(b.createdAt);  // createdAt을 Date 객체로 변환
                return dateB - dateA;  // 최신순 정렬 (최근 날짜가 먼저 나오도록)
            });
        } else if (order === '2') {
            // 인기순 (likes를 기준으로 정렬)
            return posts.sort((a, b) => b.likes - a.likes);  // 좋아요 수로 내림차순 정렬
        }
        return posts;  // 기본적으로 정렬되지 않은 게시글
    };

    // 정렬 기준이 변경될 때 호출되는 함수
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);  // 새로운 정렬 기준으로 상태 업데이트
    };

    const goToCreatePost = () => {
        // 쿠키에서 memberId 확인
        const memberId = getCookie('memberId');
        console.log(document.cookie);  // 쿠키가 제대로 저장되었는지 확인

        if (!memberId) {
            alert('로그인 후 게시글을 작성할 수 있습니다.');
            navigate('/testlogin');  // 로그인 페이지로 리다이렉트
        } else {
            navigate(`/create-post`);  // 게시글 작성 페이지로 이동
        }
    };

    // 게시글 클릭 시 상세 페이지로 이동
    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);  // 게시글 ID를 포함한 URL로 이동
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
                        <img id="search-btn" src="/png/Search.png" alt="search" />
                    </div>
                    <div className="createNlist">
                        <div>
                            <img src="/png/pencil.png" alt="pencil" />
                            <button id="createpost-btn" onClick={goToCreatePost}>글 작성</button>
                        </div>
                        <select id="alignBar" value={sortOrder} onChange={handleSortChange}>
                            <option value="1">최신순</option>
                            <option value="2">인기순</option>
                        </select>
                    </div>
                    <ul id="postList">
                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map((post) => (
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

export default BoardList;
