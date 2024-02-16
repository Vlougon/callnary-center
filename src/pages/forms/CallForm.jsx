import { useContext, useEffect, useRef } from 'react';
import { FormContext } from '../../context/FormContext';
import TimeDataFieldSet from '../../components/fieldsets/TimeDataFieldSet';
import CallDataFieldSet from '../../components/fieldsets/CallDataFieldSet';
import EmergencyFieldSet from '../../components/fieldsets/EmergencyFieldSet';
import '../../assets/pages/forms/CallForm.css';

let callDuration = 0;

const callKind = JSON.parse(localStorage.getItem('callData')) ? 'A' : 'B';

export default function CallForm() {
    const { callData, setCallData } = useContext(FormContext);
    const durationRef = useRef();
    const turn = callData.time >= '06:00' && callData.time <= '13:59' ? 'morning' :
        callData.time >= '14:00' && callData.time <= '21:59' ? 'afternoon' : 'night';

    useEffect(() => {
        durationRef.current = setInterval(() => {
            setCallData((previousCallData) => ({
                ...previousCallData,
                duration: callDuration,
            }));
            callDuration++;
        }, 1000);

        setCallData({
            ...callData,
            turn: turn,
            call_kind: callKind,
        });

        return () => {
            clearInterval(durationRef.current);
        };
    }, []);

    const handleSubmit = (element) => {
        element.preventDefault();
        clearInterval(durationRef.current);

        for (const key in callData) {
            if (callData[key] === undefined ||
                (key !== 'description' && key !== 'contacted_112' && typeof callData[key] === 'string' && callData[key].match(/^(?=\s*$)/))) {
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        console.log(callData);
    };

    const handleFormFieldsValues = (target) => {
        target.className += ' is-invalid';
        target.previousElementSibling.className += ' is-invalid';
        target.nextElementSibling.className += ' d-block';
    };

    return (
        <div id="callForm" className="container-fluid">
            <form action="#" method="post" onSubmit={handleSubmit}>

                <TimeDataFieldSet />

                <CallDataFieldSet />

                <EmergencyFieldSet />

                <input type="submit" className="btn btn-danger" value="Finalizar Llamada" />
            </form>
        </div>
    )
}