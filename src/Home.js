import React, { useEffect, useState } from 'react';
import FetchCSVData from './FetchCSVData';
import BookSearch from './BookSearch';
import Banner from './Components/Banner';
import './Home.css';

function Home() {
    const [csvData, setCsvData] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 0);
    };

    useEffect(() => {
        FetchCSVData().then(data => setCsvData(data));
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`Home ${isScrolled ? 'scrolled' : ''}`}>
            <Banner imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Antiguo_Palacio_Federal%2C_Monterrey.jpg/1200px-Antiguo_Palacio_Federal%2C_Monterrey.jpg" />
            <BookSearch className="book-search-home" />
        </div>
    );
}

export default Home;