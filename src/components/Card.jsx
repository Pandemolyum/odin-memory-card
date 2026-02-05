export default function Card({ id, url, onClick }) {
    return (
        <button id={id} className="gamecard" onClick={onClick}>
            <img className="gamecard" src={url} alt="" />
        </button>
    );
}
