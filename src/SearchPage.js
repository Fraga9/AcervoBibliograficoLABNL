import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BookCard from './Components/BookCard';
import './SearchPage.css';
import FetchCSVData from './FetchCSVData';


function SearchPage({}) {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add this line
    const { category } = useParams();
    const location = useLocation();
    

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true); // Set loading state to true when fetching starts
            const books = await FetchCSVData();

            if (category) {
                const filteredBooks = books.filter(book => book.CATEGORIA === category);
                setSearchResults(filteredBooks);
            } else {
                setSearchResults(location.state ? location.state.searchResults : []);
            }
            setIsLoading(false); // Set loading state to false when fetching is done
        };

        fetchBooks();
    }, [category, location.state]);

    return (
        <div className="search-page">
            <h1>{category ? `Libros categorizados como ${category}` : `Resultados de búsqueda de ${localStorage.searchTerm}`}</h1>
            <div className="book-grid">
                {isLoading ? (
                    <p>Cargando...</p> 
                ) : searchResults.length > 0 ? (
                    searchResults.map(book => (
                        <BookCard key={book.ETIQUETA} book={book} />
                    ))
                ) : (
                    <p>No se encontraron resultados para tu búsqueda.</p>
                )}
            </div>
        </div>
    );
}

export default SearchPage;