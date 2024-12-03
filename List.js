import React, { useEffect, useState } from "react";
import './List.css'; // Import the CSS file

const List = () => { // 컴포넌트 이름을 `List`로 수정 (파일명과 일치)
  const [checklistData, setChecklistData] = useState([]);

  // 데이터 가져오기 (예제에서는 하드코딩된 데이터 사용)
  useEffect(() => {
    const fetchedData = [
      {
        country: "러시아",
        city: "모스크바",
        departureDate: "2022.10.16",
        arrivalDate: "2022.10.24",
      },
      {
        country: "체코",
        city: "프라하",
        departureDate: "2023.10.16",
        arrivalDate: "2023.10.21",
      },
      {
        country: "스위스",
        city: "취리히",
        departureDate: "2023.10.21",
        arrivalDate: "2023.10.25",
      },
    ];

    setChecklistData(fetchedData); // 받아온 데이터로 상태 업데이트
  }, []);

  // 새로운 체크리스트 추가 페이지로 이동
  const handleAddChecklist = () => {
    window.location.href = 'select1.html'; // 페이지 이동
  };

  return (
    <div className="list-body"> {/* body 태그 대신 list-body 클래스 적용 */}
      <header className="list-header">
        <img
          src="back.png"
          alt="back"
          className="back"
          onClick={() => (window.location.href = 'back.html')}
        />
        <img
          src="logo.png"
          alt="logo"
          className="list-logo"
        />
        <h1>TRAVEL KIT</h1> {/* TRAVEL KIT 텍스트 스타일링은 CSS에서 처리 */}
        <img
          src="menu.png"
          alt="menu"
          className="menu"
          onClick={() => (window.location.href = 'menu.html')}
        />
      </header>

      <form className="list-form">
        <h2>나의 체크리스트</h2>

        <div className="checklist-container">
          {checklistData.map((item, index) => (
            <div key={index} className="checklist-card">
              <p>{item.country} - {item.city}</p>
              <span>{item.departureDate} ~ {item.arrivalDate}</span>
            </div>
          ))}

          {/* + 버튼 */}
          <div className="add-checklist-card" onClick={handleAddChecklist}>
            <span>+</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default List;
