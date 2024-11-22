import React, { useEffect, useState } from "react";
import './List.css'; // Import the CSS file
//import { useHistory } from "react-router-dom"; // 페이지 이동을 위한 useHistory 훅 사용

const Calen = () => {
  const [checklistData, setChecklistData] = useState([]);
  //const history = useHistory();

  // 백엔드에서 데이터를 가져오는 함수
  useEffect(() => {
    // 여기서 백엔드 API 호출 예시 (예: GET 요청)
    // fetch('https://your-backend-api.com/checklist')
    //   .then(response => response.json())
    //   .then(data => setChecklistData(data))
    //   .catch(error => console.error('Error fetching data:', error));

    // 테스트 데이터를 하드코딩
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

  // 새로운 체크리스트 페이지로 이동
  const handleAddChecklist = () => {
   // history.push("/select1"); // + 버튼 클릭 시 다른 페이지로 이동
  };

  return (
    <div>
      <header>
      <img src="back.png" alt="back"  class="back" onclick="location.href='back.html'"/>
        <img src="logo.png" alt="logo" className="logo" />
        <h1>TRAVEL KIT</h1>
        
        <img src="menu.png" alt="menu" class="menu" onclick="location.href='menu.html'"/>
    
      </header>

      <form>
        <h2>나의 체크리스트</h2>

        <div className="checklist-container">
          {checklistData.map((item, index) => (
            <div key={index} className="checklist-card">
              <p>{item.country} - {item.city}</p>
              <span>{item.departureDate} ~ {item.arrivalDate}</span>
            </div>
          ))}

          {/* + 버튼은 다른 페이지로 이동 */}
          <div className="add-checklist-card" onClick={handleAddChecklist}>
            <span>+</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Calen;
