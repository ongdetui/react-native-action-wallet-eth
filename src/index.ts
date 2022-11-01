import axios from "axios";
import { ethers } from "ethers";
import "react-native-get-random-values";

export const NETWORKS = {
  mainnet: "homestead",
  testnet: "rinkeby",
};

export function createWallet(
  network: string,
  {
    mnemonic,
    privateKey,
  }: {
    mnemonic?: string;
    privateKey?: string;
  } = {}
) {
  validateNetwork(network);

  let wallet;

  if (privateKey) {
    const pk = privateKey.startsWith("0x") ? privateKey : "0x" + privateKey;

    validatePrivateKey(pk);

    wallet = new ethers.Wallet(pk);
  } else if (mnemonic) {
    validateMnemonic(mnemonic);

    wallet = ethers.Wallet.fromMnemonic(mnemonic);
  } else {
    wallet = ethers.Wallet.createRandom();
  }

  return wallet.connect(ethers.getDefaultProvider(network));
}

export function validateNetwork(network, listNetwork?: string[]) {
  if (!Object.values(listNetwork ? listNetwork : NETWORKS).includes(network)) {
    throw "Invalid network";
  }
}

export function validateAddress(address) {
  try {
    ethers.utils.getAddress(address);
  } catch (e) {
    throw "Invalid address";
  }
}

function validateMnemonic(mnemonic) {
  if (!ethers.utils.isValidMnemonic(mnemonic)) {
    throw "Invalid mnemonic";
  }
}

export function validatePrivateKey(privateKey) {
  if (!privateKey.match(/^0x[0-9A-fa-f]{64}$/)) {
    throw "Invalid privateKey";
  }
}

export function validateWallet(wallet) {
  if (!wallet || !wallet.provider) {
    throw "Invalid wallet";
  }
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
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};
