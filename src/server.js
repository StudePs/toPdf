const express = require("express");
const path = require("path");
const ejs = require("ejs");
const { altuHistory } =require("./client")

const app = express();


app.get('/', async (request, response) => {

    const history = await altuHistory()
    const filePath = path.join(__dirname, "viewr_pdf/print.ejs");

    ejs.renderFile(filePath, { data: "text" },(error, html) => {
        if (error) {
            return response.send("Error reading file");
        }
        
        return response.send(html);
    })
})

app.listen(3000)