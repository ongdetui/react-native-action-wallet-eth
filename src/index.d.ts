

export function createWallet( network: "homestead" | "rinkeby",
{ mnemonic, privateKey }: { mnemonic?: string; privateKey?: string }): any;

export function validateNetwork (network:  "homestead" | "rinkeby") : string | void;
export function validateAddress (address: string) : string | void;
export function validateMnemonic (mnemonic: string) : string | void;
export function validatePrivateKey (privateKey: string) : string | void;
