// @ts-nocheck

import {useCallback, useEffect, useMemo, useState} from "react";
import Confetti from 'react-confetti'

interface Props {
    gravity?: number,
    milliseconds: number,
    updateTime?: number
}

const MyConfetti = ({milliseconds, gravity = 1, updateTime=Date.now()}:Props) => {
    const [run, setRun] = useState<boolean>(true)
    const [runForStyles, setRunForStyles] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setRunForStyles(false)
        }, milliseconds)
        setTimeout(() => {
            setRun(false)
        }, milliseconds+600)
    }, [updateTime])
    const drawShape = useCallback((ctx) => {
        ctx.fillStyle = '#D19831';
        ctx.beginPath();
        ctx.arc(8, 8, 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#FEDB40';
        ctx.beginPath();
        ctx.arc(8, 8, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = '#FEDB40';
        ctx.beginPath();
        ctx.arc(8, 8, 6.5, 0, 2 * Math.PI);
        ctx.stroke();
    }, []);

    return useMemo(() => (
        <Confetti
            className={`confetti ${runForStyles ? '' : 'disabled-confetti'}`}
            numberOfPieces={150}
            gravity={gravity}
            drawShape={drawShape}
            run={run}
        />
    ), [run, gravity, drawShape]);
};

export default MyConfetti;