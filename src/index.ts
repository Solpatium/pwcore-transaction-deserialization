import {RPC, transformers} from '@lay2/pw-core';
import * as fs from 'fs';
import {deserializeTransaction} from './lib';

async function parseTx() {
  const rpc = new RPC('https://testnet.ckb.dev');
  const txBody = fs.readFileSync('./src/tx.json').toString();
  // console.log('txBody', txBody);
  const txJson = JSON.parse(txBody);

  const tx = await deserializeTransaction(txJson, [], rpc);

  const serializedTx1 = transformers.TransformTransaction(tx);
  const serializedTx2 = transformers.TransformTransaction(txJson);

  console.log('json1', JSON.stringify(serializedTx1));
  console.log('json2', JSON.stringify(serializedTx2));

  if (JSON.stringify(serializedTx1) !== JSON.stringify(serializedTx2)) {
    throw new Error(`deserialize tx for pwcore failed`);
  }

  console.log('deserialize tx for pwcore success');
}

parseTx();
