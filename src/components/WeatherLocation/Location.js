import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Location = ({city}) => (
    <div className = "locationCont">
        <h1>{city}</h1>
    </div>
); 

/*const Location = (props) => {
    /* console.log(props);
    debugger; 

    //const city = props.city;

    //Destructuring
    const {city ,  city2  } = props;

    return (
        <div>
            <h1>
                {city}
            </h1>
        </div>
    );
};*/

Location.propTypes = {
    city: PropTypes.string.isRequired,
};

export default Location;