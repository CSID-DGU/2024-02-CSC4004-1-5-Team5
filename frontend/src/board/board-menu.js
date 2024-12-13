import React from "react";
import "../style.css";

function BoardMenu({ onClose, onEdit, onDelete }) {
    return (
        <div>
            <div className="Style_CSS">
                <header>
                    <img src="/png/logo.png" alt="logo" className="logo"/>
                    <h1>TRAVEL KIT</h1>
                    <img
                        src="/png/delete.png"
                        alt="close menu"
                        onClick={onClose} // 메뉴 닫기 버튼
                        className="delete"
                    />
                </header>
                <p id="boarderMenu">
                    <a href="#" onClick={onEdit}>수정하기</a> {/* 수정하기 버튼 클릭 시 onEdit 호출 */}
                    <br />
                    <br />
                    <a href="#" onClick={onDelete}>삭제하기</a> {/* 삭제하기 버튼 클릭 시 onDelete 호출 */}
                    <br />
                </p>
            </div>
        </div>
    );
}

export default BoardMenu;