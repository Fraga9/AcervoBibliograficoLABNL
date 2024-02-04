import { useLocation, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from 'react';
import './Components/BookDetails.css';
import FetchCSVData from './FetchCSVData';
import { useNavigate } from 'react-router-dom';

function BookDetails() {
    const { etiqueta} = useParams();
    const location = useLocation();
    const initialBook = location.state ? location.state.book : null;
    const navigate = useNavigate();

    const [book, setBook] = useState(initialBook);
    const [recommendedBooks, setRecommendedBooks] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchBookAndRecommendedBooks = async () => {
            const books = await FetchCSVData();
            if (!book) {
                const fetchedBook = books.find(b => b.ETIQUETA === etiqueta);
                setTimeout(() => {
                    setBook(fetchedBook);
                }, 2000); 
            }
            const recommendedBooks = books.filter(b => b.CATEGORIA === (book?.CATEGORIA || null));
            setRecommendedBooks(recommendedBooks);
        };

        fetchBookAndRecommendedBooks();
    }, [book?.CATEGORIA, etiqueta]);

    const handleBookClick = (recommendedBook) => {
        console.log('Clicked on book:', recommendedBook);
        console.log('Navigating to:', `/books/${recommendedBook.ETIQUETA}`);
        setBook(recommendedBook);
        navigate(`/books/${recommendedBook.ETIQUETA}`);
    }

    if (!book) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <div className="book-details-container">
                <div className="book-image-div">
                    <img
                        className="book-image-individual"
                        src={book.IMAGEN}
                        alt="libro"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/7/72/Placeholder_book.svg" }}
                    />
                </div>
                <div className="book-info">
                    <h1>{book.TITULO}</h1>
                    <div className="book-metadata">
                        <p><strong>Autor:</strong> {book.AUTORIA}</p>
                        <p><strong>Etiqueta:</strong> {book.ETIQUETA}</p>
                        <p><strong>Categoría:</strong> {book.CATEGORIA}</p>
                        <p><strong>Palabras clave:</strong> {book.PALABRAS_CLAVE}</p>
                        <p><strong>Editorial:</strong> {book.EDITORIAL}</p>
                        <p><strong>ISBN:</strong> {book.ISBN}</p>
                        <p><strong>Año:</strong> {book.ANO}</p>
                        <p><strong>Idioma:</strong> {book.IDIOMA}</p>
                        <p><strong>País:</strong> {book.PAIS}</p>
                    </div>
                    <div className="book-summary">
                        <h2>Resumen</h2>
                        <p>{book.RESUMEN}</p>
                    </div>
                </div>
            </div>
            <div className="book-recommended">
                <h2>Libros recomendados</h2>
                <Carousel
                    showArrows={true}
                    showStatus={false}
                    emulateTouch={true}
                    infiniteLoop={true}
                    showIndicators={false}
                    showThumbs={false}
                    className="carousel"
                >
                    {recommendedBooks.slice(0, 10).map(recommendedBook => (
                        <div key={recommendedBook.ETIQUETA} onClick={() => handleBookClick(recommendedBook)}>
                            <img src={recommendedBook.IMAGEN} alt={recommendedBook.TITULO} />
                            <p className="legend">{recommendedBook.TITULO}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </>
    );
}

export default BookDetails;
