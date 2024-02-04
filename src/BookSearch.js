import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FetchCSVData from './FetchCSVData';
import './BookSearch.css';

function BookSearch() {
    const [csvData, setCsvData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Todo');
    const navigate = useNavigate();
    const [timeoutId, setTimeoutId] = useState(null);
    console.log(searchTerm)

    useEffect(() => {
        FetchCSVData().then(data => setCsvData(data));
    }, []);

    

    const searchBooks = (term, type) => {
        if (!term || !csvData) {
            return [];
        }

        return csvData
            .filter(book => {
                switch (type) {
                    case 'titulo':
                        return book.TITULO && book.TITULO.toLowerCase().includes(term.toLowerCase());
                    case 'autor':
                        return book.AUTORIA && book.AUTORIA.toLowerCase().includes(term.toLowerCase());
                    case 'palabras_clave':
                        return book.PALABRAS_CLAVE && book.PALABRAS_CLAVE.toLowerCase().includes(term.toLowerCase());
                    default:
                        return (book.TITULO && book.TITULO.toLowerCase().includes(term.toLowerCase())) ||
                            (book.AUTORIA && book.AUTORIA.toLowerCase().includes(term.toLowerCase())) ||
                            (book.PALABRAS_CLAVE && book.PALABRAS_CLAVE.toLowerCase().includes(term.toLowerCase()));
                }
            })
            .slice(0, 20);
    }

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
    
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    
        const newTimeoutId = setTimeout(() => {
            // Aquí es donde realmente realizas la búsqueda
        }, 500); // 500 milisegundos de retraso
    
        setTimeoutId(newTimeoutId);
    };

    const books = searchBooks(searchTerm, searchType);

    const handleSelectChange = (event) => {
        setSearchType(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!searchTerm.trim()) {
            // Si el término de búsqueda está vacío, muestra un mensaje al usuario
            alert("Por favor, ingresa texto en la barra de búsqueda.");
            return;
        }
        // Call searchBooks or any other function to handle the form submission
        const searchResults = searchBooks(searchTerm, searchType);
        // Handle the search results as needed
        navigate('/SearchPage', { state: { searchResults} });
        localStorage.setItem("searchTerm", JSON.stringify(searchTerm));
    }




    const SearchDropdown = ({ className, searchTypes, selectedType, onSelectType }) => (
        <select value={selectedType} className={className} onChange={onSelectType}>
          {searchTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      );
      



    return (
        <div className="book-search-container">
            <h1 className="book-search-title">Acervo Bibliográfico Digital</h1>
            <form className="book-search-form" onSubmit={handleFormSubmit}>
                <div>
                    <SearchDropdown
                        className="search-dropdown"
                        searchTypes={['Todo', 'Título', 'Autor', 'Palabras Clave']}
                        selectedType={searchType}
                        onSelectType={handleSelectChange}
                    />
                </div>
                <input
                    type="text"
                    className="book-search-input"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder={`Buscar libros por ${searchType === 'Todo' ? 'título, autoría, palabras clave' : searchType}...`}
                />
                <button type="submit" className="book-search-button">Buscar</button>
            </form>

            {books.length > 0 && (
                <ul className="book-search-results">
                    {books.map((book, index) => {
                        const handleClick = () => {
                            console.log("Book ID:", book.ETIQUETA);
                            navigate(`/books/${book.ETIQUETA}`, { state: { book } });
                        };

                        return (
                            <li key={index} className="book-search-result" onClick={handleClick}>
                                <div className='container-result'>
                                    <img
                                        className="book-search-result-image"
                                        src={book.IMAGEN}
                                        alt='libro'
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/7/72/Placeholder_book.svg" }}
                                    />
                                    <div className='container-info'>
                                        <div className="book-search-result-title">{book.TITULO}</div>
                                        <div className="book-search-result-author">{book.AUTORIA}</div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default BookSearch;









/*const { csvData, fetchCSVData } = FetchCSVData();
const [searchTerm, setSearchTerm] = useState('');
const logo = '/_next/static/media/labnl-logo.9c66c725.svg';


const [searchType, setSearchType] = useState('todo');


useEffect(() => {
    fetchCSVData();
}, []);

const searchBooks = (term) => {
    if (!term || !csvData) {
        return [];
    }

    return csvData
        .filter(book =>
            (book.TITULO ? book.TITULO.toLowerCase().includes(term.toLowerCase()) : false) ||
            (book.AUTORÍA ? book.AUTORÍA.toLowerCase().includes(term.toLowerCase()) : false) ||
            (book.PALABRAS_CLAVE ? book.PALABRAS_CLAVE.toLowerCase().includes(term.toLowerCase()) : false)
        )
        .slice(0, 20);
}




const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
}

const books = searchBooks(searchTerm);

const handleSelectChange = (event) => {
    setSearchType(event.target.value);
    console.log(searchType)
}
 


return (
    <div className="book-search-container">
        <h1 className="book-search-title">Acervo Bibliográfico Digital</h1>






        <form className="book-search-form">
            
            <div>
                <p>Busqueda por</p>
                <select name="select" id="select-id"  onChange={handleSelectChange}>
                    <option value="todo">TODO</option>
                    <option value="titulo">TITULO</option>
                    <option value="autor">autor</option>
                    <option value="palabras_clave">palabras clave</option>
                </select>
            </div>

            <input
                type="text"
                className="book-search-input"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Buscar libros por título, autor o palabras claves..."
            />
            <button type="submit" className="book-search-button">Buscar</button>
        </form>


        {books.length > 0 && (
            <ul className="book-search-results">
                {books.map((book, index) => (
                    <li key={index} className="book-search-result">
                        <div className='container-result'>
                            <img className="book-search-result-image" src={book.IMAGEN} alt='libro' />
                            <div className='container-info'>
                                <div className="book-search-result-title">{book.TITULO}</div>
                                <div className="book-search-result-author">{book.AUTORIA}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

// ...




*/





