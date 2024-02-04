import axios from 'axios'; // Import Axios
import Papa from 'papaparse';



const FetchCSVDataCategorias = () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJyvooj0kTpiz0IFGdYuKq-SnpqzeNOw_j8zDoo6BUJuDJkRRfoVWObuUWa3WiRQ/pub?gid=1640440428&single=true&output=csv';
  
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

  export default FetchCSVDataCategorias;