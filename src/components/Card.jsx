export default function Card({ url, onClick }) {
    return (
        <button className="gamecard" onClick={onClick}>
            <img className="gamecard" src={url} alt="" />
        </button>
    );
}
