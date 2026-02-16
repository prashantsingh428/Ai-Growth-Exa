import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

import AnimatedBeams from "../components/AnimatedBeams"
import GradientText from "../components/GradientText"

const HeroSection = () => {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)
  const location = useLocation()

  const [textIndex, setTextIndex] = useState(0)
  const shufflingTexts = [
    "AI-Driven Growth, IT & Marketing Agency",
    "LLM-Powered Marketing Automation",
    "Performance-First Ad Management",
    "Data-Driven Brand Identities",
    "Predictive Analytics & Insights",
    "Intelligent Growth Infrastructure"
  ]

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

    // Text shuffling interval
    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setTextIndex((prev) => (prev + 1) % shufflingTexts.length)
          gsap.fromTo(textRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          )
        }
      })
    }, 2500) // 2s pause + 0.5s animation = 2.5s total cycle

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-12">

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
          className="text-3xl sm:text-4xl md:text-7xl font-extrabold tracking-tight text-white"
        >
          AI GrowthExa
          <GradientText
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            animationSpeed={8}
            showBorder={false}
            className="mt-4"
          >
            Empower • Scale • Succeed
          </GradientText>
        </h1>

        <div className="mt-6 md:mt-10 text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
          <div ref={textRef} className="min-h-[1.5em] mb-3">
            {shufflingTexts[textIndex]}
          </div>
          <span className="block text-gray-300 font-medium">
            Where Data Thinks. AI Acts. Brands Grow.
          </span>
        </div>

        <div
          ref={buttonsRef}
          className="mt-8 md:mt-14 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            state={{ background: location }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30"
          >
            Get Your Growth Plan
          </Link>

          <Link
            to="/services"
            className="px-8 py-4 bg-white/5 border border-white/10 hover:border-blue-400 text-gray-300 hover:text-white rounded-full font-bold text-lg transition-all backdrop-blur"
          >
            Explore Services
          </Link>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
