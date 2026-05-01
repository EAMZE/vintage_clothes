import axios from 'axios';
//const axios = require('axios'); // legacy way



export const fetchProducts = async () => {


    try {
        return await axios.get('http://localhost:3001/products');
    } catch (error) {
        console.error(error);
    }
//   const response = fetch('http://localhost:3001/products'); 

//   return await response;
}

export const addProduct = async (product) => {
    try {
        return await axios.post('http://localhost:3001/products', product);
    } catch (error) {
        console.error(error);
    }
}

export const deleteProduct = async (id) => {
    // add delete product endpoint
}