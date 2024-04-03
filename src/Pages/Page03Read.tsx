// src/components/Home.tsx
import React, {FC} from 'react';

//import videojs from 'video.js';
//import 'video.js/dist/video-js.css'; // Import Video.js CSS
//import 'video-react/dist/video-react.css'; // Import Video.js React CSS
//import { Player } from "video-react";


import { useState, useRef, useEffect } from "react";
import { DefaultProvider, sha256, toHex, PubKey, bsv, TestWallet, Tx, toByteString, ByteString } from "scrypt-ts";
import '../App.css';
import { pvtkey } from '../globals';

import {homepvtKey, homenetwork, compState} from './Home';
import { broadcast, getSpentOutput, getTransaction, listUnspent, scriptHistory, exchangeRate } from '../mProviders';

import { ContentType, RetContentType } from '../OrdinalsContentType';
//import { GeneralToken } from "./contracts/generaltoken";

import { MarketPlaceToken } from "../contracts/mPlaceToken";

import { hexToLittleEndian, scriptUxtoSize, convertBinaryToHexString } from "../myUtils";



import { fileTypeFromData, hexToBytes} from "../myUtils";


import * as fs from 'fs';
import { Console } from 'console';
import { buffer } from 'stream/consumers';


let signer: TestWallet;

interface props1 {
  passedData: string;
}


//const Page03Read: FC = () => {
const Page03Read: FC<props1> = (props) => {

  //const [pubkey, setPubkey] = useState("");
  const [address, setaddress] = useState("");
  const [balance, setbalance] = useState(0);
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const labelRef02 = useRef<HTMLLabelElement | null>(null);
  const labelRef03 = useRef<HTMLLabelElement | null>(null);

  //let txlink = useRef<HTMLLabelElement | null>(null);

  //const [linkUrl, setLinkUrl] = useState('https://whatsonchain.com/');
  const [linkUrl, setLinkUrl] = useState("");
  const [txid, setTXID] = useState("");
  const [currentTxid, setcurrentTxid] = useState("");


  const [fileType, setfileType] = useState("bin");

  const [txStamp, settxStamp] = useState("");



  const [downloadFile, setdownloadFile] = useState(false);
  const [downloadTX, setdownloadTX] = useState(false);
  
  


  const [waitAlert, setwaitAlert] = useState("Inform the TXID to Start");



  const [txb, settxb] = useState(true);


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [binaryData, setbinaryData] = useState<Uint8Array>(new Uint8Array());
  const [strData, setstrData] = useState('');
  const [tokenInfo, settokenInfo] = useState('');
  const [tokenOwner, settokenOwner] = useState('');
  const [tokenDescription, settokendescription] = useState('');
  const [tokenSale, settokenSale] = useState('');

  const [binaryDataTX, setbinaryDataTX] = useState<Uint8Array>(new Uint8Array());
  const [hexStrFileData, setHexString] = useState('');

  const [txidFlag, settxidFlag] = useState('');


  let imageBlob = new Blob([binaryData], { type: 'image/jpeg' }); // Adjust the type based on the image format
  let imageUrl = URL.createObjectURL(imageBlob);  
  let htmlDataP = new TextDecoder('utf-8').decode(binaryData);

  let videoBlob = new Blob([binaryData], { type: 'video/mp4' });
  //let videoBlob = new Blob([binaryData], { type: 'video/wmv' });
  let videoUrl = URL.createObjectURL(videoBlob);

  let txIdRet = useRef<any>(null);
  let satsAmount = useRef<any>(null);
  let txlink2 = ""
  let gptIndex = useRef<any>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    settxidFlag(txIdRet.current.value)
    setwaitAlert("Press Read to Explore TX");
    settxb(true)

    const file = event.target.files && event.target.files[0];
    //setSelectedFile(file);

    if (file) {
      setSelectedFile(file);
      // Create a FileReader
      const reader = new FileReader();

      // Define a callback function for when the file is loaded
      reader.onload = (e) => {
        if(e.target)
        {
          const binaryString = e.target.result; // The file data as a binary string
          const hexString = convertBinaryToHexString(binaryString);

          console.log("Data hexString: ", hexString)

          setHexString(hexString);
        }
      };
      // Read the file as an ArrayBuffer
      //reader.readAsArrayBuffer(file);
      reader.readAsBinaryString(file);
    }
  };



  //let binaryData = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
  
  //let binaryData: Uint8Array

  const downloadBinaryFile = () => {
    // Create a Blob from the binary data
    const blob = new Blob([binaryData]);

    console.log("File Size: ", binaryData?.byteLength)

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fileS2P-' + currentTxid + '.' + fileType; // Specify the desired file name with the correct extension

    // Programmatically trigger a click event on the anchor element
    a.click();

    // Clean up the URL object and remove the anchor element
    URL.revokeObjectURL(url);
    a.remove();
  };
  

  const downloadTXFile = () => {
    // Create a Blob from the binary data
    const blob = new Blob([binaryDataTX]);

    console.log("File Size: ", binaryDataTX?.byteLength)

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stamp-' + txStamp+ '-' + currentTxid + '.bin'; // Specify the desired file name with the correct extension

    // Programmatically trigger a click event on the anchor element
    a.click();

    // Clean up the URL object and remove the anchor element
    URL.revokeObjectURL(url);
    a.remove();
  };

  interface exchagePRICE {
    rate: number,
    time: number,
    currecy: string,
  }


  const readFromChain = async (amount: any) => {

    //homepvtKey = localPvtKey.current.value;
    setdownloadFile(false)

    {
      setLinkUrl('');
      setTXID('');
      settokenInfo('');
      settokenOwner('')
      setwaitAlert("Wait!!!");
  
      let provider = new DefaultProvider({network: homenetwork});
//      await provider.connect()

      let tx3 = new bsv.Transaction

      //Place here the TXID of the current state of the contract

      //tx3 = await provider.getTransaction(txIdRet.current.value);

      let currentTIXD = txIdRet.current.value
      

      console.log('File Length: ', hexStrFileData.length)

      if(currentTIXD.length === 64)
      {
        tx3 = new bsv.Transaction (await getTransaction(currentTIXD, homenetwork));
        settxidFlag(currentTIXD)
        //setSelectedFile(null)
      }
      else
      {
        tx3.fromString(hexStrFileData)
        currentTIXD = tx3.id
        settxidFlag('')
      }

      setcurrentTxid(currentTIXD)

      //console.log('TX new: ', tx4)



      console.log('Test TX3: ', tx3.id)


      let dataTX = toHex(tx3.outputs[0].script.toHex())


      let getData = tx3.outputs[0].script.toHex()
      let getDataASM = tx3.outputs[0].script.toASM()

      console.log('Script Hash: ', hexToLittleEndian(sha256(getData)))

      let timestamper = 0;

      let scriptHistoty = await scriptHistory(hexToLittleEndian(sha256(getData)), homenetwork)

      console.log("Token Script Hash: ", hexToLittleEndian(sha256(getData)))

      for(let i = 0; i < scriptHistoty.length; i ++)
      {
        console.log("Script Hash TXs: ", scriptHistoty[i].txId)
        console.log("Script Hash Block: ", scriptHistoty[i].height)
        //console.log("Script Hash Time: ", scriptHistoty[i].time)
        if(scriptHistoty[i].txId === tx3.id)
        {
           timestamper = scriptHistoty[i].height
           break;

        }
      }

      if(homenetwork === bsv.Networks.testnet)
      {
        settxStamp(timestamper.toString(10) + '-TestNet')
      }
      else
      {
        settxStamp(timestamper.toString(10) + '-MainNet')

      }

      //////////////////////////////////////////////////////////////
      //Jesus is the Lord
      //////////////////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////
      //Usado para Ler Order Lock de P2PKH Tokens 
      //////////////////////////////////////////////////////////////
      
      if(props.passedData === 'OLock')
      {
        let posNew1 = 0 // Output Index of the Contract in the Current State TX

        /*
        if(gptIndex.current.value === '1')
        {
          posNew1 = 1
        }
        */


        //let tx4 = new bsv.Transaction
        //tx4.fromString(erroSC())
        //let instance1 = ErrorSC.fromTx(tx4, posNew1)

        let instance2 = MarketPlaceToken.fromTx(tx3, posNew1)
        let scriptHex = bsv.Script.fromHex(instance2.tokenP2pkhScript + instance2.tokenData)

        getData = scriptHex.toHex()
        getDataASM = scriptHex.toASM()

       let indexHahs1 = instance2.toBuyerP2PKHScript.indexOf('76a914');
       let indexHahs2 = instance2.toBuyerP2PKHScript.indexOf('88ac');

       console.log('Script Buyer: ', instance2.toBuyerP2PKHScript)

       //if(tokenStateSC === 'Current' && instance2.sell )
       if(instance2.sell )
       {

          //if(instance2.toBuyerP2PKHScript === instance2.tokenP2pkhScript)
          if(instance2.toBuyerP2PKHScript === '')
          {
            settokenSale('For Sale: ( PRICE: ' + instance2.price + ' sats' + '; ANYONE CAN PAY' + ' )');
          }
          else
          {
            settokenSale('For Sale: ( PRICE: ' + instance2.price + ' sats' + '; ONLY BUYER: ' 
            + bsv.Address.fromPublicKeyHash(Buffer.from(instance2.toBuyerP2PKHScript.substring(indexHahs1 + 6, indexHahs2), 'hex'), homenetwork)
            + ' )');

          }

        }    
      }
      //////////////////////////////////////////////////////////////      
      //////////////////////////////////////////////////////////////

      //Primeira Busca no Formato ASM por OP_RETURN Token
      let index: number = getDataASM.indexOf('OP_RETURN');

      let fileType = ''

      let tokenType = false;
      let defaultData = false;

      ///////////////////////////////////////
      //Primeiro Verifica se é GPToken
      ///////////////////////////////////////

      ///////////////////////////////////////
      //Não sendo GPToken
      //Busca por P2PKH Tokens or Stamps
      ///////////////////////////////////////
      //else //
      if(props.passedData !== 'Stamps')
      {

        let index0: number = getDataASM.indexOf('OP_1 0');

        if((index0 !== -1)) // Stamps
        {
          let index: number = getDataASM.indexOf('OP_1 0');

          getData = getDataASM.substring(index + 'OP_1 0'.length + 1, getDataASM.length)
          console.log('Data Get: ', getData)
          index = getData.indexOf(' 0');
  
          let ownerpubKey = getData.substring(index + ' '.length)
          console.log('Pub Key: ', ownerpubKey)
          ownerpubKey = ownerpubKey.substring(0, getData.indexOf(' ')) 
  
          getData = getData.substring(0, index)
  
          //console.log('Data Get: ', getData)
  
          //console.log('GetData: ', getData.substring(0, 100))
  
  
          //let pubKeySend = bsv.PublicKey.fromPrivateKey(privateKey);
          console.log('Pub Key: ', ownerpubKey)
          let pubKeySend = bsv.PublicKey.fromHex(ownerpubKey);
  
  
          //let indexHahs1 = getData.indexOf('76a914');
          //let indexHahs1 = getData.indexOf('76a914');
          //let indexHahs2 = getData.indexOf('88ac');
   
    
          let ownerAdd
  
          //if((indexHahs1 !== -1) && (indexHahs2 !== -1))
          if( ownerpubKey.length >= 66)
          {
            //ownerAdd = bsv.Address.fromPublicKeyHash(Buffer.from(getData.substring(indexHahs1 + 6, indexHahs2), 'hex'), homenetwork)
            ownerAdd = bsv.Address.fromPublicKey(pubKeySend, homenetwork)
          }
          else
          {
            ownerAdd = 'none'
          }
  
          settokenOwner('Owner Add: ' + ownerAdd)
  
          let stxos = await getSpentOutput(currentTIXD, 0, homenetwork)
  
          let tokenStateSC = 'Current'
      
          //Verifica se o estado do token é atual
          if(stxos[0].inputIndex !== -1)
          {
            tokenStateSC = 'Past'
            settokenSale('');
          }
  
          {
            index = getDataASM.indexOf('OP_1 04');
  
            {
              //index = getDataASM.indexOf('OP_CHECKSIG');
              
              //getData = getDataASM.substring(index + 12, getDataASM.length - 8)
              tokenType = true;
              settokenInfo('Opt Stamps Token: ( BALANCE = ' + tx3.outputs[0].satoshis + ' satoshi'
              + '; STATE = ' + tokenStateSC 
              + '; STAMP = ' + timestamper
              + ' )');
  
            }
            
          }

        }
        else // Non Stamps
        {
            
            let indexHahs1 = getData.indexOf('76a914');
            let indexHahs2 = getData.indexOf('88ac');
    
            console.log('indexHahs1: ', indexHahs1)
            console.log('indexHahs2: ', indexHahs2)
      
            let ownerAdd

            //Jesus is The LORD!!!

            //Revisão por conta do erro do arquivo do Paulo (SUPER 2023):
            //https://test.whatsonchain.com/tx/230aa6cd9f3612794c5013b863c13d5cba949a11583a911c9c76b536827e092c
            if((indexHahs1 !== -1) && (indexHahs2 !== -1) && (indexHahs2 - (indexHahs1 + 6) === 40))
            {
              ownerAdd = bsv.Address.fromPublicKeyHash(Buffer.from(getData.substring(indexHahs1 + 6, indexHahs2), 'hex'), homenetwork)
            }
            else
            {
              ownerAdd = 'none'
            }

            settokenOwner('Owner Add: ' + ownerAdd)

            let stxos = await getSpentOutput(currentTIXD, 0, homenetwork)

            let tokenStateSC = 'Current'
        
            //Verifica se o estado do token é atual
            if(stxos[0].inputIndex !== -1)
            {
              tokenStateSC = 'Past'
              settokenSale('');
            }

            //OP_RETURN Token
            //No formato ASM fica mais fácil encontrar o dado:
            //Vai do indice de 'OP_RETURN '.length até getDataASM.length
            if(index !== -1)
            {
              //fileType = '000001';
              tokenType = true;
              getData = getDataASM.substring(index + 10, getDataASM.length)
              settokenInfo('p2pkh Return Data Token: ( BALANCE = ' + tx3.outputs[0].satoshis + ' sats' 
              + '; STATE = ' + tokenStateSC 
              + '; STAMP = ' + timestamper
              + ' )');
            }
            /////////////////////////////
            // nSatOrdinals ou OP_DROP token
            /////////////////////////////
            else
            {
              index = getDataASM.indexOf('0 OP_IF');

              //nSatOrdinals Token
              //No formato ASM fica mais fácil encontrar o dado:
              //Vai do indice de ('0 OP_IF ' + '6f7264'+ ' OP_1 ').length até getDataASM.length
              if(index !== -1) // Ordinals Token
              {

                if(tx3.outputs[0].satoshis === 1)
                {
                  settokenInfo('1satOrdinals Token: ( BALANCE = ' + tx3.outputs[0].satoshis + ' sat' 
                  + '; STATE = ' + tokenStateSC 
                  + '; STAMP = ' + timestamper
                  + ' )');
                }
                else
                {
                  settokenInfo('nSatOrdinals Token: ( BALANCE = ' + tx3.outputs[0].satoshis + ' sats'
                  + '; STATE = ' + tokenStateSC 
                  + '; STAMP = ' + timestamper
                  + ' )');
                }
              
                //0 OP_IF 6f7264 OP_1 746578742f706c61696e3b636861727365743d7574662d38 0 717765727479 OP_ENDIF
      
                getData = getDataASM.substring(index + ('0 OP_IF ' + '6f7264'+ ' OP_1 ').length, getDataASM.length)
      
                index = getData.indexOf(' 0 ');//É possível no formato ASM
      
                let dataType = getData.substring(0, index) //O formato do Arquivo do 1satOrdinal
                //let dataType = getData.substring(index + 3, getData.length - ' OP_ENDIF'.length )
      
                for(let i = 0; i < RetContentType.length; i ++)
                {
                  if((Buffer.from(dataType, 'hex')).toString('utf-8') === RetContentType[i])
                  {
                    fileType = RetContentType[i+1];
                    break;
                  }
                }

                //Dado do Token
                getData = getData.substring(index + 3, getData.length - ' OP_ENDIF'.length )
      
                console.log('File Type: ', fileType)
                console.log('Data Ord: ', getData)
      
              }
              //OP_DROP Token
              //No formato ASM fica mais fácil encontrar o dado:
              //Vai do indice de 'OP_CHECKSIG '.length até getDataASM.length - ' OP_DROP'.length
              else 
              {
                index = getDataASM.indexOf('OP_CHECKSIG');
                
                getData = getDataASM.substring(index + 12, getDataASM.length - 8)
                tokenType = true;
                settokenInfo('p2pkh Data Drop Token: ( BALANCE = ' + tx3.outputs[0].satoshis + ' satoshi'
                + '; STATE = ' + tokenStateSC 
                + '; STAMP = ' + timestamper
                + ' )');

              }
              
            }
        }

      }

     dataTX = getData;

     if(fileType.length === 0)
     {
          fileType = dataTX.substring(dataTX.length - 16, dataTX.length - 10)
     }

      console.log('File Type: ', fileType )
      //switch(dataTX.substring(dataTX.length - 16, dataTX.length - 10))

      let fTypeData = fileTypeFromData(fileType)
      setfileType(fTypeData[0])
      defaultData = fTypeData[1]

      console.log('Data Size Final: ', (dataTX.length - 16 )/2)

        const encoder = new TextEncoder();
        //const data = encoder.encode(dataTX.substring(0, dataTX.length - 16));
    
        //const hexString = "48656c6c6f20576f726c64"; // Example hex string
        //let bytes = hexToBytes(dataTX.substring(0, dataTX.length - 16));
        let bytes = hexToBytes(dataTX.substring(0, dataTX.length));

        if(tokenType && !defaultData)
        {
          bytes = hexToBytes(dataTX.substring(0, dataTX.length - 16));
        }


        console.log("Size before: ", binaryData.length)

        setbinaryData(bytes)
        let bytesTX = hexToBytes(toHex(tx3));
        //console.log("TX HEX: ", toHex(tx3))
        setbinaryDataTX(bytesTX)


        setstrData(new TextDecoder('utf-8').decode(bytes))

        imageBlob = new Blob([bytes], { type: 'image/jpeg' }); // Adjust the type based on the image format
        imageUrl = URL.createObjectURL(imageBlob);  

        htmlDataP = new TextDecoder('utf-8').decode(bytes);

        videoBlob = new Blob([bytes], { type: 'video/mp4' });
        //videoBlob = new Blob([bytes], { type: 'video/wmv' });
        videoUrl = URL.createObjectURL(videoBlob);
      

        //binaryData = new Uint8Array(bytes);
        console.log("Size after: ", binaryData.length)

        //if(bytes.length > 0)
        if(bytes.length > 0)
        {
          setdownloadFile(true)
          setwaitAlert("Download File!!!");

          console.log("download file: ", downloadFile)
          console.log("File Type: ", fileType)

        }
        else if(bytes.length === 0) // Para GPToken Vazio
        {
          setdownloadFile(true)
          setwaitAlert("No Data in the Token!!!");

          //console.log("download file: ", downloadFile)
          //console.log("File Type: ", fileType)

        }

        else
        {
          setwaitAlert("Try Again!!!");
          settokenInfo('');
          settokenOwner('')
        }      

        //setHexString('')
        //setSelectedFile(null)
    }

  };

  const labelStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '5px 5px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px', 
    paddingBottom: '5px'
  };

  const iframeStyle = {
    width: '60%', // Use 100% of the parent container's width
    height: 'auto', // Automatically adjust height based on content
  };

  const contentStyle = {
    background: 'gray',
    color: 'black',
    fontSize: '12px',
    width: '80%',
    

  };

  const containerStyle = {
    //width: '300px', // Set the width of the container
    //height: '200px', // Set the height of the container
    width: '80%',
    height: 'auto',
    overflow: 'hidden', // Hide any overflow outside the container
    //display: 'flex',
    //alignItems: 'center',
    //justifyContent: 'center',
  };

  const imageStyle = {
    //width: '80%', // Make the image fit the container width
    maxWidth: '80%',
    height: 'auto', // Automatically adjust the height while maintaining aspect ratio
  };


  const containerStyleV = {
    //width: '300px', // Set the width of the container
    //height: '200px', // Set the height of the container
    width: '80%',
    //maxWidth: '400px !important', // Set a maximum width to constrain the player's size
    height: 'auto',
    overflow: 'hidden', // Hide any overflow outside the container
    //display: 'flex',
    //alignItems: 'center',
    //justifyContent: 'center',
  };

  const videoStyle = {

    width: '80%', // Set the width of the container
    height: 'auto', // Set the height of the container

    //width: '80%', // Make the image fit the container width
    //maxWidth: '80%',
    //height: '20%', // Automatically adjust the height while maintaining aspect ratio
  };


  return (

    <div className="App-header">
      <h2 style={{ fontSize: '34px', paddingBottom: '5px', paddingTop: '0px'}}>

        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          
        Token Details
      </h2>
      
      {
        props.passedData === "GPToken" && tokenOwner === ''?

        <a href='https://medium.com/@cktcracker/retrieving-data-content-from-a-token-ab116024a94f' target="_blank" rel="noopener noreferrer"
        style={{ fontSize: '14px', paddingBottom: '20px', color: 'yellow' }}>
          Instructions of Use
        </a>
        
        :
        ''
      }

      <div>
        <div className="label-container" style={{ fontSize: '14px', paddingBottom: '0px', paddingTop: '0px' }}>
                  <p className="responsive-label" style={{ fontSize: '12px' }}>TXID to Retrieve: {' '} </p>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
          <label style={{ fontSize: '14px', paddingBottom: '5px' }}  
              > 
                 {/* <input ref={localPvtKey} type="hex" name="PVTKEY1" min="1" defaultValue={'PVT KEY'} placeholder="hex" />*/}
                 <input ref={txIdRet} type="hex" name="PVTKEY1" min="1" placeholder="txid (on chain)" />
              </label>     
          </div>

        <div>
        <div style={{ display: 'inline-block', textAlign: 'center', justifyContent: 'right', paddingBottom: '20px'}}>
            <label  style={labelStyle}>
              Select TX File
              <input type="file" onChange={handleFileChange} />
            </label>
            {/*selectedFile && (
                    <div>
                        <p style={{ fontSize: '12px', paddingBottom: '0px' }} >
                          {selectedFile.name}</p>
                    </div>
            )
            */}
        </div>
      </div>
      <div>
        <div >
          
            {selectedFile && (txidFlag ==='') && (
                    <div style={{ display: 'inline-block', textAlign: 'center', justifyContent: 'right', paddingBottom: '20px'}}>
                        <p style={{ fontSize: '12px', paddingBottom: '0px' }} >
                          {selectedFile.name}</p>
                    </div>
            )}
        </div>
      </div>

      </div>

      <div>
          <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
              
              <button className="insert" onClick={readFromChain}
                  style={{ fontSize: '14px', paddingBottom: '2px', marginLeft: '0px'}}
              >Read</button>

          </div>
      </div>


      {
        props.passedData === 'GPToken' && tokenOwner !== ''?
          <div>
            <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '0px' }}>
                <p className="responsive-label" style={{ fontSize: '12px' }}>{tokenInfo} </p>
            </div>


            {tokenSale !== ''?
                  <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '0px' }}>
                        <p className="responsive-label" style={{ fontSize: '12px' }}>{tokenSale} </p>
                    </div>
                    :
                    ''
            }
            



            <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '0px' }}>
                <p className="responsive-label" style={{ fontSize: '12px' }}>{tokenOwner} </p>
            </div>
            <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '0px' }}>
                <p className="responsive-label" style={{ fontSize: '12px' }}>{tokenDescription} </p>
            </div>
          </div>
            
        :
        ''
        //<div></div>
      }

      {
        props.passedData !== 'GPToken' && tokenOwner !== ''?
          <div>
            <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '0px' }}>
                <p className="responsive-label" style={{ fontSize: '12px' }}>{tokenInfo} </p>
            </div>
            {tokenSale !== ''?
                  <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '0px' }}>
                        <p className="responsive-label" style={{ fontSize: '12px' }}>{tokenSale} </p>
                    </div>
                    :
                    ''
            }
            <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '0px' }}>
                <p className="responsive-label" style={{ fontSize: '12px' }}>{tokenOwner} </p>
            </div>
          </div>
            
        :
        ''
        //<div></div>
      }

      {
        downloadFile?
        
        fileType == 'txt'?
        <div>
          <h1 style={{ fontSize: '14px', paddingBottom: '5px', paddingTop: '0px'}}>File Content</h1>
            
            {/* Create an iframe to embed the file with responsive dimensions */}
          
            <iframe
              //src= {binaryData} //"path-to-your-file.pdf"
              srcDoc= {strData}
              //style={iframeStyle}
              style={{ fontSize: '12px', color: 'white !important', background: 'white', width: '80%'}}
              title="File Presentation"
              allowFullScreen // Allows full-screen mode
            ></iframe>

        </div>
        : fileType == 'png' || fileType == 'jfif'|| fileType == 'jpg'|| fileType == 'jpeg'|| fileType == 'webp'|| fileType == 'bmp'?
        <div style={containerStyle}>
          <h1 style={{ fontSize: '14px', paddingBottom: '5px', paddingTop: '0px'}}>File Content</h1>
            
            <img src={imageUrl} alt="Image" style={imageStyle} />
            
        </div>
        : fileType == 'html' || fileType == 'webp'?
        <div style={containerStyle}>
          <h1 style={{ fontSize: '14px', paddingBottom: '5px', paddingTop: '0px'}}>File Content</h1>
          
          <iframe srcDoc={htmlDataP} title="HTML File" style={imageStyle}></iframe>
        </div>
        :fileType == 'mp4'?

        <div style={containerStyleV}>
          <h1 style={{ fontSize: '14px', paddingBottom: '5px', paddingTop: '0px'}}>File Content</h1>
                                
              <video controls style={videoStyle}>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
        </div>
        :fileType == 'wmv'?

        <div style={containerStyleV}>
          <h1 style={{ fontSize: '14px', paddingBottom: '5px', paddingTop: '0px'}}>File Content</h1>
           {/* 
              { videoUrl && (
                <Player 
                  //playsInline
                  //poster="/path/to/poster.jpg" // Optional: Add a poster image
                  src={videoUrl}
                />
              ) }
          */}   
        </div>
        :
        <div>
        <h1 style={{ fontSize: '14px', paddingBottom: '5px', paddingTop: '0px'}}>File Content</h1>
          
          {/* Create an iframe to embed the file with responsive dimensions */}
        
          <iframe
            //src= {binaryData} //"path-to-your-file.pdf"
            srcDoc= {'Content of this file cannot be displayed here. Download to see content!!!'}
            //style={iframeStyle}
            style={{ fontSize: '12px', color: 'white !important', background: 'white', width: '80%'}}
            //title="File Presentation"
            allowFullScreen // Allows full-screen mode
          ></iframe>

        </div>

        
        :
        //<div>          {/* Divisão final de downloadFile?*/}        </div>
        ''
        
        
      }

      {
        downloadFile?
        <div>
          <div style={{ display: 'inline-block', textAlign: 'center', paddingBottom: '15px', paddingTop: '20px'}}>
              
              <button className="insert" onClick={downloadBinaryFile}
                  style={{ fontSize: '14px', paddingBottom: '2px', marginLeft: '0px'}}
              >Download Data</button>

              <button className="insert" onClick={downloadTXFile}
                  style={{ fontSize: '14px', paddingBottom: '2px', marginLeft: '20px'}}
              >Download TX</button>

          </div>
        </div>
        :
        //<div></div>
        ''
      }

      {
          txb?
          waitAlert ===''?
              <div>
                <div className="label-container" style={{ fontSize: '14px', paddingBottom: '0px', paddingTop: '5px' }}>
                  <p className="responsive-label" style={{ fontSize: '12px' }}>TXID: {txid} </p>
                </div>
                <div className="label-container" style={{ fontSize: '14px', paddingBottom: '5px', paddingTop: '0px' }}>
                  <p className="responsive-label" style={{ fontSize: '12px' }}>TX link: {' '} 
                      <a href={linkUrl} target="_blank" style={{ fontSize: '12px'}}>
                      {linkUrl}</a></p>
                </div>
              </div>
              :
              <div className="label-container" style={{ fontSize: '14px', paddingBottom: '5px', paddingTop: '5px' }}>
              <p className="responsive-label" style={{ fontSize: '12px' }}>{waitAlert} </p>
              </div>  
          :
          <div></div>
      }           



    </div>
  );
};

export default Page03Read;