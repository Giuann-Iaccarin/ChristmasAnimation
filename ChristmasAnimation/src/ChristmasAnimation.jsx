import React, { useState, useEffect } from 'react';

const ChristmasAnimation = () => {
    const [showTitle, setShowTitle] = useState(false);
    const [showBy, setShowBy] = useState(false);
    const [snowflakes] = useState(() =>
        Array.from({ length: 200 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 4 + Math.random() * 8,
            animationDelay: Math.random() * 5,
            size: 3 + Math.random() * 6,
            opacity: 0.4 + Math.random() * 0.6,
        }))
    );

    const [ribbons] = useState(() =>
        Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: (i * 7) + Math.random() * 5,
            rotation: -40 + Math.random() * 80,
            width: 40 + Math.random() * 80,
            animationDelay: Math.random() * 2,
        }))
    );

    const [stars] = useState(() =>
        Array.from({ length: 60 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: 2 + Math.random() * 6,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 3,
        }))
    );

    const [ornaments] = useState(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: 10 + (i * 7.5),
            top: 20 + Math.random() * 10,
            size: 30 + Math.random() * 25,
            color: ['#dc2626', '#ffffff', '#fbbf24', '#3b82f6', '#10b981'][i % 5],
            rotation: -15 + Math.random() * 30,
            animationDelay: Math.random() * 2,
            type: i % 3,
            withCord: Math.random() > 0.5,
        }))
    );

    const [floatingOrnaments] = useState(() =>
        Array.from({ length: 8 }, (_, i) => ({
            id: i,
            left: 15 + (i * 10),
            top: 50 + Math.random() * 40,
            size: 20 + Math.random() * 15,
            color: ['#ef4444', '#84cc16', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'][i % 6],
            animationDelay: Math.random() * 3,
            animationDuration: 8 + Math.random() * 10,
            movementRange: 20 + Math.random() * 40,
            rotationSpeed: 1 + Math.random() * 3,
            pattern: ['solid', 'stripes', 'dots', 'spiral'][i % 4],
        }))
    );

    useEffect(() => {
        const titleTimer = setTimeout(() => setShowTitle(true), 500);
        const byTimer = setTimeout(() => setShowBy(true), 3500);

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(byTimer);
        };
    }, []);

    const merryLetters = "MERRY".split("");
    const christmasLetters = "CHRISTMAS".split("");

    // Pattern per le palle di natale
    const getOrnamentPattern = (type, color, size) => {
        switch (type) {
            case 1: // A strisce
                return `
          radial-gradient(circle at 30% 30%, ${color} 0%, ${color} 10%, transparent 10.5%),
          radial-gradient(circle at 70% 70%, ${color} 0%, ${color} 8%, transparent 8.5%),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 5px,
            rgba(255,255,255,0.3) 5px,
            rgba(255,255,255,0.3) 7px
          ),
          radial-gradient(ellipse at center, ${color} 30%, ${color}80 70%, ${color}40 100%)
        `;
            case 2: // Puntinata
                return `
          radial-gradient(circle at 30% 30%, white 0%, white ${size / 8}px, transparent ${size / 8 + 1}px),
          radial-gradient(circle at 70% 70%, white 0%, white ${size / 10}px, transparent ${size / 10 + 1}px),
          radial-gradient(circle at 50% 20%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) ${size / 12}px, transparent ${size / 12 + 1}px),
          radial-gradient(ellipse at center, ${color} 30%, ${color}80 70%, ${color}40 100%),
          radial-gradient(circle at 10px 10px, rgba(255,255,255,0.2) 1px, transparent 2px),
          radial-gradient(circle at 40px 40px, rgba(255,255,255,0.2) 1px, transparent 2px)
        `;
            default: // Lucida
                return `
          radial-gradient(ellipse at 30% 30%, white 0%, transparent 50%),
          radial-gradient(ellipse at center, ${color} 0%, ${color}80 50%, ${color}40 100%)
        `;
        }
    };

    const getFloatingOrnamentPattern = (pattern, color) => {
        const lightColor = color.includes('#') ? color : '#ffffff';
        switch (pattern) {
            case 'stripes':
                return `
          radial-gradient(circle at 30% 30%, ${lightColor}40 0%, transparent 20%),
          repeating-conic-gradient(
            from 0deg,
            ${lightColor} 0deg 10deg,
            rgba(255,255,255,0.2) 10deg 20deg
          ),
          radial-gradient(ellipse at center, ${lightColor} 20%, ${lightColor}80 50%, ${lightColor}40 100%)
        `;
            case 'dots':
                return `
          radial-gradient(circle at 30% 30%, white 0%, white 10%, transparent 10.5%),
          radial-gradient(circle at 70% 70%, white 0%, white 8%, transparent 8.5%),
          radial-gradient(circle at 50% 20%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 6%, transparent 6.5%),
          radial-gradient(ellipse at center, ${lightColor} 30%, ${lightColor}80 60%, ${lightColor}40 100%),
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 2px, transparent 3px),
          radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 2px, transparent 3px)
        `;
            case 'spiral':
                return `
          conic-gradient(
            from 0deg,
            ${lightColor},
            rgba(255,255,255,0.3),
            ${lightColor},
            rgba(255,255,255,0.3),
            ${lightColor},
            rgba(255,255,255,0.3),
            ${lightColor}
          ),
          radial-gradient(ellipse at center, ${lightColor} 20%, ${lightColor}80 50%, transparent 70%)
        `;
            default: // solid
                return `
          radial-gradient(ellipse at 25% 25%, white 0%, transparent 60%),
          radial-gradient(ellipse at center, ${lightColor} 0%, ${lightColor}80 50%, ${lightColor}40 100%)
        `;
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-green-800 via-green-700 to-green-900">
            {/* Pattern di rami di pino animati */}
            <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={`branch-${i}`}
                        className="absolute animate-sway-branch"
                        style={{
                            left: i % 2 === 0 ? '-5%' : '95%',
                            top: `${i * 5}%`,
                            transform: i % 2 === 0 ? 'rotate(45deg)' : 'rotate(-45deg)',
                            animationDelay: `${i * 0.2}s`,
                        }}
                    >
                        <div className="w-32 h-32 bg-gradient-to-br from-green-900 to-green-950 opacity-60"
                            style={{
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                            }} />
                    </div>
                ))}
            </div>

            {/* Stelle scintillanti */}
            {stars.map((star) => (
                <div
                    key={`star-${star.id}`}
                    className="absolute rounded-full bg-white animate-twinkle"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                        boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                    }}
                />
            ))}

            {/* Nastri rossi e bianchi ondulati */}
            {ribbons.map((ribbon) => (
                <div
                    key={`ribbon-${ribbon.id}`}
                    className="absolute top-0 animate-ribbon-wave"
                    style={{
                        left: `${ribbon.left}%`,
                        width: `${ribbon.width}px`,
                        height: '120vh',
                        animationDelay: `${ribbon.animationDelay}s`,
                        animationDuration: '6s',
                    }}
                >
                    <div
                        className="w-full h-full"
                        style={{
                            background: ribbon.id % 2 === 0
                                ? 'linear-gradient(to bottom, transparent 0%, #dc2626 10%, #ffffff 20%, #dc2626 30%, transparent 40%, transparent 60%, #dc2626 70%, #ffffff 80%, #dc2626 90%, transparent 100%)'
                                : 'linear-gradient(to bottom, transparent 0%, #ffffff 10%, #dc2626 20%, #ffffff 30%, transparent 40%, transparent 60%, #ffffff 70%, #dc2626 80%, #ffffff 90%, transparent 100%)',
                            transform: `rotate(${ribbon.rotation}deg) skewY(-10deg)`,
                            opacity: 0.7,
                            boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)',
                        }}
                    />
                </div>
            ))}

            {/* Palle di natale appese (ornamenti classici) */}
            {ornaments.map((ornament) => (
                <div
                    key={`ornament-${ornament.id}`}
                    className="absolute animate-ornament-swing"
                    style={{
                        left: `${ornament.left}%`,
                        top: `${ornament.top}%`,
                        width: `${ornament.size}px`,
                        height: `${ornament.size}px`,
                        animationDelay: `${ornament.animationDelay}s`,
                        animationDuration: '4s',
                        transformOrigin: 'top center',
                    }}
                >
                    {/* Cordino dell'ornamento */}
                    {ornament.withCord && (
                        <div
                            className="absolute top-0 left-1/2 transform -translate-x-1/2"
                            style={{
                                width: '2px',
                                height: '60px',
                                background: 'linear-gradient(to top, #a16207, #fbbf24, #a16207)',
                                boxShadow: '0 0 5px rgba(251, 191, 36, 0.5)',
                            }}
                        />
                    )}

                    {/* Palla di natale */}
                    <div
                        className="absolute rounded-full animate-ornament-rotate"
                        style={{
                            top: ornament.withCord ? '60px' : '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            background: getOrnamentPattern(ornament.type, ornament.color, ornament.size),
                            transform: `rotate(${ornament.rotation}deg)`,
                            boxShadow: `
                inset 0 0 20px rgba(255, 255, 255, 0.3),
                inset -10px -10px 20px rgba(0, 0, 0, 0.2),
                0 0 25px ${ornament.color}80,
                0 5px 15px rgba(0, 0, 0, 0.3)
              `,
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        {/* Riflesso di luce */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                top: '15%',
                                left: '20%',
                                width: '25%',
                                height: '25%',
                                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)',
                                filter: 'blur(1px)',
                            }}
                        />

                        {/* Cappio superiore */}
                        <div
                            className="absolute left-1/2 transform -translate-x-1/2"
                            style={{
                                top: '-10px',
                                width: '20px',
                                height: '15px',
                                background: 'radial-gradient(ellipse at center, #fbbf24 0%, #92400e 100%)',
                                borderRadius: '10px 10px 0 0',
                                borderTop: '2px solid rgba(255, 215, 0, 0.5)',
                                boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
                            }}
                        />
                    </div>
                </div>
            ))}

            {/* Palle di natale fluttuanti decorative */}
            {floatingOrnaments.map((orb) => (
                <div
                    key={`floating-orb-${orb.id}`}
                    className="absolute animate-float-spin"
                    style={{
                        left: `${orb.left}%`,
                        top: `${orb.top}%`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        animationDelay: `${orb.animationDelay}s`,
                        animationDuration: `${orb.animationDuration}s`,
                        animationTimingFunction: 'ease-in-out',
                    }}
                >
                    <div
                        className="rounded-full w-full h-full"
                        style={{
                            background: getFloatingOrnamentPattern(orb.pattern, orb.color, orb.size),
                            boxShadow: `
                inset 0 0 30px rgba(255, 255, 255, 0.2),
                0 0 40px ${orb.color}80,
                0 10px 30px rgba(0, 0, 0, 0.4)
              `,
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            filter: 'brightness(1.1)',
                        }}
                    >
                        {/* Effetto di luce interno */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                top: '20%',
                                left: '25%',
                                width: '30%',
                                height: '30%',
                                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)',
                                filter: 'blur(2px)',
                            }}
                        />
                    </div>

                    {/* Effetto aura esterna */}
                    <div
                        className="absolute rounded-full animate-pulse-soft"
                        style={{
                            top: '-10%',
                            left: '-10%',
                            width: '120%',
                            height: '120%',
                            background: `radial-gradient(ellipse at center, ${orb.color}20 0%, transparent 70%)`,
                            zIndex: -1,
                        }}
                    />
                </div>
            ))}

            {/* Fiocchi di neve */}
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute animate-fall-rotate"
                    style={{
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        opacity: flake.opacity,
                        animation: `fall-rotate ${flake.animationDuration}s linear infinite`,
                        animationDelay: `${flake.animationDelay}s`,
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                        <path d="M12 2L13 10L12 12L11 10L12 2M12 14L13 22L12 24L11 22L12 14M2 12L10 11L12 12L10 13L2 12M14 12L22 11L24 12L22 13L14 12M4.93 4.93L10.83 10.83L12 12L10.83 13.17L4.93 19.07M13.17 12L19.07 19.07L20.48 17.66L14.58 11.76M4.93 19.07L10.83 13.17L12 12L13.17 10.83L19.07 4.93" />
                    </svg>
                </div>
            ))}

            {/* Bacche rosse decorative pulsanti */}
            {Array.from({ length: 40 }).map((_, i) => (
                <div
                    key={`berry-${i}`}
                    className="absolute rounded-full bg-red-600 animate-berry-pulse"
                    style={{
                        left: i < 20 ? `${i * 2.5}%` : `${(i - 20) * 2.5 + 50}%`,
                        top: i < 20 ? '5%' : '95%',
                        width: '10px',
                        height: '10px',
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: '3s',
                        boxShadow: '0 0 15px rgba(220, 38, 38, 0.9)',
                    }}
                />
            ))}

            {/* Luci natalizie lampeggianti */}
            {Array.from({ length: 30 }).map((_, i) => (
                <div
                    key={`light-${i}`}
                    className="absolute rounded-full animate-blink"
                    style={{
                        left: `${(i * 3.3)}%`,
                        top: i % 2 === 0 ? '10%' : '90%',
                        width: '12px',
                        height: '12px',
                        background: ['#ffd700', '#ff0000', '#00ff00', '#ffffff'][i % 4],
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1.5s',
                        boxShadow: `0 0 20px ${['#ffd700', '#ff0000', '#00ff00', '#ffffff'][i % 4]}`,
                    }}
                />
            ))}

            {/* Contenuto principale */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* Merry con animazione lettera per lettera */}
                <div className="relative px-8 mb-4">
                    <div className="flex justify-center items-center">
                        {merryLetters.map((letter, i) => (
                            <span
                                key={`merry-${i}`}
                                className={`inline-block text-8xl md:text-9xl font-black animate-letter-entry ${showTitle ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                    fontFamily: 'Impact, system-ui, sans-serif',
                                    letterSpacing: '0.05em',
                                    color: '#dc2626',
                                    textShadow: `
                    3px 3px 0px #166534,
                    6px 6px 0px rgba(0,0,0,0.3)
                  `,
                                    WebkitTextStroke: '2px white',
                                    paintOrder: 'stroke fill',
                                    animationDelay: `${i * 0.15}s`,
                                    transformOrigin: 'center',
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Christmas con animazione lettera per lettera */}
                <div className="relative px-8">
                    <div className="flex justify-center items-center">
                        {christmasLetters.map((letter, i) => (
                            <span
                                key={`christmas-${i}`}
                                className={`inline-block text-8xl md:text-9xl font-black animate-letter-entry ${showTitle ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                    fontFamily: 'Impact, system-ui, sans-serif',
                                    letterSpacing: '0.05em',
                                    color: '#dc2626',
                                    textShadow: `
                    3px 3px 0px #166534,
                    6px 6px 0px rgba(0,0,0,0.3)
                  `,
                                    WebkitTextStroke: '2px white',
                                    paintOrder: 'stroke fill',
                                    animationDelay: `${(i + merryLetters.length) * 0.15}s`,
                                    transformOrigin: 'center',
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>

                {/* By Giuann© */}
                <div
                    className={`mt-20 transform transition-all duration-1500 ${showBy
                            ? 'translate-y-0 opacity-100 scale-100'
                            : 'translate-y-20 opacity-0 scale-75'
                        }`}
                >
                    <div className="relative animate-float-bob">
                        <p className="text-3xl md:text-4xl font-black tracking-widest animate-shimmer-glow"
                            style={{
                                fontFamily: 'Impact, system-ui, sans-serif',
                                color: '#ffffff',
                                textShadow: `
                   2px 2px 0px #dc2626,
                   4px 4px 0px #166534,
                   6px 6px 10px rgba(0,0,0,0.5),
                   0 0 20px rgba(255,255,255,0.5)
                 `,
                                WebkitTextStroke: '1px rgba(220, 38, 38, 0.3)',
                            }}>
                            by Giuann©
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fall-rotate {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
          }
        }

        @keyframes ribbon-wave {
          0%, 100% {
            transform: translateX(0) rotate(0deg) skewY(-10deg);
          }
          33% {
            transform: translateX(20px) rotate(3deg) skewY(-12deg);
          }
          66% {
            transform: translateX(-20px) rotate(-3deg) skewY(-8deg);
          }
        }

        @keyframes sway-branch {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes letter-entry {
          0% {
            transform: translateY(-100px) rotateZ(-180deg) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(20px) rotateZ(10deg) scale(1.2);
          }
          100% {
            transform: translateY(0) rotateZ(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes float-bob {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        @keyframes shimmer-glow {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.3);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes berry-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }

        @keyframes ornament-swing {
          0%, 100% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(8deg);
          }
        }

        @keyframes ornament-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes float-spin {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(0) translateX(20px) rotate(180deg);
          }
          75% {
            transform: translateY(20px) translateX(10px) rotate(270deg);
          }
        }

        @keyframes pulse-soft {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .animate-fall-rotate {
          animation: fall-rotate linear infinite;
        }

        .animate-ribbon-wave {
          animation: ribbon-wave ease-in-out infinite;
        }

        .animate-sway-branch {
          animation: sway-branch 4s ease-in-out infinite;
        }

        .animate-letter-entry {
          animation: letter-entry 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .animate-float-bob {
          animation: float-bob 4s ease-in-out infinite;
        }

        .animate-shimmer-glow {
          animation: shimmer-glow 3s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animate-berry-pulse {
          animation: berry-pulse ease-in-out infinite;
        }

        .animate-blink {
          animation: blink ease-in-out infinite;
        }

        .animate-ornament-swing {
          animation: ornament-swing 3s ease-in-out infinite;
        }

        .animate-ornament-rotate {
          animation: ornament-rotate 20s linear infinite;
        }

        .animate-float-spin {
          animation: float-spin ease-in-out infinite;
        }

        .animate-pulse-soft {
          animation: pulse-soft 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default ChristmasAnimation;