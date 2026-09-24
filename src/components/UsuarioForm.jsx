import { useState, useEffect } from 'react';

export default function UsuarioForm({ onGuardar, usuarioEditar, onCancelar }) {
    const [form, setForm] = useState({ nombre: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (usuarioEditar) {
            setForm({
                nombre: usuarioEditar.nombre,
                email: usuarioEditar.email,
                password: ''
            });
        } else {
            setForm({ nombre: '', email: '', password: '' });
        }
    }, [usuarioEditar]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);
        try {
            await onGuardar(form, usuarioEditar?.id);
            setForm({ nombre: '', email: '', password: '' });
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar');
        } finally {
            setCargando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="usuario-form">
            <h2>{usuarioEditar ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            {error && <p className="error">{error}</p>}

            <input
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
            />

            <div className="botones">
                <button type="submit" disabled={cargando}>
                    {cargando ? 'Guardando...' : usuarioEditar ? 'Actualizar' : 'Crear'}
                </button>
                {usuarioEditar && (
                    <button type="button" onClick={onCancelar}>Cancelar</button>
                )}
            </div>
        </form>
    );
}
