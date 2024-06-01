import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

const Secante = ({ initialValues, func }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (initialValues && func) {
      const secantResults = secantMethod(initialValues, func);
      setTableData(secantResults);
    }
  }, [initialValues, func]);

  const secantMethod = (initialValues, func) => {
    const results = [];
    let [x0, x1] = initialValues;
    let tol = 0.0001;
    let maxIter = 100;
    let n = 0;
    let error = null;

    while (n < maxIter) {
      const fx0 = evaluate(func.replace(/x/g, `(${x0})`));
      const fx1 = evaluate(func.replace(/x/g, `(${x1})`));
      const x2 = x1 - (fx1 * (x1 - x0)) / (fx1 - fx0);

      error = Math.abs((x1 - x0) / x1);

      results.push({
        n: n + 1,
        xn: parseFloat(x1.toFixed(8)),
        fxn: parseFloat(fx1.toFixed(8)),
        xn_prev: parseFloat(x0.toFixed(8)),
        fxn_prev: parseFloat(fx0.toFixed(8)),
        xn1: parseFloat(x2.toFixed(8)),
        error: parseFloat(error.toFixed(8))
      });

      if (Math.abs(x2 - x1) < tol) break;

      x0 = x1;
      x1 = x2;
      n++;
    }

    return results;
  };

  return (
    <div>
      <h2>Método de la Secante</h2>
      <table>
        <thead>
          <tr>
            <th>n</th>
            <th>x_n</th>
            <th>f(x_n)</th>
            <th>x_(n-1)</th>
            <th>f(x_(n-1))</th>
            <th>x_(n+1)</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.n}</td>
              <td>{row.xn}</td>
              <td>{row.fxn}</td>
              <td>{row.xn_prev}</td>
              <td>{row.fxn_prev}</td>
              <td>{row.xn1}</td>
              <td>{row.error}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Secante;
