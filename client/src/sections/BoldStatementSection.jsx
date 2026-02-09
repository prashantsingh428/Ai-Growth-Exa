import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import aiInfinityComplete from "../assets/ai-infinity-complete.png"
import ParticleBackground from "../components/ParticleBackground"

gsap.registerPlugin(ScrollTrigger)

const BoldStatementSection = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageWrapRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ================= TEXT ENTRANCE ================= */
      gsap.fromTo(
        textRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      )

      /* ================= IMAGE ENTRANCE ================= */
      gsap.fromTo(
        imageWrapRef.current,
        {
          x: 80,
          opacity: 0,
          rotateY: -15,
          rotateX: 10,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 80%",
          },
        }
      )

      /* ================= FLOATING LOOP ================= */
      gsap.to(imageWrapRef.current, {
        y: 12,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      /* ================= PARALLAX ON SCROLL ================= */
      gsap.to(imageWrapRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ================= MOUSE 3D TILT ================= */
  const handleMouseMove = (e) => {
    if (!imageWrapRef.current) return;
    const bounds = imageWrapRef.current.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top

    const rotateY = gsap.utils.mapRange(0, bounds.width, -10, 10, x)
    const rotateX = gsap.utils.mapRange(0, bounds.height, 10, -10, y)

    gsap.to(imageWrapRef.current, {
      rotateX,
      rotateY,
      duration: 0.6,
      ease: "power3.out",
    })
  }

  const resetTilt = () => {
    if (!imageWrapRef.current) return;
    gsap.to(imageWrapRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    })
  }


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* ================= BACKGROUND GLOWS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-blue-600/40 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[15%] w-[520px] h-[520px] bg-purple-600/40 blur-[160px] rounded-full" />
      </div>

      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ================= TEXT ================= */}
          <div ref={textRef} className="space-y-8">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
              AI-Powered Marketing Infrastructure
            </p>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="text-white">Scale Smarter.</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Grow Faster.
              </span>
              <br />
              <span className="text-white">With AI.</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              We help brands automate, optimize, and scale marketing using AI-driven systems.
            </p>

            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30">
              Book a Free Strategy Call
            </button>
          </div>

          {/* ================= 3D IMAGE ================= */}
          <div
            ref={imageWrapRef}
            className="relative perspective-[1200px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
          >
            <div className="relative transform-style-preserve-3d">
              <img
                ref={imageRef}
                src={aiInfinityComplete}
                alt="AI Continuous Growth"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* 3D glow layers */}
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/40 to-purple-600/40 blur-3xl -z-10" />
              <div className="absolute -inset-20 bg-purple-500/20 blur-[200px] -z-20" />
            </div>

            {/* ================= STATS ================= */}
            <div className="mt-10 grid grid-cols-3 gap-6 bg-gray-900/60 backdrop-blur rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400">300%</p>
                <p className="text-sm text-gray-400 mt-2">ROI Increase</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  50%
                </p>
                <p className="text-sm text-gray-400 mt-2">Cost Reduction</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400">24/7</p>
                <p className="text-sm text-gray-400 mt-2">Automation</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BoldStatementSection


