const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("813");
  await domainContract.deployed();

  console.log("Contract owner:", owner.address);
  let txn = await domainContract.register("robbingU",  {value: hre.ethers.utils.parseEther('1111')});
  await txn.wait();
  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  try {
    txn = await domainContract.connect(robbingU).withdraw();
    await txn.wait();
  } catch(error){
    console.log("Drats. Couldn't rob the contract");
  }
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();
  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log("Contract balance post withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner post withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
