const express = require('express')
const bodyParser = require('body-parser')
const getLoginOption = require('./js/getLoginOption')
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
    console.log(userInfo);
    await login(userInfo.userName, userInfo.idCard, userInfo.charCode, userInfo.cookie)
    res.send('收到')
})

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})