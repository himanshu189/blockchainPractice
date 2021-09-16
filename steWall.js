const { default: axios } = require("axios");
const StellarSdk = require("stellar-sdk");
// const fetch = require("node-fetch");
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')

// Create a new keypair.
const pair = StellarSdk.Keypair.random();
// console.log(pair.publicKey())

async function createTestAccount() {
  try {
    console.log(
      "Funding a new account on the test network (takes a few seconds)…"
    );

// https://horizon-testnet.stellar.org
// https://friendbot.stellar.org
    const response = await axios.get(
      `https://friendbot.stellar.org?addr=${pair.publicKey()}`
    );
    // const data = await response.json();
    // console.log("respond",response)

    console.log(`Public Key: ${pair.publicKey()}`);
    console.log(`Secret Key: ${pair.secret()}`);

    // checking balance


    const account =await Promise.all( [server.loadAccount(pair.publicKey())])
    console.log(account[0].balances)

    return "Success! You have a funded Testnet account :)";
  } catch (e) {
    console.error("Oh no! Something went wrong:", e);
  }
}

createTestAccount();

// https://testnet.steexp.com/error/not-found/GDHYB2RY7CYEXZXLRXBCT4IBTTYRW3Q7SCO5LYOE4PVLMQHF4NVRUUKG
// check account here

// const StellarSdk = require("stellar-sdk");

// const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')


// async function checkBalance(publicKey){

//   const account =await Promise.all( [server.loadAccount(publicKey)])
//   console.log(account[0].balances)
// }

// checkBalance(pair.publicKey())
