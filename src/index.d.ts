export function createWallet(
  network: "homestead" | "rinkeby" | string,
  { mnemonic, privateKey }: { mnemonic?: string; privateKey?: string }
): any;

export function validateNetwork(
  network: "homestead" | "rinkeby",
  listNetwork?: string[]
): boolean;
export function validateAddress(address: string): boolean;
export function validateMnemonic(mnemonic: string): boolean;
export function validatePrivateKey(privateKey: string): boolean;

export interface ResponseBalance {
  status: string;
  message: string;
  result: string;
}

export interface ResponseHistory {
  status: string;
  message: string;
  result: any[];
}

export interface Response {
  status: string;
  message: string;
  result: any;
}

export function getBalance(
  network: string,
  address: string
): Promise<ResponseBalance>;

export function getTransaction(
  network: string,
  transactionHash: string
): Promise<Response>;

export function getTransactionReceipt(
  network: string,
  transactionHash: string
): Promise<any>;

export function getHistory(
  network: string,
  address: string,
  option?: {
    startblock?: number;
    endblock?: number;
    sort?: string;
  }
): Promise<ResponseHistory>;

export function getGasPrice(network: string): Promise<any>;
