import React, { useState, useEffect } from 'react';
import './post.css';
import { useNavigate, useParams } from 'react-router-dom';
import BoardMenu from './board-menu';  // BoardMenu 컴포넌트 import

function PostDetail() {
    const { postId } = useParams();
    const navigate = useNavigate();
    
    const [post, setPost] = useState(null);
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
    const [showMenu, setShowMenu] = useState(false); // 메뉴 표시 여부 상태 추가

    useEffect(() => {
        fetch(`/posts/${postId}`)
            .then(response => response.json())
            .then(postData => {
                console.log('게시글 데이터:', postData);
                setPost(postData);
            })
            .catch(error => {
                console.error('게시글 불러오기 실패', error);
            });
    }, [postId]);

    const likePost = () => {
        fetch(`/posts/${postId}/like`, { method: 'POST' })
            .then(response => response.ok ? response.json() : Promise.reject('좋아요 처리 실패'))
            .then(updatedPost => {
                setPost(updatedPost);
            })
            .catch(error => {
                console.error('좋아요 요청 실패', error);
            });
    };

    const handleMenuClick = () => {
        const userId = localStorage.getItem("userId");
        
        if (userId) {
            setShowMenu(true); // 로그인되었으면 메뉴 보이기
        } else {
            alert('로그인 후 게시글을 수정 및 작성할 수 있습니다.');
            setTimeout(() => {
                navigate("/login");  // 3초 후 로그인 페이지로 이동
            }, 3000);
        }
    };

    const closeMenu = () => {
        setShowMenu(false); // 메뉴 닫기
    };

    const deletePost = () => {
        const confirmation = window.confirm("정말로 게시글을 삭제하시겠습니까?"); // 확인/취소 팝업

        if (confirmation) {
            fetch(`/posts/${postId}`, { method: 'DELETE' })
                .then(() => {
                    navigate('/board');  // 게시판 목록으로 돌아감
                })
                .catch(error => {
                    console.error('게시글 삭제 실패', error);
                });
        } else {
            console.log("게시글 삭제가 취소되었습니다.");
        }
    };

    const editPost = () => {
        navigate(`/edit-post/${postId}`);  // 게시글 수정 페이지로 이동
    };

    if (!post) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>
                    게시글을 불러오는 중...
                </div>
            </div>
        );
    }

    return (
        <div className="board_overlay">
            <header id="titleContainer">
                <img src="/png/back.png" alt="back" className="back" onClick={() => window.history.back()} />
                <h1>게시글</h1>
                <img
                    src="/png/create.png"
                    alt="menuicon"
                    className="menu"
                    onClick={handleMenuClick} // 메뉴 아이콘 클릭 시 핸들러 호출
                />
            </header>
            {errorMessage && <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>} {/* 에러 메시지 표시 */}
            {showMenu && <BoardMenu onClose={closeMenu} onEdit={editPost} onDelete={deletePost} />} {/* 메뉴 보이기 */}
            <div id="postDetailContainer" style={{ display: showMenu ? 'none' : 'block' }}>
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
        </div>
    );
}

export default PostDetail;
