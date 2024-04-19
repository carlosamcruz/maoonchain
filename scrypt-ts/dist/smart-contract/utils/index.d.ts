import { bsv } from "scryptlib";
import { SignatureResponse } from "../../bsv/abstract-signer";
import { Sig, SigHashType } from "../builtins/types";
import { SignatureHashType, SignatureOption } from "../../bsv/types";
export declare function getDummySig(): Sig;
export declare function toNumber(sighashType: SigHashType): number;
export declare function findSig(sigResponses: SignatureResponse[], pubKeyOrAddr: bsv.PublicKey | bsv.Address, sigHashType?: SignatureHashType): Sig;
export declare function findSigs(sigResponses: SignatureResponse[], queries: (bsv.PublicKey | bsv.Address | SignatureOption)[]): Sig[];
export declare function mapIter<T>(iterable: IterableIterator<T>, callback: (x: any) => any): Generator<any, void, unknown>;
export declare function isInNodeEnv(): boolean;
export declare function alterFileExt(filename: string, toExt: string, fromExt?: string): string;
export declare function camelCaseCapitalized(str: string): string;
