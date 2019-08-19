const express = require('express')
const bodyParser = require('body-parser')
const getLoginOption = require('./js/getLoginOption')
const getZip = require('./js/getZip')
const login = require('./js/login')

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
    if (loginRetData.ExceuteResultType === -1) {
        res.send(loginRetData)
        return
    }
    let SID = JSON.parse(loginRetData.Message)[0].SID
    let pdfData = await getZip(userInfo.cookie, SID)
    let admissionNum = pdfData.slice(pdfData.indexOf('准考证号') + 5, pdfData.indexOf('准考证号') + 20);
    res.send(admissionNum)
})

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})