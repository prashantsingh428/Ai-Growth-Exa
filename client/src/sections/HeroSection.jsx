import { useEffect, useRef } from "react"
import gsap from "gsap"

import Threads from "./Threads"
import AnimatedBeams from "../components/AnimatedBeams"
import TextScramble from "../components/TextScramble"

const HeroSection = () => {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
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

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b1a] via-[#040914] to-black" />

        {/* Diagonal depth layer */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.06),transparent_40%,rgba(168,85,247,0.05))]" />

        {/* Threads animation */}
        <Threads
          amplitude={0.9}
          distance={0.45}
          enableMouseInteraction={false}
        />
      </div>

      {/* ================= AMBIENT GLOWS ================= */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[32rem] h-[32rem] bg-indigo-600/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[10%] w-[30rem] h-[30rem] bg-fuchsia-600/20 blur-[160px] rounded-full" />
      </div>

      {/* ================= ACCENT LINES ================= */}
      <AnimatedBeams />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Intro pill */}
        <div
          ref={introRef}
          className="inline-block mb-8 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 backdrop-blur"
        >
          <span className="text-sm font-semibold tracking-wide uppercase text-blue-400">
            <TextScramble
              text="Introducing AI GrowthExa"
              speed={30}
              delay={400}
            />
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
        >
          <TextScramble text="AI GrowthExa" speed={40} />
          <span className="block mt-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            <TextScramble
              text="Empower • Scale • Succeed"
              delay={800}
              speed={40}
            />
          </span>
        </h1>

        {/* Subtext */}
        <p
          ref={textRef}
          className="mt-10 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          <TextScramble
            text="AI-Driven Growth, IT & Marketing Agency"
            delay={1200}
          />
          <span className="block mt-3 text-gray-300 font-medium">
            <TextScramble
              text="Where Data Thinks. AI Acts. Brands Grow."
              delay={1800}
              speed={30}
            />
          </span>
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30"
          >
            Get Your Growth Plan
          </a>

          <a
            href="#services"
            className="px-8 py-4 bg-white/5 border border-white/10 hover:border-blue-400 text-gray-300 hover:text-white rounded-full font-bold text-lg transition-all backdrop-blur"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
