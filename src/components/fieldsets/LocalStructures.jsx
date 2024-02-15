export default function LocalStrucutresFieldSet({ outpatientClinic, ambulance, policeStation, fireHouse, emergencyRoom, handler }) {
    const handleRadioSelection = (element) => {
        element.target.parentElement.parentElement.querySelector('#' + element.target.name).className = 'invalid-feedback';
    };

    return (
        <fieldset>
            <legend>Edificios Circundantes</legend>
            <div className='row g-3'>
                <div className='col-md-4'>
                    <label htmlFor="outpatient_clinic_on_town1" className="form-label">Hay Ambulatorio en el Municipio:</label>
                    <div className='input-group'>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='outpatient_clinic_on_town' value="Yes" id="outpatient_clinic_on_town1" className="form-check-input" checked={outpatientClinic === 'Yes'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="outpatient_clinic_on_town1">
                                Si
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='outpatient_clinic_on_town' value="No" id="outpatient_clinic_on_town2" className="form-check-input" checked={outpatientClinic === 'No'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="outpatient_clinic_on_town2">
                                No
                            </label>
                        </div>
                        <div id="outpatient_clinic_on_town" className="invalid-feedback">
                            ¡Es Necesario Seleccionar uno de los Campos!
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="ambulance_on_town1" className="form-label">Hay Ambulancias en el Municipio:</label>
                    <div className='input-group'>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='ambulance_on_town' value="Yes" id="ambulance_on_town1" className="form-check-input" checked={ambulance === 'Yes'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="ambulance_on_town1">
                                Si
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='ambulance_on_town' value="No" id="ambulance_on_town2" className="form-check-input" checked={ambulance === 'No'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="ambulance_on_town2">
                                No
                            </label>
                        </div>
                        <div id="ambulance_on_town" className="invalid-feedback">
                            ¡Es Necesario Seleccionar uno de los Campos!
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="police_station_on_town1" className="form-label">Hay Policía en el Municipio:</label>
                    <div className='input-group'>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='police_station_on_town' value="Yes" id="police_station_on_town1" className="form-check-input" checked={policeStation === 'Yes'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="police_station_on_town1">
                                Si
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='police_station_on_town' value="No" id="police_station_on_town2" className="form-check-input" checked={policeStation === 'No'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="police_station_on_town2">
                                No
                            </label>
                        </div>
                        <div id="police_station_on_town" className="invalid-feedback">
                            ¡Es Necesario Seleccionar uno de los Campos!
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="firehouse_on_town1" className="form-label">Hay Bomberos en el Municipio:</label>
                    <div className='input-group'>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='firehouse_on_town' value="Yes" id="firehouse_on_town1" className="form-check-input" checked={fireHouse === 'Yes'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="firehouse_on_town1">
                                Si
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='firehouse_on_town' value="No" id="firehouse_on_town2" className="form-check-input" checked={fireHouse === 'No'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="firehouse_on_town2">
                                No
                            </label>
                        </div>
                        <div id="firehouse_on_town" className="invalid-feedback">
                            ¡Es Necesario Seleccionar uno de los Campos!
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="emergency_room_on_town1" className="form-label">Hay Urgencias en el Municipio:</label>
                    <div className='input-group'>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='emergency_room_on_town' value="Yes" id="emergency_room_on_town1" className="form-check-input" checked={emergencyRoom === 'Yes'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="emergency_room_on_town1">
                                Si
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" name='emergency_room_on_town' value="No" id="emergency_room_on_town2" className="form-check-input" checked={emergencyRoom === 'No'} onChange={handler} onClick={handleRadioSelection} />
                            <label className="form-check-label" htmlFor="emergency_room_on_town2">
                                No
                            </label>
                        </div>
                        <div id="emergency_room_on_town" className="invalid-feedback">
                            ¡Es Necesario Seleccionar uno de los Campos!
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}