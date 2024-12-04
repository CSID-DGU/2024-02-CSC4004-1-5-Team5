import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './board.css';

function EditPost() {
    const { boardName, postId } = useParams();  // URL에서 boardName과 postId를 가져옴
    const [title, setTitle] = useState('');  // 제목 상태
    const [content, setContent] = useState('');  // 본문 상태
    const navigate = useNavigate();

   const updatedPostData = {
       title: title.trim(),
       content: content.trim(),
       //member: { id: memberId },  // 쿠키에서 가져온 memberId를 포함
   };

    // 게시글 데이터 불러오기
    useEffect(() => {
        fetch(`/posts/${postId}`)  // 서버에서 해당 게시글 가져오기
            .then((response) => response.json())
            .then((data) => {
                // 게시글이 존재하면 상태에 데이터를 세팅
                setTitle(data.title);
                setContent(data.content);
            })
            .catch((error) => {
                console.error('게시글 불러오기 오류:', error);
                alert('게시글을 불러오는 데 실패했습니다.');
            });
    }, [postId]);  // postId가 변경되면 다시 실행

    // 게시글 수정 함수
    const updatePost = () => {
        // 제목과 본문 유효성 검사
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        } else if (!content.trim()) {
            alert('본문을 입력해주세요.');
            return;
        }


        // 서버에 수정된 게시글 전송
        fetch(`/posts/${postId}`, {  // 게시글 수정 요청 (PUT)
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPostData),
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        navigate(`/posts/${postId}`);
                        alert('게시글이 수정되었습니다.');
                    });
                } else {
                    alert('게시글 수정에 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('게시글 수정 오류:', error);
                alert('게시글 수정 중 오류가 발생했습니다.');
            });
    };

    return (
        <div className="board_overlay">
            <header id="titleContainer"  className="createEdit">
                <img
                    src="/png/back.png"
                    alt="back"
                    className="back"
                    onClick={() => navigate(`/board`)}
                />
                <h1>게시글 수정</h1>
            </header>

            <div id="formContainer">
                <input
                    type="text"
                    id="titleEdit"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    required
                />
                <hr />
                <textarea
                    id="contentEdit"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요"
                    required
                ></textarea>
                <div>
                    <button onClick={updatePost}>수정 완료</button>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
