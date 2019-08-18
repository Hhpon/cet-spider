const axios = require('axios')
const { _URL_ } = require('../config/config')
const qs = require('querystring')
const JSZip = require('jszip')
const PDFParser = require('pdf2json')
const fs = require('fs')

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
        // responseType: 'arraybuffer',
        // transformResponse(data) {
        //     return data.toString('base64');
        // },
        headers: {
            Accept: 'text/html, application/xhtml+xml, application/xml; q=0.9, */*; q=0.8',
            Cookie: cookie,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362'
        }
    }

    let zipRet = await axios(zipOption)

    console.log(zipRet.data);

    let pdfRet = await JSZip.loadAsync(zipRet.data)

    let bufferPdf = Object.values(pdfRet.files)[0]._data.compressedContent;

    console.log(bufferPdf);

    fs.writeFile('213.pdf', bufferPdf, (err) => {
        console.log(err);
    })

    // var pdfParser = new PDFParser(this, 1);
    // pdfParser.parseBuffer(zipRet.data);
    // pdfParser.on('pdfParser_dataError', errData => { console.log('123', new Error(errData.parserError)) });
    // pdfParser.on('pdfParser_dataReady', () => {
    //     let data = pdfParser.getRawTextContent();
    //     console.log(data);
    // });

    // return Object.values(pdfRet.files)[0]._data.compressedContent
}

module.exports = getZip
