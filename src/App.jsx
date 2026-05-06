import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Briefcase, Code, Mail, Star } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { p } from 'framer-motion/client';

const App = () => {
  const phrases = useMemo(
    () => ['I build sharp digital experiences', 'React Developer', 'Electronics Engineer'],
    []
  );

  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (textIndex < currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      } else {
        const pause = setTimeout(() => {
          setPhraseIndex((phraseIndex + 1) % phrases.length);
          setTextIndex(0);
          setTypedText('');
        }, 1400);

        return () => clearTimeout(pause);
      }
    }, 80);

    return () => clearTimeout(timeout);
  }, [phraseIndex, textIndex, phrases]);

  useEffect(() => {
    const sections = ['intro', 'about', 'skills', 'projects', 'achievements', 'contact'];
    const handleScroll = () => {
      const offset = window.scrollY + 160;
      let current = 'intro';
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= offset) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service_x4dpdti',
        'template_pf40izc',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'sharmabinod9844976377@gmail.com',
        },
        'EUfd2WKFqyZwehm50'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const navLinks = useMemo(
    () => [
      { id: 'intro', label: 'Introduction' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'achievements', label: 'Achievements' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-700/50 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Portfolio</p>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-black leading-none bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Binod Sharma
                </h1>
              </div>
              <div className="hidden sm:flex items-end gap-2">
                <motion.span
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-7 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"
                />
                <motion.span
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  className="w-1.5 h-7 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"
                />
                <motion.span
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="w-1.5 h-7 rounded-full bg-gradient-to-b from-pink-500 to-cyan-400"
                />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-wrap justify-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`rounded-full px-4 py-2 text-sm transition ${activeSection === link.id
                      ? 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-300'
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                <span className={`block h-0.5 w-5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block h-0.5 w-5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
              </div>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden mt-4"
          >
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-700/50">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-full px-4 py-3 text-sm text-center transition ${activeSection === link.id
                      ? 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-300'
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="intro" className="min-h-screen relative overflow-hidden pt-24 sm:pt-28 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_30%),#020617]">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 18, 0], y: [0, -18, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-10 top-20 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -18, 0], y: [0, 22, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-10 top-32 w-56 h-56 rounded-full bg-violet-500/10 blur-3xl"
          />
          <motion.span
            animate={{ rotate: [0, 360], scale: [1, 1.02, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/4 -translate-x-1/2 block h-72 w-72 rounded-full border border-cyan-500/10"
          />
          <motion.span
            animate={{ x: [0, 10, 0], y: [0, -10, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="absolute right-8 top-48 h-3 w-3 rounded-full bg-slate-300/70"
          />
          <motion.span
            animate={{ x: [0, -10, 0], y: [0, 12, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="absolute right-16 top-64 h-2 w-2 rounded-full bg-cyan-400/60"
          />
          <motion.span
            animate={{ x: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute right-24 top-32 h-2.5 w-2.5 rounded-full bg-purple-400/70"
          />
        </div>

        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-8 lg:gap-12 items-center">
            <div className="relative z-10 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-3 sm:gap-4 rounded-full border border-slate-700/80 bg-slate-950/70 px-4 sm:px-5 py-2 sm:py-3 shadow-lg shadow-slate-950/20"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-cyan-300">Hello</span>
                <span className="text-sm text-slate-300 hidden sm:inline">I build sharp digital experiences</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-6 sm:mt-10 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[0.95] text-white"
              >
                Hi, <br />
                <div className="pl-6 sm:pl-10 md:pl-20">
                  I'm{' '}
                  <motion.span
                    className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    Binod Sharma
                  </motion.span>
                </div>
              </motion.h1>

              <div className="mt-6 sm:mt-8 inline-flex flex-col gap-3">
                <div className="inline-flex items-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg font-medium text-slate-200">
                  <span className="min-h-[1.4rem] sm:min-h-[1.6rem]">{typedText}</span>
                  <span className="h-5 w-1 sm:h-6 sm:w-1 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3 mt-4 sm:mt-6">
                  <div className="rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-950/70 px-3 sm:px-4 py-3 sm:py-4 text-center">
                    <p className="text-lg sm:text-2xl font-semibold text-white">3+</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mt-1 sm:mt-2">Projects</p>
                  </div>
                  <div className="rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-950/70 px-3 sm:px-4 py-3 sm:py-4 text-center">
                    <p className="text-lg sm:text-2xl font-semibold text-white">Electronics</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mt-1 sm:mt-2">Engineer</p>
                  </div>
                  <div className="rounded-2xl sm:rounded-3xl border border-slate-700/70 px-3 sm:px-4 py-3 sm:py-4 text-center">
                    <p className="text-lg sm:text-2xl font-semibold text-white">React</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mt-1 sm:mt-2">Developer</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 sm:px-8 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.25)] transition-transform duration-300"
                >
                  <Mail className="h-4 w-4" /> Contact
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="/photos/cv/Binod_Sharma_CV.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-6 sm:px-8 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 duration-300"
                >
                  Download CV
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-6 sm:px-8 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 duration-300"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="relative flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-cyan-400/10 shadow-[0_0_60px_rgba(34,211,238,0.25)]"
              />
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 sm:inset-6 rounded-full border border-cyan-400/20"
              />
              <motion.img
                whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
                transition={{ type: 'spring', stiffness: 260 }}
                src="/photos/pp/20260315_213247.jpg.jpeg"
                alt="Binod Sharma"
                className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full object-cover border-4 border-slate-800 shadow-2xl shadow-cyan-500/25"
              />
              <motion.span
                animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 sm:-top-4 right-4 sm:right-6 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              />
              <motion.span
                animate={{ y: [0, 10, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.35)]"
              />
              <motion.span
                animate={{ x: [0, 8, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute top-8 sm:top-10 right-12 sm:right-14 h-2.5 w-2.5 rounded-full bg-slate-300/80 shadow-[0_0_16px_rgba(148,163,184,0.35)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-5xl"
        >
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80 mb-3">Who am I</p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>
          </div>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-4 sm:space-y-6 text-slate-300">
              <p className="text-base sm:text-lg leading-relaxed">
                I am a passionate Electronics Engineer and React developer who creates elegant, user-focused digital experiences. I enjoy building interfaces that feel intuitive, polished, and reliable across devices.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                I am an aspiring frontend developer who is actively learning and working on real-world projects. I focus on building clean, responsive interfaces and gradually expanding my knowledge in backend technologies and overall web development.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                I am currently focused on building modern web applications using React, Tailwind, and Node.js with clean, maintainable code and thoughtful animation.
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                { label: 'Location', value: 'Nepal' },
                { label: 'Education', value: 'BE in Electronics and CIT' },
                { label: 'Role', value: 'Full Stack Developer' },
                { label: 'Goal', value: 'Craft premium web experiences' },
              ].map((card) => (
                <div key={card.label} className="rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-950/70 p-4 sm:p-5 shadow-lg">
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">{card.label}</p>
                  <p className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold text-white">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen bg-gray-900 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-6xl"
        >
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-green-300/80 mb-3">What I do</p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              Skills
            </motion.h2>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Frontend',
                icon: Code,
                skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'],
                color: 'cyan',
              },
              {
                title: 'Backend',
                icon: Briefcase,
                skills: ['Node.js', 'Express', 'Mongoose', 'REST APIs'],
                color: 'blue',
              },
              {
                title: 'Database',
                icon: Award,
                skills: ['MongoDB', 'SQL', 'Firebase'],
                color: 'purple',
              },
            ].map((group) => {
              const Icon = group.icon;
              return (
                <motion.div whileHover={{ y: -6 }} key={group.title} className="rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-950/70 p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${group.color}-400`} />
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className={`rounded-full border border-${group.color}-400/30 bg-${group.color}-500/10 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-${group.color}-300 transition`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen bg-gray-900 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-6xl"
        >
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-orange-300/80 mb-3">Recent work</p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent"
            >
              Projects
            </motion.h2>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Employment Management System',
                description: 'A polished React app for managing employee data with a sleek UI and smooth interactions.',
                image: '/photos/projects/ems3.png',
                stack: ['React', 'Tailwind', 'Vite'],
                github: 'https://github.com/Binod-Sharma7/Employment-management-system-reactJS',
                live: '#projects',
              },
              {
                title: 'Task-Manager',
                description: 'Admin dashboard for task management with React, Node.js, and MongoDB, featuring a clean UI and efficient CRUD operations.',
                image: '/photos/projects/task.jpeg',
                stack: ['React', 'Node.js', 'MongoDB'],
                github: 'https://github.com/Binod-Sharma7/backend1-taskmanager',
                live: '#projects',
              },

            ].map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -10 }}
                className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-950/70 shadow-xl transition-all duration-300"
              >
                <img src={project.image} alt={project.title} className="h-40 sm:h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-slate-300">{project.description}</p>
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-slate-700/70 bg-slate-900/80 px-2 sm:px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <a href={project.github} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
                      GitHub <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                    <a href={project.live} className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                      Live Demo <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-6xl"
        >
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-yellow-300/80 mb-3">Recognition</p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
            >
              Achievements
            </motion.h2>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {[
              // {
              //   title: 'Startup Pitch Winner',
              //   description: 'Presented a prototype smart device dashboard to investors.',
              //   date: 'March 2024',
              //   image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
              // },
              {
                text: 'comingsoon',
              },
            ].map((achievement) => (
              <motion.div
                key={achievement.title}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-950/70 shadow-xl"
              >
                <img src={achievement.image} alt={achievement.title} className="h-40 sm:h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{achievement.date}</span>
                    <span className="rounded-full bg-slate-800 px-2 sm:px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">Achievement</span>
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-lg sm:text-2xl font-semibold text-white">{achievement.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-slate-300">{achievement.description}</p>
                  <p className="mt-3 sm:mt-4 text-lg sm:text-2xl font-semibold text-white">{achievement.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-6xl"
        >
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-pink-300/80 mb-3">Let's connect</p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
            >
              Contact Me
            </motion.h2>
          </div>
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-2">
            <div className="space-y-4 sm:space-y-6 rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-950/70 p-6 sm:p-8 shadow-lg">
              <p className="text-base sm:text-lg text-slate-300">Reach out via email or connect on social.</p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-900/80 px-3 sm:px-4 py-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="text-sm sm:text-white">sharmabinod9844976377@gmail.com</p>
                  </div>
                </div>
                <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                  {[
                    { name: 'GitHub', url: 'https://github.com/Binod-Sharma7' },
                    { name: 'Instagram', url: 'https://www.instagram.com/b_nod007/' },
                    { name: 'Facebook', url: 'https://www.facebook.com/dangerboy.binod.9/' },
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/binod-sharma-9844976377' },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="flex items-center gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-900/80 px-3 sm:px-4 py-3 transition hover:border-cyan-400 hover:bg-slate-950"
                    >
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                      <span className="text-sm text-slate-200">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <form className="space-y-4 sm:space-y-5 rounded-2xl sm:rounded-3xl border border-slate-700/70 bg-slate-950/70 p-6 sm:p-8 shadow-lg" onSubmit={handleFormSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
                  placeholder="Write a message"
                  rows={4}
                  required
                />
              </div>
              {submitStatus === 'success' && (
                <div className="rounded-2xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-300 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="rounded-2xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-300 text-sm">
                  Failed to send message. Please try again or contact me directly.
                </div>
              )}
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.25)] transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default App;