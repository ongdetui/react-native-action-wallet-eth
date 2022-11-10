import "@ethersproject/shims";
import axios from "axios";
import { ethers } from "ethers";
import Config from 'react-native-config';
import "react-native-get-random-values";

export const NETWORKS = {
  mainnet: "homestead",
  testnet: "rinkeby",
};

export const createWallet = async (
  network: string,
  {
    mnemonic,
    privateKey,
  }: {
    mnemonic?: string;
    privateKey?: string;
  } = {}
) => {
  try {
    let wallet;

    if (privateKey) {
      const pk = privateKey.startsWith("0x") ? privateKey : "0x" + privateKey;

      if (!validatePrivateKey(pk)) {
        throw "Invalid private key";
      }

      wallet = new ethers.Wallet(pk);
    } else if (mnemonic) {
      if (!validateMnemonic(mnemonic)) {
        throw "Invalid mnemonic";
      }

      wallet = await ethers.Wallet.fromMnemonic(mnemonic);
    } else {
      wallet = await ethers.Wallet.createRandom();
    }

    return await wallet.connect(ethers.getDefaultProvider(network));
  } catch (error) {
    return {message: error, success: false, data: null};
  }
};

export function validateNetwork(network: string, listNetwork?: string[]) {
  if (!Object.values(listNetwork ? listNetwork : NETWORKS).includes(network)) {
    return false;
  }
  return true;
}

export function validateAddress(address: string) {
  try {
    ethers.utils.getAddress(address);
    return true;
  } catch (e) {
    return false;
  }
}

function validateMnemonic(mnemonic: string) {
  if (!ethers.utils.isValidMnemonic(mnemonic)) {
    return false;
  }
  return true;
}

export function validatePrivateKey(privateKey: string) {
  if (!privateKey.match(/^0x[0-9A-fa-f]{64}$/)) {
    return false;
  }
  return true;
}

export function validateWallet(wallet) {
  if (!wallet || !wallet.provider) {
    return false;
  }
  return true;
}

interface ResponseBalance {
  status: string;
  message: string;
  result: string;
}

interface ResponseHistory {
  status: string;
  message: string;
  result: any[];
}

interface Response {
  status: string;
  message: string;
  result: any;
}

export const getBalance = async (
  network: string,
  address: string
): Promise<ResponseBalance> => {
  try {
    const data = await axios.get(`https://api-${network}.etherscan.io/api`, {
      params: {
        module: "account",
        address: address,
        action: "balance",
        tag: "latest",
        apikey: Config.API_KEY,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};

export const getHistory = async (
  network: string,
  address: string,
  option: {
    startblock: number;
    endblock: number;
    sort: string;
  } = {
    startblock: 0,
    endblock: 99999999,
    sort: "asc",
  }
): Promise<ResponseHistory> => {
  try {
    const data = await axios.get(`https://api-${network}.etherscan.io/api`, {
      params: {
        module: "account",
        address: address,
        action: "txlist",
        startblock: option.startblock ? option.startblock : 0,
        endblock: option.endblock ? option.endblock : 99999999,
        sort: option.sort ? option.sort : "asc",
        apikey: Config.API_KEY,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};

export const getTransaction = async (
  network: string,
  transactionHash: string
): Promise<Response> => {
  try {
    const data = await axios.get(`https://api-${network}.etherscan.io/api`, {
      params: {
        module: "proxy",
        action: "eth_getTransactionByHash",
        txhash: transactionHash,
        apikey: Config.API_KEY,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};
export const getTransactionReceipt = async (
  network: string,
  transactionHash: string
): Promise<any> => {
  try {
    const data = await axios.get(`https://api-${network}.etherscan.io/api`, {
      params: {
        module: "proxy",
        action: "eth_getTransactionReceipt",
        txhash: transactionHash,
        apikey: Config.API_KEY,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};

export const getGasPrice = async (network: string): Promise<any> => {
  try {
    const data = await axios.get(`https://api-${network}.etherscan.io/api`, {
      params: {
        module: "proxy",
        action: "eth_gasPrice",
        apikey: Config.API_KEY,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};

export default {
  getBalance,
  getGasPrice,
  getTransaction,
  getTransactionReceipt,
  getHistory,
  validateWallet,
  validateAddress,
  validateMnemonic,
  validateNetwork,
  validatePrivateKey,
  createWallet,
};
