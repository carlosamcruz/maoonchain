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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotwalletSigner = void 0;
const scryptlib_1 = require("scryptlib");
const abstract_signer_1 = require("../abstract-signer");
const utils_1 = require("../utils");
const superagent_1 = __importDefault(require("superagent"));
const DAPP_API_PATHS = {
    dapp_list_unspent: `/v1/grandet_dapp/dapp_list_unspent`,
    dapp_list_unspent_by_address: `/v1/grandet_dapp/dapp_list_unspent_by_address`,
    dapp_sign_raw_transaction: `/v1/grandet_dapp/dapp_sign_raw_transaction`,
    dapp_get_signature: `/v1/grandet_dapp/dapp_get_signature`,
    dapp_get_balance: `/v1/grandet_dapp/dapp_get_balance`,
    dapp_send_raw_transaction: `/v1/grandet_dapp/dapp_send_raw_transaction`,
    dapp_get_raw_change_address: `/v1/grandet_dapp/dapp_get_raw_change_address`,
    dapp_get_public_key: `/v1/grandet_dapp/dapp_get_public_key`,
    get_access_token: `/v1/oauth2/get_access_token`
};
/**
 * This option can be used in both development environment and production environment.
 * See [access-token]{@link https://oauth.net/2/access-tokens} and [DotWallet APIs for authorization]{@link https://developers.dotwallet.com/documents/en/#authorization} to known how to get a access token.
 */
function handleRes(res) {
    if (res.ok) {
        const body = res.body ? res.body : JSON.parse(res.text);
        const { code, data, msg } = body;
        if (code === 0) {
            return data;
        }
        else if (code === 75000) {
            window.localStorage.removeItem('access_token');
        }
        throw new Error(`error response, code = ${code}, msg: ${msg}`);
    }
    else {
        throw new Error(`error response`);
    }
}
const API_DOTWALLET = `https://api.ddpurse.com`;
/**
 * a [signer]{@link https://docs.scrypt.io/how-to-test-a-contract#signer } which implemented the protocol with the [dotwallet]{@link https://www.dotwallet.com/en},
 * and dapps can use to interact with the dotwallet.
 */
class DotwalletSigner extends abstract_signer_1.Signer {
    constructor(accessToken, provider) {
        super(provider);
        this.sender = {
            "appid": "bsv_coin_regular",
            "user_index": 0
        };
        this.utxos_public_key = new Map();
        this.accessToken = accessToken;
    }
    /**
     * Check if the wallet has been authenticated
     * @returns {boolean} true | false
     */
    isAuthenticated() {
        if (this.accessToken) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    /**
     * Request wallet authentication
     * @returns A promise which resolves to if the wallet has been authenticated and the authenticate error message
     */
    requestAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accessToken) {
                return Promise.resolve({
                    isAuthenticated: true,
                    error: ''
                });
            }
            return Promise.resolve({
                isAuthenticated: false,
                error: ''
            });
        });
    }
    connect(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            // we should make sure sensilet is connected  before we connect a provider.
            const isAuthenticated = yield this.isAuthenticated();
            if (!isAuthenticated) {
                throw new Error('Dotwallet is not connected!');
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
            yield this.getDefaultPubKey();
            return this;
        });
    }
    getDefaultAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const public_key = yield this.getDefaultPubKey();
            return public_key.toAddress(scryptlib_1.bsv.Networks.mainnet);
        });
    }
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.getDefaultAddress();
            return address.network;
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address) {
                return this.connectedProvider.getBalance(address);
            }
            const res = yield superagent_1.default.post(`${API_DOTWALLET}${DAPP_API_PATHS.dapp_get_balance}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${this.accessToken}`)
                .send({
                "sender": this.sender,
            });
            const data = handleRes(res);
            const { confirm, unconfirm } = data;
            return {
                confirmed: confirm,
                unconfirmed: unconfirm
            };
        });
    }
    getDefaultPubKey() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.default_public_key) {
                return this.default_public_key;
            }
            const res = yield superagent_1.default.post(`${API_DOTWALLET}${DAPP_API_PATHS.dapp_get_public_key}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${this.accessToken}`)
                .send({
                "sender": this.sender,
            });
            const data = handleRes(res);
            const { public_key } = data;
            this.default_public_key = scryptlib_1.bsv.PublicKey.fromString(public_key);
            return this.default_public_key;
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
                    let useAddressToSign = options && options.address ? options.address : this._address;
                    if ((_a = input.output) === null || _a === void 0 ? void 0 : _a.script.isPublicKeyHashOut()) {
                        useAddressToSign = input.output.script.toAddress(network);
                    }
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
            throw new Error(`Method ${this.constructor.name}#signMessage not implemented.`);
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
                        prevTxId: sigReq.prevTxId,
                        outputIndex: sigReq.outputIndex,
                        address: address.toString()
                    };
                });
            });
            return Promise.all(inputInfos.map((inputInfo) => __awaiter(this, void 0, void 0, function* () {
                const res = yield superagent_1.default.post(`${API_DOTWALLET}${DAPP_API_PATHS.dapp_get_signature}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${this.accessToken}`)
                    .send({
                    sender: this.sender,
                    input_index: inputInfo.inputIndex,
                    sig_type: inputInfo.sigtype,
                    rawtx: rawTxHex,
                    addr: inputInfo.address,
                });
                const data = handleRes(res);
                const { hex_signature } = data;
                let publicKey = this.utxos_public_key.get(`${inputInfo.prevTxId}:${inputInfo.outputIndex}`);
                if (!publicKey) {
                    publicKey = (0, scryptlib_1.toHex)(this.default_public_key);
                }
                return {
                    inputIndex: inputInfo.inputIndex,
                    sig: hex_signature,
                    publicKey: publicKey,
                    sigHashType: inputInfo.sigtype
                };
            })));
        });
    }
    /**
     * Get a list of the P2PKH UTXOs.
     * @param address The address of the returned UTXOs belongs to.
     * @param options The optional query conditions, see details in `UtxoQueryOptions`.
     * @returns  A promise which resolves to a list of UTXO for the query options.
     */
    listUnspent(address, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield superagent_1.default.post(`${API_DOTWALLET}${DAPP_API_PATHS.dapp_list_unspent}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${this.accessToken}`)
                .send({
                "sender": this.sender,
                "min_amount": 0
            });
            const data = handleRes(res);
            const utxos = data.utxos.map((utxo) => ({
                txId: utxo.tx_hash,
                outputIndex: utxo.output_index,
                satoshis: utxo.satoshis,
                script: utxo.script,
                address: utxo.addr,
                pubkey: utxo.pubkey
            }));
            utxos.forEach(utxo => {
                this.utxos_public_key.set(`${utxo.txId}:${utxo.outputIndex}`, utxo['pubkey']);
            });
            if (options) {
                return (0, utils_1.filterUTXO)(utxos, options);
            }
            return utxos;
        });
    }
}
exports.DotwalletSigner = DotwalletSigner;
DotwalletSigner.DEBUG_TAG = "DotwalletSigner";
//# sourceMappingURL=dotwallet-signer.js.map