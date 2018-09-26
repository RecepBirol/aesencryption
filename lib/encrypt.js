const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

const getCipherKey = require('./getCipherKey');

function encrypt(filePath, pwd) {
    //const initVect = crypto.randomBytes(16)

    // Generate a cipher key from the password.
    const CIPHER_KEY = getCipherKey(pwd)
    const readStream = fs.createReadStream(filePath)
    const cipher = crypto.createCipher('aes256', CIPHER_KEY) // ('aes256', CIPHER_KEY, initVect)
    //const appendInitVect = new AppendInitVect(initVect)

    const writeStream = fs.createWriteStream(path.join(filePath + '.enc'))

    readStream
        .pipe(cipher)
        //.pipe(appendInitVect)
        .pipe(writeStream)
}

module.exports = encrypt