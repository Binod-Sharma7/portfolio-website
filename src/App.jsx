import React, { useEffect, useMemo, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

import {
  Award,
  Briefcase,
  Code,
  Mail,
  Download,
  ExternalLink,
  GitBranch,
  Menu,
  X,
  Sparkles,
  Rocket,
  Layers3,
} from 'lucide-react';

import emailjs from '@emailjs/browser';

const App = () => {
  const phrases = useMemo(
    () => [
      'I build sharp digital experiences',
      'React Developer',
      'Electronics Engineer',
      'Creative Frontend Designer',
    ],
    []
  );

  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { scrollYProgress } = useScroll();

  const scrollProgressScaleX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  // ================= TYPEWRITER =================
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (textIndex < currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      } else {
        setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTextIndex(0);
          setTypedText('');
        }, 1600);
      }
    }, 70);

    return () => clearTimeout(timeout);
  }, [phraseIndex, textIndex, phrases]);

  // ================= ACTIVE SECTION =================
  useEffect(() => {
    const sections = [
      'intro',
      'about',
      'skills',
      'projects',
      'achievements',
      'contact',
    ];

    const handleScroll = () => {
      const offset = window.scrollY + 120;
      let current = 'intro';

      sections.forEach((id) => {
        const element = document.getElementById(id);

        if (element && element.offsetTop <= offset) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
// emailjs integration
const handleFormSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    await emailjs.send(
      'service_x4dpdti',
      'template_pf40izc',
      {
        name: formData.name,        // ✅ FIX: अब template {{name}} match हुन्छ
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(), // (optional but useful)
      },
      'EUfd2WKFqyZwehm50'
    );

    setSubmitStatus('success');

    setFormData({
      name: '',
      email: '',
      message: '',
    });

  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
  const navLinks = [
    { id: 'intro', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="bg-[#020617] text-white overflow-x-hidden relative">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-violet-500/20 blur-[120px]" />
      </div>

      {/* SCROLL BAR */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 z-[999]"
        style={{
          scaleX: scrollProgressScaleX,
          transformOrigin: 'left',
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-slate-950/70 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

          {/* LOGO */}
          <motion.a
  href="#intro"
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  whileHover={{ scale: 1.03 }}
  className="flex items-center gap-4 cursor-pointer group select-none"
>
  {/* Animated Logo */}
  <div className="relative flex items-center justify-center">
    
    {/* Glow */}
    <motion.div
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.3, 0.9, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      className="absolute w-16 h-16 rounded-3xl bg-cyan-400/30 blur-2xl"
    />

    {/* Outer Ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute w-16 h-16 rounded-3xl border border-cyan-400/30 border-dashed"
    />

    {/* Inner Ring */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute w-12 h-12 rounded-2xl border border-violet-400/30"
    />

    {/* Main Box */}
    <motion.div
      whileHover={{
        rotate: -10,
        scale: 1.1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.45)]"
    >
      <motion.span
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-white font-black text-xl"
      >
        B
      </motion.span>
    </motion.div>

    {/* Orbit Dot */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute w-20 h-20"
    >
      <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
    </motion.div>
  </div>

  {/* Text */}
  <div className="relative">
    <motion.h1
      whileHover={{ scale: 1.03 }}
      className="text-2xl font-black tracking-tight"
    >
      <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
        Binod Sharma
      </span>
    </motion.h1>

    {/* Animated Underline */}
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        duration: 1.2,
        delay: 0.5,
      }}
      className="h-[3px] mt-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
    />

    {/* Floating Particles */}
    <motion.div
      animate={{
        x: [0, 8, 0],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="absolute -right-5 top-1 w-2 h-2 rounded-full bg-cyan-400"
    />

    <motion.div
      animate={{
        y: [0, -8, 0],
        opacity: [0.2, 1, 0.2],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
      }}
      className="absolute -right-9 top-5 w-2 h-2 rounded-full bg-violet-500"
    />
  </div>
</motion.a>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${activeSection === link.id
                    ? 'bg-cyan-500/10 text-cyan-300'
                    : 'text-slate-300 hover:bg-white/5'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 22 }}
              className="fixed top-0 right-0 h-screen w-[72%] bg-slate-950 border-l border-white/10 z-50 p-7"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-semibold">Menu</h2>

                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base text-slate-300 border-b border-white/10 pb-4"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section
        id="intro"
        className="min-h-screen flex items-center pt-24"
      >
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-300" />

              <span className="text-xs uppercase tracking-[3px] text-cyan-300">
                Open To Work
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight">
              <span className="block text-white">
                Hi,
              </span>

              <span className="block ml-1 text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text">
                I'm{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Binod Sharma
                </span>
              </span>
            </h1>

            <div className="mt-5 h-14">
              <span className="text-2xl md:text-3xl font-medium text-slate-200">
                {typedText}
              </span>

              <span className="inline-block w-1 h-7 bg-cyan-400 ml-1 animate-pulse" />
            </div>

            <p className="mt-5 text-slate-400 text-base leading-relaxed max-w-lg">
              Electronics Engineer turned Frontend Developer crafting modern
              digital experiences with React and premium UI animations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold flex items-center gap-2"
              >
                Contact Me
                <Mail className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                href="/photos/cv/Binod_Sharma_CV.pdf"
                download
                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-6 rounded-full border border-cyan-400/20"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-12 rounded-full border border-violet-400/10"
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -left-5 top-10 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center backdrop-blur-xl"
              >
                <Code className="w-5 h-5 text-cyan-300" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -right-5 bottom-12 w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center backdrop-blur-xl"
              >
                <Rocket className="w-5 h-5 text-violet-300" />
              </motion.div>

              <img
                src="/photos/pp/20260315_213247.jpg.jpeg"
                alt="Binod Sharma"
                className="w-72 h-72 md:w-[340px] md:h-[340px] rounded-full object-cover border-[8px] border-slate-900 shadow-[0_0_70px_rgba(34,211,238,0.25)]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-24 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-5">

          <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Passionate React Developer focused on creating modern and
                visually engaging digital experiences.
              </p>

              <p>
                Skilled in React, Tailwind CSS, Framer Motion, and MERN Stack
                technologies.
              </p>

              <p>
                I enjoy building clean, responsive, and eye-catching interfaces.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">

              {[
                {
                  title: 'Location',
                  info: 'Pokhara, Nepal',
                  icon: Layers3,
                },
                {
                  title: 'Education',
                  info: 'BE Electronics',
                  icon: Award,
                },
                {
                  title: 'Role',
                  info: 'Full Stack Dev',
                  icon: Briefcase,
                },
                {
                  title: 'Focus',
                  info: 'UI/UX Design',
                  icon: Sparkles,
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -6,
                    }}
                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]"
                  >
                    <Icon className="w-6 h-6 text-cyan-300 mb-4" />

                    <p className="text-xs uppercase tracking-[3px] text-cyan-300">
                      {item.title}
                    </p>

                    <p className="text-base font-semibold mt-2">
                      {item.info}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="py-24 bg-white/[0.02]"
      >
        <div className="max-w-6xl mx-auto px-5">

          <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Skills
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: 'Frontend',
                icon: Code,
                skills: [
                  'React',
                  'Tailwind',
                  'JavaScript',
                  'Framer Motion',
                  'HTML/CSS',
                ],
              },
              {
                title: 'Backend',
                icon: Briefcase,
                skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
              },
              {
                title: 'Other',
                icon: Award,
                skills: ['Git', 'Arduino', 'Electronics', 'Figma'],
              },
            ].map((group, i) => {
              const Icon = group.icon;

              return (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -8,
                  }}
                  className="p-6 rounded-3xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>

                    <h3 className="text-2xl font-bold">
                      {group.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-5">

          <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {[
              {
                title: 'Employment Management System',
                desc: 'Modern React employee management platform.',
                img: '/photos/projects/ems3.png',
                github:
                  'https://github.com/Binod-Sharma7/Employment-management-system-reactJS',
                tech: ['React', 'Tailwind'],
              },
              {
                title: 'Task Manager Dashboard',
                desc: 'Advanced MERN stack task management dashboard.',
                img: '/photos/projects/task.jpeg',
                github:
                  'https://github.com/Binod-Sharma7/backend1-taskmanager',
                tech: ['MERN', 'MongoDB'],
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -10,
                }}
                className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]"
              >

                <div className="overflow-hidden h-60">
                  <motion.img
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <motion.a
                      whileHover={{
                        scale: 1.03,
                      }}
                      href={project.github}
                      target="_blank"
                      className="flex-1 py-3 rounded-2xl border border-white/10 flex items-center justify-center gap-2 text-sm"
                    >
                      <GitBranch className="w-4 h-4" />
                      Code
                    </motion.a>

                    <motion.a
                      whileHover={{
                        scale: 1.03,
                      }}
                      href="#"
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold flex items-center justify-center gap-2 text-sm"
                    >
                      Live Demo
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section
        id="achievements"
        className="py-24 bg-white/[0.02]"
      >
        <div className="max-w-5xl mx-auto px-5 text-center">

          <h2 className="text-4xl font-black mb-14 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Achievements
          </h2>

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="p-14 rounded-3xl border border-dashed border-white/10 bg-white/[0.03]"
          >
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
            >
              <Award className="w-20 h-20 mx-auto text-amber-400 mb-6" />
            </motion.div>

            <h3 className="text-3xl font-bold">
              More Coming Soon...
            </h3>

            <p className="text-slate-400 mt-4">
              Building impactful projects and continuously learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24"
      >
        <div className="max-w-4xl mx-auto px-5">

          <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>

          <form
            onSubmit={handleFormSubmit}
            className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] space-y-6"
          >

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="Your Name"
              required
              className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              placeholder="Your Email"
              required
              className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

            <textarea
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              placeholder="Your Message"
              required
              className="w-full bg-slate-900 border border-white/10 rounded-3xl px-5 py-4 outline-none resize-none focus:border-cyan-400"
            />

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>

            {submitStatus === 'success' && (
              <p className="text-green-400 text-center">
                ✅ Message Sent Successfully
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="text-red-400 text-center">
                ❌ Failed To Send Message
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/5 text-center text-slate-500 text-sm">
        © 2026 Binod Sharma • Built with React + Tailwind + Framer Motion
      </footer>
    </div>
  );
};

export default App;