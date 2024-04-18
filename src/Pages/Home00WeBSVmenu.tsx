import React, { FC, useState, useEffect } from 'react';
import '../App.css';

const Home00WeBSVmenu: FC = () => {
  const texts = [
    'Home/New PVT Key:', 'Create a new Private Key to Navigate',
    'Home/Access:', 'Use a password or private key to Navigate',
    'Home/Didactic:', 'Learn some didactic functions',
    'Satoshi to Peer/Send Satoshi:', 'Transfer satoshis with standard scripts P2PKH and P2PK',
    'Satoshi to Peer/Data on Chain:', 'Write or Retrieve chain data',
    'Satoshi to Peer/Data Token R:', 'Create-Reshape-Transfer-Melt OP_RETURN data Token',
    'Satoshi to Peer/Data Token D:', 'Create-Reshape-Transfer-Melt OP_DROP data Token',
    'Satoshi to Peer/nSatOrdinals:', 'Create-Reshape-Transfer-Melt 1SatOrdinals or nSatOrdinals',
    'Satoshi to Peer/UTXO list:', 'Get UTXO list of an Address or Script Hash',
    'Smart Contracts:', 'Coming Soon!!!'
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [labelText, setLabelText] = useState(texts[0]);
  const [labelText2, setLabelText2] = useState(texts[1]);
  const [imageSize, setImageSize] = useState(300); // Inicialize com o tamanho desejado da imagem

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = ((textIndex + 2)) % (texts.length);
      setLabelText(texts[newIndex]);
      setLabelText2(texts[newIndex + 1]);
      setTextIndex(newIndex);
    }, 4000); // Altera o texto a cada 4 segundos

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [textIndex]);

  return (
    <div>
      <div className="App-header2">
        <h2 style={{ fontSize: '30px', paddingBottom: '5px', paddingTop: '5px' }}>
          Smart Ordinals
        </h2>
      </div>
      <div className="body2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
          <label style={{ fontSize: '20px', paddingBottom: '2px' }}>
            Enjoy Navigating
          </label>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="/logo.gif" alt="Descrição da imagem" style={{ width: `${imageSize}px`, height: 'auto' }} />
        </div>
        <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
          <label style={{ fontSize: '14px', paddingBottom: '2px' }}>
            {labelText}
          </label>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '40px' }}>
          <label style={{ fontSize: '14px', paddingBottom: '2px' }}>
            {labelText2}
          </label>
        </div>
        <a href='https://medium.com/@cktcracker/websvmenu-faac499d0da5' target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', paddingBottom: '5px', color: 'yellow' }}>
          About websvmenu
        </a>
        {/* Adicione controles para ajustar o tamanho da imagem */}
        <div>
          <input type="range" min="100" max="500" value={imageSize} onChange={(e) => setImageSize(parseInt(e.target.value))} />
        </div>
      </div>
    </div>
  );
};

export default Home00WeBSVmenu;
