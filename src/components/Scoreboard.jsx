export default function Scoreboard({ currScore, highScore }) {
    return (
        <div className="vflex">
            <span>Current Score: {currScore}</span>
            <span>High Score: {highScore}</span>
        </div>
    );
}
