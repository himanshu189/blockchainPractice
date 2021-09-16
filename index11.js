var HDKey = require('hdkey')
const bip39 = require('bip39')

const mnemonic = bip39.generateMnemonic()
console.log("mnemonic",mnemonic)

var seed=bip39.mnemonicToSeedSync(mnemonic).toString('hex')

console.log("seed",seed)


var hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
var childkey = hdkey.derive("m/44'/148'/0'/0'")

console.log("root private key ",childkey.privateExtendedKey)
console.log("root public key",childkey.publicExtendedKey)


console.log("private",HDKey.fromExtendedKey(childkey.privateExtendedKey)._privateKey.toString('hex'))
console.log("public",HDKey.fromExtendedKey(childkey.publicExtendedKey)._publicKey.toString('hex'))

console.log("private",HDKey.fromExtendedKey(childkey.privateExtendedKey))
















// const mnemonic = bip39.generateMnemonic();
// console.log(`Mnemonic: ${mnemonic}`);
// const root = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
// const derivedNode = root.derivePath("m/44'/60'/0'/0");
// const address = this.generateAddress(derivedNode);
// console.log(`Private Key: ${root._hdkey.privateKey.toString('hex')}`);

