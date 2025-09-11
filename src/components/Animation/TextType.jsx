

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const TextType = ({
    text,
    as: Component = "div",
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = "",
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = "|",
    cursorClassName = "",
    cursorBlinkDuration = 0.5,
    textColors = [],
    variableSpeed,
    onSentenceComplete,
    startOnVisible = false,
    reverseMode = false,
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const containerRef = useRef(null);
    const isInViewport = useInView(containerRef, { once: true, threshold: 0.1 });

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const getRandomSpeed = useCallback(() => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return "#ffffff";
        return textColors[currentTextIndex % textColors.length];
    };

    // Handle visibility based on startOnVisible prop
    useEffect(() => {
        if (startOnVisible) {
            setIsVisible(isInViewport);
        }
    }, [startOnVisible, isInViewport]);

    // Main typing animation logic
    useEffect(() => {
        if (!isVisible) return;

        let timeout;

        const currentText = textArray[currentTextIndex];
        const processedText = reverseMode
            ? currentText.split("").reverse().join("")
            : currentText;

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (displayedText === "") {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) {
                        return;
                    }

                    if (onSentenceComplete) {
                        onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
                    }

                    setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => { }, pauseDuration);
                } else {
                    timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev.slice(0, -1));
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < processedText.length) {
                    timeout = setTimeout(
                        () => {
                            setDisplayedText(
                                (prev) => prev + processedText[currentCharIndex]
                            );
                            setCurrentCharIndex((prev) => prev + 1);
                        },
                        variableSpeed ? getRandomSpeed() : typingSpeed
                    );
                } else if (textArray.length > 1) {
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseDuration);
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
        isVisible,
        reverseMode,
        variableSpeed,
        onSentenceComplete,
        getRandomSpeed
    ]);

    const shouldHideCursor =
        hideCursorWhileTyping &&
        (currentCharIndex < textArray[currentTextIndex]?.length || isDeleting);

    // Cursor blink animation variants
    const cursorVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    };

    return createElement(
        Component,
        {
            ref: containerRef,
            className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
            ...props,
        },
        <>
            {/* Text with color animation */}
            <motion.span
                className="inline"
                style={{ color: getCurrentTextColor() }}
                key={currentTextIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                {displayedText}
            </motion.span>

            {/* Cursor with Framer Motion blinking animation */}
            {showCursor && (
                <motion.span
                    className={`ml-1 inline-block ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
                    variants={cursorVariants}
                    initial="visible"
                    animate={["visible", "hidden"]}
                    transition={{
                        duration: cursorBlinkDuration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    {cursorCharacter}
                </motion.span>
            )}
        </>
    );
};
export default TextType;