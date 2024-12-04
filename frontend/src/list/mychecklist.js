import React, { useEffect, useState } from "react";
import axios from "axios";
import "./list.css";
import { useNavigate } from "react-router-dom";

const CheckList = () => {
    const [checklists, setChecklists] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChecklists = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                setError("로그인이 필요합니다.");
                return;
            }

            try {
                const response = await axios.get(`http://13.124.145.176:8080/members/${userId}`);
                const memberData = response.data;

                if (memberData && memberData.checklists) {
                    setChecklists(memberData.checklists);
                } else {
                    setError("체크리스트가 없습니다.");
                }
            } catch (err) {
                setError("체크리스트를 가져오는 데 실패했습니다.");
            }
        };

        fetchChecklists();
    }, []);

    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div className="error">
                    {error}
                </div>
            </div>
        );
        
    }
    const goBack = () => {
        navigate(-1);  // -1은 이전 페이지를 의미
    };
    return (
         <div className="List_container">
              <header className="list-header">
                <img src="/png/logo.png" alt="logo" className="list-logo" />
                <h1>TRAVEL KIT</h1>
              </header>

              <form className="list-form">
                <h2>나의 체크리스트</h2>

                <div className="checklist-container">
                  {checklists.map((checklist, index) => (
                    <div key={index} className="checklist-card" onClick={() => (window.location.href = `/checklist/${checklist.id}`)}>
                      <p>{checklist.destination.country} - {checklist.destination.city}</p>
                      <span>{checklist.departureDate} ~ {checklist.arrivalDate}</span>
                    </div>
                  ))}

                  {/* + 버튼은 다른 페이지로 이동 */}
                  <div className="add-checklist-card" onClick={() => (window.location.href = "/select")}>
                    <span>+</span>
                  </div>
                </div>
              </form>
         </div>
    );
};

export default CheckList;
