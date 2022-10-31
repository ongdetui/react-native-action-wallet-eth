export default interface WalletEth {
  createWallet: (
    network: "homestead" | "rinkeby",
    { mnemonic, privateKey }: { mnemonic: string; privateKey: string }
  ) => any;
  validateNetwork: (network:  "homestead" | "rinkeby") => string | void;
  validateAddress: (address: string) => string | void;
  validateMnemonic: (mnemonic: string) => string | void;
  validatePrivateKey: (privateKey: string) => string | void;
}
