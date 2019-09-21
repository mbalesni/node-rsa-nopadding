const fs = require('fs')
const NodeRSA = require('node-rsa')
const constants = require('constants')
const atob = require('atob')
const btoa = require('btoa')

const { RSA_NO_PADDING } = constants

const PUBLIC_KEY1   = fs.readFileSync('./pbkey1.pem').toString()
const PUBLIC_KEY2   = fs.readFileSync('./pbkey2.pem').toString()
const PRIVATE_KEY1   = fs.readFileSync('./private_key1.pem').toString()
const PRIVATE_KEY2   = fs.readFileSync('./private_key2.pem').toString()

// const orderB64      = `WzUsMywyLDQsMV0=`
// const orderString   = atob(orderB64)
// const saltFromVerQr = `ODVkMzRlMzY4ODQ5ODE4ZmU1NGM0NWJhNmQ2ZGVkN2ZkODAwYzVjNTk3Mjk3Y2M0ZWQzYWI2NmI1MDcwZGM0MWUyYjEwYjg4NGM3YjFkNTY3OTE1NDgzM2Y4MzYyY2Zj`
// const saltUTF8      = atob(saltFromVerQr)

const double_envelope = "X+LjCFZ5Pg5TuBYquxtQH4SMtoglc3iTauBv08YBpulLWCtpNmFyHlIcWpeZAOELO9eXEmgxc0VZHO4s06fWZ6N6iCYLiFFfjbbm8f81FkWjsaZrwadILpNXhYeXJeCBhLQ0ddn6SloQi7Tq3lw+7tKv8pm8B0vYRbtQH2A4ulmo6cbwuVIOPZXEvOWsaMccBFRUOfurqvEROfm5HZH8drWgQAOT5J/EHxYJ86j6pLRY7Yq0IBu384FzSQTWh0x0VloBg1KVS87A7oiMB0H/yRb476DiwWxsJtjtEeyaPdphqEtbEQ4gdWJ8SySScsYOUCfiRDV8UIf5Oy/rk4cdlmZhLE9IOcmsRr3fAp/1iO/xUYdGe/JkyU/rjY6Tk6v6YvAWkvfUnW+NuWonELv1LIA09H2tTs0vmPBSjOXQt79OdqeUUmZMtxkrWzWWUO0Qf+jN8jK1lrdzRGc5KyWCUvaZNnFRnHYx5yXR2vWF9OOcoLHoLG/PafLl0WTWIVTsT1hwyN9tfG3/Db53gwVv/Xlc5dQYMtEIHRY+8wT8mKftSef21Dm9henG8Lt2NkqX5DHzQTJ19u9kgomXIPnlO9vRi5YFAlWL87smG1Cpnash0B6dWZv+vHM0Rq5CN2v7NOWQ7WgRqRAvFtJHgKyrKKxHqoJlJZu2d1ouojFYbbg="

;(async () => {

  console.log(decrypt(double_envelope, PRIVATE_KEY2))
  // const encryptedOrder = await encrypt(
  //   orderString + '//' + saltUTF8,
  //   PUBLIC_KEY1,
  // )

  // const denvelope      = await encrypt(
  //   btoa('5') + ':' + encryptedOrder,
  //   PUBLIC_KEY2
  // )

  // console.log(denvelope)
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
    return k.encrypt(data, encoding) // returns encrypted data in base64 encoding
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