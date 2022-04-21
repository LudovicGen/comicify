import CryptoJS from 'crypto-js'

export default ({ $axios, $config: { browserBaseURL, apiSecret } }) => {
  const ts = new Date().getTime()
  const secret = process.env.SECRET_KEY
  const message = ts + secret + apiSecret
  const hash = CryptoJS.MD5(message)

  $axios.defaults.baseURL = browserBaseURL
  $axios.defaults.params = { ts, apikey: apiSecret, hash: hash.toString() }
}
