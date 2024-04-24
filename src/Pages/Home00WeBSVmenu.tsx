import React, { FC, useState, useEffect } from 'react';
import '../App.css';
import Logo from '../../public/logo.gif'

const Home00WeBSVmenu: FC = () => {
  const texts = [
    'Home / Reception:', 'Welcome to Smart Ordinals',
    'Home / Access:', 'Use a password or private key to Navigate',
    'Home / Send Sats:', 'Transfer satoshis with standard scripts P2PKH and P2PK',
    'Smart Ord / 1SatOrdinals:', 'Create, Reshape, Transfer, Melt, Details of 1SatOrdinals Token',
    'Smart Ord / Market On Chain:', 'Order Lock, Buy, Cancel, Details of Smart Ordinals',
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [labelText, setLabelText] = useState(texts[0]);
  const [labelText2, setLabelText2] = useState(texts[1]);
  const [imageSize, setImageSize] = useState(600); // Inicialize com o tamanho desejado da imagem

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
            Boosting 1SatOrdinals Usability
          </label>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src={`/${Logo}`} alt="Descrição da imagem" style={{ width: `${imageSize}px`, height: 'auto' }} />
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
        <a href='https://github.com/carlosamcruz/maoonchain/blob/main/README.md' target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', paddingBottom: '5px', color: 'yellow' }}>
          About Smart Ordinals
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
