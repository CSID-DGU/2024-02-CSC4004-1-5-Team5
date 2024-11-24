import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate를 import
import '../login/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // useNavigate 훅을 사용하여 네비게이션 기능 가져오기

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId: username, password: password }),
        credentials: 'include'  // 쿠키를 포함하여 요청을 보냄
      });

      if (response.ok) {
        // 로그인 성공 시 memberId 쿠키를 설정
        const cookies = document.cookie.split('; ');
        const memberId = cookies.find(cookie => cookie.startsWith('memberId='));
        if (memberId) {
          console.log('로그인 성공, 쿠키:', memberId);
        }
        
        setSuccessMessage('로그인 성공');
        navigate(-1);  // 로그인 성공 후 이전 페이지로 돌아가기
      } else {
        setErrorMessage('잘못된 아이디 또는 비밀번호입니다.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('로그인 실패. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <header>
        <img src="/png/logo.png" alt="logo" className="logo" />
        <h1>TRAVEL KIT</h1>
      </header>

      <form name="fo" method="get" onSubmit={handleLogin}>
        <h2>로그인</h2>
        <input
          type="text"
          id="loginId"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <label className="left-align">
          <input type="checkbox" id="stay-logged-in" /> 로그인 상태 유지
        </label><br />
        <input type="submit" value="LOGIN" />
        <p id="error-message" style={{ color: 'red' }}>{errorMessage}</p>
        <p style={{ color: 'green' }}>{successMessage}</p>
        <p><Link to="/signup">회원가입</Link></p> {/* Link로 변경 */}
      </form>
    </div>
  );
}

export default Login;
