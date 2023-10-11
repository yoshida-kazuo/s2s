export const loadScript = (url: string): Promise<Event> => {
    return new Promise((resoleve, reject) => {
        const script = document.createElement('script');

        script.src = url;
        script.onload = resoleve;
        script.onerror = reject;

        document.body.appendChild(script);
    });
};

export const checkScriptExists = async (scriptUrl: string): Promise<boolean> => {
    let checkScriptExists = false;

    try {
        const response = await fetch(scriptUrl, {
            method: 'HEAD'
        });

        checkScriptExists = response.status === 200;
    } catch (error) {
        console.error('Error checking script:', error);
    }

    return checkScriptExists;
}

export const fetchXML = async (url: string): Promise<string> => {
    const response = await fetch(url);

    if (! response.ok) {
        throw new Error('Failed to fetch XML');
    }

    return await response.text();
};
