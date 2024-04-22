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

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

The project is also available at [Smart Ordinals](https://carlosamcruz.github.io/maoonchain/)

"# maoonchain" 
