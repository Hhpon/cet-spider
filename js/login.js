const axios = require('axios')
const { _URL_ } = require('../config/config')

async function login(userName, idCard, charCode, cookie) {

    const loginOption = {
        method: 'post',
        url: `${_URL_}/Home/ToQuickPrintTestTicket`,
        data: {
            'provinceCode': 23,
            'IDTypeCode': 1,
            'IDNumber': idCard,
            'Name': userName,
            'verificationCode': charCode,
        },
        headers: {
            Accept: '*/*',
            'Cache-Control': 'max-age=0',
            Cookie: cookie,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362'
        },
    }

    let loginRet = await axios(loginOption)

    console.log(loginRet.data);

}

module.exports = login

// axios({
//     method: 'post',
//     url: 'http://cet-bm.neea.edu.cn/Home/ToQuickPrintTestTicket',
//     data: {
//         'provinceCode': 23,
//         'IDTypeCode': 1,
//         'IDNumber': 232303199909286815,
//         'Name': 杜欣铭,
//         'verificationCode': s0qm,
//     }
// })