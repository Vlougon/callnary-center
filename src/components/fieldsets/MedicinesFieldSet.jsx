export default function MedicinesFieldSet({ medMorn, medNoon, medNight, hourMorn, hourNoon, HourNight, handler }) {
    const handleHourInput = (element) => {
        element.target.className = 'form-control';
        element.target.previousElementSibling.className = 'input-group-text';
        element.target.nextElementSibling.className = 'invalid-feedback';
    }

    return (
        <fieldset>
            <legend>Medicinas y Horarios de Llamada</legend>
            <div className='row g-3'>
                <div className='col-md-4'>
                    <label htmlFor="morning_medication" className="form-label">Medicación por la Mañana:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='morningMedication'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-capsule" viewBox="0 0 16 16">
                                <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
                            </svg>
                        </span>
                        <textarea id="morning_medication" name="morning_medication" value={medMorn} className="form-control" onChange={handler}></textarea>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="afternoon_medication" className="form-label">Medicación por la Tarde:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='noonMedication'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-capsule" viewBox="0 0 16 16">
                                <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
                            </svg>
                        </span>
                        <textarea id="afternoon_medication" name="afternoon_medication" value={medNoon} className="form-control" onChange={handler}></textarea>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="night_medication" className="form-label">Medicación por la Noche:</label>
                    <div className='input-group'>
                        <span className='input-group-text' id='nightMedication'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-capsule" viewBox="0 0 16 16">
                                <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
                            </svg>
                        </span>
                        <textarea id="night_medication" name="night_medication" value={medNight} className="form-control" onChange={handler}></textarea>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="preferent_morning_calls_hour" className="form-label">Hora preferente de llamada (Mañana):</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='preferableHourMorning'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            </svg>
                        </span>
                        <input type="time" id="preferent_morning_calls_hour" name="preferent_morning_calls_hour" value={hourMorn} className='form-control' onChange={handler} onClick={handleHourInput} required />
                        <div className="invalid-feedback">
                            ¡Introduza una Hora adecuada para la Mañana (06:00 - 13-59)!
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="preferent_afternoon_calls_hour" className="form-label">Hora preferente de llamada (Tarde):</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='preferableHourNoon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            </svg>
                        </span>
                        <input type="time" id="preferent_afternoon_calls_hour" name="preferent_afternoon_calls_hour" value={hourNoon} className='form-control' onChange={handler} onClick={handleHourInput} required />
                        <div className="invalid-feedback">
                            ¡Introduza una Hora adecuada para la Tarde (14:00 - 21-59)!
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="preferent_night_calls_hour" className="form-label">Hora preferente de llamada (Noche):</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='preferableHourNight'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            </svg>
                        </span>
                        <input type="time" id="preferent_night_calls_hour" name="preferent_night_calls_hour" value={HourNight} className='form-control' onChange={handler} onClick={handleHourInput} required />
                        <div className="invalid-feedback">
                            ¡Introduza una Hora adecuada para la Noche (22:00 - 05-59)!
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}