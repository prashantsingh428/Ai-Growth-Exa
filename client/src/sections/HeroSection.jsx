import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

import AnimatedBeams from "../components/AnimatedBeams"
import PlansModal from "../components/Modals/PlansModal"

const HeroSection = () => {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)
  const [isPlansOpen, setIsPlansOpen] = useState(false)

  useEffect(() => {
    if (!titleRef.current || !textRef.current || !buttonsRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b1a] via-[#040914] to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.06),transparent_40%,rgba(168,85,247,0.05))]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent top-[20%] animate-pulse" />
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent top-[40%] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent top-[60%] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent top-[80%] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[32rem] h-[32rem] bg-indigo-600/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[10%] w-[30rem] h-[30rem] bg-fuchsia-600/20 blur-[160px] rounded-full" />
      </div>

      <AnimatedBeams />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        <div
          className="inline-block mb-8 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 backdrop-blur"
        >
          <span className="text-sm font-semibold tracking-wide uppercase text-blue-400">
            Introducing AI GrowthExa
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
        >
          AI GrowthExa
          <span className="block mt-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Empower • Scale • Succeed
          </span>
        </h1>

        <p
          ref={textRef}
          className="mt-10 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          AI-Driven Growth, IT & Marketing Agency
          <span className="block mt-3 text-gray-300 font-medium">
            Where Data Thinks. AI Acts. Brands Grow.
          </span>
        </p>

        <div
          ref={buttonsRef}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => setIsPlansOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30"
          >
            Get Your Growth Plan
          </button>

          <a
            href="/services"
            className="px-8 py-4 bg-white/5 border border-white/10 hover:border-blue-400 text-gray-300 hover:text-white rounded-full font-bold text-lg transition-all backdrop-blur"
          >
            Explore Services
          </a>
        </div>
      </div>

      <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
    </section>
  )
}

export default HeroSection
