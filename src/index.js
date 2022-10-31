import { ethers } from "ethers";
import "react-native-get-random-values";

export const NETWORKS = {
  mainnet: "homestead",
  testnet: "rinkeby",
};

export function createWallet(network, { mnemonic, privateKey } = {}) {
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

export function validateNetwork(network) {
  if (!Object.values(NETWORKS).includes(network)) {
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
