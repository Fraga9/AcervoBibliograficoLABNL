import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SearchPage from './SearchPage';
import Navbar from './Components/Navbar';
import BookDetails from './BookDetails';
import Footer from './Components/Footer';


function App() {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/SearchPage" element={<SearchPage />} />
                        <Route path="/books/:etiqueta" element={<BookDetails />} />
                        <Route path="/categoria/:category" element={<SearchPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;