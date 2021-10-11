const { RippleAPI } = require('ripple-lib');

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

run().catch(error => console.error(error.stack));

async function run() {
  await api.connect();
  const info = await api.getBalances("rQabe1DnHyfZR5TQyVWJuZBefdmJfGBSMF");

  console.log('Done', info[0].value);
  return api.disconnect()

  // process.exit(0);
}