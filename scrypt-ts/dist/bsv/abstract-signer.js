"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signer = void 0;
/**
 * A `Signer` is a class which in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to perform operations.
 */
class Signer {
    constructor(provider) {
        this._isSigner = true;
        this.provider = provider;
    }
    /**
     * Get the connected provider.
     * @returns the connected provider.
     * @throws if no provider is connected to `this`.
     */
    get connectedProvider() {
        if (!this.provider) {
            throw new Error(`the provider of signer ${this.constructor.name} is not set yet!`);
        }
        if (!this.provider.isConnected()) {
            throw new Error(`the provider of signer ${this.constructor.name} is not connected yet!`);
        }
        return this.provider;
    }
    /**
     * Sign transaction and broadcast it
     * @param tx A transaction is signed and broadcast
     * @param options The options for signing, see the details of `SignTransactionOptions`.
     * @returns A promise which resolves to the transaction id.
     */
    signAndsendTransaction(tx, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tx.sealAsync();
            const signedTx = yield this.signTransaction(tx, options);
            yield this.connectedProvider.sendTransaction(signedTx);
            return signedTx;
        });
    }
    ;
    /**
     * Get a list of the P2PKH UTXOs.
     * @param address The address of the returned UTXOs belongs to.
     * @param options The optional query conditions, see details in `UtxoQueryOptions`.
     * @returns  A promise which resolves to a list of UTXO for the query options.
     */
    listUnspent(address, options) {
        // Default implementation using provider. Can be overriden.
        return this.connectedProvider.listUnspent(address, options);
    }
    /**
     * Get the balance of BSVs in satoshis for an address.
     * @param address The query address.
     * @returns A promise which resolves to the address balance status.
     */
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            // Default implementation using provider. Can be overriden.
            address = address ? address : yield this.getDefaultAddress();
            return this.connectedProvider.getBalance(address);
        });
    }
    // Inspection
    /**
     * Check if an object is a `Signer`
     * @param value The target object
     * @returns Returns `true` if and only if `object` is a Provider.
     */
    static isSigner(value) {
        return !!(value && value._isSigner);
    }
}
exports.Signer = Signer;
//# sourceMappingURL=abstract-signer.js.map