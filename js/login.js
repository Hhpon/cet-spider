const axios = require('axios')
const { _URL_ } = require('../config/config')
const qs = require('querystring')

async function login(userName, idCard, charCode, cookie) {
    console.log(charCode);

    const loginOption = {
        method: 'post',
        url: `${_URL_}/Home/ToQuickPrintTestTicket`,
        data: {
            provinceCode: 23,
            IDTypeCode: 1,
            IDNumber: idCard,
            Name: userName,
            verificationCode: charCode
        },
        transformRequest: [function (data) {
            console.log(data)
            data = qs.stringify(data)
            console.log(data);
            return data
        }],
        headers: {
            Accept: '*/*',
            'Cache-Control': 'max-age=0',
            Cookie: cookie,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Host: 'cet-bm.neea.edu.cn',
            Origin: 'http://cet-bm.neea.edu.cn',
            Referer: 'http://cet-bm.neea.edu.cn/Home/QuickPrintTestTicket',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362',
            'X-Requested-With': 'XMLHttpRequest'
        },
    }

    let loginRet = await axios(loginOption)

    console.log(loginRet);

    return loginRet.data
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