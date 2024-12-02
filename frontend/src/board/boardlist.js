import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import './boardlist.css';
import { useNavigate, useParams } from 'react-router-dom';

function BoardList() {
    const { boardName } = useParams();
    const [posts, setPosts] = useState([]); // 게시글 목록 상태
    const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시글 목록 상태
    const [sortOrder, setSortOrder] = useState('1'); // 정렬 기준
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/posts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('게시글을 불러오는 데 실패했습니다.');
                }
                return response.json();
            })
            .then(posts => {
                if (Array.isArray(posts)) {
                    const sortedPosts = sortPosts(posts, sortOrder);
                    setPosts(sortedPosts);
                    setFilteredPosts(sortedPosts); // 처음에는 전체 게시글을 필터링된 목록으로 설정
                } else {
                    throw new Error('게시글 데이터가 배열이 아닙니다.');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [boardName, sortOrder]);

    const sortPosts = (posts, order) => {
        if (order === '1') {
            return posts.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });
        } else if (order === '2') {
            return posts.sort((a, b) => b.likes - a.likes);
        }
        return posts;
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // 검색어 상태 업데이트
    };

    const handleSearchClick = () => {
        // 검색어와 게시글 제목을 비교하여 일치하는 게시글만 필터링
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
        
        setTimeout(() => {
            const textArea = document.getElementById('search'); // textarea 요소를 가져옵니다
            const currentText = textArea.value; // 현재 입력된 텍스트
            textArea.value = currentText.slice(0, -1); // 마지막 문자를 지운다 (backspace 효과)
            setSearchTerm(textArea.value); // 상태 업데이트
        }, 100); // 잠시 기다린 후에 backspace 효과를 적용
    };
    
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick(); // 엔터 키를 누르면 검색 클릭과 동일하게 동작
        }
    };

    const goToCreatePost = () => {
        const memberId = Cookies.get("userId");

        if (!memberId) {
            alert('로그인 후 게시글을 작성할 수 있습니다.');
            navigate('/login');
        } else {
            navigate(`/create-post`);
        }
    };

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
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
                    onClick={() => navigate('/menu1')}
                />
            </header>

            <div id="mainBD_container2">
                <div id="postListBD_container">
                    <div className="searchBD_container">
                        <textarea
                            id="search"
                            placeholder="키워드를 입력하세요."
                            value={searchTerm} // 입력된 검색어 상태를 textarea에 바인딩
                            onChange={handleSearchChange} // 검색어 변경 시 상태 업데이트
                            onKeyDown={handleKeyDown} // 엔터 키 감지
                        />
                        <img
                            id="search-btn"
                            src="/png/Search.png"
                            alt="search"
                            onClick={handleSearchClick} // 검색 버튼 클릭 시 필터링
                        />
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
                        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
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
