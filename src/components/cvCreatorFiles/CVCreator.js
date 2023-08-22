import React, { useEffect, useState } from 'react';

function CVCreator() {
    const [iframeKey, setIframeKey] = useState(Date.now());

    useEffect(() => {
        setIframeKey(Date.now());
    }, []);

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
