import CrudTabla from './CrudTabla';

function Productos() {
  return (
    <CrudTabla
      titulo="Productos"
      endpoint="/productos"
      idCampo="id_producto"
      campos={[
        { name: 'nomProducto', label: 'Nombre' },
        { name: 'cantidad', label: 'Cantidad', type: 'number' },
        { name: 'precio', label: 'Precio', type: 'number' },
      ]}
    />
  );
}

export default Productos;