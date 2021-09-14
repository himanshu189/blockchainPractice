var StellarSdk = require('stellar-sdk');

const pair = StellarSdk.Keypair.random();

console.log(pair.secret());
// console.log(pair.publicKey());
const public = pair.publicKey()

async function stell(public){
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// the JS SDK uses promises for most actions, such as retrieving an account
const account = await server.loadAccount(public);
// console.log("Balances for account: " + pair.publicKey());
// account.balances.forEach(function (balance) {
//   console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
// });
}

stell(public)
