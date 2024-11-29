import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../style.css";
import { cityToCountry, cityToImageFile, cityToKorean } from '../convert'; // Adjust the path if needed

function MainPage() {
    const navigate = useNavigate();
    const [checklists, setChecklists] = useState([]); // 체크리스트 정보 상태
    const limitedChecklists = checklists.slice(-3);
    const [userId, setUserId] = useState(null);
    const popularPosts = [
        { id: 1, title: "첫 번째 인기 게시물" },
        { id: 2, title: "두 번째 인기 게시물" },
        { id: 3, title: "세 번째 인기 게시물" },
        { id: 4, title: "네 번째 인기 게시물" },
        { id: 5, title: "다섯 번째 인기 게시물" },
    ];

    const handleMenuClick = () => {
        const userId = Cookies.get("userId");
        if (userId) {
            navigate("/menu1");
        } else {
            navigate("/menu2");
        }
    };

    useEffect(() => {
        // 쿠키에서 userId 가져오기
        const userIdFromCookie = Cookies.get("userId");
        if (userIdFromCookie) {
            setUserId(userIdFromCookie);

            // API 요청 보내기
            axios
                .get(`/members/${userIdFromCookie}`)
                .then((response) => {
                    if (response.data && response.data.checklists) {
                        setChecklists(response.data.checklists);
                    }
                })
                .catch((err) => {
                    console.error("서버와 통신 중 문제가 발생했습니다.", err);
                });
        }
    }, []);

    return (
        <div>
            {/* 헤더 섹션 */}
            <header>
                <div className="header-content">
                    <img src="/png/logo.png" alt="logo" className="logo" />
                    <h1>TRAVEL KIT</h1>
                    <img
                        src="/png/menu.png"
                        alt="menu"
                        className="menu"
                        onClick={handleMenuClick}
                    />
                </div>
            </header>

            {/* 광고 이미지 */}
            <img src="/png/adv.png" alt="advertisement" className="adv" />

            {/* 최근 체크리스트 섹션 */}
            <div className="main">
                <h2 className="checklist-title">최근에 등록한 체크리스트</h2>
                <p className="more">
                    <a href="#">더보기+</a>
                </p>
            </div>

            {/* 체크리스트 섹션 */}
            <div className="checklist-section">
                {limitedChecklists.map((checklist, index) => {
                    const city = checklist.destination.city; // Get city name
                    const country = cityToCountry(city); // Get corresponding country
                    const flagImage = cityToImageFile(city); // Get country flag image
                    const koreanCity = cityToKorean(city); // Convert city to Korean
                    return (
                        <div key={index} className="checklist-list">
                            <img
                                src={`/png/${flagImage}`} // Display the country flag dynamically
                                alt={country}
                                className="country-flag"
                            />
                            <p>{koreanCity}</p> {/* Display city name in Korean */}
                        </div>
                    );
                })}
                <div className="checklist-list add-checklist">
                    <a href="#checklist-create" className="add-button">
                        +
                    </a>
                </div>
            </div>

            {/* 인기 게시물 섹션 */}
            <div className="post-section">
                <div className="section-header">
                    <h2 className="section-title">인기 게시물</h2>
                    <p className="more2">
                        <a href="#">더보기+</a>
                    </p>
                </div>
                <ul id="popular-posts" className="post-list">
                    {popularPosts.map((post) => (
                        <li key={post.id} className="post-item">
                            <a href="#">
                                {post.id}. {post.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MainPage;
