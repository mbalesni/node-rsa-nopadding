const fs = require('fs')
const NodeRSA = require('node-rsa')
const constants = require('constants')

const { RSA_NO_PADDING } = constants

const PUBLIC_KEY  = fs.readFileSync('./public_key.pem').toString()
const PRIVATE_KEY  = fs.readFileSync('./private_key.pem').toString()

;(async () => {
    const data = 'Hello world!'
    console.log('\nData: ', data)

    const encrypted = await encrypt(data, PUBLIC_KEY)
    console.log('\nEncrypted: ', encrypted)

    const decrypted = await decrypt(encrypted, PRIVATE_KEY)
    console.log('\nDecrypted: ', decrypted)
    console.log()
})()

async function encrypt(data, key, encoding = 'base64') {
  try {
    const k = new NodeRSA()
    k.importKey(key, 'public')
    k.setOptions({
      encryptionScheme: {
        scheme: 'pkcs1',
        padding: RSA_NO_PADDING,
        toString: function () {
          return 'pkcs1-nopadding'
        }
      }
    })
    return k.encrypt(data, encoding)
  } catch (err) {
    console.log(err.message)
  }
}

async function decrypt(cipherText, key, encoding = 'utf8') {
  try {
    const k = new NodeRSA()
    k.importKey(key, 'private')
    k.setOptions({
      encryptionScheme: {
        scheme: 'pkcs1',
        padding: RSA_NO_PADDING,
        toString: function () {
          return 'pkcs1-nopadding'
        }
      }
    })
      return k.decrypt(cipherText, encoding)
    } catch (err) {
      console.log(err.message)
    }
}