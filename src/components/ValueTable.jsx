import React from 'react';

const ValueTable = ({ values }) => {
  return (
    <div>
      <h2>Tabla de Valores</h2>
      <table>
        <thead>
          <tr>
            <th>x</th>
            <th>f(x)</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => (
            <tr key={index}>
              <td>{value.x}</td>
              <td>{value.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValueTable;