import { useState, useEffect } from "react";
import "./App.css";
import fetchImages from "./components/Utils.jsx";
import Card from "./components/Card.jsx";
import CardBoard from "./components/CardBoard.jsx";

// Game options
const totalCards = 20;

// Game logic
let currScore = 0;
let highScore = 0;
const clickedCards = []; // Stores card keys

function App() {
    const [cards, setCards] = useState([]);

    // Fetches cards from the database using an API and creates card objects
    useEffect(() => {
        let ignore = false;
        fetchImages(totalCards).then((urls) => {
            if (!ignore) {
                const uidRegex = new RegExp(/([^/.]+)(?=.[^/.]*$)/); // Matches everything between the last "/" character and the last "." character.
                const initialCards = urls.map((url) => ({
                    id: url.match(uidRegex)[0],
                    url: url,
                }));
                setCards(initialCards);
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

    // Generate the Card components
    const cardComponents = cards.map((card) => (
        <Card key={card.id} id={card.id} url={card.url} onClick={onCardClick} />
    ));

    return (
        <>
            <h1>Dune Memory Game</h1>
            <div className="hflex">
                <h3>Scoreboard</h3>
                <h3>Options</h3>
            </div>
            <CardBoard cards={cardComponents} />
        </>
    );
}

export default App;
