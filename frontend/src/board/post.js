import React, { useState, useEffect } from 'react';
import './post.css';
import { useNavigate, useParams } from 'react-router-dom';

function PostDetail() {
    const { postId } = useParams();  // URL에서 postId를 가져옴
    const navigate = useNavigate();
    
    const [post, setPost] = useState(null);  // 게시글 상태
    const [comment, setComment] = useState('');  // 댓글 상태
    const [comments, setComments] = useState([]);  // 댓글 목록 상태
    
    // 게시글 데이터 불러오기
    useEffect(() => {
        console.log(`Fetching post with ID: ${postId}`);  // 게시글 ID를 콘솔에 출력

        // 게시글 API 요청
        fetch(`/posts/${postId}`)
            .then(response => response.json())
            .then(postData => {
                setPost(postData);
                // 댓글 관련 코드가 아직 구현되지 않았으므로 주석 처리
                // setComments(postData.comments || []);
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
        navigate(`/posts/${postId}`);  // 게시글 수정 페이지로 이동
    };

    if (!post) {
        return <div>게시글을 불러오는 중...</div>;
    }

    return (
        <div>
            <header>
                <img src="/png/back.png" alt="back" className="back" onClick={() => navigate('/board')} />
                <h1>게시글</h1>
                <img
                    src="/png/menu.png"
                    alt="menuicon"
                    className="menu"
                    onClick={() => navigate('/menu1')} // 메뉴 페이지로 이동
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
                
                {/* 댓글 관련 코드가 아직 구현되지 않았으므로 주석 처리 */}
                {/* <ul id="commentList">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <li key={index}>
                            {comment}
                            <hr />
                            </li>
                        ))
                    ) : (
                        <li>댓글이 없습니다.</li>
                    )}
                </ul> */}

                {/* 댓글 추가 부분 주석 처리 */}
                {/* <div className="searchContainer">
                    <textarea
                        id="commentInput"
                        placeholder="댓글을 입력하세요"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <img id="comment-btn" src="png/Send.png" onClick={addComment}></img>
                </div> */}

                <button onClick={deletePost}>게시글 삭제</button>
                <button onClick={editPost}>게시글 수정</button>
            </div>
        </div>
    );
}

export default PostDetail;
