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
    let pdfData = await getZip(userInfo.cookie, SID);
    const timeIndexNum = pdfData.indexOf('级笔试--')
    const admissionNum = pdfData.slice(pdfData.indexOf('准考证号') + 5, pdfData.indexOf('准考证号') + 20);
    const examDate = pdfData.slice(timeIndexNum + 5, timeIndexNum + 15)
    const examCheckInTime = pdfData.slice(timeIndexNum + 15, timeIndexNum + 20)
    const examTime = pdfData.slice(timeIndexNum + 20, timeIndexNum + 31)
    const roomIndexNum = pdfData.indexOf('级笔试东北农业大学')
    const tipIndexNum = pdfData.indexOf('考生须知')
    const examRoom = pdfData.slice(roomIndexNum + 3, tipIndexNum - 7)
    const examNum = pdfData.slice(tipIndexNum - 7, tipIndexNum - 4)
    const examSeatNum = pdfData.slice(tipIndexNum - 4, tipIndexNum)
    res.send({ admissionNum, examDate, examCheckInTime, examTime, examRoom, examNum, examSeatNum })
})

app.listen(3012, () => {
    console.log('server is listening on port 3012');
})