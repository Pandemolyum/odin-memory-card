// eslint-disable-next-line
import { motion } from "framer-motion";

export default function Card({ id, url, onClick }) {
    return (
        <motion.button
            layout // Animates the shuffle
            id={id}
            className="gamecard"
            onClick={onClick}
            // Add a slight zoom in effect when the cards first load
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
        >
            <img className="gamecard" src={url} alt="" draggable="false" />
        </motion.button>
    );
}
