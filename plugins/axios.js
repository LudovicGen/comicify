import CryptoJS from 'crypto-js'

export default ({ $axios, $config: { browserBaseURL, publicKey, secretKey } }) => {
  const ts = new Date().getTime()
  const message = ts + secretKey + publicKey
  const hash = CryptoJS.MD5(message)

  $axios.defaults.baseURL = browserBaseURL
  $axios.defaults.params = { ts, apikey: publicKey, hash: hash.toString() }
}
