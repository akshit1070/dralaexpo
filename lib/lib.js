const ethers = require("ethers");
const Web3 = require("web3");
//const tokenabi = require('./token.json')
const db = require("../public/javascripts/index");
let provider;



// Create a new Web3 instance using the QuorumRPC instance
const web3 = new Web3("http://162.243.168.167:22000");

const initializeWeb3 = async () => {
  try {
    provider = new ethers.providers.JsonRpcProvider(
      "http://162.243.168.167:22000"
    );
  } catch (error) {
    console.log(":: INITIALIZE_WEB3_ERROR :: ");
  }
};



let bnum;
let i=0;
const getblock = async () => {
  let status = false;
  try {

    blockNumber = await web3.eth.getBlockNumber();


  // web3.eth.getBlock( Number(currentBlock), function(block){
 console.log(blockNumber);
  //  let blockNumber= await provider.getBlockNumber()
  //  console.log(blockNumber)
    
      if(bnum==blockNumber)
      {
        setTimeout(getblock, 500);
      }
      else
      {
       // await blockdetalnum(blockNumber);
       try{
     //  block = await provider.getBlock(949);
      // console.log("jhbjhbhj",blockNumber)
        await blockdetalnum(blockNumber)
        bnum = blockNumber;
        setTimeout(getblock, 500);
       }
       catch(e){
        console.log(e)
       }

     }

  } catch (error) {
    // console.log(":: ERROR :: ", error);

    return {
      status: status,
      message: error.reason,
    };
  }
};

const blockdetalnum = async (bnum) => {
  let status = false;
  let tx;
  //console.log("sssssssssssssssssssssssssssssssssssssss")
  try {
   // block = await provider.getBlock(959);
   const block = await web3.eth.getBlock(bnum);

   //let block=await  web3.eth.getBlock(BigInt(bnum))
   // console.log("dvfddfssdfdfs",block)

      let time = block.timestamp;
      let length = block.transactions.length;
      status = true;
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          let a = await txdetalil(block.transactions[i]);
            await db.txdata(
              a.tran.hash,
              a.tran.blockNumber,
              a.tran.confirmations,
              a.tran.from,
              Number(a.tran.gasPrice._hex),
              a.tran.to,
              Number(a.tran.value._hex),
              a.tran.nonce,
              a.tran.chainId,
              a.tranr.status,
              time,
              Number(a.tranr.gasUsed._hex),
              Number(a.tran.gasLimit._hex)
            );
      }

          }
  } catch (error) {
    console.log(":: ERRO3R :: ", error);
    return error;
  }
};

const txdetalil = async (txhash) => {
  let status = false;
  let tx;
  let txr;
  try {
    await initializeWeb3();

    await provider.getTransaction(txhash).then(function (transaction) {
     //   console.log(transaction);
      tx = transaction;
    });

    await provider
      .getTransactionReceipt(txhash)
      .then(function (transactionReceipt) {
     //     console.log(transactionReceipt);
        txr = transactionReceipt;
      });

    status = true;

    return {
      status: status,
      tran: tx,
      tranr: txr,
    };
  } catch (error) {
  //  console.log(":: ERROR :: ", error);

    return {
      status: status,
      message: error.reason,
    };
  }
};



const all = async () => {
  await initializeWeb3();
  await getblock();
 //await blockdetalnum(1073n);
};
all();

module.exports = {
  getblock,
  blockdetalnum,
  txdetalil
  
};