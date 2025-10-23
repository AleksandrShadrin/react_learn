import { useRef, useState } from "react";

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    function handleStart() {
        if (isRunning) return;
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTime(s => s + 10);
        }, 10);
    }

    function handleStop() {
        setIsRunning(false);
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    function handleReset() {
        setTime(0);
        setIsRunning(false);
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return (
        <div>
            <p>{time}ms</p>
            <button onClick={handleStart} disabled={isRunning}>start</button>
            <button onClick={handleStop} disabled={!isRunning}>stop</button>
            <button onClick={handleReset}>reset</button>
        </div>
    );
}