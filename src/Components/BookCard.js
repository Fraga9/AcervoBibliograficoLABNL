import { useNavigate, useParams } from 'react-router-dom';
import './BookCard.css';

function BookCard({ book }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleClick = () => {
        console.log("Book ID:", book.ETIQUETA);
        navigate(`/books/${book.ETIQUETA}`, { state: { book } });
    };

    return (
        <div className="book-link">
            <div onClick={handleClick}  className="book-card">
                <img
                    className="bookcard-image"
                    src={book.IMAGEN}
                    alt="libro"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/7/72/Placeholder_book.svg" }}
                />
                <div className="book-details">
                    <h2>{book.TITULO}</h2>
                    <p>de {book.AUTORIA}</p>
                    <div className="book-more-details-div">
                        <p><strong>Categoría:</strong> {book.CATEGORIA}</p>
                        <p><strong>Palabras Clave:</strong> {book.PALABRAS_CLAVE}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookCard;