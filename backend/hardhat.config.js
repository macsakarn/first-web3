require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/IcQDwKSG8AUtAXvnIsw6U7HGi-BN4dpy',
      accounts: ['0x53FD4097CAa080Ad754836DBa4A7b8B991aABf97'],
    },
  },
};
