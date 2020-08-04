const uuidV4 = require('uuid/v4');
const path = "./Source"+"/A.js"
const fs = require("fs");
const a = require(path).A;

console.log(a);
console.log(new a())
console.log(uuidV4())

debugger
