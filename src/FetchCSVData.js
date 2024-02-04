import { useEffect, useState } from 'react'
// FetchCSVData.js


import axios from 'axios'; // Import Axios
import Papa from 'papaparse';

//https://docs.google.com/spreadsheets/d/e/2PACX-1vSJyvooj0kTpiz0IFGdYuKq-SnpqzeNOw_j8zDoo6BUJuDJkRRfoVWObuUWa3WiRQ/pub?output=csv
//https://docs.google.com/spreadsheets/d/e/2PACX-1vSJyvooj0kTpiz0IFGdYuKq-SnpqzeNOw_j8zDoo6BUJuDJkRRfoVWObuUWa3WiRQ/pub?output=csv

const FetchCSVData = () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJyvooj0kTpiz0IFGdYuKq-SnpqzeNOw_j8zDoo6BUJuDJkRRfoVWObuUWa3WiRQ/pub?gid=1238396218&single=true&output=csv';

    return new Promise((resolve, reject) => {
        axios.get(csvUrl)
            .then((response) => {
                const results = Papa.parse(response.data, { header: true });
                console.log('Parsed CSV data:', results.data); // Added this line
                if (results.errors.length > 0) {
                    console.log("dentro del if")
                    console.error('Error parsing CSV data:', results.errors);
                    reject([]);
                }
                resolve(results.data);
            })
            .catch((error) => {
                console.error('Error fetching CSV data:', error);
                reject([]);
            });
    });
}

export default FetchCSVData;



