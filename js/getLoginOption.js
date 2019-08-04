const axios = require('axios')
const { _URL_ } = require('../config/config')

async function getLoginOption() {

    const getCookieOptions = {
        url: `${_URL_}/Home/QuickPrintTestTicket`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
        }
    }

    async function getCookie() {
        let cookieRet = await axios(getCookieOptions)
        return cookieRet.headers['set-cookie'][0].split(';')[0]
    }

    let cookie = await getCookie()

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
            Cookie: cookie,
            'Content-Type': 'image/jpeg',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
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
