import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../style.css";

function Menu1({ onClose }) {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // 브라우저 쿠키에서 userId 읽기
        const userIdFromCookie = Cookies.get("userId");
        setUserId(userIdFromCookie); // 로그인된 사용자 아이디 설정
    }, []);
    return (
        <div className="menu-overlay">
            <div className="menu-container">
                <header className="menu-header">
                    <img src="/png/logo.png" alt="logo" className="logo" />
                    <h1>TRAVEL KIT</h1>
                    <img
                        src="/png/delete.png"
                        alt="close menu"
                        className="delete-icon"
                        onClick={onClose}
                    />
                </header>
                {userId ? (
                    <p>환영합니다, {userId}님!</p>
                ) : (
                    <p>로그인이 필요합니다.</p>
                )}
                <nav>
                    <h3>
                        <a href="#">나의 체크리스트</a>
                        <br />
                        <br />
                        <a href="#">게시판</a>
                        <br />
                        <br />
                        <a href="#">마이페이지</a>
                        <br />
                        <br />
                        <a href="#">로그아웃</a>
                        <br />
                        <br />
                    </h3>
                </nav>
            </div>
        </div>
    );
}
export default Menu1;
