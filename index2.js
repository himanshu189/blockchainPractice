const { EthHdWallet } = require('eth-hd-wallet')
var hdkey = require("ethereumjs-wallet/hdkey")
var bip39 = require("bip39");

const mnemonic = bip39.generateMnemonic(); //generates string
console.log(`mnemonic: ${mnemonic}`);

const wallet = EthHdWallet.fromMnemonic(mnemonic);
let address = wallet.generateAddresses(1);
console.log(`EthHdWallet Address: ${address}`);

bip39.mnemonicToSeed(mnemonic).then(seed =>{
  // console.log(seed);
  var path = `m/44'/60'/0'/0/0`;
  var hdwallet = hdkey.fromMasterSeed(seed);
  var wallet = hdwallet.derivePath(path).getWallet();
  var address2 = "0x" + wallet.getAddress().toString("hex");
  var privateKey = wallet.getPrivateKey().toString("hex");
  console.log(`ethereumjs-wallet address: ${address2}`);
});