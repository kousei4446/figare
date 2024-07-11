import React, { useEffect, useState } from 'react';
import { isPrivateMode } from './detectPrivateMode';
import './PrivateModeWarning.css'; // スタイルをインポート

const PrivateModeWarning = () => {
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        const checkPrivateMode = async () => {
            const result = await isPrivateMode();
            setIsPrivate(result);
        };

        checkPrivateMode();
    }, []);

    if (!isPrivate) return null;

    return (
        <div className="private-warning">
            <div>
                <h2>プライベートモードを解除してください。</h2>
            </div>
        </div>
    );
};

export default PrivateModeWarning;
