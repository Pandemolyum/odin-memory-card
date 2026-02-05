import { useState } from "react";
import "./App.css";
import CardBoard from "./components/CardBoard.jsx";

function App() {
    // Game options
    const totalCards = 20;

    // Game logic
    let currScore = 0;
    let highScore = 0;
    const clickedCards = []; // Stores card keys

    function onCardClick(e) {
        const clickId = e.target.id;
        console.log("🚀 ~ onCardClick ~ clickedCards:", clickedCards);
        if (clickedCards.every((id) => id !== clickId)) {
            clickedCards.push(clickId);
            currScore++;
        } else {
            if (currScore > highScore) highScore = currScore;
            currScore = 0;
            clickedCards.length = 0; // Clears array
        }
        console.log("🚀 ~ onCardClick ~ currScore:", currScore);
    }

    return (
        <>
            <h1>Dune Memory Game</h1>
            <div className="hflex">
                <h3>Scoreboard</h3>
                <h3>Options</h3>
            </div>
            <CardBoard totalCards={totalCards} onClick={onCardClick} />
        </>
    );
}

export default App;
