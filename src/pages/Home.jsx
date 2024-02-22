import { useEffect, useReducer, useState } from 'react';
import { ShortCutsContext, ShortCutsDispatchContext } from '../context/ShortCutContext';
import BigShortCut from '../components/shortcuts/BigShortCut';
import ShortCutList from '../components/shortcuts/ShortCutList';
import ShortCutModal from '../components/shortcuts/ShortCutModal';
import FlashMessage from '../components/flashmessages/FlashMessage';
import '../assets/pages/Home.css';

export default function Home() {
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

    // const handleShortCutInsert = (element) => {
    //     const target = element.target;

    //     if (shortCuts.length >= 7 || shortCuts.some(shortCut => shortCut.text === target.alt)) {
    //         setShowFM({
    //             ...showFM,
    //             render: true,
    //             message: '¡El Atajo ya está siendo usado!',
    //             type: 'warning',
    //         });
    //         return
    //     }

    //     setShortCuts([
    //         ...shortCuts,
    //         {
    //             id: shortCutsID,
    //             link: target.getAttribute('prefix'),
    //             text: target.alt,
    //             source: target.src,
    //         }
    //     ])

    //     setShortCutsID(shortCutsID + 1);
    // };

    // const handleShortCutDelete = (element) => {
    //     const toDeleteID = parseInt(element.target.parentElement.id);
    //     setShortCuts(shortCuts.filter(shortcut => shortcut.id !== toDeleteID));
    // };

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
                                <button id='addButton' type="button" data-bs-toggle="modal" data-bs-target="#shortCutModal">
                                    +
                                </button>
                            </div>

                            <ShortCutModal currentShortCuts={shortCuts.shortCuts.length} FM={showFM} setFM={setShowFM} />
                        </ShortCutsDispatchContext.Provider>
                    </ShortCutsContext.Provider>
                </aside>

                <div className="col-md-9 main">
                    <div className='row gap-4 justify-content-center align-items-center'>
                        <BigShortCut key={1} hrefLink={'/beneficiarylist/incoming'} imageSource={'../images/incomingCallBigIcon.png'} imageAlt={'Llamada Entrante'} />
                        <BigShortCut key={2} hrefLink={'/beneficiarylist/outgoing'} imageSource={'../images/outgoingCallBigIcon.png'} imageAlt={'Llamada Saliente'} />
                        <BigShortCut key={3} hrefLink={'/beneficiarylist'} imageSource={'../images/userDocumentsBigIcon.png'} imageAlt={'Gestión de Beneficiarios'} />
                        <BigShortCut key={4} hrefLink={'/documentgenerator'} imageSource={'../images/pdfDownloadBigIcon.png'} imageAlt={'Generador de Documentos'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const shortcutReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SHORTCUT':
            return { shortCuts: [...state.shortCuts, action.payload] };

        case 'REMOVE_SHORTCUT':
            return { shortCuts: state.shortCuts.filter(shortcut => shortcut.id !== action.payload) };

        default:
            return state;
    }
}