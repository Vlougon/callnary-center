import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import PasswordIcon from '../../components/ui/PasswordIcon';
import FlashMessage from '../../components/flashmessages/FlashMessage';
import '../../assets/pages/auth/Auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [serial_code, setSerialCode] = useState('');
  const { register, loading } = useAuthContext();

  const handleRegisterInput = (element) => {
    element.target.className = 'form-control';
    element.target.getAttribute('id').match(/password/)
      ? element.target.nextElementSibling.nextElementSibling.className = 'invalid-feedback'
      : element.target.nextElementSibling.className = 'invalid-feedback';
  }

  const [showFM, setShowFM] = useState({
    render: false,
    message: '',
    type: '',
  });

  const hiddeAlert = () => {
    setShowFM({
      ...showFM,
      render: false,
      message: '',
      type: '',
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let failedChecking = false;

    if (name.match(/^(?=\s*$)/)) {
      document.querySelector('#name').className += ' is-invalid';
      document.querySelector('#name').nextElementSibling.className += ' d-block';
      failedChecking = true;
    }

    if (email.match(/^(?=\s*$)/)) {
      document.querySelector('#email').className += ' is-invalid';
      document.querySelector('#email').nextElementSibling.className += ' d-block';
      failedChecking = true;
    }

    if (!password.match(/^(?=.{10,})\S*$/) || password.match(/^(?=\s*$)/)) {
      document.querySelector('#password').className += ' is-invalid';
      document.querySelector('#password').nextElementSibling.nextElementSibling.className += ' d-block';
      failedChecking = true;
    }

    if (!password_confirmation.match(/^(?=.{10,})\S*$/) || password_confirmation.match(/^(?=\s*$)/) ||
      password !== password_confirmation
    ) {
      document.querySelector('#password_confirmation').className += ' is-invalid';
      document.querySelector('#password_confirmation').nextElementSibling.className += ' d-block';
      failedChecking = true;
    }

    if (serial_code.length != 32) {
      document.querySelector('#serial_code').className += ' is-invalid';
      document.querySelector('#serial_code').nextElementSibling.className += ' d-block';
      failedChecking = true;
    }

    if (failedChecking) {
      return;
    }

    const registerResposne = await register({ name, email, password, password_confirmation, serial_code });

    if (registerResposne && registerResposne.response && registerResposne.response.status !== 204) {
      setShowFM({
        ...showFM,
        render: true,
        message: registerResposne.response.data.message,
        type: 'danger',
      });
    }
  };

  return (
    <div id='auth'>
      {showFM.render &&
        <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
      }
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2>
            Registro de Asistente
          </h2>
        </div>

        <div className="row">
          <form method="POST" onSubmit={handleRegister}>

            <div className='col-12 text-sm-start mb-4'>
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input id="name" name="name" type="text" autoComplete="no" placeholder='Nombre' className='form-control' value={name} onChange={(e) => setName(e.target.value)} onClick={handleRegisterInput} />
              <div className="invalid-feedback">
                <p>¡Es necesario un Nombre de Usuario!</p>
              </div>
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} onClick={handleRegisterInput} />
              <div className="invalid-feedback">
                <p>¡Se debe usar un Email válido!</p>
              </div>
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <div className="d-sm-flex justify-content-between mb-2 mb-sm-0">
                <label htmlFor="password" className="form-label">
                  Contraseña:
                </label>
              </div>
              <div className="col-12 input-group">
                <input id="password" name="password" type="password" placeholder='Contraseña' autoComplete="current-password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} onClick={handleRegisterInput} />
                <PasswordIcon />
                <div className="invalid-feedback">
                  <p>¡La Contraseña Debe tener 10 carácteres como mínimo (No debe tener espacios)!</p>
                </div>
              </div>
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <div className="d-sm-flex justify-content-between mb-2 mb-sm-0">
                <label htmlFor="password_confirmation" className="form-label">
                  Confirmar Contraseña:
                </label>
              </div>
              <div className="col-12 input-group has-validation">
                <input id="password_confirmation" name="password_confirmation" type="password" placeholder='Confirmar Contraseña' autoComplete="current-password" className='form-control' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} onClick={handleRegisterInput} />
                <PasswordIcon />
                <div className="invalid-feedback">
                  <p>¡Las Contraseñas Deben ser iguales!</p>
                </div>
              </div>
            </div>

            <div className='col-12 text-sm-start mb-4'>
              <label htmlFor="serial_code" className="form-label">
                Código del Centro:
              </label>
              <input id="serial_code" name="serial_code" type="text" placeholder='Código del Centro' className='form-control' value={serial_code} onChange={(e) => setSerialCode(e.target.value)} onClick={handleRegisterInput} />
              <div className="invalid-feedback">
                <p>¡Introduzca un Código del Centro Válido!</p>
              </div>
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
