import { useEffect, useState } from 'react';
import api from '../services/api';

function CrudTabla({ titulo, endpoint, idCampo, campos }) {
  const vacio = Object.fromEntries(campos.map(c => [c.name, '']));

  const [registros, setRegistros] = useState([]);
  const [form, setForm] = useState(vacio);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState(null);

  const cargar = () =>
    api.get(endpoint)
      .then(res => setRegistros(res.data))
      .catch(() => setError(`No se pudo cargar el listado de ${titulo.toLowerCase()}`));

  useEffect(() => { cargar(); }, [endpoint]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editandoId) await api.put(`${endpoint}/${editandoId}`, form);
      else await api.post(endpoint, form);
      cancelar();
      cargar();
    } catch {
      setError('No se pudo guardar el registro');
    }
  };

  const editar = r => {
    setEditandoId(r[idCampo]);
    setForm(Object.fromEntries(
      campos.map(c => [c.name, c.type === 'date' ? String(r[c.name]).slice(0, 10) : r[c.name]])
    ));
  };

  const cancelar = () => {
    setForm(vacio);
    setEditandoId(null);
    setError(null);
  };

  const eliminar = async id => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      cargar();
    } catch {
      setError('No se pudo eliminar (¿tiene registros asociados?)');
    }
  };

  return (
    <div>
      <h2>{titulo}</h2>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="row g-2 mb-3">
        {campos.map(c => (
          <div className="col" key={c.name}>
            <input
              className="form-control"
              name={c.name}
              type={c.type || 'text'}
              step="any"
              placeholder={c.label}
              value={form[c.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-auto">
          <button className="btn btn-primary me-2">
            {editandoId ? 'Actualizar' : 'Agregar'}
          </button>
          {editandoId && (
            <button type="button" className="btn btn-secondary" onClick={cancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            {campos.map(c => <th key={c.name}>{c.label}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(r => (
            <tr key={r[idCampo]}>
              <td>{r[idCampo]}</td>
              {campos.map(c => <td key={c.name}>{r[c.name]}</td>)}
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => editar(r)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(r[idCampo])}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudTabla;