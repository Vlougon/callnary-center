import { useEffect, useState } from "react"

export default function ShortCutModal({ currentShortCuts, addHandler }) {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const role = JSON.parse(sessionStorage.getItem('assistant')).role;

        setUserRole(role);
    }, [userRole]);

    return (
        <div className="modal fade" id="shortCutModal" tabIndex="-1" aria-labelledby="shortCutModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="shortCutModalLabel">Atajos ({currentShortCuts}/7)</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="row modal-body row-cols-3 justify-content-center">
                        {userRole === 'supervisor' &&
                            <>
                                < img src="../images/addAssistantIcon.png" alt="Añadir Trabajador" title='Añadir Trabajador' prefix='/assistantform' onClick={addHandler} />
                                <img src="../images/assistantIcon.png" alt="Asistentes" title='Listado de Asistentes' prefix='/assistantlist' onClick={addHandler} />
                            </>
                        }

                        <img src="../images/addBeneficiaryIcon.png" alt="Añadir Beneficiario" title='Añadir Beneficiario' prefix='/beneficiaryform' onClick={addHandler} />
                        <img src="../images/medicalDataIcon.png" alt="Datos Médicos" title='Datos Médicos' prefix='/medicaldatalist' onClick={addHandler} />
                        <img src="../images/contactsIcon.png" alt="Contactos" title='Contactos' prefix='/contactlist' onClick={addHandler} />
                        <img src="../images/calendarIcon.png" alt="Calendario" title='Calendario' prefix='/calendar' onClick={addHandler} />
                        <img src="../images/unknownCallIcon.png" alt="Llamada Aleatoria" title='Llamada Aleatoria' prefix='/callform' onClick={addHandler} />
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}