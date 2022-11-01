export function createWallet(
  network: "homestead" | "rinkeby",
  { mnemonic, privateKey }: { mnemonic?: string; privateKey?: string }
): any;

export function validateNetwork(
  network: "homestead" | "rinkeby",
  listNetwork?: string[]
): string | void;
export function validateAddress(address: string): string | void;
export function validateMnemonic(mnemonic: string): string | void;
export function validatePrivateKey(privateKey: string): string | void;

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
