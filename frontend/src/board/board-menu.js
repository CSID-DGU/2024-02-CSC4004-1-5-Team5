import React from "react";
import "../style.css";

function BoardMenu({ onClose, deletePost, editPost }) {
    return (
        <div className="menu-overlay">
            <div className="menu-container">
                <header className="menu-header">
                    <img src="/png/logo.png" alt="logo" className="logo" />
                    <h1>TRAVEL KIT</h1>
                    <img
                        src="/png/delete.png"
                        alt="close menu"
                        className="delete-icon"
                        onClick={onClose} // Close the menu
                    />
                </header>
                <nav>
                    <h3>
                        <button onClick={editPost}>수정하기</button>
                        <br />
                        <button onClick={deletePost}>삭제하기</button>
                        <br />
                        <br />
                    </h3>
                </nav>
            </div>
        </div>
    );
}

export default BoardMenu;
