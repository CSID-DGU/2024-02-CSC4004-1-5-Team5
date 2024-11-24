import React, { useState, useEffect } from 'react';
import './post.css';
import { useNavigate, useParams } from 'react-router-dom';
import BoardMenu from './board-menu';  // Import BoardMenu component

function PostDetail() {
    const { postId } = useParams();  // URL에서 postId를 가져옴
    const navigate = useNavigate();
    
    const [post, setPost] = useState(null);  // 게시글 상태
    const [showMenu, setShowMenu] = useState(false);  // 메뉴 표시 상태

    // 게시글 데이터 불러오기
    useEffect(() => {
        console.log(`Fetching post with ID: ${postId}`);

        // 게시글 API 요청
        fetch(`/posts/${postId}`)
            .then(response => response.json())
            .then(postData => {
                setPost(postData);
                console.log(postData);
            })
            .catch(error => {
                console.error('게시글 불러오기 실패', error);
            });
    }, [postId]);

    // 좋아요 클릭
    const likePost = () => {
        // 좋아요 요청 보내기
        fetch(`/posts/${postId}/like`, {
            method: 'POST',  // POST 메소드로 요청
        })
            .then(response => {
                if (response.ok) {
                    // 좋아요 성공, 서버에서 업데이트된 게시글 정보 반환
                    return response.json();
                } else {
                    throw new Error('좋아요 처리 실패');
                }
            })
            .then(updatedPost => {
                // 서버에서 반환된 업데이트된 게시글 데이터로 상태 업데이트
                setPost(updatedPost);
            })
            .catch(error => {
                console.error('좋아요 요청 실패', error);
            });
    };

    // 게시글 삭제
    const deletePost = () => {
        fetch(`/posts/${postId}`, { method: 'DELETE' })
            .then(() => {
                navigate(`/board`);  // 게시판 목록으로 돌아감
            })
            .catch(error => {
                console.error('게시글 삭제 실패', error);
            });
    };

    // 게시글 수정
    const editPost = () => {
        navigate(`/edit-post/${postId}`);  // 게시글 수정 페이지로 이동
    };

    // 메뉴 열기
    const openMenu = () => {
        setShowMenu(true);
    };

    // 메뉴 닫기
    const closeMenu = () => {
        setShowMenu(false);
    };

    if (!post) {
        return <div>게시글을 불러오는 중...</div>;
    }

    return (
        <div>
            <header>
                <img src="/png/back.png" alt="back" className="back" onClick={() => window.history.back()} />
                <h1>게시글</h1>
                <img
                    src="/png/create.png"
                    alt="menuicon"
                    className="menu"
                    onClick={openMenu} // 메뉴 열기
                />
            </header>
            <div id="postDetailContainer">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p id="postAuthor">{post.member_id || '작성자 정보 없음'}</p>
                    <p id="countHeart">
                        <img
                            src="/png/whiteheart.png"
                            alt="Like"
                            onClick={likePost}
                            style={{ cursor: 'pointer' }}
                        />
                        <span id="likeCount">{post.likes}</span>
                    </p>
                </div>

                <h2 id="postTitleDetail">{post.title}</h2>
                <p id="postContentDetail">{post.content}</p>
                <hr />
            </div>

            {showMenu && (
                <BoardMenu
                    onClose={closeMenu}
                    deletePost={deletePost}  // deletePost 함수 전달
                    editPost={editPost}      // editPost 함수 전달
                />
            )}
        </div>
    );
}

export default PostDetail;
