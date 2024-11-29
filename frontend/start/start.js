import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const navigate = useNavigate();
    useEffect(() => {
        // 2초 후 메인 페이지로 이동
        const timer = setTimeout(() => {
            navigate('/'); // 메인 페이지로 이동
        }, 2000);

        // 컴포넌트가 언마운트되면 타이머 클리어
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fir">
            <h1>TRAVEL KIT</h1>
            <img src="/png/biglogo.png" alt="biglogo" className="biglogo"/>
        </div>
    );
}

export default StartPage;