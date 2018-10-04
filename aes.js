const encrypt = require('./lib/encrypt')
const decrypt = require('./lib/decrypt')

const [ mode, file, password ] = process.argv.slice(2)

if (mode === 'encrypt') {
    encrypt(file, password)
}

if (mode === 'decrypt') {
    decrypt(file, password)
}

