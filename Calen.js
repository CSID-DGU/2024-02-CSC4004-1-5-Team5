import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./Calen.css";

const Calen = () => {
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const handleDateChange = (dates) => {
    if (dates.length === 2) {
      setDepartureDate(dates[0]);
      setArrivalDate(dates[1]);
      setShowButton(true);
    } else {
      setDepartureDate(null);
      setArrivalDate(null);
      setShowButton(false);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log("출발 날짜:", departureDate);
    console.log("도착 날짜:", arrivalDate);
    window.location.href = "list3.html";
  };

  return (
    <div className="calen-body">
      <header className="calen-header">
        <span className="calen-header-left">
          <img
            src="back.png"
            alt="Back"
            onClick={() => (window.location.href = "/back")}
            className="calen-header-icon"
          />
        </span>
        <h1 className="calen-header-title">새로운 체크리스트</h1>
        <span className="calen-header-right">
          <img
            src="delete.png"
            alt="Delete"
            onClick={() => (window.location.href = "/delete")}
            className="calen-header-icon"
          />
        </span>
      </header>
      <div className="calen-container">
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
    </div>
  );
};

export default Calen;
