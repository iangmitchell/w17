const { artifacts } = require('hardhat');
const path = require('path');

async function main(){
  //create an instance of countertoken contract
  //const factory = await ethers.getContractFactory('CounterToken')
  //const token = await factory.attach('0x5fbdb2315678afecb367f032d93f642f64180aa3');
  const Token = await ethers.getContractFactory("CounterToken");
  const token = await Token.deploy();
  await token.deployed();
  for(i=0;i<10;i++){
    await token.increment();
  }
  console.log('*************************')
  console.log('Token address:',token.address); 
  let counter = await token.counter();
  console.log('*************************')
  console.log('Counter:',counter);
  console.log('*************************')
  console.log('Writing files to client/src/artifacts');
  initialiseFiles(token);
  console.log('*************************')
}

function initialiseFiles(token){
  const fs = require("fs");
  const artifactsDir= path.join(__dirname, "..", "client", "src", "artifacts");
  //if directory does not exist, then create it
  if (!fs.existsSync(artifactsDir))
  { fs.mkdirSync(artifactsDir)}
  fs.writeFileSync( path.join(artifactsDir, "contractAddress.json"), JSON.stringify({Token: token.address}, null, 2))
  const TokenArtefact = artifacts.readArtifactSync("CounterToken");
  fs.writeFileSync(
    //artifacts directory and filename
    path.join(artifactsDir, "Token.json"),
    //stringify with indent 2, null is standard
    JSON.stringify(TokenArtefact.abi, null, 2)
  )
}

main()
  .then(()=> process.exit(0))
  .catch(error=> {
    console.log(error);
    process.exit(1);
})
