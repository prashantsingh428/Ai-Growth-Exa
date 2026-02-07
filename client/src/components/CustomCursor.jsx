import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        document.body.style.cursor = "none";

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;
        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            gsap.to(cursorRef.current, {
                x: clientX,
                y: clientY,
                duration: 0,
                ease: "power2.out"
            });
            gsap.to(followerRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: "power2.out"
            });
        };

        const onMouseEnter = (e) => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".clickable")
            ) {
                if (target.closest(".cursor-ignore")) {
                    setIsHovering(false);
                    return;
                }
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseEnter);
            document.body.style.cursor = "auto";
        };
    }, []);

    useEffect(() => {
        if (isHovering) {
            gsap.to(followerRef.current, {
                scale: 2.5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "transparent",
                duration: 0.3,
            });
            gsap.to(cursorRef.current, {
                scale: 0.5,
                duration: 0.2
            });

        } else {
            gsap.to(followerRef.current, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "#3b82f6",
                duration: 0.3,
            });
            gsap.to(cursorRef.current, {
                scale: 1,
                duration: 0.3,
            });
        }
    }, [isHovering]);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-blue-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />


            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border-2 border-blue-500 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-out"
            />
        </>
    );
};

export default CustomCursor;
