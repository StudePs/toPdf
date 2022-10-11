const express = require("express");
const path = require("path");
const ejs = require("ejs");
const pdf = require("html-pdf");
const { altuHistory } = require("./client");
const { organizer } = require("./util");

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
    
    const filePath = path.join(__dirname, "viewr_pdf/print.ejs");

    ejs.renderFile(filePath, { timeLineMsg }, (error, html) => {
        if (error) {
            console.log(error.message)
            return response.send("Error reading file");
        }
        // return response.send(html);
        let heightPage = (timeLineMsg.length/40)*34 > 11.25 ? (timeLineMsg.length/40)*30 : 11.25;
        pdf.create(html, {         
            width: "8.5in",
            header: {
                height: "10mm",
                contents: '<div style="text-align: end; font-size: 6px">zenvia.com</div>'
            },
            footer: {
                height: "10mm",
                contents: '<span style="color: #444; font-size: 6px">{{page}}/{{pages}}</span>'
            }
        }).toBuffer((error, buffer) => {
          if (error) {
            return response.json({error: {
              msg: error.message
            }});            
          }
          let pdfBase64 = buffer.toString('base64');
          return response.json({ data: {
            pdfBase64 : pdfBase64
          } })
        })     
       
    })
})

app.listen(3000, () => console.log(`Server on http://localhost:3000`))