var CoinKey = require('coinkey')    //1.0.0
var coinInfo = require('coininfo')  //0.1.0
const { default: axios } = require("axios");
const bitcore = require('bitcore-lib-doge')
var dogeInfo = coinInfo('DOGE-TEST').versions

// var ck = new CoinKey.createRandom(dogeInfo)

// console.log("Private Key (Wallet Import Format): " + ck.privateWif)
// console.log("Private Key (Hex): " + ck.privateKey.toString('hex'))
// console.log("Address: " + ck.publicAddress)

async function checkBalance() {
  try {
    console.log(
      'checking balance'
    );

    const response = await axios.get(
      `https://chain.so/api/v2/get_address_balance/DOGETEST/nerniU3cfGpwBmjtzjDDg7dYURHyVH94ig`
    );
   

console.log(response.data.data.confirmed_balance)

    return response;
  } catch (e) {
    console.error("Oh no! Something went wrong:", e);
  }
}

checkBalance()


async function trans(){
const Transaction =  bitcore.Transaction()
// console.log("2",trans)

let fee = 0;
  let inputCount = 0;
  let outputCount = 2;
  const utxos = await axios.get(
    `https://chain.so/api/v2/get_tx_unspent/DOGETEST/nerniU3cfGpwBmjtzjDDg7dYURHyVH94ig`
  );

    console.log("UTXOS", utxos.data.data);

  const transaction = new bitcore.Transaction();
  let totalAmountAvailable = 0;

  let inputs = [];
  utxos.data.data.txs.forEach(async (element) => {
    let utxo = {};
    utxo.satoshis = Math.floor(Number(element.value) * 100000000);
    utxo.script = element.script_hex;
    utxo.address = utxos.data.data.address;
    utxo.txId = element.txid;
    utxo.outputIndex = element.output_no;
    totalAmountAvailable += utxo.satoshis;
    inputCount += 1;
    inputs.push(utxo);
  });

  console.log(inputs)

// var simpleUtxoWith10DOGE = {
//   address: fromAddress,
//   txId: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
//   outputIndex: 0,
//   script: Script.buildPublicKeyHashOut(fromAddress).toString(),
//   satoshis: 10e8
// };

// transactionSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;
// // Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte

// fee = transactionSize * 20;
  var amount= 10

// if(bal< amount + fee/10e8 ){
// console.log("low balance")
//   return
// }


var tx =bitcore.Transaction()
      .from(inputs)
      .to([{address: "nXBKoApELM2hwjX2rMGGH1oPvHMNj2f2L2", satoshis: amount*100000000}])
      .change("nerniU3cfGpwBmjtzjDDg7dYURHyVH94ig")
      .sign("ch9D9G9yRqVirouuHSc5hxZvbcTbsibxqSbHqtyxtqCiPmgsv5EM");

        var fees= tx.getFee()
      console.log("tx",fees)

      var txs = tx.fee(fees)
      .sign("ch9D9G9yRqVirouuHSc5hxZvbcTbsibxqSbHqtyxtqCiPmgsv5EM");

      // console.log(transaction.isFullySigned().should.equal(true))

      try{
        var data={tx_hex:txs.serialize()}
        var result = await axios.post("https://chain.so/api/v2/send_tx/DOGETEST",data)
        console.log("res",result.data)

      }
      catch(e){
        console.log("error",e.message)
      }
}
trans()


// transaction.getFee()