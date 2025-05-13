import { useState } from 'react';
import axios from 'axios';

export default function ComparadorBonos() {

  const [countries, setCountries] = useState('');
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchBondData = async () => {

    if (!countries.trim()) return;
    setLoading(true);
    setError(null);

    const formattedCountry = countries.trim().toUpperCase();

    try {
      const response = await axios.get(
        `http://localhost:5000/bonds/${formattedCountry}`
      );
      setBonds(response.data);
    } catch (err) {
      setError('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="contenedor">
    
      <main>

        <h1 className="titulo">🔍 Comparador de Bonos</h1>

        <div className="formulario">

          <input
            type="text"
            placeholder="Ejemplo: SPAIN, U.S.,FRANCE"
            value={countries}
            onChange={(e) => setCountries(e.target.value)}
            className="campo-texto"
          />

          <button
            onClick={fetchBondData}
            className="boton"
            disabled={loading}
          >
            {loading ? 'Consultando...' : 'Comparar'}
            
          </button>

        </div>

        {error && <p className="mensaje error">{error}</p>}

        {bonds.length > 0 && (
          <div className="tarjeta">

            <h2>Resultados</h2>
            
            <table className="tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>País</th>
                  <th>Precio</th>
                  <th>Cupón</th>
                  {/*<th>1 Año</th>*/}
                  <th>Rango diario</th>
                  <th>Rango anual</th>
                </tr>
              </thead>
              <tbody>
                {bonds.map((bond, index) => (
                  <tr key={index}>
                    <td>{bond.name}</td>
                    <td>{bond.country}</td>
                    <td>{bond.price ?? '-'}</td>
                    <td>{bond.coupon ?? '-'}</td>
                    {/*<td className={bond.one_year_change >= 0 ? 'positivo' : 'negativo'}>
                      {(bond.one_year_change > 0 ? '+' : '') + bond.one_year_change}%
                    </td>*/}
                    <td>{bond.day_range}</td>
                    <td>{bond.year_range}</td>
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

export default function BonosDemo() {
  const [bonds] = useState([
    {
      name: 'Bono 10Y España',
      country: 'SPAIN',
      price: 98.7,
      coupon: '3.15%',
      one_year_change: 1.32,
      day_range: '98.2 - 99.0',
      year_range: '91.5 - 101.3'
    },
    {
      name: 'Treasury 10Y USA',
      country: 'USA',
      price: 95.2,
      coupon: '4.10%',
      one_year_change: -0.78,
      day_range: '94.8 - 95.9',
      year_range: '89.3 - 99.4'
    }
  ]);

  return (
    <div className="contenedor">
      <main>
        <h1 className="titulo">🔍 Comparador de Bonos (Demo)</h1>

        <div className="tarjeta">
          <h2>Resultados</h2>
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>País</th>
                <th>Precio</th>
                <th>Cupón</th>
                <th>1 Año</th>
                <th>Rango diario</th>
                <th>Rango anual</th>
              </tr>
            </thead>
            <tbody>
              {bonds.map((bond, index) => (
                <tr key={index}>
                  <td>{bond.name}</td>
                  <td>{bond.country}</td>
                  <td>{bond.price.toFixed(2)}</td>
                  <td>{bond.coupon}</td>
                  <td className={bond.one_year_change >= 0 ? 'positivo' : 'negativo'}>
                      {(bond.one_year_change > 0 ? '+' : '') + bond.one_year_change}%
                  </td>
                  <td>{bond.day_range}</td>
                  <td>{bond.year_range}</td>
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