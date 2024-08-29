import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
    endTime: number;
    onEnd: () => void,
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime, onEnd }) => {
    const [timeLeft, setTimeLeft] = useState<number>(endTime - Date.now());

    useEffect(() => {
        const endTimeInMs = endTime * 1000;
        const updateTimer = () => {
            const currentTime = Date.now();
            const timeRemaining = endTimeInMs - currentTime;
            setTimeLeft(timeRemaining);
            if (timeRemaining <= 0) {
                onEnd()
                clearInterval(interval);
            }
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(interval);
    }, [endTime, onEnd]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div>
            {formatTime(timeLeft)}
        </div>
    );
};

export default CountdownTimer;