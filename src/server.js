const express = require("express");
const path = require("path");
const ejs = require("ejs");
const pdf = require("html-pdf");
const { altuHistory } = require("./client");
const { organizer } = require("./util");
const moment = require("moment");

const app = express();
app.use(express.json());


app.post('/history', async (request, response) => {
    const {
        instance,
        idContact,
        idAssistant
    } = request.body;

    const history = await altuHistory(instance, idContact, idAssistant);
   
    const timeLineMsg = organizer(history);
    //return response.json(timeLineMsg)

    const filePath = path.join(__dirname, "viewr_pdf/print.ejs");

    ejs.renderFile(filePath, { timeLineMsg }, (error, html) => {
        if (error) {
            console.log(error.message)
            return response.send("Error reading file");
        }
        
        let name = `${moment()}_history.pdf`;
        pdf.create(html, {
          height: "11.25in",
            width: "8.5in",
            header: {
                height: "10mm",
                contents: '<div style="text-align: end; font-size: 6px">zenvia.com</div>'
            },
            footer: {
                height: "10mm",
                contents: '<span style="color: #444; font-size: 6px">{{page}}/{{pages}}</span>'
            }
        }).toFile(name, (error, data) => {
          if (error) {
            return response.json({error: {
              msg: error.message
            }});            
          }
          return response.send(data)
        })     
       
    })
})

app.listen(3000, () => console.log(`Server on http://localhost:3000`))