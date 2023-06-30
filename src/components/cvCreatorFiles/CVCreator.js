import React, { useEffect, useState } from 'react';

function CVCreator() {
    const [iframeKey, setIframeKey] = useState(Date.now());

    useEffect(() => {
        setIframeKey(Date.now());  // Update the key to the current timestamp
    }, []);  // This effect runs once when the component mounts

    return (
        <div>
            <iframe
                key={iframeKey}
                src="https://rx-resume.web.app/"
                style={{width: '100%', height: '100vh'}}
                title="CV Creator"
            />
        </div>
    );
}

export default CVCreator;
