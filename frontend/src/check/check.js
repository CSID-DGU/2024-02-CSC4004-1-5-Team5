import React, {useEffect, useState} from "react";
import "./check.css";
import axios from "axios";


const CheckList = ({ checklistId }) => {
    const [error, setError] = useState("");
    const [items, setItems] = useState([]);
    const [checklistInfo, setChecklistInfo] = useState(null);
    const [showInput, setShowInput] = useState(false); // 입력 칸 표시 여부
    const [newItem, setNewItem] = useState(""); // 새 준비물 값
    const [recommendations, setRecommendations] = useState(null); // 추천 결과 상태
    const [showRecommendations, setShowRecommendations] = useState(false); // 추천 결과 표시 여부

    // API 호출로 체크리스트 데이터 가져오기
    useEffect(() => {
        const fetchChecklist = async () => {
            try {
                const response = await axios.get(
                    `/checklists/${checklistId}`
                );
                const apiData = response.data;
                // 체크리스트의 items를 상태에 저장
                console.log(apiData.checklistItems)
                setItems(apiData.checklistItems.map((item) => ({
                    id: item.id, // 아이템 ID 저장
                    name: item.name, // 아이템 이름 저장
                    ischecked: item.ischecked || false // 체크 여부도 저장
                })));

                setChecklistInfo({
                    city: apiData.destination.city,
                    departureDate: apiData.departureDate,
                    arrivalDate: apiData.arrivalDate,
                });
            } catch (err) {
                setError("체크리스트를 불러오는 데 실패했습니다.");
            }
        };
        fetchChecklist();
    }, [checklistId]);

    // 체크박스 상태 변경 및 API 요청
    const handleCheckboxChange = async (id) => {
        try {
            // API 요청: 해당 ID의 isChecked 상태 반전
            await axios.post(`/checklists/items/${id}/toggle`);
            // 로컬 상태 업데이트
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, ischecked: !item.ischecked } : item
                )
            );
        } catch (error) {
            console.error("체크박스 상태 변경 중 오류가 발생했습니다.", error);
            alert("상태 변경에 실패했습니다.");
        }
    };

    // 로딩 상태
    if (!checklistInfo && !error) {
        return <div className="loading">로딩 중...</div>;
    }

    // 에러 상태
    if (error) {
        return <div className="error">{error}</div>;
    }

    // 아이템 추가
    const handleAddItem = async () => {
        if (newItem.trim() === "") {
            alert("준비물을 입력하세요!");
            return;
        }

        try {
            await axios.post(`/checklists/${checklistId}/items/add`, {
                name: newItem,
            });
            // 준비물 리스트 업데이트
            setItems((prevItems) => [...prevItems, newItem]);
            setNewItem("");
            setShowInput(false);
            alert("준비물이 추가되었습니다!");
        } catch (err) {
            alert("준비물 추가에 실패했습니다.");
        }
    };

    // 아이템 삭제
    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`/checklists/items/${id}`);
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            alert("준비물이 삭제되었습니다!");
        } catch (error) {
            console.error("준비물 삭제 중 오류가 발생했습니다.", error);
            alert("준비물 삭제에 실패했습니다.");
        }
    };

    const handleAddRecommendItem = async (item) => {
        try {
            await axios.post(`/checklists/${checklistId}/items/add`, {
                name: item,
            });
            alert("준비물이 추가되었습니다!");
        } catch (err) {
            alert("준비물 추가에 실패했습니다.");
        }
    };

    // 추천 준비물 요청
    const handleRecommend = async () => {
        try {
            setShowRecommendations(true); // 서브 페이지 띄움
            const response = await axios.post(`/recommend/${checklistId}`);
            setRecommendations(response.data); // 추천 데이터 저장
        } catch (error) {
            console.error("추천 준비물 요청 실패:", error);
            setError("추천 준비물을 불러오는 데 실패했습니다.");
        }
    };

    return (
        <div className="Check_container">
            <header className = "check-header">
                <h1>{checklistInfo.city}</h1>
                <p>{checklistInfo.departureDate} - {checklistInfo.arrivalDate}</p>
                <div className="weather">
                    <div className="day">
                        <p>10/16</p>
                        <img src="sunny.png" alt="Sunny" />
                        <p>8°</p>
                    </div>
                    <div className="day">
                        <p>10/17</p>
                        <img src="sunny.png" alt="Sunny" />
                        <p>9°</p>
                    </div>
                    <div className="day">
                        <p>10/18</p>
                        <img src="cloudy.png" alt="Cloudy" />
                        <p>9°</p>
                    </div>
                    <div className="day">
                        <p>10/19</p>
                        <img src="rain.png" alt="Rain" />
                        <p>10°</p>
                    </div>
                </div>
            </header>
            <div className="checklist">
                <h2>체크리스트</h2>
                <button className="recommend-button" onClick={handleRecommend}>
                    준비물 추천
                </button>
                <ul>
                    {items.map((item, index) => (
                        <li key={item.id} className="checklist-item">
                            <input type="checkbox" checked={item.ischecked}
                                   onChange={() => handleCheckboxChange(item.id)}/>
                            <label htmlFor={`item-${index}`}>{item.name}</label>
                            <button className="delete-item"
                                    onClick={() => handleDeleteItem(item.id)}>
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
                {/* 추가 버튼 */}
                <button
                    className="add-item"
                    onClick={() => setShowInput((prev) => !prev)}
                >
                    + 추가
                </button>
                {/* 입력 칸 및 확인 버튼 */}
                {showInput && (
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="준비물을 입력하세요"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                        />
                        <button onClick={handleAddItem}>확인</button>
                    </div>
                )}
            </div>
            {/* 추천 결과 표시 */}
            {showRecommendations && (
                <div className="recommendations-modal">
                    <h2>추천 준비물</h2>
                    {recommendations ? (
                        <ul>
                            {Object.entries(recommendations).map(([item, score]) => (
                                <li key={item}  className="recommendation-item">
                                    <span>{item} : {score.toFixed(2)}</span>
                                    <button
                                        className="add-item"
                                        onClick={() => handleAddRecommendItem(item)}
                                    >
                                        + 추가
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>로딩 중...</p>
                    )}
                    <button onClick={() => setShowRecommendations(false)}>닫기</button>
                </div>
            )}
        </div>
    );
};

export default CheckList;
