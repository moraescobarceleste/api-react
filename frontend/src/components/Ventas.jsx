import CrudTabla from './CrudTabla';

function Ventas() {
  return (
    <CrudTabla
      titulo="Ventas"
      endpoint="/ventas"
      idCampo="id_venta"
      campos={[
        { name: 'id_cliente', label: 'ID Cliente', type: 'number' },
        { name: 'fecha_venta', label: 'Fecha', type: 'date' },
        { name: 'total', label: 'Total', type: 'number' },
        { name: 'estado', label: 'Estado' },
      ]}
    />
  );
}

export default Ventas;