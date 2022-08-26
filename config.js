const packageJson = require('./package.json')
const { isProd } = require('./abc.config')
const isProdData = isProd
const hostname = isProdData ? 'bitxyz.io' : '127.0.0.1:21000'

module.exports = {
  isProdData,
  appNmae: packageJson.name,
  hostname,
  domain: `https://${hostname}/`,
  servicesApi: isProdData ? 'https://register-api.didname.jp/v1' : 'https://register-api.didname.jp/v1',
  crossEthApi: isProdData ? 'https://main-cross-api.did.id/v1' : 'https://main-cross-api.did.id/v1',
  identiconServe: 'https://identicons.did.id/identicon/',
  didtop: isProdData ? 'https://did.top' : 'https://test.did.top',
  homepage: isProdData ? 'https://data.did.id' : 'https://testdata.did.id',
  dasBalance: isProdData ? 'https://balance.did.id' : 'https://testbalance.did.id',
  ckbNode: isProdData ? '' : ''
}
