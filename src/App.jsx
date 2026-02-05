import { useState } from "react";
import "./App.css";
import CardBoard from "./components/CardBoard.jsx";

function App() {
    let currScore = 0;
    let highScore = 0;
    const totalCards = 20;

    return (
        <>
            <h1>Dune Memory Game</h1>
            <div className="hflex">
                <h3>Scoreboard</h3>
                <h3>Options</h3>
            </div>
            <CardBoard totalCards={totalCards} />
        </>
    );
}

export default App;
