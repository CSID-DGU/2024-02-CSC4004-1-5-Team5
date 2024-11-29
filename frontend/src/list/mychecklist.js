import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./list.css";

const CheckList = () => {
    const [checklists, setChecklists] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChecklists = async () => {
            const userId = Cookies.get("userId");
            if (!userId) {
                setError("로그인이 필요합니다.");
                return;
            }

            try {
                const response = await axios.get(`/members/${userId}`);
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
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <header>
                <img src="/png/logo.png" alt="logo" className="logo" />
                <h1>TRAVEL KIT</h1>
            </header>
            <main>
                <h2>나의 체크리스트</h2>
                <div className="checklist-container">
                    {checklists.map((checklist) => (
                        <div
                            key={checklist.id}
                            className="checklist-card"
                            style={{
                                backgroundImage: `url(${checklist.image || "/default-image.jpg"})`,
                            }}
                            onClick={() => (window.location.href = `/checklist/${checklist.id}`)}
                        >
                            <p>{`${checklist.destination.city}, ${checklist.destination.country}`}</p>
                            <span>{`${checklist.departureDate} ~ ${checklist.arrivalDate}`}</span>
                        </div>
                    ))}
                    <div className="add-checklist-card" onClick={() => (window.location.href = "/select")}>
                        <span>+</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckList;
