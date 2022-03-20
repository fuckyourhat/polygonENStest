const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("420");
  await domainContract.deployed();

  console.log("Contract has been deployed to:", domainContract.address);

	let txn = await domainContract.register("FYourHat",  {value: hre.ethers.utils.parseEther('0.1')});
	await txn.wait();
  console.log("Minted domain FYourHat.420");

  txn = await domainContract.setRecord("FYourHat", "Are you testing the 420 domain?");
  await txn.wait();
  console.log("Set record for FYourHat.420");

  const address = await domainContract.getAddress("FYourHat");
  console.log("Owner of domain FYourHat:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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
