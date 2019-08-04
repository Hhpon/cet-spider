const express = require('express')
const bodyParser = require('body-parser')
const getLoginOption = require('./js/getLoginOption')
const login = require('./js/login')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/getLoginOption', async (req, res) => {
    console.log('object');
    let loginOptionRet = await getLoginOption()
    console.log(loginOptionRet);
    res.send(loginOptionRet)
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    let userInfo = req.body
    await login(userInfo.userName, userInfo.idCard, userInfo.charCode, userInfo.cookie)
    res.send('收到')
})

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})