import React, { useState } from 'react';
import '../login/login.css';
import {useNavigate} from 'react-router-dom';

function Signup() {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!id || !username || !email || !password || !confirmPassword) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch(`http://13.124.145.176:8080/members/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: username,
          password: password,
          email: email
        }),
      });

      if (response.ok) {
        setSuccessMessage('회원가입이 성공적으로 완료되었습니다.');
        navigate("/login")
      } else {
        setErrorMessage('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
      <div>
        <header>
          <img src="/png/logo.png" alt="logo" className="logo" />
          <h1>TRAVEL KIT</h1>
        </header>

        <form name="signupForm" method="post" onSubmit={handleSignup}>
          <h2>회원가입</h2>
          <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
          /><br/>
          <input
              type="text"
              placeholder="이름"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          /><br/>
          <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          /><br/>
          <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          /><br/>
          <input type="submit" value="회원가입"/>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
        </form>
      </div>
  );
}

export default Signup;