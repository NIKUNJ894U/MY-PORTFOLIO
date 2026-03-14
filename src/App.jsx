import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaUser,
  FaCode,
  FaFolderOpen,
  FaGithub,
  FaEnvelope,
  FaInstagram,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sideLinksOpen, setSideLinksOpen] = useState(false);
  const [robotOpen, setRobotOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [robotPosition, setRobotPosition] = useState({
    top: 0,
    left: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const skills = [
    { name: "HTML", level: 80 },
    { name: "CSS", level: 75 },
    { name: "JavaScript", level: 70 },
    { name: "React", level: 65 },
    { name: "Python", level: 30 },
    { name: "C", level: 25 },
    { name: "C++", level: 20 },
  ];

  const robotMessages = [
    "👋 Hey, I’m Nikunj’s friendly robot!",
    "✨ Welcome to Nikunj's portfolio!",
    "Hi there! How are you today? (＾◡＾)",
    "💻 I help show off Nikunj’s projects.",
    "📚 BCA student + tech lover = Nikunj.",
    "🚀 Scroll down to see cool GitHub work.",
    "🌟 Feeling curious? Explore the skills section!",
    "🎨 Clean UI, smooth animations, and lots of learning.",
    "📬 Want to say hi? Check the contact section below.",
    "(* ^ ▽ ^ *) I love when people explore this site!",
    "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Let’s discover some projects.",
    "(•‿•) Thanks for visiting Nikunj’s portfolio.",
  ];

  /* ROBOT MESSAGE ROTATION (HAPPY / RANDOM) */
  useEffect(() => {
    const interval = setInterval(() => {
      if (robotMessages.length === 0) return;

      const randomIndex = Math.floor(
        Math.random() * robotMessages.length
      );
      setCurrentMessageIndex(randomIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ROBOT RANDOM FLOATING POSITION */
  useEffect(() => {
    function updateRandomPosition() {
      if (typeof window === "undefined") return;
      if (hasDragged) return; // keep user placement after drag

      const padding = 120; // keep robot inside viewport
      const top = Math.random() * (window.innerHeight - padding);
      const left = Math.random() * (window.innerWidth - padding);

      setRobotPosition({ top, left });
    }

    updateRandomPosition();
    const interval = setInterval(updateRandomPosition, 30000);

    return () => clearInterval(interval);
  }, [hasDragged]);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen flex relative overflow-hidden">
      {/* SOFT BACKGROUND SHAPES */}
      <motion.div
        className="pointer-events-none absolute -top-24 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-blue-500/40 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-sky-500/40 via-emerald-400/25 to-purple-500/30 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SIDE MENU */}
      <div
        className={`fixed left-0 top-0 h-full w-60 bg-slate-900/70 backdrop-blur-xl border-r border-white/10 px-6 py-8 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-60"
        } md:translate-x-0`}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              NIKUNJ
            </span>
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            BCA Student · Web Developer
          </p>
        </motion.div>

        <nav className="mt-10 flex flex-col gap-2 text-sm text-slate-300">
          <button
            onClick={() => setSideLinksOpen((prev) => !prev)}
            className="flex items-center justify-between rounded-full px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
              Menu
            </span>
            <span className="text-xs">{sideLinksOpen ? "−" : "+"}</span>
          </button>

          {sideLinksOpen && (
            <div className="ml-4 flex flex-col gap-2">
              {[
                { href: "#hero", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#skills", label: "Skills" },
                { href: "#projects", label: "Projects" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                  {item.label}
                </motion.a>
              ))}
            </div>
          )}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-60">
        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden fixed top-5 left-4 z-50 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-semibold shadow-lg shadow-purple-500/40"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>

        {/* TOP NAVBAR (INSPIRED, NOT COPIED) */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-slate-950/70 backdrop-blur border-b border-white/5">
          <div className="text-sm font-semibold tracking-wide text-slate-200">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Nikunj&apos;s Portfolio
            </span>
          </div>
          <div className="hidden md:flex gap-4 text-xs font-medium text-slate-300">
            {[
              { href: "#hero", label: "Home" },
              { href: "#skills", label: "Skills" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1 rounded-full hover:bg-white/5 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* HERO */}
        <motion.section
          id="hero"
          className="relative pt-28 pb-24 px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* FLOATING PARTICLES */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              className="absolute left-1/4 top-10 h-2 w-2 rounded-full bg-purple-400/70"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-10 top-32 h-2 w-2 rounded-full bg-pink-400/70"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-10 bottom-6 h-2 w-2 rounded-full bg-sky-400/70"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xs"
            >
              <FaRocket />
            </motion.span>
            <span>Launching ideas into reality</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              NIKUNJ SINGHAL
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            BCA Student · Web Developer · Tech Enthusiast · Fresher
          </motion.p>

          {/* HERO CTAS */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2.5 text-sm font-semibold shadow-lg shadow-purple-500/40 hover:shadow-purple-400/70 transition"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5 transition"
            >
              Contact Me
            </a>
          </motion.div>

          {/* QUICK STATS */}
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { label: "Years Learning", value: "1+", sub: "Web development journey" },
              { label: "GitHub Repos", value: "1", sub: "Featured project so far" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-slate-900/70 border border-white/10 px-4 py-3 text-left shadow-md shadow-black/40"
              >
                <p className="text-xs text-slate-400">{stat.label}</p>
                <p className="text-xl font-semibold text-slate-50">{stat.value}</p>
                <p className="mt-1 text-[11px] text-slate-400">{stat.sub}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ABOUT */}
        <motion.section
          id="about"
          className="max-w-4xl mx-auto mb-20 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-base shadow-lg shadow-purple-500/40"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaUser />
            </motion.span>
            <h2 className="text-3xl font-bold tracking-wide text-slate-50">
              ABOUT ME
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-8 md:px-10 md:py-10 shadow-xl shadow-black/30 backdrop-blur">
            <p className="text-slate-200 text-lg leading-relaxed">
              Hello there, my name is{" "}
              <span className="font-semibold">Nikunj Singhal</span> and I am a
              passionate web developer and tech enthusiast. I am constantly
              learning and exploring new technologies to enhance my skills.
            </p>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              I am currently pursuing a BCA degree, which has provided me with a
              solid understanding of computer science principles and programming
              concepts. I&apos;m eager to apply my knowledge and creativity to
              build innovative web applications and contribute to the tech
              community. I want to grow in the field of web development and make
              a positive impact through my work.
            </p>
          </div>
        </motion.section>

        {/* WHAT I DO / SERVICES */}
        <motion.section
          id="services"
          className="max-w-5xl mx-auto mb-20 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-base shadow-lg shadow-purple-500/40"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaBriefcase />
            </motion.span>
            <h2 className="text-3xl font-bold tracking-wide text-slate-50">
              WHAT I DO
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "UI-Focused Design",
                desc: "Crafting clean, minimal layouts that keep users focused and engaged.",
              },
              {
                title: "Problem Solving",
                desc: "Approaching challenges logically and improving through consistent practice and projects.",
              },
            ].map((service) => (
              <motion.div
                key={service.title}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-2xl bg-slate-900/70 border border-white/10 p-5 shadow-lg shadow-black/40 hover:border-purple-400/70 hover:shadow-purple-500/40 transition-all duration-200"
              >
                <h3 className="text-sm font-semibold text-slate-50">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          className="max-w-5xl mx-auto mb-20 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-base shadow-lg shadow-purple-500/40"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaCode />
            </motion.span>
            <h2 className="text-3xl font-bold tracking-wide text-slate-50">
              SKILLS
            </h2>
          </div>

          {/* SOFT TERMINAL HEADER */}
          <div className="mb-8 rounded-2xl bg-slate-900/70 px-5 py-4 font-mono text-sm text-emerald-300 border border-emerald-400/20 shadow-lg shadow-emerald-500/20">
            <p>&gt; loading skills...</p>
            <p>&gt; system ready</p>
          </div>

          {/* SKILL CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -6, scale: 1.03 }}
                className="rounded-2xl bg-slate-900/80 border border-white/10 p-4 text-center shadow-lg shadow-black/40 hover:border-purple-400/70 hover:shadow-purple-500/40 transition-all duration-200"
              >
                <p className="text-sm font-semibold text-slate-100">
                  {skill.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* JOURNEY / TIMELINE */}
        <motion.section
          id="journey"
          className="max-w-4xl mx-auto mb-20 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-base shadow-lg shadow-purple-500/40"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaGraduationCap />
            </motion.span>
            <h2 className="text-3xl font-bold tracking-wide text-slate-50">
              MY JOURNEY
            </h2>
          </div>

          <div className="relative border-l border-white/10 ml-4 space-y-8">
            {[
              {
                year: "2025 - Present",
                title: "BCA Student",
                desc: "Pursuing Bachelor of Computer Applications and building a strong foundation in computer science and programming.",
              },
              {
                year: "2026 - Present",
                title: "GitHub Projects",
                desc: "Creating and sharing projects on GitHub to practice, improve, and showcase my skills.",
              },
            ].map((item) => (
              <div key={item.title} className="relative pl-6">
                <span className="absolute -left-2 top-1 h-3 w-3 rounded-full bg-gradient-to-br from-purple-400 to-blue-400" />
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  {item.year}
                </p>
                <h3 className="text-sm font-semibold text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          className="max-w-6xl mx-auto mb-20 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-base shadow-lg shadow-purple-500/40"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaFolderOpen />
            </motion.span>
            <h2 className="text-3xl font-bold tracking-wide text-slate-50">
              GITHUB PROJECTS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {/* MODERN CALCULATOR PROJECT WITH LIVE DEMO */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 shadow-lg shadow-black/40 hover:border-purple-400/70 hover:shadow-purple-500/40 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm">
                  <FaGithub />
                </span>
                <h3 className="font-semibold text-lg text-slate-50 break-words">
                  Modern Calculator
                </h3>
              </div>

              <p className="text-slate-300 mt-3 text-sm leading-relaxed min-h-[48px]">
                A modern calculator for arithmetic with a clean UI and live demo.
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <a
                  href="https://github.com/NIKUNJ894U/Modern-Calculator"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100"
                >
                  <span className="h-px w-4 bg-purple-400" />
                  View Repository
                </a>
                <a
                  href="https://modern-calculator-phi.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100"
                >
                  <span className="h-px w-4 bg-purple-400" />
                  View Live App
                </a>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          className="max-w-3xl mx-auto pb-24 px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-base shadow-lg shadow-purple-500/40"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaEnvelope />
            </motion.span>
            <h2 className="text-3xl font-bold tracking-wide text-slate-50">
              CONTACT
            </h2>
          </div>

          <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-6 shadow-xl shadow-black/40 backdrop-blur">
            <p className="text-sm text-slate-300 mb-3">
              Interested in working together or just want to say hi?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="mailto:contact.nikunj.work@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-10 py-2.5 text-sm font-semibold shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60 transition"
              >
                <FaEnvelope className="text-red-500 text-sm" />
              </a>

              <a
                href="https://www.instagram.com/nikunj.contact_/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-10 py-2.5 text-sm font-semibold shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60 transition"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="https://github.com/NIKUNJ894U"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-10 py-2.5 text-sm font-semibold shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60 transition"
              >
                <FaGithub className="text-gray-900 text-sm" />
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      {/* FLOATING ROBOT ASSISTANT */}
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          setHasDragged(true);
          setRobotPosition((prev) => {
            const nextTop = prev.top + info.offset.y;
            const nextLeft = prev.left + info.offset.x;
            const padding = 80;
            const maxTop = Math.max(window.innerHeight - padding, 0);
            const maxLeft = Math.max(window.innerWidth - padding, 0);

            return {
              top: Math.min(Math.max(nextTop, 0), maxTop),
              left: Math.min(Math.max(nextLeft, 0), maxLeft),
            };
          });
        }}
        className="fixed z-40 flex flex-col items-end gap-3"
        style={{
          top: robotPosition.top,
          left: robotPosition.left,
        }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {robotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-xs rounded-2xl bg-slate-900/90 px-4 py-3 text-xs text-slate-100 shadow-xl shadow-purple-500/40 border border-purple-400/40 backdrop-blur"
          >
            <p>{robotMessages[currentMessageIndex]}</p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            if (isDragging) return;
            setRobotOpen((prev) => !prev);
          }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 shadow-2xl shadow-slate-900/60 border border-white/10 pointer-events-auto"
        >
          {/* Cute custom robot (inspired by O(∩_∩)O) */}
          <div className="relative h-16 w-16 flex items-center justify-center">
            {/* Head */}
            <motion.div
              className="relative h-14 w-14 rounded-3xl bg-slate-900 flex flex-col items-center justify-center border border-orange-300/70 shadow-lg shadow-orange-500/40"
              animate={{
                rotate: [-1.5, 1.5, -1, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Eyes */}
              <div className="flex gap-3 items-center">
                <motion.div
                  className="h-3.5 w-3.5 rounded-full border border-orange-300/80 flex items-center justify-center bg-slate-800/60"
                  animate={{
                    scaleY: [1, 0.75, 1],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
                </motion.div>
                <motion.div
                  className="h-3.5 w-3.5 rounded-full border border-orange-300/80 flex items-center justify-center bg-slate-800/60"
                  animate={{
                    scaleY: [1, 0.75, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
                </motion.div>
              </div>
              {/* Very small smile (◔◡◔) inspired */}
              <motion.div
                className="mt-1 w-5 h-3 border-b border-orange-200/90 rounded-b-full"
                animate={{ scaleX: [1, 1.08, 1], y: [0, -0.3, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Antenna */}
            <motion.div
              className="absolute -top-3 h-4 w-0.5 bg-orange-300"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="h-2 w-2 rounded-full bg-orange-400 -mt-1" />
            </motion.div>

            {/* Waving hand */}
            <motion.div
              className="absolute -right-3 top-5 h-6 w-2 rounded-full bg-purple-300 origin-top"
              animate={{
                rotate: [0, 22, -12, 22, 0],
              }}
              transition={{
                duration: 1.9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;
