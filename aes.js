const encrypt = require('./encrypt')
const decrypt = require('./decrypt')

const [ mode, file, password ] = process.argv.slice(2)

if (mode === 'encrypt') {
    encrypt(file, password)
}

if (mode === 'decrypt') {
    decrypt(file, password)
}

