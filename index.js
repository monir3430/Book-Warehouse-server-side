const express = require('express');
const app = express();
const port= process.env.PORT || 5000;



app.get('/', (req, res)=>{
    res.send('warehouse')
});


app.listen(port, ()=>{
    console.log('warehouse port', port)
});