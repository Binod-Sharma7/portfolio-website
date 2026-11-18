import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {
  Cpu, Github, Instagram, Facebook, Linkedin, Award, Briefcase, Code,
  Mail, Download, ExternalLink, GitBranch, Menu, X, Sparkles, MapPin,
  GraduationCap, Target, ArrowUp, MoreHorizontal, CircuitBoard, Copy, Check,
} from 'lucide-react';
import emailjs from '@emailjs/browser';


const C = {
  dark: '#101820',
  cream: '#F4F1EA',
  muted: '#AAB4BD',
  gold: '#D6A96C',
  card: '#243746',
};

const EMAIL = 'sharmabinod9844976377@gmail.com'; 

const navLinks = [
  { id: 'intro', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const stats = [
  { value: 4, suffix: '+', label: 'Projects built' },
  { value: 2, suffix: '', label: 'Realtime IoT systems' },
  { value: 10, suffix: '+', label: 'Technologies used' },
  { value: 100, suffix: '%', label: 'Curiosity' },
];

const skillGroups = [
  {
    title: 'Frontend', icon: Code,
    skills: [['React', 85], ['Tailwind CSS', 90], ['JavaScript', 85], ['Framer Motion', 75]],
  },
  {
    title: 'Backend', icon: Briefcase,
    skills: [['Node.js / Express', 75], ['MongoDB', 70], ['Firebase', 85], ['REST APIs', 80]],
  },
  {
    title: 'Embedded & IoT', icon: CircuitBoard,
    skills: [['ESP32 / Arduino', 90], ['Embedded C/C++', 85], ['Sensor interfacing', 88], ['Realtime monitoring', 85]],
  },
];

const projects = [
  {
    title: 'Driver Drowsiness Detection System',
    cat: 'Embedded',
    desc: 'Smart driver monitoring system built with ESP32, eye blink sensors, IR sensors and Firebase Realtime Database, with a React dashboard showing realtime alerts and hazard detection.',
    img: '/photos/projects/drowsiness.jpeg',
    github: 'https://github.com/Binod-Sharma7/driver_drowsy_detection_project',
    tech: ['ESP32', 'React', 'Firebase', 'Arduino', 'Tailwind', 'Embedded C++'],
    webdemo: 'https://driver-drowsy-detection-project.vercel.app/',
    more: 'https://www.linkedin.com/posts/binod-sharma-7869463a3_driverdrowsinessdetection-embeddedsystems-ugcPost-7460712338065641473-mbbZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGLqzNYB0G43Xq8l22pt0pZsGdOXLu7XBeY',
  },
  {
    title: 'Smart Door Lock System',
    cat: 'Embedded',
    desc: 'Password-based door lock using a 4x4 keypad, I2C LCD, servo motor, buzzer and LED. Shows masked input, verifies in real time and sounds an alert after wrong attempts.',
    img: '/photos/projects/sdl.png',
    github: 'https://github.com/Binod-Sharma7/smart-door-lock-system',
    tech: ['ESP32 / Arduino', '4x4 Keypad', 'I2C LCD', 'Servo Motor', 'Embedded C++'],
    webdemo: 'https://go.screenpal.com/watch/cOhYbBntp3L',
  },
  {
    title: 'Employment Management System',
    cat: 'Web',
    desc: 'Modern React employee management platform.',
    img: '/photos/projects/ems3.png',
    github: 'https://github.com/Binod-Sharma7/Employment-management-system-reactJS',
    tech: ['React', 'Tailwind'],
  },
  {
    title: 'Task Manager Dashboard',
    cat: 'Web',
    desc: 'Advanced MERN stack task management dashboard.',
    img: '/photos/projects/task.jpeg',
    github: 'https://github.com/Binod-Sharma7/backend1-taskmanager',
    tech: ['MERN', 'MongoDB'],
  },
];

const journey = [
  { title: 'Electronics & Communication Engineering', text: 'Built the base in circuits, signals and embedded hardware.' },
  { title: 'First ESP32 and Arduino builds', text: 'Learned sensor interfacing and firmware in Embedded C++.' },
  { title: 'Full stack web development', text: 'Picked up React, Node.js and Firebase to build dashboards.' },
  { title: 'Hardware meets software', text: 'Shipped realtime systems that connect sensors to live web apps.' },
];


const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Counter = ({ value, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(value / 40));
    const t = setInterval(() => {
      cur += step;
      if (cur >= value) { cur = value; clearInterval(t); }
      setN(cur);
    }, 35);
    return () => clearInterval(t);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
};

const SectionTitle = ({ title, sub, light }) => (
  <div className="text-center mb-14">
    <h2 className="text-4xl md:text-5xl font-black" style={{ color: light ? C.dark : C.cream }}>
      {title}
    </h2>
    <div className="mx-auto mt-4 h-[3px] w-16 rounded-full" style={{ background: C.gold }} />
    {sub && <p className="mt-4 max-w-xl mx-auto" style={{ color: light ? '#4a5560' : C.muted }}>{sub}</p>}
  </div>
);

const goldBtn = 'px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-shadow hover:shadow-[0_0_30px_rgba(214,169,108,0.45)]';

const App = () => {
  const phrases = useMemo(() => [
    'Embedded Systems Developer',
    'ESP32 & IoT Enthusiast',
    'Full Stack & React Developer',
    'Building Smart Realtime Systems',
    'Electronics Engineer',
    'Hardware + Software Integration',
  ], []);

  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  
  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let next;
    const t = setTimeout(() => {
      if (textIndex < phrase.length) {
        setTypedText(phrase.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      } else {
        next = setTimeout(() => {
          setPhraseIndex((p) => (p + 1) % phrases.length);
          setTextIndex(0);
          setTypedText('');
        }, 1600);
      }
    }, 70);
    return () => { clearTimeout(t); clearTimeout(next); };
  }, [phraseIndex, textIndex, phrases]);

  
  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY + 120;
      let current = 'intro';
      navLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offset) current = id;
      });
      setActiveSection(current);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked */ }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await emailjs.send(
        'service_x4dpdti',
        'template_pf40izc',
        { ...formData, time: new Date().toLocaleString() },
        'EUfd2WKFqyZwehm50'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleProjects = projects.filter((p) => filter === 'All' || p.cat === filter);
  const inputCls =
    'w-full rounded-2xl px-5 py-4 outline-none text-[#F4F1EA] placeholder:text-[#AAB4BD]/60 border border-white/10 focus:border-[#D6A96C] transition-colors';

  return (
    <div className="relative overflow-x-hidden" style={{ background: C.dark, color: C.cream }}>
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden md:block"
        style={{
          background: `radial-gradient(420px circle at ${mouse.x}px ${mouse.y}px, rgba(214,169,108,0.08), transparent 70%)`,
        }}
      />

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] w-full z-[999]"
        style={{ scaleX, transformOrigin: 'left', background: C.gold }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/5" style={{ background: `${C.dark}e6` }}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="#intro" className="flex items-center gap-3 select-none">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.08 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xl"
              style={{ background: C.gold, color: C.dark, boxShadow: '0 0 30px rgba(214,169,108,0.35)' }}
            >
              B
            </motion.div>
            <span className="text-xl font-black tracking-tight" style={{ color: C.cream }}>
              Binod Sharma
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="relative px-5 py-2.5 rounded-full text-sm transition-colors"
                style={{ color: activeSection === l.id ? C.gold : C.muted }}
              >
                {activeSection === l.id && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(214,169,108,0.12)' }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden" aria-label="Open menu">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24 }}
              className="fixed top-0 right-0 h-screen w-[72%] z-[70] p-7 border-l border-white/10"
              style={{ background: C.dark }}
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                  <X className="w-7 h-7" />
                </button>
              </div>
              <div className="flex flex-col gap-5">
                {navLinks.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="border-b border-white/10 pb-4"
                    style={{ color: activeSection === l.id ? C.gold : C.muted }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO */}
<section id="intro" className="relative min-h-screen flex items-center pt-28 pb-16" style={{ background: C.dark }}>
  <div className="relative z-10 max-w-6xl mx-auto px-5 w-full grid lg:grid-cols-2 gap-14 items-center">

    {/* LEFT: text column */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: 'rgba(214,169,108,0.35)', background: 'rgba(214,169,108,0.08)' }}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: C.gold }} />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: C.gold }} />
        </span>
        <span className="text-sm" style={{ color: C.gold }}>Open to work</span>
      </div>

      {/* Greeting + Name */}
      <p className="mt-8 text-lg md:text-xl" style={{ color: C.muted }}>Hi, I'm</p>
      <h1 className="mt-1 text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight" style={{ color: C.cream }}>
        Binod Sharma
      </h1>

      {/* Role (typewriter) */}
      <div className="mt-4 min-h-[2.5rem] md:min-h-[3rem]">
        <span className="text-xl sm:text-2xl md:text-3xl font-medium" style={{ color: C.gold }}>{typedText}</span>
        <span className="inline-block w-[3px] h-6 md:h-7 ml-1 animate-pulse align-middle" style={{ background: C.gold }} />
      </div>

      {/* Divider */}
      <div className="mt-6 h-[3px] w-16 rounded-full" style={{ background: C.gold }} />

      {/* Description */}
      <p className="mt-6 text-base md:text-lg leading-relaxed max-w-lg" style={{ color: C.muted }}>
        Electronics and Communication Engineering student passionate about Embedded Systems, IoT and
        Full Stack Development. I build realtime smart systems with ESP32, Arduino, sensors, Firebase and React.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <motion.a
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
          href="#contact"
          className={`${goldBtn} sm:min-w-[180px]`}
          style={{ background: C.gold, color: C.dark }}
        >
          Contact me <Mail className="w-4 h-4" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
          href="/photos/cv/Binod_Sharma_CV.pdf" download
          className={`${goldBtn} border sm:min-w-[180px]`}
          style={{ borderColor: C.gold, color: C.gold }}
        >
          <Download className="w-4 h-4" /> Download CV
        </motion.a>
      </div>
    </motion.div>

    {/* RIGHT: photo */}
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-center lg:justify-end order-1 lg:order-2"
    >
      <div className="relative m-8">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute -inset-6 rounded-full border border-dashed" style={{ borderColor: 'rgba(214,169,108,0.35)' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="absolute -inset-12 rounded-full border" style={{ borderColor: 'rgba(244,241,234,0.08)' }} />
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -left-5 top-10 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.card, border: '1px solid rgba(214,169,108,0.3)' }}>
          <Code className="w-5 h-5" style={{ color: C.gold }} />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -right-5 bottom-12 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.card, border: '1px solid rgba(214,169,108,0.3)' }}>
          <Cpu className="w-5 h-5" style={{ color: C.gold }} />
        </motion.div>
        <img
          src="/photos/pp/20260315_213247.jpg.jpeg"
          alt="Binod Sharma"
          className="w-60 h-60 sm:w-72 sm:h-72 md:w-[340px] md:h-[340px] rounded-full object-cover"
          style={{ border: `8px solid ${C.card}`, boxShadow: '0 0 70px rgba(214,169,108,0.2)' }}
        />
      </div>
    </motion.div>
  </div>
</section>
      
     <section id="about" className="relative z-10 py-24 border-t border-white/5" style={{ background: C.dark }}>
  <div className="max-w-6xl mx-auto px-5">
    <SectionTitle title="About me" />

    <div className="grid lg:grid-cols-12 gap-12">
      <Reveal className="lg:col-span-7 space-y-5 leading-relaxed" >
        <p style={{ color: C.muted }}>
          I'm an Electronics and Communication Engineering student with hands-on experience in Embedded
          Systems, IoT and Full Stack Development.
        </p>
        <p style={{ color: C.muted }}>
          I build realtime monitoring systems with ESP32, Arduino, IR sensors, eye blink sensors, Firebase
          Realtime Database and React dashboards.
        </p>
        <p style={{ color: C.muted }}>
          My strength is the bridge between hardware and software: sensor interfacing, realtime data
          visualization and responsive UI.
        </p>

        <h3 className="pt-6 text-xl font-bold" style={{ color: C.cream }}>My journey</h3>
        <ol className="relative border-l-2 ml-2 space-y-6 pt-2" style={{ borderColor: C.gold }}>
          {journey.map((j) => (
            <li key={j.title} className="pl-6 relative">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2" style={{ background: C.dark, borderColor: C.gold }} />
              <p className="font-semibold" style={{ color: C.cream }}>{j.title}</p>
              <p className="text-sm" style={{ color: C.muted }}>{j.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="lg:col-span-5 grid grid-cols-2 gap-4 content-start">
        {[
          { title: 'Location', info: 'Pokhara, Nepal', icon: MapPin },
          { title: 'Education', info: 'BE Electronics', icon: GraduationCap },
          { title: 'Role', info: 'Embedded & Full Stack Dev', icon: Briefcase },
          { title: 'Focus', info: 'IoT & Smart Systems', icon: Target },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -6 }}
              className="p-5 rounded-2xl border border-white/5"
              style={{ background: C.card, color: C.cream }}
            >
              <Icon className="w-6 h-6 mb-4" style={{ color: C.gold }} />
              <p className="text-sm" style={{ color: C.muted }}>{item.title}</p>
              <p className="font-semibold mt-1">{item.info}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
</section>
      {/* SKILLS */}
      <section id="skills" className="relative z-10 py-24" style={{ background: C.dark }}>
        <div className="max-w-6xl mx-auto px-5">
          <SectionTitle title="Skills" sub="Tools I use to take an idea from circuit board to live dashboard." />
          <div className="grid md:grid-cols-3 gap-6">
            {skillGroups.map((g, gi) => {
              const Icon = g.icon;
              return (
                <Reveal key={g.title} delay={gi * 0.1}>
                  <div className="h-full p-6 rounded-3xl border border-white/5" style={{ background: C.card }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(214,169,108,0.15)' }}>
                        <Icon className="w-6 h-6" style={{ color: C.gold }} />
                      </div>
                      <h3 className="text-2xl font-bold" style={{ color: C.cream }}>{g.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {g.skills.map(([name, level]) => (
                        <div key={name}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span style={{ color: C.cream }}>{name}</span>
                            <span style={{ color: C.muted }}>{level}%</span>
                          </div>
                          <div className="h-2 rounded-full" style={{ background: C.dark }}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className="h-full rounded-full"
                              style={{ background: C.gold }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 py-24 border-t border-white/5" style={{ background: C.dark }}>
        <div className="max-w-6xl mx-auto px-5">
          <SectionTitle title="Projects" sub="Hardware, firmware and web apps I've built." />

          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {['All', 'Embedded', 'Web'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-colors"
                style={
                  filter === f
                    ? { background: C.gold, color: C.dark }
                    : { background: C.card, color: C.muted }
                }
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="grid lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((p) => (
                <motion.div
                  layout
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -8 }}
                  className="rounded-3xl overflow-hidden border border-white/5 flex flex-col"
                  style={{ background: C.card }}
                >
                  <div className="overflow-hidden h-60 relative">
                    <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} src={p.img} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: C.gold, color: C.dark }}>
                      {p.cat}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(214,169,108,0.12)', color: C.gold, border: '1px solid rgba(214,169,108,0.3)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: C.cream }}>{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: C.muted }}>{p.desc}</p>

                    <div className="flex gap-3 mt-6">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-2xl border flex items-center justify-center gap-2 text-sm hover:bg-white/5 transition-colors" style={{ borderColor: 'rgba(244,241,234,0.2)', color: C.cream }}>
                          <GitBranch className="w-4 h-4" /> Code
                        </a>
                      )}
                      {p.more && (
                        <a href={p.more} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-2xl border flex items-center justify-center gap-2 text-sm hover:bg-white/5 transition-colors" style={{ borderColor: 'rgba(244,241,234,0.2)', color: C.cream }}>
                          <MoreHorizontal className="w-4 h-4" /> More
                        </a>
                      )}
                      {p.webdemo && (
                        <a href={p.webdemo} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold hover:shadow-[0_0_25px_rgba(214,169,108,0.4)] transition-shadow" style={{ background: C.gold, color: C.dark }}>
                          Live demo <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="relative z-10 py-24" style={{ background: C.card }}>
        <div className="max-w-5xl mx-auto px-5 text-center">
          <SectionTitle title="Achievements" />
          <Reveal>
            <motion.div whileHover={{ scale: 1.02 }} className="p-12 rounded-3xl border border-dashed" style={{ borderColor: 'rgba(214,169,108,0.5)', background: C.dark }}>
              <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                <Award className="w-20 h-20 mx-auto mb-6" style={{ color: C.gold }} />
              </motion.div>
              <h3 className="text-3xl font-bold" style={{ color: C.cream }}>Driver Drowsiness Detection System completed</h3>
              <p className="mt-4" style={{ color: C.muted }}>
                Built a realtime embedded monitoring system that links ESP32, sensors, Firebase and a React dashboard.
              </p>
              <p className="mt-4" style={{ color: C.muted }}>Building impactful projects and learning something new every week.</p>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 py-24" style={{ background: C.dark }}>
        <div className="max-w-4xl mx-auto px-5">
          <SectionTitle title="Let's connect" sub="Have a project, an internship or an idea? Send me a message." />

          <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
            {[
              { Icon: Github, href: 'https://github.com/Binod-Sharma7', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/binod-sharma-7869463a3', label: 'LinkedIn' },
              { Icon: Instagram, href: 'https://www.instagram.com/b_nod007', label: 'Instagram' },
              { Icon: Facebook, href: 'https://www.facebook.com/dangerboy.binod.9', label: 'Facebook' },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                whileHover={{ y: -5, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 hover:border-[#D6A96C] transition-colors"
                style={{ background: C.card }}
              >
                <Icon className="w-6 h-6" style={{ color: C.cream }} />
              </motion.a>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <button onClick={copyEmail} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(214,169,108,0.4)', color: C.gold }}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Email copied' : EMAIL}
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="p-8 rounded-3xl border border-white/5 space-y-6" style={{ background: C.card }}>
            <input type="text" required placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} style={{ background: C.dark }} />
            <input type="email" required placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} style={{ background: C.dark }} />
            <textarea rows={5} required placeholder="Your message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputCls} resize-none`} style={{ background: C.dark }} />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl font-bold disabled:opacity-60 hover:shadow-[0_0_30px_rgba(214,169,108,0.4)] transition-shadow"
              style={{ background: C.gold, color: C.dark }}
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </motion.button>

            {submitStatus === 'success' && <p className="text-center font-medium text-emerald-400">Message sent. I'll reply soon.</p>}
            {submitStatus === 'error' && <p className="text-center font-medium text-red-400">Message not sent. Check your connection and try again.</p>}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 border-t border-white/5 text-center text-sm" style={{ background: C.dark, color: C.muted }}>
        © 2026 Binod Sharma • Built with React + Tailwind + Framer Motion
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#intro"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: C.gold, color: C.dark }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;