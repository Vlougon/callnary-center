import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import useAuthContext from '../hooks/useAuthContext';
import toast from 'react-hot-toast';
import '../assets/pages/auth/ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { sendPasswordResetLink, loading, errors, status } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendPasswordResetLink({ email });
    setEmail('');
  };

  useEffect(() => {
    if (status) {
      toast.success(status);
    }
  }, [status]);

  return (
    <div id='forgotPassword'>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2>
            ¿Olvidó su Contraseña?
          </h2>
        </div>

        <div className="row">
          <form method="POST" onSubmit={handleSubmit}>
            <div className='col-12 text-start mb-4'>
              <p>
                Introduce tu dirección de correo electrónico y te enviaremos un correo
                para cambiar tu contraseña.
              </p>
              <label htmlFor="email" className="form-label">
                Correo:
              </label>
              <input id="email" name="email" type="email" autoComplete="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && (<span className="text-danger">{errors.email[0]}</span>)}
            </div>

            <div className='mb-3'>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Spinner loading={loading} />
                <span>Enviar Link</span>
              </button>
            </div>

            <Link to={'/login'} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
              ¿Se acordó de su contraseña? Inicie Sesión
            </Link>
          </form>
        </div>

      </div>
    </div>
  );
}
