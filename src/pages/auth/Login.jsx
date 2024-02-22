import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/auth/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, socialLogin, errors, loading } = useAuthContext();

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

            <div id='googleLogIn'>
              <a type='button' className='btn btn-light' href="http://localhost:8000/auth/google/redirect" title='Iniciar Sesión con Google'>
                <img src="/images/google.png" alt="Icono de Google" />
                <span className='ms-2'>Iniciar Sesión con Google</span>
              </a>
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors ? errors.email : false && (<span className="text-danger">{errors.email[0]}</span>)}
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <div className="d-sm-flex justify-content-between mb-2 mb-sm-0">
                <label htmlFor="password" className="form-label">
                  Contraseña:
                </label>
                <div className="text-sm">
                  <Link to={'/forgot-password'} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" title='Pedir cambio de Contraseña'>
                    ¿Olvidó su Contraseña?
                  </Link>
                </div>
              </div>
              <div className="col-12">
                <input id="password" name="password" type="password" placeholder='Contraseña' autoComplete="current-password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {errors ? errors.password : false && (<span className="text-danger">{errors.password[0]}</span>)}
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
