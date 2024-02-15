import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FormContext } from '../../context/FormContext';
import AllergiesIllnessesFieldSet from '../../components/fieldsets/Allergies&IllnessesFieldSet';
import MedicinesFieldSet from '../../components/fieldsets/MedicinesFieldSet';
import LocalStrucutresFieldSet from '../../components/fieldsets/LocalStructures';
import '../../styles/forms/MedicalDataForm.css';

export default function MedicalDataForm() {
    const beneficiaryID = parseInt(useParams().userid);
    const { medicalFormValues, setMedicalFormValues } = useContext(FormContext);

    const handleChange = (element) => {
        setMedicalFormValues({
            ...medicalFormValues,
            [element.target.name]: element.target.value,
        });
    }

    const handleSubmit = (element) => {
        element.preventDefault();

        // Fix This. Wee Need to Load the userDI when page loads.
        setMedicalFormValues({
            ...medicalFormValues,
            'beneficiary_id': beneficiaryID,
        });

        for (const key in medicalFormValues) {
            if ((key === 'preferent_morning_calls_hour' && (medicalFormValues[key] < '06:00' || medicalFormValues[key] > '13:59')) ||
                (key === 'preferent_afternoon_calls_hour' && (medicalFormValues[key] < '14:00' || medicalFormValues[key] > '21:59')) ||
                (key === 'preferent_night_calls_hour' && medicalFormValues[key] >= '06:00' && medicalFormValues[key] <= '21:59') ||
                medicalFormValues[key] === '--:--' ||
                medicalFormValues[key] === null
            ) {
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        console.log(medicalFormValues);
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

    return (
        <div id='medicalForm' className='container-fluid'>
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

                <input type="submit" className='btn btn-primary' value="Asignar Datos Médicos" />
            </form>
        </div>
    )
}