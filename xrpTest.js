
const { RippleAPI } = require('ripple-lib');

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

async function wall(){
  api.connect().then(async(data)=>{
    const wallet = await  api.generateAddress();
    console.log(wallet) 
 api.disconnect()
  })

}
wall()

// https://test.bithomp.com/explorer/rLvC2SfoGyBiA6A95QAsWsiyTMvKPyR9Dx
