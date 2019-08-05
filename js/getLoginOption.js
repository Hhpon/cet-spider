const axios = require('axios')
const { _URL_ } = require('../config/config')

async function getLoginOption() {

    const getCookieOptions = {
        url: `${_URL_}/Home/QuickPrintTestTicket`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362'
        }
    }

    async function getCookie() {
        let cookieRet = await axios(getCookieOptions)
        return cookieRet.headers['set-cookie'][0].split(';')[0]
    }

    let cookie = await getCookie()
    console.log(cookie);

    const getCharCodeOptions = {
        url: `${_URL_}/Home/VerifyCodeImg`,
        params: {
            a: Math.random()
        },
        responseType: 'arraybuffer',
        transformResponse(data) {
            return data.toString('base64');
        },
        headers: {
            Accept: 'image/png, image/svg+xml, image/*; q=0.8, */*; q=0.5',
            Cookie: cookie,
            Referer: 'http://cet-bm.neea.edu.cn/Home/QuickPrintTestTicket',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362'
        },
    }

    async function getCharCode() {
        let charCodeRet = await axios(getCharCodeOptions)
        return charCodeRet.data
    }

    let charCode = await getCharCode()

    return {
        cookie, charCode
    }

}

module.exports = getLoginOption
