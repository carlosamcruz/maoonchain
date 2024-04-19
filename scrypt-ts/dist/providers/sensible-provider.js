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
exports.SensibleProvider = void 0;
const scryptlib_1 = require("scryptlib");
const abstract_provider_1 = require("../bsv/abstract-provider");
const superagent_1 = __importDefault(require("superagent"));
const utils_1 = require("../bsv/utils");
/**
 * The SensibleProvider is backed by [Sensible]{@link https://github.com/sensible-contract/sensiblequery},
 */
class SensibleProvider extends abstract_provider_1.Provider {
    constructor(network, apiKey) {
        super();
        this.network = network;
        this.apiKey = apiKey;
        this._isConnected = false;
    }
    get apiEndpoint() {
        return this.network.name === scryptlib_1.bsv.Networks.mainnet.name ? `https://api.sensiblequery.com` : `https://api.sensiblequery.com/test/`;
    }
    isConnected() {
        return this._isConnected;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield superagent_1.default.get(this.apiEndpoint)
                    .set('Authorization', `Bearer ${this.apiKey}`)
                    .timeout(3000);
                if (res.ok && res.body.code === 0) {
                    this._isConnected = true;
                    this.emit("connected" /* ProviderEvent.Connected */, true);
                }
                else {
                    throw new Error(`connect failed: ${res.body.msg ? res.body.msg : res.text}`);
                }
            }
            catch (error) {
                this._isConnected = false;
                this.emit("connected" /* ProviderEvent.Connected */, false);
                throw error;
            }
            return Promise.resolve(this);
        });
    }
    updateNetwork(network) {
        this.network = network;
        this.emit("networkChange" /* ProviderEvent.NetworkChange */, network);
    }
    getNetwork() {
        return this.network;
    }
    assertConnected() {
        if (!this._isConnected) {
            throw new Error(`Provider is not connected`);
        }
    }
    sendRawTransaction(rawTxHex) {
        return __awaiter(this, void 0, void 0, function* () {
            this.assertConnected();
            // 1 second per KB
            const size = Math.max(1, rawTxHex.length / 2 / 1024); //KB
            const timeout = Math.max(10000, 1000 * size);
            try {
                const res = yield superagent_1.default.post(`${this.apiEndpoint}/pushtx`)
                    .timeout({
                    response: timeout,
                    deadline: 60000, // but allow 1 minute for the file to finish loading.
                })
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${this.apiKey}`)
                    .send({ txhex: rawTxHex });
                if (res.ok && res.body.code === 0) {
                    return res.body.data;
                }
                if (typeof res.text === 'string' && res.text.includes("service is restricted")) {
                    throw new Error(`According to your IP and nationality, you are in a country/region where our service is restricted.`);
                }
                if (typeof res.text === 'string' && needIgnoreError(res.text)) {
                    return new scryptlib_1.bsv.Transaction(rawTxHex).id;
                }
                throw new Error(`${res.body.msg ? res.body.msg : res.text}`);
            }
            catch (error) {
                throw new Error(`SensibleProvider ERROR: ${error.message}`);
            }
        });
    }
    listUnspent(address, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.assertConnected();
            if (Array.isArray(address)) {
                throw new Error(`SensibleProvider ERROR: only support list one address`);
            }
            const res = yield superagent_1.default.get(`${this.apiEndpoint}/address/${address}/utxo`)
                .set('Authorization', `Bearer ${this.apiKey}`);
            if (res.ok && res.body.code === 0) {
                let utxos = res.body.data.map(item => ({
                    txId: item.txid,
                    outputIndex: item.vout,
                    satoshis: item.satoshi,
                    script: scryptlib_1.bsv.Script.buildPublicKeyHashOut(address).toHex(),
                }));
                if (options) {
                    return (0, utils_1.filterUTXO)(utxos, options);
                }
                return utxos;
            }
            throw new Error(`SensibleProvider ERROR: ${res.body.msg}`);
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            this.assertConnected();
            const res = yield superagent_1.default.get(`${this.apiEndpoint}/address/${address}/balance`)
                .set('Authorization', `Bearer ${this.apiKey}`);
            if (res.body.code === 0) {
                return {
                    confirmed: res.body.data.satoshi,
                    unconfirmed: res.body.data.pendingSatoshi
                };
            }
            throw new Error(`SensibleProvider ERROR: ${res.body.msg}`);
        });
    }
    getTransaction(txHash) {
        this.assertConnected();
        return superagent_1.default.get(`${this.apiEndpoint}/rawtx/${txHash}`)
            .set('Authorization', `Bearer ${this.apiKey}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json').then(res => {
            if (res.ok && res.body.code === 0) {
                return new scryptlib_1.bsv.Transaction(res.body.data);
            }
            else if (res.error) {
                throw res.error;
            }
            else {
                throw new Error(`SensibleProvider ERROR: ${res.body.msg}`);
            }
        });
    }
    getFeePerKb() {
        return Promise.resolve(50);
    }
}
exports.SensibleProvider = SensibleProvider;
function needIgnoreError(inMsg) {
    if (inMsg.includes('Transaction already in the mempool')) {
        return true;
    }
    else if (inMsg.includes('txn-already-known')) {
        return true;
    }
    return false;
}
//# sourceMappingURL=sensible-provider.js.map