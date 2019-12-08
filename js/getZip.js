const axios = require('axios')
const { _URL_ } = require('../config/config')
const qs = require('querystring')
const JSZip = require('jszip')
const PDFParser = require('pdf2json')
const fs = require('fs')

function zipPromise(pdfRet) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1)
        pdfParser.parseBuffer(pdfRet)
        pdfParser.on('pdfParser_dataError', errData => reject(new Error(errData.parserError)));
        pdfParser.on('pdfParser_dataReady', () => {
            let data = pdfParser.getRawTextContent();
            resolve(data)
        });
    })
}

async function getZip(cookie, SID) {
    const createZipOption = {
        url: `${_URL_}/Home/CreateTestTikcetFile`,
        method: 'post',
        data: {
            SID: SID
        },
        transformRequest: [function (data) {
            data = qs.stringify(data)
            return data
        }],
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Cookie: cookie,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
    let ret = await axios(createZipOption)
    const zipOption = {
        url: `${_URL_}/Home/DownTestTicket`,
        params: {
            SID: SID
        },
        responseType: 'arraybuffer',
        headers: {
            Accept: 'text/html, application/pdf; q=0.9, */*; q=0.8',
            Cookie: cookie,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362'
        }
    }
    const zip = new JSZip()

    let zipRet = await axios(zipOption)
    let unZipRet = await zip.loadAsync(zipRet.data)
    let pdfRet = await zip.file(Object.values(unZipRet.files)[0].name).async('arraybuffer')
    let pdfData = await zipPromise(pdfRet)
    return pdfData
}

module.exports = getZip
