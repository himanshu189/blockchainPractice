// bitcoin wallet
const bip39 = require("bip39");
const bip32 = require("bip32");
const bitcoin = require("bitcoinjs-lib");

const network = bitcoin.networks.testnet; // networks.testnet for test purpose else networks.bitcoin

// `m/44'/1'/0'/0` -> for test network
// `m/44'/0'/0'/0` -> for other network
const path = `m/44'/1'/0'/0`;

let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);
let root = bip32.fromSeed(seed, network);

let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

console.log(`wallet generated : 

Address : ${btcAddress},
key : ${node.toWIF()},
Mnemonic : ${mnemonic}

`);

// console.log(bitcoin)

// var key = bitcoin.ECKey.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
// console.log(key.pub.getAddress().toString());


/*
The Key will be printed in WIF format as we used the toWIF() method. We can also obtain the base58 format by using the toBase58() method.

check account 
https://live.blockcypher.com/btc-testnet/address/mmNUN1HEHgN8DCiSPkz5L47BUscxSyXDyX/

*/
