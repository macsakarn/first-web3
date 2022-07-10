require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/IcQDwKSG8AUtAXvnIsw6U7HGi-BN4dpy',
      accounts: ['ea1f4a22ae9c9e7392d52492feb31bf9af20ad8519fa19c70eb1bd135c2914b5'],
    },
  },
};
