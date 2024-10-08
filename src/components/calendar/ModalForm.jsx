import { useContext, useEffect, useState } from "react";
import { MainCalendarContext } from "../../pages/Calendar";
import FlashMessage from '../../components/flashmessages/FlashMessage';
import CheckboxInput from "../inputs/CheckboxInput";
import Spinner from "../ui/Spinner";
import useAuthContext from '../../hooks/useAuthContext';

export default function ModalForm() {
    const [repeat, setRepeat] = useState([]);
    const [beneficiaryToRemind, setBeneficiaryToRemind] = useState(0);
    const [userId, setUserID] = useState(0);
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { events, setEvents, title, setTitle, selectedDates, beneficiaries } = useContext(MainCalendarContext);
    const { createReminder, loading } = useAuthContext();

    useEffect(() => {
        const id = sessionStorage.getItem('assistant') ? JSON.parse(sessionStorage.getItem('assistant')).id : null;

        setUserID(id);
    });

    const handleTitleChange = (element) => {
        setTitle(element.target.value);
    };

    const handleBeneficiaryChange = (element) => {
        setBeneficiaryToRemind(element.target.value);
    }

    const handleRepeatChange = (element) => {
        if (element.target.checked) {
            setRepeat([...repeat, element.target.value]);
        } else {
            setRepeat(repeat.filter(value => value !== element.target.value));
        }
    };

    const handleEventSubmit = (element) => {
        element.preventDefault();
        const backGorundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        const repeatValue = repeat.length > 0 ? repeat : '';
        let failed = false;

        if (!title || title.match(/^(?=\s*$)/) || events.some(event => event.title === title)) {
            failed = true;
            handleFormFieldsValues(document.querySelector('#title'));
        }

        if (!beneficiaryToRemind || beneficiaryToRemind === 0) {
            failed = true;
            handleFormFieldsValues(document.querySelector('#beneficiary_id'));
        }

        for (const key in selectedDates) {
            if (!selectedDates[key] || selectedDates[key].match(/^(?=\s*$)/)) {
                failed = true;
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        if (failed) {
            setShowFM({
                ...showFM,
                render: true,
                message: '¡Hay Campos del Formulario que Requieren Revisión!',
                type: 'danger',
            });
            return
        }

        const reminderObject = {
            user_id: userId,
            beneficiary_id: parseInt(beneficiaryToRemind),
            title: title,
            start_date: selectedDates.firstDate,
            end_date: selectedDates.secondDate,
            start_time: selectedDates.firstTime,
            end_time: selectedDates.secondTime,
            repeat: typeof repeatValue === 'string' ? repeatValue : repeatValue.join(','),
            background_color: backGorundColor,
        }

        const event = {
            title: title,
            start: selectedDates.firstDate + 'T' + selectedDates.firstTime + 'Z',
            end: selectedDates.secondDate + 'T' + selectedDates.secondTime + 'Z',
            backgroundColor: backGorundColor,
            daysOfWeek: repeatValue,
        };

        async function setPostResponse() {
            const createdReminder = await createReminder(reminderObject);

            if (createdReminder.data.status && createdReminder.data.status === 'success') {
                setShowFM({
                    ...showFM,
                    render: true,
                    message: createdReminder.data.message,
                    type: createdReminder.data.status,
                });

                setEvents([...events, event]);
            } else {
                setShowFM({
                    ...showFM,
                    render: true,
                    message: 'Error al Crear el Recordatorio',
                    type: 'danger',
                });
            }

            setTitle('');
            setRepeat([]);
            setBeneficiaryToRemind(0);
        }
        setPostResponse();
    };

    const handleFormFieldsValues = (target) => {
        target.className += ' is-invalid';
        target.previousElementSibling.className += ' is-invalid';
        target.nextElementSibling.className += ' d-block';
    };

    const handleCalendarInput = (element) => {
        element.target.className = 'form-control';
        element.target.previousElementSibling.className = 'input-group-text';
        element.target.nextElementSibling.className = 'invalid-feedback';
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
        <form action="#" method="post" onSubmit={handleEventSubmit}>
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }

            <div className="row g-3">
                <div className='col-12'>
                    <label htmlFor="start_date" className="form-label">Fecha de Inicio:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='startCalendarDate'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
                            </svg>
                        </span>
                        <input type="date" id='start_date' name="start_date" value={selectedDates.firstDate} className='form-control' aria-describedby='startCalendarDate' disabled />
                        <div className="invalid-feedback">
                            ¡Introduzca una Fecha de Inicio Adecuada!
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <label htmlFor="end_date" className="form-label">Fecha de Finalización:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='endCalDat'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
                            </svg>
                        </span>
                        <input type="date" id='end_date' name="end_date" value={selectedDates.secondDate} className='form-control' aria-describedby='endCalDat' disabled />
                        <div className="invalid-feedback">
                            ¡Introduzca una Fecha de Finalización Adecuada!
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <label htmlFor="start_time" className="form-label">Hora de Inicio:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='startCalHou'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            </svg>
                        </span>
                        <input type="time" id='start_time' name="start_time" value={selectedDates.firstTime} className='form-control' aria-describedby='startCalHou' disabled />
                        <div className="invalid-feedback">
                            ¡Introduzca una Hora de Inicio Adecuada!
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <label htmlFor="end_time" className="form-label">Hora de Finalización:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='closingCalHou'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            </svg>
                        </span>
                        <input type="time" id='end_time' value={selectedDates.secondTime} className='form-control' aria-describedby='closingCalHou' disabled />
                        <div className="invalid-feedback">
                            ¡Introduzca una Hora de Finalización Adecuada!
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <label htmlFor="title" className="form-label">Título:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='calendarTitle'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </span>
                        <input type='text' id="title" name="title" value={title} placeholder="Titulo del Recordatorio" className="form-control" onClick={handleCalendarInput} onChange={handleTitleChange} required></input>
                        <div className="invalid-feedback">
                            ¡Introduzca un Titulo Único!
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <label htmlFor="beneficiary_id" className="form-label">Beneficiario:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='calendarBeneficiary'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40H40c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328z" />
                            </svg>
                        </span>
                        <select id='beneficiary_id' name="beneficiary_id" value={beneficiaryToRemind} onClick={handleCalendarInput} aria-describedby='calendarBeneficiary' className="form-select" aria-label='calendarBeneficiary' onChange={handleBeneficiaryChange} required>
                            <option>Beneficiario</option>
                            {
                                beneficiaries.map(beneficiary =>
                                    <option key={beneficiary.value} value={beneficiary.value}>{beneficiary.text}</option>
                                )
                            }
                        </select>
                        <div className="invalid-feedback">
                            ¡Introduzca un Beneficiario al que Recordar!
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <label htmlFor="monday" className="form-label">¿Repetir Recordatorio?</label>
                    <div className='input-group'>
                        <CheckboxInput inputID={'monday'} inputText={'Lunes'} inputValue={'1'} onChangeHandler={handleRepeatChange} />

                        <CheckboxInput inputID={'tuesday'} inputText={'Martes'} inputValue={'2'} onChangeHandler={handleRepeatChange} />

                        <CheckboxInput inputID={'wednesday'} inputText={'Miércoles'} inputValue={'3'} onChangeHandler={handleRepeatChange} />

                        <CheckboxInput inputID={'thursday'} inputText={'Jueves'} inputValue={'4'} onChangeHandler={handleRepeatChange} />

                        <CheckboxInput inputID={'friday'} inputText={'Viernes'} inputValue={'5'} onChangeHandler={handleRepeatChange} />

                        <CheckboxInput inputID={'saturday'} inputText={'Sábado'} inputValue={'6'} onChangeHandler={handleRepeatChange} />

                        <CheckboxInput inputID={'sunday'} inputText={'Domingo'} inputValue={'0'} onChangeHandler={handleRepeatChange} />
                    </div>
                </div>
            </div>
            <div className='row justify-content-center mt-4'>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    <Spinner loading={loading} spinnerColor={'white'} spinnerType={'spinner-border'}
                        spinnerStyle={{ width: '1rem', height: '1rem', }}
                    />
                    <span>Poner Recordatorio</span>
                </button>
            </div>
        </form>
    )
}