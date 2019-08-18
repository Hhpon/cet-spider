const express = require('express')
const bodyParser = require('body-parser')
const getLoginOption = require('./js/getLoginOption')
const getZip = require('./js/getZip')
const login = require('./js/login')
const PDFParser = require('pdf2json');

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/getLoginOption', async (req, res) => {
    let loginOptionRet = await getLoginOption()
    res.send(loginOptionRet)
})

app.post("/login", async (req, res) => {
    let userInfo = req.body
    let loginRetData = await login(userInfo.userName, userInfo.idCard, userInfo.charCode, userInfo.cookie)
    console.log(JSON.parse(loginRetData.Message));
    if (loginRetData.ExceuteResultType === -1) {
        res.send(loginRetData)
        return
    }
    let SID = JSON.parse(loginRetData.Message)[0].SID
    let zipRet = await getZip(userInfo.cookie, SID)
    // let zipRetBase = zipRet.toString('base64')

    // var pdfParser = new PDFParser(this, 1);
    // pdfParser.parseBuffer(zipRetBase)
    // pdfParser.on('pdfParser_dataError', errData => console.log(new Error(errData.parserError)));
    // pdfParser.on('pdfParser_dataReady', () => {
    //     let data = pdfParser.getRawTextContent();
    //     console.log(data);
    // });

    // res.send({ zipRet: zipRetBase })
    res.send('o')
})

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})