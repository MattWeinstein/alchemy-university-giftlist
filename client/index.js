const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const merkleTree = new MerkleTree(niceList)  // Create merkle tree of the nicelist
  const merkleTreeRoot = merkleTree.getRoot() // Use this function to hardcode merkle root into server
  const randomPersonIndex = Math.floor(Math.random() * niceList.length) // Create a proof for a random person to test
  const merkleTreeProof = merkleTree.getProof(randomPersonIndex)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    // Send the person and associate proof to server
    proof: merkleTreeProof,
    leaf: niceList[randomPersonIndex]
  });

  console.log({ gift });
}

main();