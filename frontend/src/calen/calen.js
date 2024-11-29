//Calen.js
import React, {useEffect, useState} from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./calen.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";


const CalenPage = () => {
    const location = useLocation();
    const [departureDate, setDepartureDate] = useState(null); // 출발 날짜
    const [arrivalDate, setArrivalDate] = useState(null);     // 도착 날짜
    const { selectCity, selectCountry } = location.state || {};
    const [showButton, setShowButton] = useState(false);
    const [memberId, setMemberId] = useState(null);// 로그인된 사용자 ID (고정값 또는 상태에서 가져오기)
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromCookie = Cookies.get("userId");
        setMemberId(userIdFromCookie);
    }, []);

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

    const handleCreateChecklist = async () => {
        console.log(departureDate)
        console.log(arrivalDate)
        console.log(selectCity)
        console.log(selectCountry)
        if (departureDate && arrivalDate && selectCity && selectCountry) {
            const requestData = {
                member: {
                    id: memberId,
                },
                destination: {
                    country: selectCountry,
                    city: selectCity,
                },
                departureDate: departureDate.toISOString().split("T")[0],
                arrivalDate: arrivalDate.toISOString().split("T")[0],
            };

            try {
                const response = await axios.post('/checklists/create', requestData);
                alert(`체크리스트가 성공적으로 생성되었습니다.`);
                navigate('/mychecklist')
            } catch (error) {
                console.error('Error creating checklist:', error);
                alert('체크리스트 생성에 실패했습니다. 다시 시도해주세요.');
            }
        } else {
            alert('Please select both a departure and arrival date and a destination.');
        }
    };

    return (
        <>
            {/* Header를 calen-container 바깥에 위치 */}
            {/* <header>

        <h1>새로운 체크리스트</h1>

      </header> */}

            <header className = "calen-header" style={{ display: "table", width: "100%" }}>
  <span style={{ display: "table-cell", textAlign: "left", width: "10%" }}>
    <img
        src="/png/back.png"
        alt="Back"
        onClick={() => (window.location.href = "/back")}
        style={{ width: "19.17px", height: "20px", cursor: "pointer" }}
    />
  </span>
                <h1 style={{ display: "table-cell", textAlign: "center", fontSize: "21px", fontWeight: "800", color: "#414141" }}>
                    새로운 체크리스트
                </h1>
                <span style={{ display: "table-cell", textAlign: "right", width: "10%" }}>
    <img
        src="/png/delete.png"
        alt="Delete"
        onClick={() => (window.location.href = "/delete")}
        style={{ width: "19.17px", height: "20px", cursor: "pointer" }}
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
                                onClick={handleCreateChecklist}
                            >
                                체크리스트 생성
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

export default CalenPage;