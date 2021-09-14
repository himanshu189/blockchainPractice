var HDKey = require('hdkey')
const bip39 = require('bip39')
const Web3 = require("web3"); //to connect node with blockchain

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/e98dfb21b3c1444f93c017098a301175"
  )
);
const mnemonic = bip39.generateMnemonic()


var seed=bip39.mnemonicToSeedSync('b').toString('hex')
console.log(bip39.validateMnemonic(mnemonic)) 

console.log("seed",seed)


var hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
var childkey = hdkey.derive("m/44'/148'/0'/0'")

console.log("root private key ",childkey.privateExtendedKey)
console.log("root public key",childkey.publicExtendedKey)


console.log("private",HDKey.fromExtendedKey(childkey.privateExtendedKey)._privateKey.toString('hex'))
console.log("public",HDKey.fromExtendedKey(childkey.publicExtendedKey)._publicKey.toString('hex'))



// 0x875DDc579F4f1527E34D56888E4068b5844e48c6














// const mnemonic = bip39.generateMnemonic();
// console.log(`Mnemonic: ${mnemonic}`);
// const root = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
// const derivedNode = root.derivePath("m/44'/60'/0'/0");
// const address = this.generateAddress(derivedNode);
// console.log(`Private Key: ${root._hdkey.privateKey.toString('hex')}`);

