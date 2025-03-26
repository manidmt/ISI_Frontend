import { useState } from "react";
import axios from "axios";

function App() {
  const [symbols, setSymbols] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Comparador de Acciones</h1>
      <input
        type="text"
        placeholder="Ejemplo: AAPL,TSLA,NVDA"
        value={symbols}
        onChange={(e) => setSymbols(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={fetchStockData}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Comparar
      </button>
      {loading && <p className="mt-2">Cargando...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        {stocks.length > 0 && (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Símbolo</th>
                <th className="border p-2">Cierre</th>
                <th className="border p-2">Variación</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.symbol}>
                  <td className="border p-2">{stock.symbol}</td>
                  <td className="border p-2">${stock.close}</td>
                  <td className="border p-2">{stock.variation_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
