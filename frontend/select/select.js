import React, { useState } from "react";
import "./Select.css";

const destinations = [
  { country: "Japan", city: "Tokyo", display: "도쿄, 일본" },
  { country: "Japan", city: "Osaka", display: "오사카, 일본" },
  { country: "Japan", city: "Kyoto", display: "교토, 일본" },
  { country: "Japan", city: "Sapporo", display: "삿포로, 일본" },
  { country: "Japan", city: "Fukuoka", display: "후쿠오카, 일본" },
  { country: "China", city: "Beijing", display: "베이징, 중국" },
  { country: "China", city: "Shanghai", display: "상하이, 중국" },
  { country: "China", city: "Guangzhou", display: "광저우, 중국" },
  { country: "China", city: "Shenzhen", display: "선전, 중국" },
  { country: "China", city: "Hangzhou", display: "항저우, 중국" },
  { country: "Taiwan", city: "Taipei", display: "타이베이, 대만" },
  { country: "Taiwan", city: "Taichung", display: "타이중, 대만" },
  { country: "Taiwan", city: "Kaohsiung", display: "가오슝, 대만" },
  { country: "Taiwan", city: "Tainan", display: "타이난, 대만" },
  { country: "Hong Kong", city: "Hong Kong", display: "홍콩, 홍콩" },

  { country: "Philippines", city: "Manila", display: "마닐라, 필리핀" },
  { country: "Philippines", city: "Cebu", display: "세부, 필리핀" },
  { country: "Philippines", city: "Boracay", display: "보라카이, 필리핀" },
  { country: "Philippines", city: "Palawan", display: "팔라완, 필리핀" },

  { country: "Indonesia", city: "Bali", display: "발리, 인도네시아" },
  { country: "Indonesia", city: "Jakarta", display: "자카르타, 인도네시아" },
  { country: "Indonesia", city: "Yogyakarta", display: "욕야카르타, 인도네시아" },
  { country: "Indonesia", city: "Bandung", display: "반둥, 인도네시아" },

  { country: "Thailand", city: "Bangkok", display: "방콕, 태국" },
  { country: "Thailand", city: "Chiang Mai", display: "치앙마이, 태국" },
  { country: "Thailand", city: "Phuket", display: "푸켓, 태국" },
  { country: "Thailand", city: "Pattaya", display: "파타야, 태국" },

  { country: "Vietnam", city: "Hanoi", display: "하노이, 베트남" },
  { country: "Vietnam", city: "Ho Chi Minh City", display: "호치민, 베트남" },
  { country: "Vietnam", city: "Da Nang", display: "다낭, 베트남" },
  { country: "Vietnam", city: "Ha Long Bay", display: "하롱베이, 베트남" },

  { country: "Singapore", city: "Singapore", display: "싱가포르, 싱가포르" },

  { country: "Malaysia", city: "Kuala Lumpur", display: "쿠알라룸푸르, 말레이시아" },
  { country: "Malaysia", city: "Johor Bahru", display: "조호르바루, 말레이시아" },
  { country: "Malaysia", city: "Penang", display: "페낭, 말레이시아" },
  { country: "Malaysia", city: "Kota Kinabalu", display: "코타키나발루, 말레이시아" },

  { country: "United States", city: "New York", display: "뉴욕, 미국" },
  { country: "United States", city: "Los Angeles", display: "로스앤젤레스, 미국" },
  { country: "United States", city: "Las Vegas", display: "라스베이거스, 미국" },
  { country: "United States", city: "San Francisco", display: "샌프란시스코, 미국" },
  { country: "United States", city: "Miami", display: "마이애미, 미국" },

  { country: "Canada", city: "Toronto", display: "토론토, 캐나다" },
  { country: "Canada", city: "Vancouver", display: "밴쿠버, 캐나다" },
  { country: "Canada", city: "Montreal", display: "몬트리올, 캐나다" },
  { country: "Canada", city: "Quebec City", display: "퀘벡시티, 캐나다" },

  { country: "Australia", city: "Sydney", display: "시드니, 호주" },
  { country: "Australia", city: "Melbourne", display: "멜버른, 호주" },
  { country: "Australia", city: "Brisbane", display: "브리즈번, 호주" },
  { country: "Australia", city: "Perth", display: "퍼스, 호주" },

  { country: "United Kingdom", city: "London", display: "런던, 영국" },
  { country: "United Kingdom", city: "Edinburgh", display: "에든버러, 영국" },
  { country: "United Kingdom", city: "Manchester", display: "맨체스터, 영국" },
  { country: "United Kingdom", city: "Liverpool", display: "리버풀, 영국" },

  { country: "Germany", city: "Berlin", display: "베를린, 독일" },
  { country: "Germany", city: "Munich", display: "뮌헨, 독일" },
  { country: "Germany", city: "Frankfurt", display: "프랑크푸르트, 독일" },
  { country: "Germany", city: "Hamburg", display: "함부르크, 독일" },

  { country: "France", city: "Paris", display: "파리, 프랑스" },
  { country: "France", city: "Nice", display: "니스, 프랑스" },
  { country: "France", city: "Lyon", display: "리옹, 프랑스" },
  { country: "France", city: "Marseille", display: "마르세유, 프랑스" },

  { country: "Italy", city: "Rome", display: "로마, 이탈리아" },
  { country: "Italy", city: "Venice", display: "베네치아, 이탈리아" },
  { country: "Italy", city: "Florence", display: "피렌체, 이탈리아" },
  { country: "Italy", city: "Milan", display: "밀라노, 이탈리아" },

  { country: "Spain", city: "Madrid", display: "마드리드, 스페인" },
  { country: "Spain", city: "Barcelona", display: "바르셀로나, 스페인" },
  { country: "Spain", city: "Seville", display: "세비야, 스페인" },
  { country: "Spain", city: "Valencia", display: "발렌시아, 스페인" },
];


const DestinationSelect = () => {
  const [query, setQuery] = useState(""); // 입력 필드의 값
  const [suggestions, setSuggestions] = useState([]); // 자동완성 추천 항목
  const [selected, setSelected] = useState(""); // 최종 선택된 여행지

  // 입력 변경 시 추천 항목 업데이트
  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input) {
      const filtered = destinations.filter((dest) =>
        dest.display.includes(input)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]); // 입력이 없을 경우 추천 항목 비우기
    }
  };

  // 추천 항목 클릭 시 처리
  const handleSuggestionClick = (suggestion) => {
    setQuery("");
    setSelected(suggestion.display);
    setSuggestions([]);
    console.log(`선택된 여행지: { country: '${suggestion.country}', city: '${suggestion.city}' }`);
  };


  // Handle the back button click
  const handleBackClick = () => {
  //navigate("/previous-page"); // Replace '/previous-page' with the actual path you want
  };

  // Handle the delete button click
  const handleDeleteClick = () => {
  //navigate("/delete-page"); // Replace '/delete-page' with the actual path you want
  };




  return (
    <div className="select-container">
      <header className="select-header">
        <img
          src="back.png"
          alt="Back"
          className="select-back-icon"
          onClick={() => window.location.href = '/back'}
        />
        <h1 className="select-title">새로운 체크리스트</h1>
        <img
          src="delete.png"
          alt="Delete"
          className="select-delete-icon"
          onClick={() => window.location.href = '/delete'}
        />
      </header>

      <form className="select-form">
        <h2 className="select-subtitle">여행지를 선택해 주세요</h2>
        <h3 className="select-instruction">
          여행 목적지(도시 이름)를 검색 목록에서 선택해 주세요.
        </h3>
      </form>

      <section className="select-content">
        {selected && (
          <p className="select-selected-destination">
            선택된 여행지: {selected}
          </p>
        )}
        <div className="select-search-box">
          <input
            type="text"
            className="select-search-input"
            placeholder="여행 도시를 입력하세요."
            value={query}
            onChange={handleInputChange}
          />
          <button type="button" className="select-search-button">
            🔍
          </button>
        </div>
        {suggestions.length > 0 && (
          <ul className="select-suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="select-suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.display}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DestinationSelect;
