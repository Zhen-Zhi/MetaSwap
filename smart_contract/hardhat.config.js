require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/yNxNsZRT9Wkp4KnPtToNqO2YbLNyHGPo",
      accounts: ['9dc79ca1a398fd6f9d764598e2d05dff11d7e0465d3c3bbae3ccf6180ce6ba43']
    }
  }
};
