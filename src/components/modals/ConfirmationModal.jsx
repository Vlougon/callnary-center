import { useState } from 'react';
import FlashMessage from '../../components/flashmessages/FlashMessage';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from "../../hooks/useAuthContext";

export default function ConfirmationModal({ modalID, modalOn, elementID, array, handler }) {
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { deleteUser, loading } = useAuthContext();

    const handleDeletion = (element) => {
        let target = '';

        switch (element.target.tagName) {
            case 'path':
                target = element.target.parentElement.parentElement;
                break;
            case 'svg':
                target = element.target.parentElement;
                break;
            case 'BUTTON':
                target = element.target;
                break;
            default:
                // Handle Error
                return
        }

        switch (modalOn) {
            case 'Asistente':
                dumpElement(deleteUser(target.name), parseInt(target.name));
                break;
            default:
                // Handle Error
                return
        }
    };

    const dumpElement = async function (axiosDelete, id) {
        const deleteResponse = await axiosDelete;

        if (deleteResponse.status === 204) {
            setShowFM({
                render: true,
                message: '¡' + modalOn + ' Eliminad@!',
                type: 'success',
            });

            handler(
                array.filter(element => element.id !== id)
            );
        } else {
            setShowFM({
                render: true,
                message: '¡Algo salió Mal!',
                type: 'danger',
            })
        }
    };

    const hiddeAlert = () => {
        setShowFM({
            ...showFM,
            render: false,
            message: '',
            type: '',
        });
    };

    return (
        <div className="modal fade" id={modalID} tabIndex="-1" aria-labelledby={modalID + 'Label'} aria-hidden="true" >
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-danger text-white">
                        <h1 className="modal-title fs-5" id={modalID + 'Label'}>¡Confirmar Eliminación de {modalOn}!</h1>
                        <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-start">
                        <p className="mb-0">
                            ¿Seguro qué quiere eliminar este {modalOn}?
                        </p>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" name={elementID} className="btn btn-danger px-4" data-bs-dismiss="modal" onClick={handleDeletion} disabled={loading}>
                            <Spinner loading={loading} spinnerColor={'white'} spinnerStyle={{ width: '1rem', height: '1rem', }} />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}