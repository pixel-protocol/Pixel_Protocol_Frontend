import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => {
    return (<div style={{
        position: 'relative',
        height: '100%'
    }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <ClipLoader color={'#cccccc'} size={150} />
        </div>

    </div>)
}

export default LoadingSpinner
