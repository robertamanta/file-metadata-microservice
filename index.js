require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use('/public',express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse',(req,res) =>{
    if (req.files && Object.keys(req.files).length !== 0) {
        const uploadedFile = req.files.upfile;
        res.json({name:uploadedFile.name, type:uploadedFile.mimetype, size: uploadedFile.size});
    }
    else
    {
        res.send("No file uploaded!");
    }
    });
app.listen(port, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port: " + port)
    else
        console.log("Error occurred, server can't start", error);
});