import { useContext, useEffect, useRef, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import TimeDataFieldSet from '../../components/fieldsets/TimeDataFieldSet';
import CallDataFieldSet from '../../components/fieldsets/CallDataFieldSet';
import EmergencyFieldSet from '../../components/fieldsets/EmergencyFieldSet';
import FlashMessage from '../../components/flashmessages/FlashMessage';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/forms/CallForm.css';

const callKind = JSON.parse(window.localStorage.getItem('kindObject')).kind;
const userId = JSON.parse(window.sessionStorage.getItem('assistant')).id;
const beneficiaryId = JSON.parse(window.localStorage.getItem('kindObject')).beneficiary_id;

export default function CallForm() {
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { callData, setCallData, clearCallForm } = useContext(FormContext);
    const { createCall, loading } = useAuthContext();
    const durationRef = useRef();
    const turn = callData.time >= '06:00' && callData.time <= '13:59' ? 'morning' :
        callData.time >= '14:00' && callData.time <= '21:59' ? 'afternoon' : 'night';

    useEffect(() => {
        clearCallForm();

        setCallData((previousCallData) => ({
            ...previousCallData,
            turn: turn,
            call_kind: callKind,
            beneficiary_id: beneficiaryId,
            user_id: userId,
        }));

        durationRef.current = setInterval(() => {
            setCallData((previousCallData) => ({
                ...previousCallData,
                duration: parseInt(previousCallData.duration) + 1,
            }));
        }, 1000);

        return () => {
            clearInterval(durationRef.current);
        };
    }, []);

    const handleSubmit = (element) => {
        element.preventDefault();
        let failed = false;

        for (const key in callData) {
            if (key !== 'description' && key !== 'contacted_112' && typeof callData[key] === 'string' && callData[key].match(/^(?=\s*$)/)) {
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

        clearInterval(durationRef.current);

        failed = false;

        // const hours = Math.floor(callData.duration / 3600);
        // const minutes = Math.floor(callData.duration % 3600 / 60);
        // const seocnds = Math.floor(callData.duration % 3600 % 60);
        // const prettyDuration = hours + 'h ' + minutes + 'm ' + seocnds + 's';

        // const betterCallData = { ...callData, duration: prettyDuration };

        async function setPostResponse() {
            const createdCall = await createCall(callData);

            if (createdCall.data.status && createdCall.data.status !== 'success') {
                failed = true;
            }

            setShowFM({
                ...showFM,
                render: true,
                message: createdCall.data.message,
                type: failed ? 'danger' : createdCall.data.status,
            });

            clearCallForm();

            setCallData((previousCallData) => ({
                ...previousCallData,
                turn: turn,
                call_kind: callKind,
                beneficiary_id: beneficiaryId,
                user_id: userId,
            }));
        }
        setPostResponse();
    };

    const handleFormFieldsValues = (target) => {
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
        <div id="callForm" className="container-fluid">
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }

            <form action="#" method="post" onSubmit={handleSubmit}>

                <TimeDataFieldSet />

                <CallDataFieldSet />

                <EmergencyFieldSet />

                <button type="submit" className='btn btn-danger' disabled={loading}>
                    <Spinner loading={loading} spinnerColor={'light'} spinnerType={'spinner-border'}
                        spinnerStyle={{ width: '1rem', height: '1rem', }}
                    />
                    <span>Finalizar Llamada</span>
                </button>
            </form>
        </div>
    )
}