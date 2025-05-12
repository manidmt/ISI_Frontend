import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Inicio() {
  const [stocks, setStocks] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [error, setError] = useState(null);
  const nombresEmpresas = {
    AAPL: "Apple Inc.",
    MSFT: "Microsoft Corporation",
    TSLA: "Tesla, Inc."
  };
  const paises = ['SPAIN'];

  
  useEffect(() => {

    const fetchTopEmpresas = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/stock/compare?symbols=AAPL,MSFT,TSLA'
        );
        setStocks(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos de acciones');
      }
    };

    const fetchBonos = async () => {
      try {
        
        const todosLosBonos = [];

        for (const p of paises) {
          const res = await axios.get(`http://localhost:5000/bonds/${p}`);
          todosLosBonos.push(...res.data);
        }

        setBonds(todosLosBonos);
      } catch (err) {
        console.error('Error al cargar bonos:', err);
      }
    };

    fetchTopEmpresas();
    fetchBonos();

  }, []);
  

  return (

    <div className='contenedor'>

      <main>

        <h1 className="titulo-principal">📈 Comparador de Acciones y Bonos</h1>
        
        <p className="subtitulo">Consulta y compara la evolución de las principales acciones y bonos internacionales.</p>

        <div className="tarjetas">

          <div className="tarjeta">

            <h2>Top Empresas</h2>

            {error && <p className="mensaje error">{error}</p>}
            {stocks.length > 0 && (

              <table className="tabla">

                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Símbolo</th>
                    <th>Cierre</th>
                    <th>Variación</th>
                  </tr>
                </thead>
                
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.symbol}>
                      <td>{nombresEmpresas[stock.symbol] ?? stock.symbol}</td>
                      <td>{stock.symbol}</td>
                      <td>${stock.close}</td>
                      <td className={stock.variation_pct >= 0 ? 'positivo' : 'negativo'}>
                        {(stock.variation_pct > 0 ? '+' : '') + stock.variation_pct.toFixed(2) + '%'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              
              </table>
            )}

            </div>

            <div className="tarjeta">
              
              <h2> Bonos Principales </h2>
              
              <table className="tabla">
              
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cupón</th>
                    <th>Rango Anual</th>
                  </tr>
                </thead>
                <tbody>
                  {bonds
                    .filter(bond =>
                      bond.name === 'Spain 1-Year Bond Yield' ||
                      bond.name === 'Spain 10-Year Bond Yield' ||
                      bond.name === 'Spain 20-Year Bond Yield'
                    )
                    .map((bond, i) => (
                      <tr key={i}>
                        <td>{bond.name}</td>
                        <td>{bond.coupon ?? '-'}</td>
                        <td>{bond.year_range ?? '-'}</td>
                      </tr>
                  ))}
                </tbody>

              </table>
            
            </div>

        </div>

      </main>

    </div>
  );
}

{/*

import { useState, useEffect } from 'react';

export default function InicioDemo() {
  const [stocks, setStocks] = useState([]);
  const [bonds, setBonds] = useState([]);

  const nombresEmpresas = {
    AAPL: "Apple Inc.",
    MSFT: "Microsoft Corporation",
    TSLA: "Tesla, Inc."
  };

  useEffect(() => {
    // Datos de ejemplo para acciones
    setStocks([
      {
        symbol: 'AAPL',
        close: 172.35,
        variation_pct: 1.31
      },
      {
        symbol: 'MSFT',
        close: 310.12,
        variation_pct: -0.45
      },
      {
        symbol: 'TSLA',
        close: 188.10,
        variation_pct: 2.05
      }
    ]);

    // Datos de ejemplo para bonos
    setBonds([
      {
        name: 'Bono 10Y España',
        price: 98.7,
        coupon: '3.15%',
        one_year_change: 1.32
      },
      {
        name: 'Treasury 10Y USA',
        price: 95.2,
        coupon: '4.10%',
        one_year_change: -0.78
      },
      {
        name: 'Bono 10Y Francia',
        price: 97.4,
        coupon: '2.80%',
        one_year_change: 0.45
      }
    ]);
  }, []);

  return (
    <div className='contenedor'>
      <main>
        <h1 className="titulo-principal">📈 Comparador de Acciones y Bonos (Demo)</h1>
        <p className="subtitulo">Consulta y compara la evolución de las principales acciones y bonos internacionales.</p>

        <div className="tarjetas">

          <div className="tarjeta">
            <h2>Top Empresas</h2>
            <table className="tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Símbolo</th>
                  <th>Cierre</th>
                  <th>Variación</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.symbol}>
                    <td>{nombresEmpresas[stock.symbol] ?? stock.symbol}</td>
                    <td>{stock.symbol}</td>
                    <td>${stock.close.toFixed(2)}</td>
                    <td className={stock.variation_pct >= 0 ? 'positivo' : 'negativo'}>
                      {(stock.variation_pct > 0 ? '+' : '') + stock.variation_pct.toFixed(2) + '%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tarjeta">
            <h2>Bonos Principales</h2>
            <table className="tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cupón</th>
                  <th>1 Año</th>
                </tr>
              </thead>
              <tbody>
                {bonds.map((bond, i) => (
                  <tr key={i}>
                    <td>{bond.name}</td>
                    <td>{bond.price}</td>
                    <td>{bond.coupon}</td>
                    <td className={bond.one_year_change >= 0 ? 'positivo' : 'negativo'}>
                      {(bond.one_year_change > 0 ? '+' : '') + bond.one_year_change + '%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
*/}