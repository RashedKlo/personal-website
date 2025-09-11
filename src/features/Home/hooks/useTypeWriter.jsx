import { useCallback, useEffect, useRef, useState } from "react";

const useTypewriter = (config) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentColor, setCurrentColor] = useState(config.colors[0]);
    const timeoutRef = useRef(null);

    const { texts, speed, deleteSpeed, pause, colors } = config;

    const updateText = useCallback(() => {
        const currentText = texts[currentIndex];

        if (isDeleting) {
            setDisplayText(prev => prev.slice(0, -1));

            if (displayText.length === 0) {
                setIsDeleting(false);
                const nextIndex = (currentIndex + 1) % texts.length;
                setCurrentIndex(nextIndex);
                setCurrentColor(colors[nextIndex]);
                timeoutRef.current = setTimeout(updateText, speed);
            } else {
                timeoutRef.current = setTimeout(updateText, deleteSpeed);
            }
        } else {
            if (displayText.length < currentText.length) {
                setDisplayText(currentText.slice(0, displayText.length + 1));
                timeoutRef.current = setTimeout(updateText, speed);
            } else {
                timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
            }
        }
    }, [displayText, currentIndex, isDeleting, texts, speed, deleteSpeed, pause, colors]);

    useEffect(() => {
        timeoutRef.current = setTimeout(updateText, speed);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [updateText, speed]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return { displayText, currentColor };
};
export default useTypewriter;