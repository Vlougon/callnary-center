import { useContext, useEffect, useState } from "react";
import { ShortCutsContext } from "../../context/ShortCutContext";
import ShortCut from './ShortCut';
import useAuthContext from '../../hooks/useAuthContext';

export default function ShortCutList({ FM, setFM }) {
    const [beneficiaryID, setBeneficiaryID] = useState(null);
    const [userRole, setUserRole] = useState('');
    const { shortCuts } = useContext(ShortCutsContext);
    const { getFirstBeneficiary } = useAuthContext();

    useEffect(() => {
        const role = sessionStorage.getItem('assistant') ? JSON.parse(sessionStorage.getItem('assistant')).role : 'assistant';

        setUserRole(role && role !== null ? role : 'assitant');

        async function setResponse() {
            const response = await getFirstBeneficiary();
            const responseID = response ? response.data.data.id : null;

            setBeneficiaryID(responseID);
        }
        setResponse();

    }, [userRole]);

    return (
        <ul className='row'>
            {shortCuts &&
                shortCuts.map((shortcut) => {
                    if (shortcut.link.includes('assistant') && userRole === 'assistant') {
                        return
                    }

                    return <ShortCut key={shortcut.id} linkID={shortcut.id} hrefLink={shortcut.link}
                        textLink={shortcut.text} imageSource={shortcut.source} FM={FM}
                        setFM={setFM} benID={beneficiaryID}
                    />
                })
            }
        </ul>
    )
}