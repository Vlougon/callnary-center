import { useContext, useEffect, useRef, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import TimeDataFieldSet from '../../components/fieldsets/TimeDataFieldSet';
import CallDataFieldSet from '../../components/fieldsets/CallDataFieldSet';
import EmergencyFieldSet from '../../components/fieldsets/EmergencyFieldSet';
import FlashMessage from '../../components/flashmessages/FlashMessage';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import AudiosPaths from '../../classes/AudiosPaths';
import '../../assets/pages/forms/CallForm.css';

export default function CallForm() {
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { callData, setCallData, clearCallForm } = useContext(FormContext);
    const { createCall, loading } = useAuthContext();
    const durationRef = useRef();
    const userId = JSON.parse(window.sessionStorage.getItem('assistant')).id;
    const beneficiaryId = window.localStorage.getItem('kindObject') ? JSON.parse(window.localStorage.getItem('kindObject')).beneficiary_id : 0;
    const callKind = window.localStorage.getItem('kindObject') ? JSON.parse(window.localStorage.getItem('kindObject')).kind : '';
    const type = window.localStorage.getItem('kindObject') ? JSON.parse(window.localStorage.getItem('kindObject')).type : '';
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

        if (type && type === 'Anonymous') {
            const selectedAudioID = Math.floor(Math.random() * 5);
            const audio = AudiosPaths.audios.filter(audio => audio.id === selectedAudioID)[0];

            const beneficiaryCall = new Audio(audio.audioPath);
            beneficiaryCall.autoplay = true;
            beneficiaryCall.muted = false;
            beneficiaryCall.play();

            // Event listener that handles the end of the audio
            const handleEnded = () => {
                beneficiaryCall.pause();
            };

            beneficiaryCall.addEventListener('ended', handleEnded);

            // Cleanup Function (Runs when the Component Unmounts)
            return () => {
                beneficiaryCall.removeEventListener('ended', handleEnded);
                beneficiaryCall.pause();
                clearInterval(durationRef.current);
            };
        }

        // Cleanup Function (Runs when the Component Unmounts)
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

            window.localStorage.getItem('kindObject') ? window.localStorage.removeItem('kindObject') : null;
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

                <EmergencyFieldSet FM={showFM} setFM={setShowFM} />

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