const express = require('express');
require('dotenv').config()
var cors = require('cors')


const app = express();
app.use(cors())


app.use(express.json());
app.get('/', (req,res)=>{
    res.send({msg: 'Hello World'})
})
app.get('/health', (req,res)=>{
    res.send({status: 'OK'})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
