import { useCallback, useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {

            const response = await fetch(url);
            if (!response.ok) throw Error('Error al consumir la API.')
            const data = await response.json();
            setData(data);

        } catch (error) {

            console.log(error);
            setData([]);
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return { data, error, loading }
}