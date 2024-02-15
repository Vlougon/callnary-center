import { useContext } from "react";
import { MainCalendarContext } from "../../pages/Calendar";
import ModalForm from "./ModalForm";

export default function ReminderModal() {
    const { modalRef } = useContext(MainCalendarContext);

    const handleModalClose = () => {
        modalRef.current.className = 'modal';
    }

    return (
        <div ref={modalRef} className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Recordatorio</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
                    </div>
                    <div className="modal-body text-start">
                        <ModalForm />
                    </div>
                </div>
            </div>
        </div>
    )
}