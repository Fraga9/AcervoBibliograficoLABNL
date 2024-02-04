import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons } from '@fortawesome/free-solid-svg-icons'
import FetchCSVDataCategorias from './FetchCategorias';



export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const handleClickLogo = () => {;
  navigate("/");
};



useEffect(() => {
  // Call FetchCSVDataCategorias when the component mounts
  FetchCSVDataCategorias().then(data => setCategorias(data));
}, []);



  const categories = categorias;

  return (
    <nav className="navbar">
      <img onClick={handleClickLogo} src="https://www.labnuevoleon.mx/_next/static/media/labnl-logo.9c66c725.svg" alt="LABNL Logo" className="navbar-logo" />
      <div className='navbar-content'>
        <div className='dropdown'>
          <button className='chosen-value' onClick={() => setIsNavExpanded(!isNavExpanded)}>
          <FontAwesomeIcon icon={faIcons} />
            Categorías <i className={`fas ${isNavExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {isNavExpanded && (
            <ul className='value-list'>
              {categories.map((category, index) => (
                <li key={index} onClick={() => navigate(`/categoria/${category}`)}>{category}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}





/*<div
        className="navbar-item"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        Categorías
        {isHovering && (
          <div className="categories-dropdown">
            {categories.map((category, index) => (
              <div key={index} className="category-item">
                {category}
              </div>
            ))}
          </div>
        )}
      </div>*/





      /*export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const handleClickLogo = () => {;
    navigate("/");
};

const FetchCSVDataCategorias = () => {
  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJyvooj0kTpiz0IFGdYuKq-SnpqzeNOw_j8zDoo6BUJuDJkRRfoVWObuUWa3WiRQ/pub?output=csv';

  return new Promise((resolve, reject) => {
    axios.get(csvUrl)
      .then((response) => {
        const results = Papa.parse(response.data, { header: true });
        const categorias = results.data.map(row => row[Object.keys(row)[0]]);
        console.log('Parsed CSV data:', categorias); // Added this line
        if (results.errors.length > 0) {
          console.error('Error parsing CSV data:', results.errors);
          reject([]);
        }
        resolve(categorias);
      })
      .catch((error) => {
        console.error('Error fetching CSV data:', error);
        reject([]);
      });
  });
}

useEffect(() => {
  // Call FetchCSVDataCategorias when the component mounts
  FetchCSVDataCategorias().then(data => setCategorias(data));
}, []);



  const categories = categorias;*/