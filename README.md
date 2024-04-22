# To Run Smart Ordinals

### `git clone https://github.com/carlosamcruz/maoonchain`
### `cd maoonchain`
### `npm install`

The project has some particularities that required some nonstandard changes in some files. Therefore, the following procedure will be required:

Delete Folders:
```
   ..\maoonchain\node_modules\bsv
   
   ..\maoonchain\node_modules\scrypt-ts
```

Copy custom folders: 

```
   ..\maoonchain\bsv
   
   ..\maoonchain\scrypt-ts

```
And Paste to inside folder:
```   
   ..\maoonchain\node_modules
```   
### `npx scrypt-cli@latest compile`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

The project is also available at [Smart Ordinals](https://carlosamcruz.github.io/maoonchain/)

"# maoonchain" 
