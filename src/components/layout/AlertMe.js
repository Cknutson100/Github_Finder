import React, { useContext } from 'react';
import alertContext from '../../context/alert/alertContext';

const AlertMe = () => {
    const AlertContext = useContext(alertContext)
    
    const { alert } = AlertContext;
    return (
        // This part of the code makes it so that if alert is activated then it shows the div
        alert !== null && (
            // This part of the code makes sure that the className is dynamic for the type of alert we want to use from CSS
            // Additionally the icon is from font.awesome and the object pulls the message from the alert prop, we pulled in.
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        )
    );
};

export default AlertMe