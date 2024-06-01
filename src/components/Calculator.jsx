import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import ValueTable from './ValueTable';
import Biseccion from './Biseccion';
import Newton from './Newton';
import Secante from './Secante';

const Calculator = () => {
  const [method, setMethod] = useState('');
  const [range, setRange] = useState({ start: 0, end: 0 });
  const [func, setFunc] = useState('');
  const [values, setValues] = useState([]);
  const [twovalues, setTwoValues] = useState({ an: 0, bn: 0 });
  const [initialGuess, setInitialGuess] = useState(0);

  const handleRangeChange = (e) => {
    setRange({
      ...range,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleFuncChange = (e) => {
    setFunc(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleCalculate = () => {
    const { start, end } = range;
    const step = 0.1;
    let results = [];

    for (let x = start; x <= end + 0.1; x += step) {
      let y = evaluate(func.replace(/x/g, `(${x})`));
      results.push({ x: parseFloat(x.toFixed(5)), y: parseFloat(y.toFixed(5)) });
    }

    setValues(results);
    findSignChange(results);
  };

  const findSignChange = (values) => {
    for (let i = 0; i < values.length - 1; i++) {
      if (values[i].y * values[i + 1].y < 0) {
        setTwoValues({ an: values[i].x, bn: values[i + 1].x });
        break;
      }
    }
  };

  useEffect(() => {
    if (values.length > 0) {
      findSignChange(values);
    }
  }, [values]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Calculadora MN</h1>
      <div>
        <label>
          Rango inicial:
          <input type="number" name="start" value={range.start} onChange={handleRangeChange} />
        </label>
        <label>
          Rango final:
          <input type="number" name="end" value={range.end} onChange={handleRangeChange} />
        </label>
        <label>
          Función (usa 'x' como variable):
          <input type="text" value={func} onChange={handleFuncChange} />
        </label>
        <label>
          Selecciona el método:
          <select value={method} onChange={handleMethodChange}>
            <option value="">Selecciona...</option>
            <option value="bisection">Bisección</option>
            <option value="fixed-point">Punto Fijo</option>
            <option value="newton-raphson">Newton-Raphson</option>
            <option value="secant">Secante</option>
          </select>
        </label>
        {method === 'newton-raphson' && (
          <label>
            Adivinanza inicial:
            <input type="number" value={initialGuess} onChange={(e) => setInitialGuess(parseFloat(e.target.value))} />
          </label>
        )}
        <button onClick={handleCalculate}>Calcular</button>
      </div>
      {values.length > 0 && <ValueTable values={values} />}
      {method === 'bisection' && twovalues.an && twovalues.bn && (
        <Biseccion initialInterval={[twovalues.an, twovalues.bn]} func={func} />
      )}
      {method === 'newton-raphson' && initialGuess !== undefined && (
        <Newton initialGuess={initialGuess} func={func} />
      )}
      {method === 'secant' && twovalues.an !== undefined && twovalues.bn !== undefined && (
        <Secante initialValues={[twovalues.an, twovalues.bn]} func={func} />
      )}
    </div>
  );
};

export default Calculator;

