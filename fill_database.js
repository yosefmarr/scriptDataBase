const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const dataBaseData = require('./data');

dataBaseData.data.forEach((product) => 
{
    let fd = new FormData();
    fd.append('title', product.title);
    fd.append('price', product.price);
    fd.append('image', fs.createReadStream(product.image), path.basename(product.image));
    axios.post(
            'http://localhost:2500/product/product', 
            fd, 
            {'accept': 'application/json', headers: fd.getHeaders()}
    ).then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err.response.data);
    });
});