import React from "react";
import "./menu.css";
import { useNavigate } from "react-router-dom";

function Menu2({ onClose }) {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);  // -1은 이전 페이지를 의미
    };
    return (
        <div className="menubody">
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
                    <h3 className="menuh3">
                        <a href="/mychecklist">나의 체크리스트</a>
                        <br />
                        <a href="/board">게시판</a>
                        <br />
                        <a href="/login">로그인</a>
                    </h3>
            </div>
        </div>
    );
}

export default Menu2;