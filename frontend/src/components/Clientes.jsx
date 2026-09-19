import CrudTabla from './CrudTabla';

function Clientes() {
  return (
    <CrudTabla
      titulo="Clientes"
      endpoint="/clientes"
      idCampo="id_cliente"
      campos={[
        { name: 'nomCliente', label: 'Nombre' },
        { name: 'contacto', label: 'Contacto' },
        { name: 'departamento', label: 'Departamento' },
        { name: 'ciudad', label: 'Ciudad' },
      ]}
    />
  );
}

export default Clientes;