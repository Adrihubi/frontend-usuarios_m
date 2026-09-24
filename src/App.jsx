import { useState, useEffect } from 'react';
import UsuarioForm from './components/UsuarioForm';
import UsuarioList from './components/UsuarioList';
import {
    listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario
} from './api/usuariosApi';
import './styles/App.css';

export default function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarUsuarios = async () => {
        setCargando(true);
        setError(null);
        try {
            const { data } = await listarUsuarios();
            setUsuarios(data);
        } catch (err) {
            setError('Error al cargar usuarios. Verifica la API.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { cargarUsuarios(); }, []);

    const handleGuardar = async (data, id) => {
        if (id) await actualizarUsuario(id, data);
        else await crearUsuario(data);
        setUsuarioEditar(null);
        await cargarUsuarios();
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Eliminar este usuario?')) return;
        await eliminarUsuario(id);
        await cargarUsuarios();
    };

    return (
        <div className="app">
            <h1>Gestión de Usuarios</h1>
            <UsuarioForm
                onGuardar={handleGuardar}
                usuarioEditar={usuarioEditar}
                onCancelar={() => setUsuarioEditar(null)}
            />
            {cargando && <p>Cargando...</p>}
            {error && <p className="error">{error}</p>}
            {!cargando && !error && (
                <UsuarioList
                    usuarios={usuarios}
                    onEditar={setUsuarioEditar}
                    onEliminar={handleEliminar}
                />
            )}
        </div>
    );
}
