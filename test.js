
var Wallet = require('ethereumjs-wallet');
let hdkey = require('ethereumjs-wallet/hdkey');
var EthUtil = require('ethereumjs-util');
let bip39 = require("bip39");

const mnemonic = "soldier clump basket brain suit wire whisper equip aim neck kangaroo rely";

// hd wallet from mnemonic
let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));

// master key
console.log('master private key: ' + hdwallet.privateExtendedKey())
let wallet_hdpath = "m/44'/60'/0'/0/";

// generate wallets
for (let i = 0; i < 5; i++) {
  let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
  let address = wallet.getAddressString();
  console.log('address-' + i + ': ' + address);}