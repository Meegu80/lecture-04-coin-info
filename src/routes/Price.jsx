import {useEffect, useState} from 'react';

function Price({coin}) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch({coin})
        .then(data => {

            setLoading(false);
        });

    }, [{coin}]);

    return (

            <div>
                {loading
                        ? <h1>Loading...</h1>
                        : return(
                                <>

                    </>

                    )
                }

            </div>
    );
}

export default Price;
