import { useEffect, useReducer, useState } from 'react';
import { ShortCutsContext, ShortCutsDispatchContext } from '../context/ShortCutContext';
import BigShortCut from '../components/shortcuts/BigShortCut';
import ShortCutList from '../components/shortcuts/ShortCutList';
import ShortCutModal from '../components/shortcuts/ShortCutModal';
import FlashMessage from '../components/flashmessages/FlashMessage';
import '../assets/pages/Home.css';

export default function Home() {
    const ENV = import.meta.env;
    const incomingCallBigIcon = `${ENV.VITE_BACKEND_URL}/storage/images/incomingCallBigIcon.png`;
    const outgoingCallBigIcon = `${ENV.VITE_BACKEND_URL}/storage/images/outgoingCallBigIcon.png`;
    const userDocumentsBigIcon = `${ENV.VITE_BACKEND_URL}/storage/images/userDocumentsBigIcon.png`;
    const pdfDownloadBigIcon = `${ENV.VITE_BACKEND_URL}/storage/images/pdfDownloadBigIcon.png`;

    const [shortCuts, dispatch] = useReducer(shortcutReducer,
        localStorage.getItem('shortCuts') ? JSON.parse(localStorage.getItem('shortCuts')) : [],
    );
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        localStorage.setItem('shortCuts', JSON.stringify(shortCuts));
    }, [shortCuts]);

    const hiddeAlert = () => {
        setShowFM({
            ...showFM,
            render: false,
            message: '',
            type: '',
        });
    };

    return (
        <div id='homePage' className="container-fluid">
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }
            <div className='row'>
                <aside className="col-md-3 column">
                    <ShortCutsContext.Provider value={shortCuts}>
                        <ShortCutsDispatchContext.Provider value={dispatch}>

                            <div className='row'>
                                <h3 className='text-white'>Atajos</h3>
                            </div>

                            <ShortCutList FM={showFM} setFM={setShowFM} />

                            <div className='row justify-content-center align-items-end addSection'>
                                <button id='addButton' name='Añadir Atajo' type="button" data-bs-toggle="modal" data-bs-target="#shortCutModal">
                                    +
                                </button>
                            </div>

                            <ShortCutModal currentShortCuts={shortCuts && shortCuts.shortCuts ? shortCuts.shortCuts.length : 0} FM={showFM} setFM={setShowFM} />
                        </ShortCutsDispatchContext.Provider>
                    </ShortCutsContext.Provider>
                </aside>

                <div className="col-md-9 main">
                    <div className='row gap-4 justify-content-center align-items-center'>
                        <BigShortCut key={1} hrefLink={'/beneficiarylist/incoming'} imageSource={incomingCallBigIcon} imageAlt={'Llamada Entrante'} />
                        <BigShortCut key={2} hrefLink={'/beneficiarylist/outgoing'} imageSource={outgoingCallBigIcon} imageAlt={'Llamada Saliente'} />
                        <BigShortCut key={3} hrefLink={'/beneficiarylist'} imageSource={userDocumentsBigIcon} imageAlt={'Gestión de Beneficiarios'} />
                        <BigShortCut key={4} hrefLink={'/documentgenerator'} imageSource={pdfDownloadBigIcon} imageAlt={'Generador de Documentos'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const shortcutReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SHORTCUT':
            if (!state || state.length <= 0) {
                return { shortCuts: [action.payload] };
            }
            return { shortCuts: [...state.shortCuts, action.payload] };

        case 'REMOVE_SHORTCUT':
            if (state && state.shortCuts.length > 0) {
                return { shortCuts: state.shortCuts.filter(shortcut => shortcut.id !== action.payload) };
            }
        default:
            return state;
    }
}