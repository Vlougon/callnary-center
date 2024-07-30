import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/auth/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors, loading } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div id='login'>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2>
            Inicio de Sesión
          </h2>
        </div>

        <div className="row">
          <form method="POST" onSubmit={handleLogin}>

            <div className='col-12 text-sm-start mb-4'>
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className='text-danger'>
                {errors ? errors.email : false && (<span className="text-danger">{errors.email[0]}</span>)}
              </p>
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <div className="d-sm-flex justify-content-between mb-2 mb-sm-0">
                <label htmlFor="password" className="form-label">
                  Contraseña:
                </label>
              </div>
              <div className="col-12">
                <input id="password" name="password" type="password" placeholder='Contraseña' autoComplete="current-password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <p className='text-danger'>
                {errors ? errors.password : false && (<span className="text-danger">{errors.password[0]}</span>)}
              </p>
            </div>

            <div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Spinner loading={loading} spinnerColor={'white'} spinnerType={'spinner-border'}
                  spinnerStyle={{ width: '1rem', height: '1rem', }}
                />
                <span>Iniciar Sesión</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
