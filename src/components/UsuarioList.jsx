export default function UsuarioList({ usuarios, onEditar, onEliminar }) {
    if (usuarios.length === 0) {
        return <p>No hay usuarios registrados.</p>;
    }
    return (
        <table className="usuario-list">
            <thead>
                <tr>
                    <th>ID</th><th>Nombre</th><th>Email</th><th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((u) => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                        <td>
                            <button onClick={() => onEditar(u)}>Editar</button>
                            <button onClick={() => onEliminar(u.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
