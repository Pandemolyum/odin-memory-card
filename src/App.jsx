import { useState, useEffect } from "react";
import "./App.css";
import fetchImages from "./components/Utils.jsx";
import Card from "./components/Card.jsx";
import CardBoard from "./components/CardBoard.jsx";
import Scoreboard from "./components/Scoreboard.jsx";

// Game logic
let currScore = 0;
let highScore = 0;
const clickedCards = []; // Stores clicked card keys

function App() {
    const [cards, setCards] = useState([]);

    // Game options
    const [totalCards, setTotalCards] = useState(20);
    const [maxCards, setMaxCards] = useState(20);
    const minCards = 1;

    // Change tab title
    useEffect(() => {
        document.title = "Dune Memory Game";
    }, []);

    // Fetches cards from the database using an API and creates card objects
    useEffect(() => {
        let ignore = false;
        fetchImages(totalCards).then((res) => {
            if (!ignore) {
                const uidRegex = new RegExp(/([^/.]+)(?=.[^/.]*$)/); // Matches everything between the last "/" character and the last "." character.
                const initialCards = res.urls.map((url) => ({
                    id: url.match(uidRegex)[0],
                    url: url,
                }));
                setCards(initialCards);
                setMaxCards(res.maxNum);
                currScore = 0;
            }
        });

        return () => (ignore = true);
    }, [totalCards]);

    // Function triggered in Card component when clicked
    // Handles scores and shuffles cards
    const onCardClick = (e) => {
        const clickId = e.target.id;
        if (clickedCards.every((id) => id !== clickId)) {
            clickedCards.push(clickId);
            currScore++;
        } else {
            if (currScore > highScore) highScore = currScore;
            currScore = 0;
            clickedCards.length = 0; // Clears array
        }

        setCards(cards.toSorted(() => Math.random() - 0.5));
    };

    const handleTotalCardsChange = (e) => {
        const currValue = Math.floor(e.target.value);
        if (currValue < minCards) {
            setTotalCards(5);
        } else if (currValue > maxCards) {
            setTotalCards(maxCards);
        } else {
            setTotalCards(currValue);
        }
    };

    // Generate the Card components
    const cardComponents = cards.map((card) => (
        <Card key={card.id} id={card.id} url={card.url} onClick={onCardClick} />
    ));

    return (
        <>
            <h1>Dune Memory Game</h1>
            <div className="hflex">
                <Scoreboard currScore={currScore} highScore={highScore} />
                <div className="vflex">
                    <div className="setting">
                        <label htmlFor="totalCards">
                            Total Cards ({minCards}-{maxCards}):
                        </label>
                        <input
                            id="totalCards"
                            type="number"
                            min={minCards}
                            max={maxCards}
                            value={totalCards}
                            onChange={handleTotalCardsChange}
                        />
                    </div>
                </div>
            </div>
            <CardBoard cards={cardComponents} />
        </>
    );
}

export default App;
