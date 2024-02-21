import useAuthContext from "../../hooks/useAuthContext";

export default function SearchBox({ view, rootArray, setVolatileArray }) {
    const { loading } = useAuthContext();

    const handleChange = (element) => {
        const nameRegExp = new RegExp(element.target.value, 'ig');

        setVolatileArray(rootArray.filter(element => element.name.match(nameRegExp)));
    };

    return (
        <div id='searchBox' className="input-group mb-4">
            <span className="input-group-text" id="searchBoxLupe">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg>
            </span>
            <input type="text" className="form-control" name='search' placeholder={'Buscar ' + view + '...'} aria-describedby="searchBoxLupe" onChange={handleChange} disabled={loading} />
        </div>
    )
}