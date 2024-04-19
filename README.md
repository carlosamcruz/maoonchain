# To Run Smart Ordinals

### `git clone -b develop  https://github.com/carlosamcruz/maoonchain`
### `cd maoonchain`
### `npm install`

The project has some particularities that required some nonstandard changes in some files. Therefore, the following procedure will be required:

Copy folders: 

   ..\maoonchain\bsv
   
   and 
   
   ..\maoonchain\scrypt-ts

And Paste to inside folder:
   
   ..\maoonchain\node_modules
   
   (substituting the former content)

### `npx scrypt-cli@latest compile`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

"# maoonchain" 
