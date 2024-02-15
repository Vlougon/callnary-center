export default function AssistantPersonalDataFieldSet() {
    return (
        <fieldset>
            <legend>Datos Personales</legend>
            <div className='row g-3'>
                <div className='col-md-4'>
                    <label htmlFor="assistantFullName" className="form-label">Nombre Completo:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='name'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                        </span>
                        <input type="text" className='form-control' id='assistantFullName' placeholder='Nombre' aria-describedby='name' />
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="assistantEmail" className="form-label">Email:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='birth-date'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"></path>
                            </svg>
                        </span>
                        <input type="email" className='form-control' id='assistantEmail' aria-describedby='birth-date' />
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="assistantRol" className="form-label">Rol:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='rol'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
                            </svg>
                        </span>
                        <select className="form-select" aria-label='assistantRol' id='assistantRol' aria-describedby='rol'>
                            <option>Rol</option>
                            <option value="1">Supervisor/a</option>
                            <option value="2">Asistente</option>
                        </select>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="assistantPassword" className="form-label">Contraseña:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='social-security'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"></path>
                            </svg>
                        </span>
                        <input type="password" className='form-control' id='assistantPassword' placeholder='Código de la Seguridad Social' aria-describedby='social-security' />
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="assistantPasswordConfirm" className="form-label">Confirmar Contraseña:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='phone-number'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"></path>
                            </svg>
                        </span>
                        <input type="text" className='form-control' id='assistantPasswordConfirm' placeholder='Número de Teléfono' aria-describedby='phone-number' />
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="assistantPhone" className="form-label">Número de Teléfono:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='phone-number'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16">
                                <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                            </svg>
                        </span>
                        <input type="text" className='form-control' id='assistantPhone' placeholder='Número de Teléfono' aria-describedby='phone-number' />
                        <span className='input-group-text btn btn-orange' id='addButtón' title='Agregar Otro Número de Teléfono'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}