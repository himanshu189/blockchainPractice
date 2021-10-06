const BlockIo = require('block_io');
const block_io = new BlockIo({api_key:'ed84-f69b-f452-30b8', pin:"himanshutyagi123"});


async function createNewAddress(){
     block_io.get_new_address({})
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.log("Error:", error.message))
}

// createNewAddress()


    // {"status":"success","data":{"network":"DOGETEST","user_id":1,"address":"2MtwNfQZ9BLmzq9B38AfzQrHXpB1wjrJwRH","label":"shibe1"}}

async function getAddressDetail(){
  
    block_io.get_my_addresses({ page: '' }).then(data => console.log(JSON.stringify(data)))
    .catch(error => console.log("Error:", error.message))  
}
// getAddressDetail()



async function getAllAddressBalance(){
  
    block_io.get_balance({  }).then(data => console.log(JSON.stringify(data)))
    .catch(error => console.log("Error:", error.message))  
}
// getAllAddressBalance()




async function getAddressBalance(){
  
    block_io.get_address_balance({ address: '2N8G2rjFe6LNcKCtRVyPAhakdxDV9bjSaqc' }).then(data => console.log(data))
    .catch(error => console.log("Error:", error.message))  

    block_io.get_transactions({ type: 'sent' }).then(data => console.log(data))
    .catch(error => console.log("Error:", error.message))  

}
// getAddressBalance()


async function transactionDoge(){
   const response = await block_io.prepare_transaction({ amounts: '10', from_addresses: '2NBiwahiVsw7862MCYLVyySriYM9EW2Z76t', to_addresses: '2N1KWYQ55aFJD9AdEbqgPG2o7kDYmtGhYdC' , priority: 'high' });

   console.log(response)

//    const response3 = await   block_io.summarize_prepared_transaction({ data: response });

//    console.log(response3)
   
   const response2 = await block_io.create_and_sign_transaction({ data: response, pin: 'himanshutyagi123' });
   console.log(response2)

   const trans = await  block_io.submit_transaction({ transaction_data: response2 });
   console.log("trans",trans
   )

}

transactionDoge()
