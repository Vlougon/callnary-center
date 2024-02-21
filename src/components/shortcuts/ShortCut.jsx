import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShortCutsDispatchContext } from "../../context/ShortCutContext";

export default function ShortCut({ linkID, hrefLink, textLink, imageSource, benID, FM, setFM }) {
    const dispatch = useContext(ShortCutsDispatchContext);
    const navigate = useNavigate();

    const callHandler = (element) => {
        element.preventDefault();

        if (benID === null || benID === undefined) {
            setFM({
                ...FM,
                render: true,
                message: '¡No Existen Beneficiarios a los Que Llamar!',
                type: 'warning',
            });

            return
        }

        const beneficiaryID = benID;
        const callKind = Math.floor(Math.random() * 2) > 0 ? 'incoming' : 'outgoing';

        const kindObject = { beneficiary_id: beneficiaryID, kind: callKind };

        window.localStorage.setItem('kindObject', JSON.stringify(kindObject));

        navigate('/callform');
    };

    const deleteShorCutHandler = (element) => {
        const toDeleteID = parseInt(element.target.parentElement.id);

        dispatch({ type: 'REMOVE_SHORTCUT', payload: toDeleteID });
    }

    return (
        <li id={linkID} className="col-sm-6 col-md-12 d-flex justify-content-between columrow">
            <Link to={hrefLink} onClick={hrefLink == '/callform' ? callHandler : null}>
                <img
                    src={imageSource}
                    alt={textLink}
                    className="img-fluid"
                />
                <p>
                    {textLink}
                </p>
            </Link>
            <button onClick={deleteShorCutHandler}>
                -
            </button>
        </li>
    )
}