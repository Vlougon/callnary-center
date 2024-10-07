import { useContext, useEffect, useState } from "react"
import { ShortCutsContext, ShortCutsDispatchContext } from '../../context/ShortCutContext';

export default function ShortCutModal({ currentShortCuts, FM, setFM }) {
    const [userRole, setUserRole] = useState('');
    const { shortCuts } = useContext(ShortCutsContext);
    const dispatch = useContext(ShortCutsDispatchContext);
    let [shortCutsID, setShortCutsID] = useState(shortCuts && shortCuts.length > 0 ? Math.max(...shortCuts.map(shortcut => shortcut ? shortcut.id : 0)) + 1 : 1);

    useEffect(() => {
        const role = sessionStorage.getItem('assistant') ? JSON.parse(sessionStorage.getItem('assistant')).role : 'assistant';

        setUserRole(role && role !== null ? role : 'assitant');
    }, [userRole]);

    const shortCutAddHandler = (element) => {
        const target = element.target;

        if ((shortCuts && shortCuts.length >= 7) || (shortCuts && shortCuts.some(shortCut => shortCut.text === target.alt))) {
            setFM({
                ...FM,
                render: true,
                message: '¡El Atajo ya está siendo usado!',
                type: 'warning',
            });
            return
        }

        const newShortCut = {
            id: shortCutsID,
            link: target.getAttribute('prefix'),
            text: target.alt,
            source: target.src,
        };

        dispatch({ type: 'ADD_SHORTCUT', payload: newShortCut });

        setShortCutsID(shortCutsID + 1);
    }

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
                                < img src="../images/addAssistantIcon.png" alt="Añadir Trabajador" title='Añadir Trabajador' prefix='/assistantform' onClick={shortCutAddHandler} />
                                <img src="../images/assistantIcon.png" alt="Asistentes" title='Listado de Asistentes' prefix='/assistantlist' onClick={shortCutAddHandler} />
                            </>
                        }

                        <img src="../images/addBeneficiaryIcon.png" alt="Añadir Beneficiario" title='Añadir Beneficiario' prefix='/beneficiaryform' onClick={shortCutAddHandler} />
                        <img src="../images/medicalDataIcon.png" alt="Datos Médicos" title='Datos Médicos' prefix='/medicaldatalist' onClick={shortCutAddHandler} />
                        <img src="../images/contactsIcon.png" alt="Contactos" title='Contactos' prefix='/contactlist' onClick={shortCutAddHandler} />
                        <img src="../images/calendarIcon.png" alt="Calendario" title='Calendario' prefix='/calendar' onClick={shortCutAddHandler} />
                        <img src="../images/unknownCallIcon.png" alt="Llamada Aleatoria" title='Llamada Aleatoria' prefix='/callform' onClick={shortCutAddHandler} />
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}