import {DefaultSigner, RawProvider, RPC} from '@lay2/pw-core';
import * as fs from 'fs';
import {deserializeTransaction} from './lib';

const key =
  '0xc14df13d6c3ad109b101ef9d581b377842a8b31b14fef8efcd21a24c336c49a1';

async function parseTx() {
  const rpc = new RPC('https://testnet.ckb.dev');
  const txBody = fs.readFileSync('./src/tx.json').toString();
  // console.log('txBody', txBody);
  const txJson = JSON.parse(txBody);

  const tx = await deserializeTransaction(txJson, [], rpc);
  console.log('NOT SIGNED');
  console.log(JSON.stringify(tx, null, 2));
  const provider = await new RawProvider(key).init();
  const signer = new DefaultSigner(provider);
  const signed = await signer.sign(tx);
  console.log('SIGNED');
  console.log(JSON.stringify(signed, null, 2));

  // const serializedTx1 = transformers.TransformTransaction(tx);
  // const serializedTx2 = transformers.TransformTransaction(txJson);
  //
  // console.log('json1', JSON.stringify(serializedTx1));
  // console.log('json2', JSON.stringify(serializedTx2));
  //
  // if (JSON.stringify(serializedTx1) !== JSON.stringify(serializedTx2)) {
  //   throw new Error(`deserialize tx for pwcore failed`);
  // }
  //
  // console.log('deserialize tx for pwcore success');
}

parseTx();
