# Smart Ordinals

The main goal of this project is to show the potential of turning a staless UTXO script into a stateful one to lavarage the benefits of stateful UTXO scripts, while keeping the simplicity of the stateless ones. 

To demonstrate the potential of this technique, we aim to solve the problem of executing on-chain token exchanges without the involvement of third parties.

Starting with 1SatOrdinals token, our solution allows the current token owner to encapulate his token into a stateful UTXO script that is an on-chain order lock with three possibilities:
```
1 - The order can be executed by any on-chain user that knows the order TXID;
2 - The order can be executed by a single on-chain user indicated at the creation of the order lock;
3 - The order can be cancelled by the owner of the token before it is bought by any other user;
```
Upon the execution of any of the three possibilities, the stateful script is turned again into a stateless 1SatOrdinals token assigned to the new ower in case of order execution, or to its former owner in case of order cancelation.

In cases 1 and 2, the payment for the token in satoshis goes directly to the former owner, while the 1SatOrdinals ownership goes to the user that first run the contract.

The technique allows for true peer-to-peer on-chain exchange between users without the need of third party exchages to perform the job.

Besides that, our solution also allows the user to create its own 1SatOrdinals or use the ones it has control over it with the following features:
```
1 - Create New 1SatOrdinals Tokens;
2 - Reshape (change content or re-inscribe) any 1SatOrdinals Token the user has control over it;
3 - Directly transfer the token ownership to another user;
4 - Melt the token, that is to undo the 1SatOrdinals token using its UTXO and unbounding its satoshi for any other user;
```
Our solution don´t make use of indexers, but can be easily integrated if necessary.

# To Run Smart Ordinals

The following instructions will help you to setup the project from the current repo: 

```
 git clone https://github.com/carlosamcruz/maoonchain
 cd maoonchain
 npm install
```

The project requires some nonstandard changes in some files on node_modules. Therefore, the following procedure will be required:

Delete the following folders from node_modules:
```
   ..\maoonchain\node_modules\bsv
   ..\maoonchain\node_modules\scrypt-ts
```
Copy the custom folders from the repo: 
```
   ..\maoonchain\bsv   
   ..\maoonchain\scrypt-ts
```
And paste them inside folder node_modules:
```   
   ..\maoonchain\node_modules
```

Finally, compile the sCrypt contract and start it
```
 npx scrypt-cli@latest compile
 npm start
```

# To Run Smart Ordinals with Docker

To run the project with Docker:

Need to have Docker installed on your PC

```Docker
docker compose up --build -d
```
Finally:
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

The project is also available at [Smart Ordinals](https://carlosamcruz.github.io/maoonchain/)

# Demo Video

[Smart Ordinals - MaoOnChain - sCrypt Hackathon 2024](https://youtu.be/vwlL89Gu0R0)

Set of transactions presented in the demo video:

[496d1d580b3868c54cad9a11dc1e3a97e99ca8a14674e070a669caa7a4eb86ff](https://whatsonchain.com/tx/496d1d580b3868c54cad9a11dc1e3a97e99ca8a14674e070a669caa7a4eb86ff)

[5b3c79d19c2db11e222ff1aff04ee6a0906e8c0cf3db571f68efb4d74defbe5d](https://whatsonchain.com/tx/5b3c79d19c2db11e222ff1aff04ee6a0906e8c0cf3db571f68efb4d74defbe5d)

[54df8a9c482c6a19af8998e02c616d8a3c312739c11da92adaf1a80e104eb6c6](https://whatsonchain.com/tx/54df8a9c482c6a19af8998e02c616d8a3c312739c11da92adaf1a80e104eb6c6)

[57ddbeffc7df03ad6a2487d722853cc56d356a2c09cdc0d7b2cc2488895cbdaf](https://whatsonchain.com/tx/57ddbeffc7df03ad6a2487d722853cc56d356a2c09cdc0d7b2cc2488895cbdaf)

Transaction of the current 1SatOrdinals UTXO presented in the video:

[f2f24df8ddc6112d201bc20df6e87959b418713285d1a916659579f2e89122a9](https://whatsonchain.com/tx/f2f24df8ddc6112d201bc20df6e87959b418713285d1a916659579f2e89122a9)

"# maoonchain" 
