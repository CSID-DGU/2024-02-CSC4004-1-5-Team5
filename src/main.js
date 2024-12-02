import React from "react";
import "./App.css";
import logo from "./png/logo.png";
import adv from "./png/adv.png";
import menu from "./png/menu.png";
import japan from "./png/japan.png"; // 일본 국기 이미지 경로

function App() {
  const handleMenuClick = () => {
    window.location.href = "menu2.html";
  };

  const popularPosts = [
    { id: 1, title: "첫 번째 인기 게시물" },
    { id: 2, title: "두 번째 인기 게시물" },
    { id: 3, title: "세 번째 인기 게시물" },
    { id: 4, title: "네 번째 인기 게시물" },
    { id: 5, title: "다섯 번째 인기 게시물" },
  ];

  const userChecklist = [
    { country: "일본", city: "도쿄" },
    { country: "일본", city: "오사카" },
    { country: "일본", city: "오사카" },
    { country: "일본", city: "오사카" },
    { country: "일본", city: "오사카" },
    { country: "일본", city: "오사카" },
  ];

  return (
    <div>
      {/* 헤더 섹션 */}
      <header>
        <div className="header-content">
          <img src={logo} alt="logo" className="logo" />
          <h1>TRAVEL KIT</h1>
          <img src={menu} alt="menu" className="menu" onClick={handleMenuClick} />
        </div>
      </header>

      {/* 광고 이미지 */}
      <img src={adv} alt="advertisement" className="adv" />

      {/* 최근 체크리스트 섹션 */}
      <div className="main">
        <h2 className="checklist-title">최근에 등록한 체크리스트</h2>
        <p className="more">
          <a href="#">더보기+</a>
        </p>
      </div>

      {/* 체크리스트 섹션 */}
      <div className="checklist-section">
        {userChecklist.map((checklist, index) => (
          <div key={index} className="checklist-item">
            <img src={japan} alt="Japan" className="country-flag" />
            <p>{checklist.city}</p>
          </div>
        ))}
        <div className="checklist-item add-checklist">
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
              <a href="#"> {post.id}. {post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
