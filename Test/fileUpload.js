const fs = require('fs');
//https://github.com/bitinn/node-fetch
const fetch = require('node-fetch');
//https://github.com/form-data/form-data
const FormData = require('form-data');

let fileStream = fs.readFileSync("/Users/swl/Desktop/2020-08-06.png");//读取文件
let formdata = new FormData();
formdata.append("up_file", fileStream, {
    filename: "./2020-08-06.png",//上传的文件名
    // filepath: 'test.jpg',
    contentType: 'image/png',//文件类型标识
   //knownLength: fileStream.length
});
fetch("http://127.0.0.1:9091/project/fileupload", {
    body: formdata,
    method: "POST",//请求方式
    headers: formdata.getHeaders()
}).then((res) => {
    return res.text();
}).then(console.log).catch(a=>console.log(a)); 