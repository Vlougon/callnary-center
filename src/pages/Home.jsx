import React, { useEffect, useState } from 'react';
import BigShortCut from '../components/shortcuts/BigShortCut';
import ShortCut from '../components/shortcuts/ShortCut';
import ShortCutModal from '../components/shortcuts/ShortCutModal';
import FlashMessage from '../components/flashmessages/FlashMessage';
import useAuthContext from '../hooks/useAuthContext';
import '../assets/pages/Home.css';

export default function Home() {
    const [beneficiaryID, setBeneficiaryID] = useState(null);
    const [shortCuts, setShortCuts] = useState(() => {
        const storedShortCuts = localStorage.getItem('shortCuts');
        return storedShortCuts ? JSON.parse(storedShortCuts) : [];
    });
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const [userRole, setUserRole] = useState('');
    let [shortCutsID, setShortCutsID] = useState(shortCuts.length > 0 ? Math.max(...shortCuts.map(shortcut => shortcut.id)) + 1 : 1);
    const { getFirstBeneficiary } = useAuthContext();

    useEffect(() => {
        localStorage.setItem('shortCuts', JSON.stringify(shortCuts));

        const role = JSON.parse(sessionStorage.getItem('assistant')).role;

        setUserRole(role);

        async function setResponse() {
            const response = await getFirstBeneficiary();

            setBeneficiaryID(response.data.data.id);
        }
        setResponse();

    }, [shortCuts, userRole]);

    const handleShortCutInsert = (element) => {
        const target = element.target;

        if (shortCuts.length >= 7 || shortCuts.some(shortCut => shortCut.text === target.alt)) {
            setShowFM({
                ...showFM,
                render: true,
                message: '¡El Atajo ya está siendo usado!',
                type: 'warning',
            });
            return
        }

        setShortCuts([
            ...shortCuts,
            {
                id: shortCutsID,
                link: target.getAttribute('prefix'),
                text: target.alt,
                source: target.src,
            }
        ])

        setShortCutsID(shortCutsID + 1);
    };

    const handleShortCutDelete = (element) => {
        const toDeleteID = parseInt(element.target.parentElement.id);
        setShortCuts(shortCuts.filter(shortcut => shortcut.id !== toDeleteID));
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
        <div id='homePage' className="container-fluid">
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }
            <div className='row'>
                <aside className="col-md-3 column">
                    <div className='row'>
                        <h3 className='text-white'>Atajos</h3>
                    </div>

                    <ul className='row'>
                        {
                            shortCuts.map((shortcut) => {
                                if (shortcut.link.includes('assistant') && userRole === 'assistant') {
                                    return
                                }

                                return <ShortCut key={shortcut.id} linkID={shortcut.id}
                                    hrefLink={shortcut.link} textLink={shortcut.text}
                                    imageSource={shortcut.source} deleteFunction={handleShortCutDelete}
                                    FM={showFM} setFM={setShowFM} benID={beneficiaryID}
                                />
                            })
                        }
                    </ul>

                    <div className='row justify-content-center align-items-end addSection'>
                        <button id='addButton' type="button" data-bs-toggle="modal" data-bs-target="#shortCutModal">
                            +
                        </button>
                    </div>

                    <ShortCutModal currentShortCuts={shortCuts.length} addHandler={handleShortCutInsert} />
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
