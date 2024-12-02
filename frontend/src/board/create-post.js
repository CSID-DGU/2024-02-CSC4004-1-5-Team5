import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";

function PostCreate() {
    const { boardName } = useParams();  // URL에서 boardName을 가져옴
    const [title, setTitle] = useState('');  // 제목 상태
    const [content, setContent] = useState('');  // 본문 상태
    const navigate = useNavigate();

    // 쿠키에서 memberId 가져오기
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    // 제목과 본문 유효성 검사 후 게시글 추가 함수
    const addPost = () => {
        // 제목과 본문 유효성 검사
        if (!title.trim()) {
            alert('제목이 없습니다. 제목을 입력해주세요.');
            return;
        } else if (!content.trim()) {
            alert('본문이 없습니다. 본문 내용을 입력해주세요.');
            return;
        }

        // 쿠키에서 memberId 가져오기
        const memberId = Cookies.get("userId");;
        if (!memberId) {
            alert('로그인이 필요합니다.');
            return;
        }

        // 게시글 데이터 생성
        const postData = {
            title: title.trim(),
            content: content.trim(),
            member: { id: memberId },  // 쿠키에서 가져온 memberId를 포함
            createdAt: new Date().toISOString(),
        };

        // 서버에 게시글 데이터 전송
        fetch(`/posts/new`, {  // 백엔드 API에 맞게 URL 수정
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        })
            .then((response) => {
                if (response.ok) {
                    // 게시글 추가 성공 시
                    response.json().then((data) => {
                        alert('게시글이 성공적으로 추가되었습니다.');
                        navigate(`/board/`); // 게시판으로 돌아가기
                    });
                } else {
                    alert('게시글 추가에 실패했습니다. 다시 시도해주세요.');
                }
            })
            .catch((error) => {
                console.error('게시글 추가 오류:', error);
                alert('게시글 추가 중 오류가 발생했습니다.');
            });
    };

    // 게시글 작성 폼
    return (
        <div>
            <header class="post-header">
                <img 
                    src="/png/back.png" 
                    alt="back" 
                    className="back" 
                    onClick={() => navigate(`/board/${boardName}`)} 
                />
                <h1>게시글 작성</h1>
            </header>

            <div id="formContainer">
                <input
                    type="text"
                    id="titleCreate"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    required
                />
                <hr />
                <textarea
                    id="contentCreate"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요"
                    required
                ></textarea>
                <div>
                    <button onClick={addPost}>등록하기</button>
                </div>
            </div>
        </div>
    );
}

export default PostCreate;
