import React, { useState } from 'react';

const ToggleComponent = () => {
    const [isPreemptive, setIsPreemptive] = useState(false);

    const handleToggle = () => {
        setIsPreemptive(prevState => !prevState);
    };

    return (
        <div className='center'>
            <div className='flex' onClick={handleToggle}>
                {/* Apply conditional underline classes based on the state */}
                <span className={`margin1 padding1 ${!isPreemptive ? 'underlined' : ''}`}>Preemptive</span>
                <div className={`margin1 toggle-button ${isPreemptive ? 'active' : ''}`}>
                    <div className="toggle-circle"></div>
                </div>
                <span className={`margin1 padding1 ${isPreemptive ? 'underlined' : ''}`}>Non Preemptive</span>
            </div>
        </div>
    );
};

export default ToggleComponent;
