import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import PasswordIcon from '../../components/ui/PasswordIcon';
import '../../assets/pages/auth/Auth.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [serialCode, setSerialCode] = useState('');
  const { login, errors, loading } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div id='auth'>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2>
            Registro de Asistente
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
              <div className="col-12 input-group">
                <input id="password" name="password" type="password" placeholder='Contraseña' autoComplete="current-password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                <PasswordIcon />
              </div>
              <p className='text-danger'>
                {errors ? errors.password : false && (<span className="text-danger">{errors.password[0]}</span>)}
              </p>
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <div className="d-sm-flex justify-content-between mb-2 mb-sm-0">
                <label htmlFor="password_confirmation" className="form-label">
                  Confirmar Contraseña:
                </label>
              </div>
              <div className="col-12 input-group">
                <input id="password_confirmation" name="password_confirmation" type="password" placeholder='Confirmar Contraseña' autoComplete="current-password" className='form-control' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                <PasswordIcon />
              </div>
              <p className='text-danger'>
                {errors ? errors.password_confirmation : false && (<span className="text-danger">{errors.password_confirmation[0]}</span>)}
              </p>
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <label htmlFor="serial_code" className="form-label">
                Código del Centro:
              </label>
              <input id="serial_code" name="serial_code" type="text" placeholder='Código del Centro' className='form-control' value={serialCode} onChange={(e) => setSerialCode(e.target.value)} />
              <p className='text-danger'>
                {errors ? errors.serial_code : false && (<span className="text-danger">{errors.serial_code[0]}</span>)}
              </p>
            </div>

            <div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Spinner loading={loading} spinnerColor={'white'} spinnerType={'spinner-border'}
                  spinnerStyle={{ width: '1rem', height: '1rem', }}
                />
                <span>Registrarse</span>
              </button>
            </div>

            <div>
              <p className='redirect'>
                ¿Ya tienes una Cuenta? <Link to={'/login'}>Inicia Sesión</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
