import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../style.css";

function Menu1({ onClose }) {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userIdFromCookie = Cookies.get("userId");
        setUserId(userIdFromCookie);
    }, []);

    return (
        <div>
            <div>
                <header>
                    <img src="/png/logo.png" alt="logo" className = "logo"/>
                    <h1>TRAVEL KIT</h1>
                    <img
                        src="/png/delete.png"
                        alt="close menu"
                        onClick={onClose}
                        className = "delete"
                    />
                </header>
                {userId ? (
                    <p>환영합니다, {userId}님!</p>
                ) : (
                    <p>로그인이 필요합니다.</p>
                )}
                <h3>
                    <a href="/mychecklist">나의 체크리스트</a>
                    <br/>
                    <br/>
                    <a href="/board">게시판</a>
                    <br/>
                    <br/>
                    <a href="/mypage">마이페이지</a>
                    <br/>
                    <br/>
                    <a href="#">로그아웃</a>
                    <br/>
                    <br/>
                </h3>
            </div>
        </div>
    );
}

export default Menu1;
