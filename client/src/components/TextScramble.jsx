import React, { useEffect, useRef, useState } from 'react';

const TextScramble = ({ text, className = "", delay = 0, scrambleSpeed = 50, onComplete }) => {
    const elementRef = useRef(null);
    const [displayText, setDisplayText] = useState(text);
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    useEffect(() => {
        let isMounted = true;
        let iteration = 0;
        let timeoutId = null;

        timeoutId = setTimeout(() => {
            if (!isMounted) return;

            const interval = setInterval(() => {
                if (!isMounted) {
                    clearInterval(interval);
                    return;
                }

                setDisplayText(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    if (onComplete && isMounted) onComplete();
                }

                iteration += 1 / 3;
            }, scrambleSpeed);
        }, delay);

        return () => {
            isMounted = false;
            if (timeoutId) clearTimeout(timeoutId);
        };

    }, [text, delay, scrambleSpeed, onComplete]);

    return (
        <span ref={elementRef} className={className}>
            {displayText}
        </span>
    );
};

export default TextScramble;
