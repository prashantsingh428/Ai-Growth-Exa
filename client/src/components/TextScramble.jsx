import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TextScramble = ({ text, className = "", duration = 1, delay = 0, scrambleSpeed = 50, onComplete }) => {
    const elementRef = useRef(null);
    const [displayText, setDisplayText] = useState(text);
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    useEffect(() => {
        const tl = gsap.timeline({ delay: delay });

        let iteration = 0;

        const interval = setInterval(() => {
            setDisplayText(prev =>
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
                if (onComplete) onComplete();
            }

            iteration += 1 / 3;
        }, scrambleSpeed);

        return () => clearInterval(interval);

    }, [text, delay, scrambleSpeed]);

    return (
        <span ref={elementRef} className={className}>
            {displayText}
        </span>
    );
};

export default TextScramble;
