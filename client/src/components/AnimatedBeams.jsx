import React from 'react';

const AnimatedBeams = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            {/* Beam 1 - Top Left to Bottom Right */}
            <div className="absolute w-[800px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent top-[10%] -left-[20%] rotate-[30deg] animate-beam-1"></div>

            {/* Beam 2 - Top Right to Bottom Left */}
            <div className="absolute w-[1000px] h-[2px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent top-[20%] -right-[10%] -rotate-[40deg] animate-beam-2"></div>

            {/* Beam 3 - Center crossing */}
            <div className="absolute w-[900px] h-[2px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent top-[60%] -left-[15%] rotate-[35deg] animate-beam-3"></div>

            {/* Beam 4 - Bottom accent */}
            <div className="absolute w-[700px] h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent bottom-[15%] -right-[20%] -rotate-[25deg] animate-beam-4"></div>

            {/* Dotted accent lines */}
            <div className="absolute w-[600px] h-[1px] border-t border-dashed border-cyan-500/20 top-[35%] left-[10%] rotate-[20deg]"></div>
            <div className="absolute w-[500px] h-[1px] border-t border-dashed border-teal-500/20 bottom-[40%] right-[5%] -rotate-[30deg]"></div>

            <style>{`
                @keyframes beam-1 {
                    0%, 100% { opacity: 0.6; transform: translateY(0) rotate(30deg); }
                    50% { opacity: 0.9; transform: translateY(-10px) rotate(30deg); }
                }
                @keyframes beam-2 {
                    0%, 100% { opacity: 0.5; transform: translateY(0) rotate(-40deg); }
                    50% { opacity: 0.8; transform: translateY(15px) rotate(-40deg); }
                }
                @keyframes beam-3 {
                    0%, 100% { opacity: 0.4; transform: translateX(0) rotate(35deg); }
                    50% { opacity: 0.7; transform: translateX(-20px) rotate(35deg); }
                }
                @keyframes beam-4 {
                    0%, 100% { opacity: 0.5; transform: translateX(0) rotate(-25deg); }
                    50% { opacity: 0.8; transform: translateX(20px) rotate(-25deg); }
                }
                .animate-beam-1 { animation: beam-1 8s ease-in-out infinite; }
                .animate-beam-2 { animation: beam-2 10s ease-in-out infinite; }
                .animate-beam-3 { animation: beam-3 12s ease-in-out infinite; }
                .animate-beam-4 { animation: beam-4 9s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default AnimatedBeams;
