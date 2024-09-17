import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PathsList from '../../classes/PathsList';
import useAuthContext from '../../hooks/useAuthContext';
import majadaLogo from '/images/logoMajada.png';
import userIcon from '/images/defaultUserIcon.png';
import creativeCommons from '/images/creativecommons.png';
import webAccesibility from '/images/wcag2.2AA.png';
import '../../assets/components/HeadFoot.css';

export default function HeadFoot() {
    const location = useLocation();
    const { logout } = useAuthContext();
    const [userName, setuserName] = useState('');
    const [paths, setPaths] = useState([{
        id: 1,
        href: '/',
        name: 'Inicio'
    }]);

    useEffect(() => {
        const name = sessionStorage.getItem('assistant') ? JSON.parse(sessionStorage.getItem('assistant')).name : 'Anon';

        setuserName(name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Anon');
    }, [userName]);

    useEffect(() => {
        if (location.pathname === '/') {
            setPaths([{
                id: 1,
                href: '/',
                name: 'Inicio'
            }]);

        } else {
            const currentPath = location.pathname.split('/')[1];
            const posiblePaths = PathsList.paths.filter((path) => path.href.match(currentPath));
            let currPathObject = '';

            if (posiblePaths && posiblePaths.length === 1) {

                currPathObject = {
                    id: posiblePaths[0].id,
                    href: location.pathname,
                    name: posiblePaths[0].name,
                };

            } else if (posiblePaths && posiblePaths.length === 2) {

                for (const path of posiblePaths) {

                    if (location && path && path.href.split('/').length === location.pathname.split('/').length) {
                        currPathObject = {
                            id: path.id,
                            href: location.pathname,
                            name: path.name,
                        };
                    }
                }

            } else {
                // Handle Error
            }

            if (currPathObject) {
                /* 
                If the path is already on the nav, we filter to keep all the paths previos to it (and itslef). 
                Helpfull for when the users goes back to a previous view.

                Other way around, must mean that is the first time for that user on that view.
                We then store it's path and name.
                */
                if (paths.some((path) => path.id === currPathObject.id)) {
                    const pathIndex = paths.findIndex((path) => path.id === currPathObject.id);

                    setPaths(paths.filter((path, index) => index <= pathIndex));

                } else {
                    setPaths([
                        ...paths,
                        currPathObject
                    ]);
                }

            } else {
                // Handle Error
            }
        }

    }, [location.pathname]);

    const NavRender = () => {
        const links = [];

        for (const path of paths) {
            links.push(
                <Link key={path.id} className="nav-link" to={path.href} title={path.name}>{path.name}</Link>
            );
        }

        return (
            links.concat()
        )
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md">
                    <div className="container-fluid">
                        <a className="navbar-brand" href={majadaLogo} target='_blank' title='Logo del Centro de Telecomunicaciones del Majada'>
                            <img src={majadaLogo} alt="Logo del Majada Marcial" />
                            Majada's Call Center
                        </a>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#userNavbar" aria-controls="userNavbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="userNavbar">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>

                            <div className="dropdown">
                                <button type="button" id="profileBox" name="Perfil de Usuario" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={userIcon} alt="Icono de Perfil de Usuario" className="d-inline-block" />
                                    <span id="usersName" className='text-light'>{userName}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link to={''} onClick={logout} className='dropdown-item'>
                                            Cerrar Sesión
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <nav className="nav nav-underline">
                <NavRender />
            </nav>

            <Outlet>

            </Outlet>

            <footer>
                <p>
                    Call Center Emulator by &#169; 2024 Acoray & Victor is licensed under
                    <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" title='Licencias de Creative Common'> Attribution-NonCommercial-NoDerivatives 4.0 International
                        <img src={creativeCommons} alt='Licensias de Creative Common' />
                    </a>
                    <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel='noreferrer' title='Licencia de Accesibilidad Web WCAG 2.2 WAI-AA'>
                        <img src={webAccesibility} alt='Licensia de Accesibilidad Web' />
                    </a>
                </p>

                <p>
                    Iconos proporcionados por <a href="https://fontawesome.com/" target='_blank' rel='noreferrer' title='Iconos utilizados de Fontawesome'>Font Awesome</a> y <a href="https://icons.getbootstrap.com/" target='_blank' rel='noreferrer' title='Iconos utilizados de Bootstrap Icons'>Bootstrap Icons</a>.
                </p>
            </footer>
        </div>
    );
}