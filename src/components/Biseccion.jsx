import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

const Biseccion = ({ initialInterval, func }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (initialInterval && func) {
      const [a, b] = initialInterval;
      const bisectionResults = bisectionMethod(a, b, func);
      setTableData(bisectionResults);
    }
  }, [initialInterval, func]);

  const bisectionMethod = (a, b, func) => {
    const results = [];
    let an = a;
    let bn = b;
    let xn = (an + bn) / 2;
    let error = Math.abs((bn - an)/2);

    let n = 1;

    while (error > 0.0001) { // Tolerancia de error
      const fa = evaluate(func.replace(/x/g, `(${an})`));
      const fb = evaluate(func.replace(/x/g, `(${bn})`));
      const fx = evaluate(func.replace(/x/g, `(${xn})`));

      results.push({
        n,
        an: parseFloat(an.toFixed(4)),
        bn: parseFloat(bn.toFixed(4)),
        xn: parseFloat(xn.toFixed(4)),
        fa: parseFloat(fa.toFixed(8)),
        fb: parseFloat(fb.toFixed(8)),
        fx: parseFloat(fx.toFixed(8)),
        error: parseFloat(error.toFixed(8))
      });

      if (fa * fx < 0) {
        bn = xn;
      } else {
        an = xn;
      }

      xn = (an + bn) / 2;
      error = Math.abs((bn - an)/2);
      n++;
    }

    return results;
  };

  return (
    <div>
      <h2>Método de Bisección</h2>
      <table>
        <thead>
          <tr>
            <th>n</th>
            <th>a_n</th>
            <th>b_n</th>
            <th>x_n</th>
            <th>f(a_n)</th>
            <th>f(b_n)</th>
            <th>f(x_n)</th>
            <th>error</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.n}</td>
              <td>{row.an}</td>
              <td>{row.bn}</td>
              <td>{row.xn}</td>
              <td>{row.fa}</td>
              <td>{row.fb}</td>
              <td>{row.fx}</td>
              <td>{row.error}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Biseccion;