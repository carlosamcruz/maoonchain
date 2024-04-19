import { bsv } from 'scryptlib';
import { AddressOption, Network, PublicKeysOrAddressesOption, UTXO, SignaturesOption, SignatureHashType } from './types';
import { UtxoQueryOptions } from './abstract-provider';
export declare function getDummyP2pkhUTXOs(count?: number): UTXO[];
export declare function getRandomAddress(network?: bsv.Networks.Network): bsv.Address;
export declare function utxoFromOutput(tx: bsv.Transaction, outputIndex: number): UTXO;
export declare function parseAddresses(publicKeysOrAddresses: PublicKeysOrAddressesOption, network: Network): AddressOption[];
export declare function parseSignatureOption(signaturesOption: SignaturesOption | PublicKeysOrAddressesOption, network: Network): {
    address: AddressOption;
    sigHashType: SignatureHashType;
}[];
export declare function filterUTXO(utxos: UTXO[], options: UtxoQueryOptions): bsv.Transaction.IUnspentOutput[];
