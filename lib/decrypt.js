const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const getCipherKey = require('./getCipherKey')

function decrypt(filePath, pwd) {
    // get init vector from the file
    /*
      const readInitVect = fs.createReadStream(filePath, { end: 15 })
  
      let initVect
      readInitVect.on('data', (chunk) => {
          initVect = chunk
      })
  
      readInitVect.on('close', () => {
          const cipherKey = getCipherKey(pwd)
          const readStream = fs.createReadStream(filePath, { start: 16 })
          const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect)
          const unEncFileName = filePath.split('.').slice(0, -1).join('.')
          const writeStream = fs.createWriteStream(unEncFileName)
  
          readStream
              .pipe(decipher)
              .pipe(writeStream)
      })
  */
    const cipherKey = getCipherKey(pwd)
    const readStream = fs.createReadStream(filePath)
    const decipher = crypto.createDecipher('aes256', cipherKey)
    const unEncFileName = filePath.split('.').slice(0, -1).join('.')
    const writeStream = fs.createWriteStream(unEncFileName)

    function handler(e) {
        console.log(e.message)
    }

    readStream.on('error', handler)
        .pipe(decipher)
        .on('error', handler)
        .pipe(writeStream)
        .on('error', handler)

    //     .on('close', () => {
    //         console.log('pipe closed')
    //     })


    // writeStream.on('close', () => {
    //     console.log('decrypt işlemi bitti')
    // })

    // decipher.on('error', (err) => {
    //     console.log(err.message)
    // })

    // writeStream.on('error', (err) => {
    //     console.log(err.message)
    // })

    // readStream.on('error', (err) => {
    //     console.log(err.message)
    // })
}

module.exports = decrypt