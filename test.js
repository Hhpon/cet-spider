const PDFParser = require('pdf2json');
const fs = require('fs')
const src = './dxm.pdf';

var pdfParser = new PDFParser(this, 1);
// pdfParser.parseBuffer(pdfBuffer)
let test = fs.readFileSync(src)
// fs.readFiles(src, (err, pdfBuffer) => {
//     test = pdfBuffer
//     if (!err) {
//         pdfParser.parseBuffer(pdfBuffer);
//     }
// })
console.log(test);
fs.writeFileSync('test.pdf', test)
pdfParser.on('pdfParser_dataError', errData => reject(new Error(errData.parserError)));
pdfParser.on('pdfParser_dataReady', () => {
    let data = pdfParser.getRawTextContent();
    console.log(data);
});