import React, { useState, useEffect } from 'react';
import './Banner.css';

const imageUrls = [
    "https://live.staticflickr.com/65535/52202977711_b3e8a6d2f6_6k.jpg", //listo
    "https://live.staticflickr.com/65535/52203484550_c487f4bdb1_6k.jpg",
    "https://live.staticflickr.com/65535/52203249619_15f292a3f7_6k.jpg",
    "https://live.staticflickr.com/65535/52203481140_a63012ed31_6k.jpg",
];
const Banner = ({ title }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState((currentImageIndex + 1) % imageUrls.length);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex(nextImageIndex);
            setNextImageIndex((nextImageIndex + 1) % imageUrls.length);
        }, 3000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(timer); // Limpia el intervalo cuando el componente se desmonta
    }, [currentImageIndex, nextImageIndex]);

    return (
        <div className="banner">
            <div className="banner-image" style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})`, opacity: 1 }} />
            <div className="banner-image" style={{ backgroundImage: `url(${imageUrls[nextImageIndex]})`, opacity: 0 }} />
            <h1 className="banner-title">{title}</h1>
        </div>
    );
};

export default Banner;