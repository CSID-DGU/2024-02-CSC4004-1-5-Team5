import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./Calen.css";

const Calen = () => {
  const [departureDate, setDepartureDate] = useState(null); // 출발 날짜
  const [arrivalDate, setArrivalDate] = useState(null);     // 도착 날짜
  const [showButton, setShowButton] = useState(false);

  const handleDateChange = (dates) => {
    // 날짜 배열을 확인하여 출발 날짜와 도착 날짜를 저장
    if (dates.length === 2) {
      setDepartureDate(dates[0]);
      setArrivalDate(dates[1]);
      setShowButton(true); // 두 날짜가 선택되면 버튼 표시
    } else {
      setDepartureDate(null);
      setArrivalDate(null);
      setShowButton(false); // 두 날짜가 없으면 버튼 숨김
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault(); // 새로고침 방지
    console.log("출발 날짜:", departureDate);
    console.log("도착 날짜:", arrivalDate);
    window.location.href = "list3.html"; // 원하는 페이지로 이동
  };
  

  return (
    <div className="calen-container">
      <header>
        <h1>새로운 체크리스트</h1>
      </header>
      <form>
        <h2>출발날짜와 도착날짜를 선택하세요.</h2>
        <div className="calendar">
          <Flatpickr
            options={{
              mode: "range",
              inline: true,
              dateFormat: "Y.m.d",
            }}
            onChange={handleDateChange}
          />
        </div>
        {showButton && (
          <div className="button-container">
            <button
              type="button"
              className="create-checklist-button"
              onClick={handleButtonClick}
            >
              체크리스트 생성
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Calen;
