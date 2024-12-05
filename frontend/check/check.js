import React, {useEffect, useState} from "react";
import "./check.css";
import axios from "axios";
import { cityToKorean } from '../convert';

const CheckList = ({ checklistId }) => {
    const [error, setError] = useState("");
    const [items, setItems] = useState([]);
    const [checklistInfo, setChecklistInfo] = useState(null);
    const [showInput, setShowInput] = useState(false); // 입력 칸 표시 여부
    const [newItem, setNewItem] = useState(""); // 새 준비물 값
    const [recommendations, setRecommendations] = useState(null); // 추천 결과 상태
    const [showRecommendations, setShowRecommendations] = useState(false); // 추천 결과 표시 여부
    const [aiRecommendations, setAiRecommendations] = useState(null); // 추천 결과 상태
    const [showAiRecommendations, setShowAiRecommendations] = useState(false); // 추천 결과 표시 여부
    const [weatherData, setWeatherData] = useState([]); // 날씨 데이터


    // API 호출로 체크리스트 데이터 가져오기
    useEffect(() => {
        const fetchChecklist = async () => {
            try {
                const response = await axios.get(
                    `http://13.124.145.176:8080/checklists/${checklistId}`
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

         const fetchWeatherData = async () => {
            try {
                // `/weather/{checklistId}`로 데이터 요청
                const response = await axios.get(`http://13.124.145.176:8080/weather/${checklistId}`);
                setWeatherData(response.data); // 서버에서 받은 데이터를 상태로 저장
            } catch (error) {
                console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        fetchWeatherData();
    }, [checklistId]);

    // 체크박스 상태 변경 및 API 요청
    const handleCheckboxChange = async (id) => {
        try {
            // API 요청: 해당 ID의 isChecked 상태 반전
            await axios.post(`http://13.124.145.176:8080/checklists/items/${id}/toggle`);
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
            await axios.post(`http://13.124.145.176:8080/checklists/${checklistId}/items/add`, {
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
            await axios.delete(`http://13.124.145.176:8080/checklists/items/${id}`);
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            alert("준비물이 삭제되었습니다!");
        } catch (error) {
            console.error("준비물 삭제 중 오류가 발생했습니다.", error);
            alert("준비물 삭제에 실패했습니다.");
        }
    };

    const handleAddRecommendItem = async (item) => {
        try {
            await axios.post(`http://13.124.145.176:8080/checklists/${checklistId}/items/add`, {
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
            const response = await axios.post(`http://13.124.145.176:8080/recommend/${checklistId}`);
            setRecommendations(response.data); // 추천 데이터 저장
        } catch (error) {
            console.error("추천 준비물 요청 실패:", error);
            setError("추천 준비물을 불러오는 데 실패했습니다.");
        }
    };
     // openAi 기반 추천 준비물 요청
    const handleAiRecommend = async () => {
        try {
            setShowAiRecommendations(true); // 추천 준비물 모달 열기
            const response = await axios.post(`http://13.124.145.176:8080/recommend/openai/${checklistId}`);
            setAiRecommendations(response.data); // 추천 데이터 저장
        } catch (error) {
            console.error("추천 준비물 요청 실패:", error);
            setError("추천 준비물을 불러오는 데 실패했습니다.");
        }
    };

    // 날씨 상태에 따라 적절한 아이콘 경로 반환
    const getWeatherIcon = (mainWeather) => {
        switch (mainWeather.toLowerCase()) {
            case "clear":
                return "/png/sunny.png";
            case "clouds":
                return "/png/clouds.png";
            case "rain":
                return "/png/rain.png";
            case "snow":
                return "/png/snow.png";
            default:
                return "/icons/default.png";
        }
    };
    const koreanCity = cityToKorean(checklistInfo.city);
    return (
        <div className="container">
            <header className = "check-header">
                <h1>{koreanCity}</h1>
                <p>{checklistInfo.departureDate} - {checklistInfo.arrivalDate}</p>
                <div className="weather">
                    {weatherData.map((weather) => (
                        <div className="day" key={weather.id}>
                            <p>{new Date(weather.localDate).toLocaleDateString("ko-KR", {
                                month: "2-digit",
                                day: "2-digit"
                            })}</p>
                            <img
                                src={getWeatherIcon(weather.mainWeather)}
                                alt={weather.mainWeather}
                            />
                            <p>{weather.temp}°</p>
                        </div>
                    ))}
                </div>
            </header>
            <div className="checklist">
                <h2>체크리스트</h2>
                <button className="recommend-button" onClick={handleRecommend}>
                    유사도 준비물 추천
                </button>
                <button className="recommend-button" onClick={handleAiRecommend}>
                    OpenAi 준비물 추천
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
            {showAiRecommendations && (
                <div className="recommendations-modal">
                    <h2>추천 준비물</h2>
                    {aiRecommendations? (
                        <ul>
                            {aiRecommendations.map((item, index) => (
                                <li key={index} className="recommendation-item">
                                    <span>{item}</span>
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
                    <button onClick={() => setShowAiRecommendations(false)}>닫기</button>
                </div>
            )}
        </div>
    );
};

export default CheckList;
