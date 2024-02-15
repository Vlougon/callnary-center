import { Link } from 'react-router-dom';

export default function ShortCut({ hrefLink, imageSource, imageAlt }) {
    return (
        <Link to={hrefLink} className="col-8 col-sm-5 mainButton">
            <img
                src={imageSource}
                alt={imageAlt}
                title={imageAlt}
                className="img-fluid"
            />
        </Link>
    )
}