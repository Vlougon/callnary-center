import { useContext, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { FormContext } from '../../context/FormContext';
import AllergiesIllnessesFieldSet from '../../components/fieldsets/Allergies&IllnessesFieldSet';
import MedicinesFieldSet from '../../components/fieldsets/MedicinesFieldSet';
import LocalStrucutresFieldSet from '../../components/fieldsets/LocalStructures';
import FlashMessage from '../../components/flashmessages/FlashMessage';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/forms/MedicalDataForm.css';

export default function MedicalDataForm() {
    const params = useParams();
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { medicalFormValues, setMedicalFormValues, clearMedicalData } = useContext(FormContext);
    const { getOneMedicalData, createMedicalData, updateMedicalData, loading } = useAuthContext();

    useEffect(() => {
        clearMedicalData();

        setMedicalFormValues((previousMedicalData) => ({
            ...previousMedicalData,
            beneficiary_id: parseInt(params.userid),
        }));

        if (params.id && params.id !== 'null') {
            async function getResponse() {
                const getMedicalResponse = await getOneMedicalData(params.id);

                if (getMedicalResponse.data.status && getMedicalResponse.data.status === 'success') {
                    const medicalObject = getMedicalResponse.data.data;

                    for (const key in medicalObject) {
                        if (medicalObject[key] === null) {
                            medicalObject[key] = '';
                        }
                    }

                    medicalObject.beneficiary_id = parseInt(params.userid);
                    delete medicalObject.id;

                    setMedicalFormValues(medicalObject)
                }
            }
            getResponse();
        }
    }, []);

    if (params.id && params.id === 'null') {
        const url = '/medicaldataform/' + params.userid;
        return <Navigate to={url} />
    }

    const handleChange = (element) => {
        setMedicalFormValues({
            ...medicalFormValues,
            [element.target.name]: element.target.value,
        });
    }

    const handleSubmit = (element) => {
        element.preventDefault();
        let failed = false;

        for (const key in medicalFormValues) {
            if ((key === 'preferent_morning_calls_hour' && (medicalFormValues[key] < '06:00' || medicalFormValues[key] > '13:59')) ||
                (key === 'preferent_afternoon_calls_hour' && (medicalFormValues[key] < '14:00' || medicalFormValues[key] > '21:59')) ||
                (key === 'preferent_night_calls_hour' && medicalFormValues[key] >= '06:00' && medicalFormValues[key] <= '21:59') ||
                (
                    key !== 'allergies' && key !== 'illnesses' && key !== 'morning_medication' &&
                    key !== 'afternoon_medication' && key !== 'night_medication' && !medicalFormValues[key]
                ) ||
                medicalFormValues[key] === '--:--'
            ) {
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

        if (params.id) {
            async function setPutResponse() {
                const updatedMEdicalData = await updateMedicalData(medicalFormValues, params.id);

                if (!updatedMEdicalData || updatedMEdicalData.data.status !== 'success') {
                    setShowFM({
                        ...showFM,
                        render: true,
                        message: '¡Error al Actualizar los Datos!',
                        type: 'danger',
                    });

                    return
                }

                setShowFM({
                    ...showFM,
                    render: true,
                    message: updatedMEdicalData.data.message,
                    type: updatedMEdicalData.data.status,
                });
            }
            setPutResponse();
        } else {
            async function setPostResponse() {
                const createdMedicalData = await createMedicalData(medicalFormValues);

                if (!createdMedicalData || createdMedicalData.data.status !== 'success') {
                    setShowFM({
                        ...showFM,
                        render: true,
                        message: createdMedicalData.data.message,
                        type: 'danger',
                    });

                    return
                }

                setShowFM({
                    ...showFM,
                    render: true,
                    message: createdMedicalData.data.message,
                    type: createdMedicalData.data.status,
                });

                clearMedicalData();

                setMedicalFormValues((previousMedicalData) => ({
                    ...previousMedicalData,
                    beneficiary_id: parseInt(params.userid),
                }));
            }
            setPostResponse();
        }
    };

    const handleFormFieldsValues = (target) => {
        if (target.previousElementSibling.tagName === 'DIV') {
            target.className += 'd-block requiredRadio';
            return
        }

        target.className += ' is-invalid';
        target.previousElementSibling.className += ' is-invalid';
        target.nextElementSibling.className += ' d-block';
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
        <div id='medicalForm' className='container-fluid'>
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }

            <form action="#" method="post" className='needs-validation' noValidate onSubmit={handleSubmit}>

                <AllergiesIllnessesFieldSet
                    allergy={medicalFormValues.allergies}
                    illness={medicalFormValues.illnesses}
                    handler={handleChange}
                />

                <MedicinesFieldSet
                    medMorn={medicalFormValues.morning_medication}
                    medNoon={medicalFormValues.afternoon_medication}
                    medNight={medicalFormValues.night_medication}
                    hourMorn={medicalFormValues.preferent_morning_calls_hour}
                    hourNoon={medicalFormValues.preferent_afternoon_calls_hour}
                    HourNight={medicalFormValues.preferent_night_calls_hour}
                    handler={handleChange}
                />

                <LocalStrucutresFieldSet
                    outpatientClinic={medicalFormValues.outpatient_clinic_on_town}
                    ambulance={medicalFormValues.ambulance_on_town}
                    policeStation={medicalFormValues.police_station_on_town}
                    fireHouse={medicalFormValues.firehouse_on_town}
                    emergencyRoom={medicalFormValues.emergency_room_on_town}
                    handler={handleChange}
                />

                <button type="submit" className='btn btn-primary' disabled={loading}>
                    <Spinner loading={loading} spinnerColor={'light'} spinnerType={'spinner-border'}
                        spinnerStyle={{ width: '1rem', height: '1rem', }}
                    />
                    <span>{params.id ? 'Modificar Datos Médicos' : 'Añadir Datos Médicos'}</span>
                </button>
            </form>
        </div>
    )
}