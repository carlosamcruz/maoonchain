[![Test](https://github.com/sCrypt-Inc/scrypt-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/sCrypt-Inc/scrypt-ts/actions/workflows/ci.yml)

# scryptTS

`scryptTS` is a Typescript framework to write smart contracts on Bitcoin SV.

## Installation

Use this command to install `scryptTS` to your project:

`npm install scrypt-ts`

## Setup

`scryptTS` depends on [ts-patch](https://github.com/nonara/ts-patch) to provide a custom plugin support for typescript. So first we need to add `scryptTS` plugin and enable decorators in `tsconfig.json` file like:

```json
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    "plugins": [
      {
        "transform": "scrypt-ts/dist/transformer",   // Required
        "transformProgram": true,                    // Required
        "outDir": "./scrypt",                        // Optional, define the auto-generated `.scrypt` files folder
        "debug": false                               // Optional, enable/disable debug log in console.
      }
    ]
  }
}
```

**Note**: Currently there is an issue with typescript version `4.9.x`, so make sure to lock typescript version to `4.8.4`:


That's all, you're ready to go!

## Usage

### Write a Contract

A contract can be written as a class that extends the `SmartContract` base, a simple example could be like this:

```ts
import { SmartContract, method, prop, assert } from "scrypt-ts";

class Demo extends SmartContract {
  @prop()
  x: bigint;

  constructor(x: bigint) {
    super(x);
    this.x = x;
  }

  @method
  public unlock(x: bigint) {
    assert(this.add(this.x, 1n) === x);
  }

  @method
  add(x0: bigint, x1:bigint) : bigint {
    return x0 + x1;
  }
}
```

#### Property Decorator: `@prop(state=false)`

Use this decorator on class properties to mark them as contract properties, which means the values would be stored on chain within [tx](https://wiki.bitcoinsv.io/index.php/Bitcoin_Transactions).

This decorator can take a boolean parameter, which indicates whether it can be updated later. If it's `true`, the property is so called a `stateful` property and its value stored on chain can be updated between contract calls; otherwise, its value can not be changed since the contract deploy.


#### Method Decorator: `@method`

Use this decorator on class methods to mark them as contract methods. The logic implemented in these methods would be serialized into [tx](https://wiki.bitcoinsv.io/index.php/Bitcoin_Transactions) and be executed on chain.

The class methods decorated by `@method` have some special requirements / restrains that should be followed:

* Within these methods, only functions provided as built-ins from `scrypt-ts` or methods also decorated by `@method` can be called; Similarly, only the properties decorated by `@prop` can be visited.

* With `public` modifier, a method is marked as an entry method that could be called outside the contract class, especially during a tx building process. The main purpose of these methods is to validate / verify / check assertions for its input parameters according to its `@prop` decorated properties. The return value must be `void`.

* Without a `public` modifier, a method is kind of an inner function usually be called within the contract class. It can return any valid types described later.

#### Types

The types can be used in `@prop` and `@method` are restricted to these kinds:

* Basic types: `boolean` / `ByteString` / `bigint`;

*Note*: the type `number` is not allowed in `@prop` because it may cause precision issues when representing a floating point number. It can only be used in a few cases specified later on.

* User types can be defined using `type` or `interface`, made of basic types. For example,

```ts
type ST = {
  a: bigint;
  b: boolean;
}

interface ST1 {
  x: ST;
  y: string;
}
```

* Array types **must** be declared using `FixedArray`, whose length must be known at compile time, like:

```ts
let aaa: FixedArray<bigint, 3> = [1n, 3n, 3n];

// 2d array
let abb: FixedArray<FixedArray<bigint, 2>, 3> = [[1n, 3n], [1n, 3n], [1n, 3n]];
```

* Other `SmartContract` subclasses are provided as libraries.

#### Statements

There are also some other restraints / rules on the statemets that could be used within the `@method`s besides the previously mentioned.

##### `for` statement

Because of the underlaying limitation of `loop` implemetion on Bitcoin script, one can only use a compile time const number as the loop iterations.

So currently if you want to build a loop inside `@method`s, there is only one restricted version of `for` statement that could be used. It's looks like:

```ts
for(let $i = 0; $i < $constNum; $i++) {
  ...
}
```

Note that the initial value `0` and the `<` operator and the post unary operator `++` are all unchangeable.

* `$i` can be whatever you named the induction variable;

* `$constNum` should be an expression of a CTC numberic value of the followings:

A number literal like:

```ts
for(let i = 0; i < 5; i++ ) ...
```

Or a `const` variable name like:

```ts
const N = 3;
for(let i = 0; i < N; i++ ) ...
```

Or a `readonly` property name like:

```ts
class X {
static readonly N = 3;
}
for(let i = 0; i < X.N; i++ ) ...
```

##### `console.log` statement

As described before, all Javascript/Typescript built-in functions/global variables are not allowed in `@method`s, with only a few exceptions.

One exceptional statement is `console.log`, which can be used for debugging purpose.
```ts
@method
add(x0: bigint, x1:bigint) : bigint {
  console.log(x0);
  return x0 + x1;
}
```

### Build a Contract

Just run `npx tsc`, or `npm run build` if you have script as below declared in `package.json`:

```json
{
 "scripts": {
   "build": "tsc"
 }
}
```

The `tsc` compiling process may output diagnostic informations in console about the contract class, update the source code if needed.

### Test a Contract

You could write tests using tools like `mocha`, for example:

```js
describe('Test SmartContract `Demo`', () => {
  before(async () => {
    await Demo.compile();
  })

  it('should pass the public method unit test successfully.', async () => {
    let demo = new Demo(1n);

    let result = demo.verify(() => demo.unlock(2n));
    expect(result.success, result.error).to.eq(true);

    expect(() => {
      demo.unlock(3n);
    }).to.throw(/Execution failed/)
  })
})
```


### Deploy and Call a Contract

Generally speaking, if you want to deploy or call the contract to BSV network, it takes three steps:

#### 1. Build a contract instance: 

Giving proper parameters to get an up-to-date contract instance, like:

```ts
let instance = new MyContract(...args);
```

#### 2. Build a tx: 

Build a tx corresponding to your business logic, especially to set the tx's proper input & output script with contract instance.

Conceptually speaking, a contract instance has two kinds of relation with txs:

* the `lockTo` relation

A contract `instance` has a `lockTo` relation with a `tx` means that the `instance` forms the locking script in one of the `tx`'s outputs.

From the perspective of `tx`, it may look like this:

```js
tx.addOutput(new bsv.Transaction.Output({
  script: instance.lockingScript,
  ...
}))
```

From the perspective of `instance`, the binding can be declared like:

```js
instance.lockTo = { tx, outputIndex: 0 };
```

* the `unlockFrom` relation

A contract `prevInstance` has a `unlockFrom` relation with a `tx` means that a call to `prevInstance`'s public(entry) `@method` will form the unlocking script in one of the `tx` inputs.

From the perspective of `tx`, it may look like this:

```js
tx.addInput(new bsv.Transaction.Input({
  script: prevInstance.getUnlockingScript( inst => inst.customEntryMethod(...args) )
  ...
}))
```

From the perspective of `prevInstance`, the binding can be declared like:

```js
prevInstance.unlockFrom = { tx, inputIndex: 0};
```

#### 3. Send the tx:

The final step is to sign and send the tx to the network. If everything is fine, the tx will be accpected by miners.

Here is a complete example code to deploy & call the `Demo` contract.

```js
// compile contract to get low-level asm
await Demo.compile();

// build contract instance
const demo = new Demo(2n);
const balance = 1000;

// build contract deploy tx
const utxos = await fetchUtxos();
const unsignedDeployTx =
  new bsv.Transaction()
    .from(utxos)
    .addOutput(new bsv.Transaction.Output({
      // get the locking script for `demo` instance
      script: demo.lockingScript, 
      satoshis: balance,
    }));

// send contract deploy tx
const deployTx = await signAndSend(unsignedDeployTx);
console.log('contract deployed: ', deployTx.id)

// build contract call tx
const unsignedCallTx =
  new bsv.Transaction()
    .addInputFromPrevTx(deployTx)
    .addOutput(
      new bsv.Transaction.Output({
        script: bsv.Script.buildPublicKeyHashOut(publicKey.toAddress()),
        satoshis: balance / 2
      })
    );

// send contract call tx
const callTx = await signAndSend(unsignedCallTx);
console.log('contract called: ', callTx.id)
```

## Documentation

The full version of `scryptTS` documentation is available [here](https://scrypt.io/scrypt-ts).