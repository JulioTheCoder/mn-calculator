import React, { useState, useEffect } from 'react';
import { evaluate, derivative } from 'mathjs';

const Newton = ({ initialGuess, func }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (initialGuess !== undefined && func) {
      const newtonResults = newtonMethod(initialGuess, func);
      setTableData(newtonResults);
    }
  }, [initialGuess, func]);

  const newtonMethod = (x0, func) => {
    const results = [];
    let xn = x0;
    let xn_prev = xn;  // Almacenar el valor anterior de xn
    let error = null;  // Inicialmente, el error es null para la primera fila
    let tol = 0.0001;  // Tolerancia de error
    let n = 0;
    const maxIter = 100;  // Máximo número de iteraciones

    while ((error === null || Math.abs(error) > tol) && n < maxIter) {
      const fxn = evaluate(func.replace(/x/g, `(${xn})`));
      const dfxn = evaluate(derivative(func, 'x').toString().replace(/x/g, `(${xn})`));
      const xn1 = xn - (fxn / dfxn);
      
      if (n > 0) {
        error = Math.abs((xn - xn_prev) / xn);
      }

      results.push({
        n: n + 1,
        xn: parseFloat(xn.toFixed(8)),
        fxn: parseFloat(fxn.toFixed(8)),
        dfxn: parseFloat(dfxn.toFixed(8)),
        xn1: parseFloat(xn1.toFixed(8)),
        error: n === 0 ? null : parseFloat(error.toFixed(8)),  // No se muestra el error en la primera iteración
      });

      xn_prev = xn;  // Actualizar xn_prev antes de cambiar xn
      xn = xn1;
      n++;
    }

    return results;
  };

  return (
    <div>
      <h2>Método de Newton-Raphson</h2>
      <table>
        <thead>
          <tr>
            <th>n</th>
            <th>x_n</th>
            <th>f(x_n)</th>
            <th>f'(x_n)</th>
            <th>x_n+1</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.n}</td>
              <td>{row.xn}</td>
              <td>{row.fxn}</td>
              <td>{row.dfxn}</td>
              <td>{row.xn1}</td>
              <td>{row.error !== null ? row.error : ''}</td>  {/* No mostrar el error si es null */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Newton;