import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Menu1({ onClose }) {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromCookie = Cookies.get("userId");
        setUserId(userIdFromCookie);
    }, []);
    const goBack = () => {
            navigate(-1);  // -1은 이전 페이지를 의미
    };
    const handleLogout = async () => {
        try {
            // 로그아웃 API 호출
            await axios.post("http://13.124.145.176:8080/logout");
            document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            localStorage.removeItem("userId"); // userId 삭제
            console.log(localStorage.getItem("userId")); // null
            navigate('/')
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
        }
    };
    return (
        <div>
            <div>
                <header>
                    <img src="/png/logo.png" alt="logo" className = "logo"/>
                    <h1>TRAVEL KIT</h1>
                    <img
                        src="/png/delete.png"
                        alt="close menu"
                        onClick={goBack}
                        className = "delete"
                    />
                </header>
                <h3>
                    <a href="/mychecklist">나의 체크리스트</a>
                    <br/>
                    <br/>
                    <a href="/board">게시판</a>
                    <br/>
                    <br/>
                    <a onClick = {handleLogout}>로그아웃</a>
                    <br/>
                    <br/>
                </h3>
            </div>
        </div>
    );
}

export default Menu1;
