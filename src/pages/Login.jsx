import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple mock login for now
        if (email === 'thalesbx@gmail.com' && password === '123321') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        } else {
            alert('Credenciais inválidas.');
        }
    };

    return (
        <div className="login-page" style={{
            background: '#050505',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
        }}>
            <div className="login-card" style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '50px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <div className="logo" style={{ marginBottom: '30px', fontSize: '2rem' }}>Macaé<span>Digital</span></div>
                <h2 style={{ marginBottom: '30px', fontWeight: '300' }}>Acesso Restrito</h2>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '0.9rem' }}>E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: '#fff',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '0.9rem' }}>Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: '#fff',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-cta" style={{ width: '100%', padding: '15px' }}>
                        Entrar no Painel
                    </button>
                </form>

                <p style={{ marginTop: '30px', color: '#444', fontSize: '0.8rem' }}>
                    Somente administradores autorizados.
                </p>
            </div>
        </div>
    );
}

export default Login;
