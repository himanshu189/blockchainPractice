

const StellarSdk = require("stellar-sdk");

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')


const sender= 'GCEDRLCL6AEJFSPR5U5VIQR7FFTXCZGSELBK3TJN5DSCOEVXJIS3AF3O'
const senderPrivateKey='SDU5TDGP37UVUQIWNYQS6RIPMLIXVVDD5PGDD5ZHG2C6I4IEL6JNUGB5'
const receiver ='GCZYVBLFKU7VEEBJIUPP7VP53SY4DMDBF3CNSMMAP4U72ZWV6RFF6PGN'


async function transaction1(sender,senderPrivateKey,receiver){
const standardFee = await server.fetchBaseFee();

// transaction options to tell fee and network

const txOptions={
    fee:standardFee,
    networkPassphrase:StellarSdk.Networks.TESTNET
}


const paymentData={
    destination:receiver,
    asset:StellarSdk.Asset.native(),
    amount:'100'
}

const senderAccountDetail = await server.loadAccount(sender);

const transaction = new StellarSdk.TransactionBuilder(senderAccountDetail,txOptions)
.addOperation( StellarSdk.Operation.payment(paymentData))
.setTimeout(30)
.build();

transaction.sign(StellarSdk.Keypair.fromSecret(senderPrivateKey)    );


try {
    // Submit the transaction to the Stellar network.
    const transactionResult = await server.submitTransaction(transaction);
    console.log(transactionResult);

    // recoupLumens(senderPrivateKey);
    
  } catch (e) {
    console.error("Oh no! Something went wrong.");
    
  }
}



transaction1(sender,senderPrivateKey,receiver)