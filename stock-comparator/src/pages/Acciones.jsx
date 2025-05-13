import { useState } from 'react';
import axios from 'axios';

export default function ComparadorAcciones() {

  const [symbols, setSymbols] = useState('');
  const [stocks, setStocks] = useState([]);
  const [companyData, setCompanyData] = useState({});
  const [hoveredSymbol, setHoveredSymbol] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyError, setCompanyError] = useState(null);

  const fetchStockData = async () => {
    
    if (!symbols.trim()) return;
    setLoading(true);
    setError(null);

    try {

      const response = await axios.get(
        `http://localhost:5000/stock/compare?symbols=${symbols}`
      );

      setStocks(response.data);
      
    } catch (err) {
      setError('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyData = async (symbol) => {
    
    if (companyData[symbol]) return;

    try {

      
      const response = await axios.get(
        `http://localhost:5000/company/${symbol}`
      );

      // Actualiza el contenido de companyData
      // Añade la clave symbol asignándole response.data
      setCompanyData(prev => ({
        ...prev,
        [symbol]: response.data
      }));
    } 
    
    catch (err) {
      setCompanyError(`Error al obtener datos de empresa para ${symbol}`);
      console.error(err);
    }

  };


  return (

    <div className="contenedor">

      <main>
      
        <h1 className="titulo">🔍 Comparador de Acciones</h1>

        <div className="formulario">
            
          <input
            type="text"
            placeholder="Ejemplo: AAPL,TSLA,NVDA"
            value={symbols}
            onChange={(e) => setSymbols(e.target.value)}
            className="campo-texto"
          />

          <button
            onClick={fetchStockData}
            className="boton"
            disabled={loading}
          >
            {loading ? "Consultando..." : "Comparar"}
          </button>
        
        </div>

        {stocks.length > 0 && (
            <div className="tarjeta">
            
              <h2>Resultados</h2>
            
              <table className="tabla">
                <thead>
                  <tr>
                    <th>Símbolo</th>
                    <th>Fecha</th>
                    <th>Apertura</th>
                    <th>Cierre</th>
                    <th>Mínimo</th>
                    <th>Máximo</th>
                    <th>Volumen</th>
                    <th>Variación</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.symbol}>
                      <td
                        className="celda-simbolo"
                        onMouseEnter={() => {
                          setHoveredSymbol(stock.symbol);
                          fetchCompanyData(stock.symbol);
                        }}
                        onMouseLeave={() => setHoveredSymbol(null)}
                      >
                        {stock.symbol}
                        {hoveredSymbol === stock.symbol && companyData[stock.symbol] && (
                          <div className="tooltip-empresa">
                            <div><strong>{companyData[stock.symbol].name}</strong></div>
                            <div>Sector: {companyData[stock.symbol].sector}</div>
                            <div>Industria: {companyData[stock.symbol].industry}</div>
                          </div>
                      )}
                      </td>
                      <td>{stock.last_date}</td>
                      <td>${stock.open.toFixed(2)}</td>
                      <td>${stock.close.toFixed(2)}</td>
                      <td>${stock.low.toFixed(2)}</td>
                      <td>${stock.high.toFixed(2)}</td>
                      <td>{stock.volume.toLocaleString()}</td>
                      <td className={stock.variation_pct >= 0 ? 'positivo' : 'negativo'}>
                        {(stock.variation_pct > 0 ? '+' : '') + stock.variation_pct.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            </div>
       )}
          
      </main>

    </div>

  );
}

{/*
  
import { useState } from 'react';

export default function AccionesDemo() {
  const [hoveredSymbol, setHoveredSymbol] = useState(null);

  const stocks = [
    {
      symbol: 'AAPL',
      last_date: '2025-05-09',
      open: 170.12,
      close: 172.35,
      low: 169.50,
      high: 173.00,
      volume: 83000000,
      variation_pct: 1.31
    },
    {
      symbol: 'TSLA',
      last_date: '2025-05-09',
      open: 190.22,
      close: 188.10,
      low: 187.00,
      high: 192.00,
      volume: 65000000,
      variation_pct: -1.12
    }
  ];

  const companyData = {
    AAPL: {
      name: 'Apple Inc.',
      sector: 'Technology',
      industry: 'Consumer Electronics'
    },
    TSLA: {
      name: 'Tesla, Inc.',
      sector: 'Automotive',
      industry: 'Electric Vehicles'
    }
  };

  return (
    <div className="contenedor">
      <main>
        <h1 className="titulo">🔍 Comparador de Acciones (Demo)</h1>

        <div className="tarjeta">
          <h2>Resultados</h2>
          <table className="tabla">
            <thead>
              <tr>
                <th>Símbolo</th>
                <th>Fecha</th>
                <th>Apertura</th>
                <th>Cierre</th>
                <th>Mínimo</th>
                <th>Máximo</th>
                <th>Volumen</th>
                <th>Variación</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.symbol}>
                  <td
                    className="celda-simbolo"
                    onMouseEnter={() => setHoveredSymbol(stock.symbol)}
                    onMouseLeave={() => setHoveredSymbol(null)}
                  >
                    {stock.symbol}
                    {hoveredSymbol === stock.symbol && (
                      <div className="tooltip-empresa">
                        <div><strong>{companyData[stock.symbol].name}</strong></div>
                        <div>Sector: {companyData[stock.symbol].sector}</div>
                        <div>Industria: {companyData[stock.symbol].industry}</div>
                      </div>
                    )}
                  </td>
                  <td>{stock.last_date}</td>
                  <td>${stock.open.toFixed(2)}</td>
                  <td>${stock.close.toFixed(2)}</td>
                  <td>${stock.low.toFixed(2)}</td>
                  <td>${stock.high.toFixed(2)}</td>
                  <td>{stock.volume.toLocaleString()}</td>
                  <td className={stock.variation_pct >= 0 ? 'positivo' : 'negativo'}>
                    {(stock.variation_pct > 0 ? '+' : '') + stock.variation_pct.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

*/}