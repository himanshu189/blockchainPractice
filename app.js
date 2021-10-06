// https://rinkeby.infura.io/v3/e98dfb21b3c1444f93c017098a301175

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const Web3 = require("web3"); //to connect node with blockchain
const ETx = require("ethereumjs-tx").Transaction; //for transactions

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/e98dfb21b3c1444f93c017098a301175"
  )
);
//  helps in connecting API to node js , or to create secure connection between smartcontract and our node backend

const privateKey = Buffer.from(
  "f5ab3aff79650329a518cd478ce6788204ecac5b87bb0e3d1923a04ddbc8a280",
  "hex"
);

const owner = "0xB5501C8128808a6630a5452877fee8D287b693DB"; //account address

const contractAddress = "0xf2168e1ee2aa64c0639ee56921cd0df19ea8a37e";

const contractABI = [
  {
    inputs: [],
    name: "getAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCode",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isGreaterThan45",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "person",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name1",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "age1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "code",
        type: "uint256",
      },
    ],
    name: "setValues",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.get("/getValues", async (req, res) => {
  const name = await contract.methods.getName().call();
  const age = await contract.methods.getAge().call();

  const code = await contract.methods.getCode().call();

  const isGreaterthan = await contract.methods.isGreaterThan45().call();
  res.json({ name,age,code,isGreaterthan });
});
//  contract.methods.isGreaterThan45().call().then(console.log)

app.post("/setValue", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const code = req.body.code;

  let nonce = await web3.eth.getTransactionCount(owner); //nonce is one time number
  const NetworkId = await web3.eth.net.getId();
  //  Contains functions to get information about the current network
  const transferFunction = contract.methods
    .setValues(name, age, code)
    .encodeABI();
  //   .encode is to change json abi in encoded form because rawtx req dasta in encoded form
  // console.log("function of data",transferFunction)
  const rawTx = {
    from: owner,
    to: contractAddress,
    data: transferFunction,
    nonce: nonce,
    value: "0x00000000000000",
    gasLimit: web3.utils.toHex(210000),
    gasPrice: web3.utils.toHex(90000000000),
    chainId: NetworkId,
  };
  // console.log("rawtx",rawTx);
  let transaction = new ETx(rawTx, {
    chain: "rinkeby",
    hardfork: "petersburg",
  });

  transaction.sign(privateKey);
  web3.eth
  .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
  .on("receipt",async (data) => {
    
    // console.log(data.transactionHash);
  const name = await contract.methods.getName().call();
  const age = await contract.methods.getAge().call();
  const code = await contract.methods.getCode().call();
  const isgreater = await contract.methods.isGreaterThan45().call();
    res.send({hash:data.transactionHash,
    name,age,code,isgreater}) ;
  });

 
});

async function Transfer(name, age, code) {
  web3.eth.getBalance(owner).then(console.log);
  // Get the balance of an address at a given block.

  web3.eth.getGasPrice().then(console.log);
  // Returns the current gas price oracle. The gas price is determined by the last few blocks median gas price.

  // 0x2f0fe3876ebfaf4b72159061653c5f450d4f9cd852363093465c78adeac1a1f8
  web3.eth.getTransaction(
    "0x2f0fe3876ebfaf4b72159061653c5f450d4f9cd852363093465c78adeac1a1f8",
    console.log
  );

  // 0x2f0fe3876ebfaf4b72159061653c5f450d4f9cd852363093465c78adeac1a1f8

  web3.eth.getTransactionReceipt(
    "0x2f0fe3876ebfaf4b72159061653c5f450d4f9cd852363093465c78adeac1a1f8",
    console.log
  );

  let nonce = await web3.eth.getTransactionCount(owner); //nonce is one time number
  const NetworkId = await web3.eth.net.getId();
  //  Contains functions to get information about the current network
  const transferFunction = contract.methods
    .setValues(name, age, code)
    .encodeABI();
  //   .encode is to change json abi in encoded form because rawtx req dasta in encoded form
  // console.log("function of data",transferFunction)
  const rawTx = {
    from: owner,
    to: contractAddress,
    data: transferFunction,
    nonce: nonce,
    value: "0x00000000000000",
    gasLimit: web3.utils.toHex(210000),
    gasPrice: web3.utils.toHex(90000000000),
    chainId: NetworkId,
  };
  // console.log("rawtx",rawTx);
  let transaction = new ETx(rawTx, {
    chain: "rinkeby",
    hardfork: "petersburg",
  });

  transaction.sign(privateKey);

  // web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), (err, hash) => {
  //     if (err) {
  //         console.log(err);
  //     }
  //     else {
  //         console.log("Token transfer successful.");
  //         console.log("Transaction Hash : " + hash);
  //         console.log("====================");
  //         console.log("Tokens transferred from " + owner );
  //         contract.methods.getName().call().then(console.log)
  //         contract.methods.getAge().call().then(console.log)
  //         contract.methods.getCode().call().then(console.log)
  //         contract.methods.isGreaterThan45().call().then(console.log)

  //         return hash;
  //     }
  // });
  // console.log("serialize", transaction)

  // The serialize function is used to convert the javascript transaction object into an RLP encoding of the transaction. The RLP encoding processes use a standard method to encodes structures/objects into bytes in a way that they can be sent and understood from one application/library to another - independent of the language they are using.

  web3.eth
    .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
    .on("receipt", (data) => {
      console.log(data.transactionHash);
      contract.methods.getName().call().then(console.log);
      contract.methods.getAge().call().then(console.log);
      contract.methods.getCode().call().then(console.log);
      contract.methods.isGreaterThan45().call().then(console.log);
      return data.transactionHash;
    });
}

//  Transfer();


async function test(){
 const acc =await web3.eth.accounts.create();
console.log(acc)


web3.eth.getAccounts()
.then(console.log);

}
test();

app.listen(3001, () => console.log("server started"));


