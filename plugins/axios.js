import CryptoJS from 'crypto-js'

export default ({ $axios, $config: { browserBaseURL, apiSecret } }) => {
  const ts = new Date().getTime()
  const secret = 'c7c10082c0639a0edef515d0e78c507cf22367f3'
  const message = ts + secret + apiSecret
  const hash = CryptoJS.MD5(message)

  $axios.defaults.baseURL = browserBaseURL
  $axios.defaults.params = { ts, apikey: apiSecret, hash: hash.toString() }
}
