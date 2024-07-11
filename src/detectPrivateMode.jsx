

// utils/detectPrivateMode.js
export const isPrivateMode = async () => {
    return new Promise((resolve) => {
        const on = () => resolve(true);
        const off = () => resolve(false);

        const testLocalStorage = () => {
            try {
                if (localStorage.length) off();
                else {
                    localStorage.setItem('test', '1');
                    localStorage.removeItem('test');
                    off();
                }
            } catch (e) {
                navigator.cookieEnabled ? on() : off();
            }
        };

        const testFileSystem = () => {
            const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
            if (!fs) off();
            else fs(window.TEMPORARY, 100, off, on);
        };

        testLocalStorage();
        testFileSystem();
    });
};
