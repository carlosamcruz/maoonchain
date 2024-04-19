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
exports.SensiletSigner = void 0;
const scryptlib_1 = require("scryptlib");
const abstract_signer_1 = require("../abstract-signer");
const utils_1 = require("../utils");
/**
 * a [signer]{@link https://docs.scrypt.io/how-to-test-a-contract#signer } which implemented the protocol with the [sensilet wallet]{@link https://sensilet.com},
 * and dapps can use to interact with the Sensilet wallet
 */
class SensiletSigner extends abstract_signer_1.Signer {
    constructor(provider) {
        super(provider);
        if (typeof window.sensilet !== 'undefined') {
            console.log(SensiletSigner.DEBUG_TAG, 'Sensilet is installed!');
            this._target = window.sensilet;
        }
        else {
            console.warn(SensiletSigner.DEBUG_TAG, "sensilet is not installed");
        }
    }
    /**
     * Check if the wallet has been authenticated
     * @returns {boolean} true | false
     */
    isAuthenticated() {
        if (this._target) {
            return this._target.isConnect();
        }
        return Promise.resolve(false);
    }
    /**
     * Request wallet authentication
     * @returns A promise which resolves to if the wallet has been authenticated and the authenticate error message
     */
    requestAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            let isAuthenticated = false;
            let error = '';
            try {
                yield this.getConnectedTarget();
                isAuthenticated = true;
            }
            catch (e) {
                error = e.toString();
            }
            return Promise.resolve({ isAuthenticated, error });
        });
    }
    getConnectedTarget() {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = yield this.isAuthenticated();
            if (!isAuthenticated) {
                // trigger connecting to sensilet account when it's not authorized.
                try {
                    const addr = yield this._target.requestAccount();
                    this._address = scryptlib_1.bsv.Address.fromString(addr);
                }
                catch (e) {
                    throw new Error('Sensilet requestAccount failed');
                }
            }
            return this._target;
        });
    }
    connect(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            // we should make sure sensilet is connected  before we connect a provider.
            const isAuthenticated = yield this.isAuthenticated();
            if (!isAuthenticated) {
                throw new Error('Sensilet is not connected!');
            }
            if (provider) {
                if (!provider.isConnected()) {
                    yield provider.connect();
                }
                this.provider = provider;
            }
            else {
                if (this.provider) {
                    yield this.provider.connect();
                }
                else {
                    throw new Error(`No provider found`);
                }
            }
            return this;
        });
    }
    getDefaultAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const sensilet = yield this.getConnectedTarget();
            const address = yield sensilet.getAddress();
            return scryptlib_1.bsv.Address.fromString(address);
        });
    }
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.getDefaultAddress();
            return address.network;
        });
    }
    getBalance(address) {
        if (address) {
            return this.connectedProvider.getBalance(address);
        }
        return this.getConnectedTarget().then(target => target.getBsvBalance()).then(r => r.balance);
    }
    getDefaultPubKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const sensilet = yield this.getConnectedTarget();
            const pubKey = yield sensilet.getPublicKey();
            return Promise.resolve(new scryptlib_1.bsv.PublicKey(pubKey));
        });
    }
    getPubKey(address) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`Method ${this.constructor.name}#getPubKey not implemented.`);
        });
    }
    signRawTransaction(rawTxHex, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const sigReqsByInputIndex = ((options === null || options === void 0 ? void 0 : options.sigRequests) || []).reduce((m, sigReq) => { m.set(sigReq.inputIndex, sigReq); return m; }, new Map());
            const tx = new scryptlib_1.bsv.Transaction(rawTxHex);
            tx.inputs.forEach((_, inputIndex) => {
                const sigReq = sigReqsByInputIndex.get(inputIndex);
                if (!sigReq) {
                    throw new Error(`\`SignatureRequest\` info should be provided for the input ${inputIndex} to call #signRawTransaction`);
                }
                const script = sigReq.scriptHex ? new scryptlib_1.bsv.Script(sigReq.scriptHex) : scryptlib_1.bsv.Script.buildPublicKeyHashOut(sigReq.address.toString());
                // set ref output of the input
                tx.inputs[inputIndex].output = new scryptlib_1.bsv.Transaction.Output({
                    script,
                    satoshis: sigReq.satoshis
                });
            });
            const signedTx = yield this.signTransaction(tx, options);
            return signedTx.toString();
        });
    }
    signTransaction(tx, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield this.getNetwork();
            // Generate default `sigRequests` if not passed by user
            const sigRequests = ((_a = options === null || options === void 0 ? void 0 : options.sigRequests) === null || _a === void 0 ? void 0 : _a.length) ? options.sigRequests :
                tx.inputs.map((input, inputIndex) => {
                    var _a, _b, _c, _d;
                    const useAddressToSign = options && options.address ? options.address :
                        ((_a = input.output) === null || _a === void 0 ? void 0 : _a.script.isPublicKeyHashOut())
                            ? input.output.script.toAddress(network)
                            : this._address;
                    return {
                        prevTxId: (0, scryptlib_1.toHex)(input.prevTxId),
                        outputIndex: input.outputIndex,
                        inputIndex,
                        satoshis: (_b = input.output) === null || _b === void 0 ? void 0 : _b.satoshis,
                        address: useAddressToSign,
                        scriptHex: (_d = (_c = input.output) === null || _c === void 0 ? void 0 : _c.script) === null || _d === void 0 ? void 0 : _d.toHex(),
                        sigHashType: scryptlib_1.DEFAULT_SIGHASH_TYPE,
                    };
                });
            const sigResponses = yield this.getSignatures(tx.toString(), sigRequests);
            // Set the acquired signature as an unlocking script for the transaction
            tx.inputs.forEach((input, inputIndex) => {
                var _a;
                // TODO: multisig?
                const sigResp = sigResponses.find(sigResp => sigResp.inputIndex === inputIndex);
                if (sigResp && ((_a = input.output) === null || _a === void 0 ? void 0 : _a.script.isPublicKeyHashOut())) {
                    var unlockingScript = new scryptlib_1.bsv.Script("")
                        .add(Buffer.from(sigResp.sig, 'hex'))
                        .add(Buffer.from(sigResp.publicKey, 'hex'));
                    input.setScript(unlockingScript);
                }
            });
            return tx;
        });
    }
    signMessage(message, address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address) {
                throw new Error(`${this.constructor.name}#signMessge with \`address\` param is not supported!`);
            }
            const sensilet = yield this.getConnectedTarget();
            return sensilet.signMessage(message);
        });
    }
    getSignatures(rawTxHex, sigRequests) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield this.getNetwork();
            const inputInfos = sigRequests.flatMap((sigReq) => {
                const addresses = (0, utils_1.parseAddresses)(sigReq.address, network);
                return addresses.map(address => {
                    let scriptHex = sigReq.scriptHex;
                    if (!scriptHex) {
                        scriptHex = scryptlib_1.bsv.Script.buildPublicKeyHashOut(address).toHex();
                    }
                    else if (sigReq.csIdx !== undefined) {
                        scriptHex = scryptlib_1.bsv.Script.fromHex(scriptHex).subScript(sigReq.csIdx).toHex();
                    }
                    return {
                        txHex: rawTxHex,
                        inputIndex: sigReq.inputIndex,
                        scriptHex,
                        satoshis: sigReq.satoshis,
                        sigtype: sigReq.sigHashType || scryptlib_1.DEFAULT_SIGHASH_TYPE,
                        address: address.toString()
                    };
                });
            });
            const sensilet = yield this.getConnectedTarget();
            const sigResults = yield sensilet.signTx({
                list: inputInfos
            });
            return inputInfos.map((inputInfo, idx) => {
                return {
                    inputIndex: inputInfo.inputIndex,
                    sig: sigResults.sigList[idx].sig,
                    publicKey: sigResults.sigList[idx].publicKey,
                    sigHashType: sigRequests[idx].sigHashType || scryptlib_1.DEFAULT_SIGHASH_TYPE
                };
            });
        });
    }
}
exports.SensiletSigner = SensiletSigner;
SensiletSigner.DEBUG_TAG = "SensiletSigner";
//# sourceMappingURL=sensilet-signer.js.map