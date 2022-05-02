const express = require('express');
const cors = require('cors')
const app = express();
const port= process.env.PORT || 5000;

app.use(cors())
app.use(express.json());



app.get('/', (req, res)=>{
    res.send('warehouse');
});

const users = [
    {id: 1, name:'sabana',email: 'sabana@gmail.com', phone: '01719983249'},
    {id: 2, name:'sabnur',email: 'sabnur@gmail.com', phone: '01719983249'},
    {id: 3, name:'Suchorita',email: 'Suchorita@gmail.com', phone: '01719983249'},
    {id: 4, name:'sanaulla',email: 'sanaulla@gmail.com', phone: '01719983249'},
    {id: 5, name:'kabir',email: 'kabir@gmail.com', phone: '01719983249'},
    {id: 6, name:'samim',email: 'samim@gmail.com', phone: '01719983249'},
    {id: 7, name:'khalek',email: 'khalek@gmail.com', phone: '01719983249'},

]


app.get('/users', (req, res) => {
    res.send(users);
});


app.get('/user/:id',(req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const user = users.find(u=>u.id === id);
    res.send(user);
})


app.post('/productInfo', (req, res)=>{
    console.log(req.body)
    const productInfo = req.body;
    productInfo.id = users.length + 1;
    users.push(productInfo);
    res.send(productInfo);
})


app.listen(port, ()=>{
    console.log('warehouse port', port)
});