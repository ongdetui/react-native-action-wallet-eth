## _React-native-action-wallet-eth_

## Features

- [Function create wallet, validate based on ethers.js](#installation)
- [Create Wallet](#create-wallet)
- [getHistory](#gethistory)
- [getBalance](#getbalance)
- More
  - getGasPrice
  - getTransaction
  - getTransactionReceipt
  - validateWallet
  - validateAddress
  - validateMnemonic
  - validateNetwork
  - validatePrivateKey

## Installation

Clone the repo

```sh
git clone https://github.com/ongdetui/react-native-action-wallet-eth.git
```

Install NPM packages

```sh
npm i react-native-action-wallet-eth
```

If use yarn

```sh
yarn add react-native-action-wallet-eth
```

## Create Wallet

```sh
 import {createWallet} from 'react-native-action-wallet-eth'

 // Create new wallet
 await createWallet('rinkeby');

 // Import privateKey
 await createWallet('rinkeby', {privateKey: 'privateKey your'});

 // Re-store wallet
 await createWallet('rinkeby', {mnemonic: 'mnemonic your'});
```

## getHistory

```sh
  import {getHistory} from 'react-native-action-wallet-eth'

  function getHistory(
   network: string,
   address: string,
   option?: {
      startblock?: number;
      endblock?: number;
      sort?: string;
   }
  ): Promise<ResponseHistory>;
```

## getBalance

```sh
  import {getBalance} from 'react-native-action-wallet-eth'

  function getBalance(
   network: string,
   address: string
  ): Promise<ResponseBalance>;
```