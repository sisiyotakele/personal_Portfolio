"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Project = { title: string; type: string; description: string; tags: string[]; icon: string; url: string; accent: string };

const projects: Project[] = [
  { title: "BankruptcySense AI", type: "AI · MACHINE LEARNING", description: "A machine learning system that estimates a company's five-year bankruptcy risk from financial indicators, paired with an interactive dashboard and REST API.", tags: ["Python", "Random Forest", "React", "REST API"], icon: "◉", url: "https://github.com/sisiyotakele/BankruptcySense-AI", accent: "violet" },
  { title: "FaceAuth", type: "AI · SECURITY", description: "A passwordless biometric authentication concept with real-time facial recognition, system health monitoring, and an administrative insights dashboard.", tags: ["AI/ML", "Computer Vision", "React", "Security"], icon: "◈", url: "https://github.com/sisiyotakele", accent: "coral" },
  { title: "Smart Bus Transportation", type: "FULL-STACK · AI", description: "A transit platform for live bus locations, arrival estimates, incident reporting, and traffic analysis—connecting passengers, drivers, and operators.", tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.IO"], icon: "↗", url: "https://github.com/sisiyotakele/AI-BASED-SMART-BUS-TRANSPORTATION-SYSTEM-SBTS", accent: "mint" },
  { title: "Digital Identity Platform", type: "PRODUCT · FULL-STACK", description: "A digital business card platform for Ethiopian professionals, with QR and NFC sharing, analytics, lead capture, and print-ready profiles.", tags: ["Next.js", "TypeScript", "Supabase", "Vercel"], icon: "▤", url: "https://github.com/sisiyotakele/digital-identity-platform-", accent: "blue" },
  { title: "PanSave", type: "FINTECH · COMMUNITY", description: "A digital home for community savings circles, bringing transparent contributions, rotating payouts, microloan requests, and SMS updates together.", tags: ["Full-stack", "Payments", "SMS", "Fintech"], icon: "◎", url: "https://github.com/sisiyotakele/PanSave", accent: "gold" },
  { title: "Food Preservation", type: "IOT · FULL-STACK", description: "A real-time food storage monitoring and humidity-control application built to work with ESP32 hardware for an AASTU IETP project.", tags: ["ESP32", "IoT", "Web application", "Monitoring"], icon: "⌁", url: "https://github.com/sisiyotakele/Food_Preservation", accent: "mint" },
  { title: "AASTU Clearance Management", type: "FULL-STACK · CAMPUS", description: "A student clearance workflow with authentication, request tracking, multi-role approvals, and integrated data storage.", tags: ["Full-stack", "Authentication", "Workflow", "Database"], icon: "✳", url: "https://github.com/sisiyotakele/Clearance-managment", accent: "coral" },
];

const skills = ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python", "FastAPI", "Django", "Java", "PostgreSQL", "REST APIs", "AI / ML", "Computer Vision", "DevOps", "Mobile", "IoT"];
const categories = ["All", "AI / ML", "Full-stack", "Backend", "IoT"];
const profileFacts = [
  { keys: ["project", "work", "built", "portfolio"], answer: `Featured projects include ${projects.slice(0, 5).map((p) => p.title).join(", ")}. Ask me about any one of them.` },
  { keys: ["skill", "stack", "technology", "tech"], answer: `Sisiyo works across ${skills.join(", ")}. His projects span full-stack development, backend systems, AI/ML, and IoT.` },
  { keys: ["education", "university", "degree", "study"], answer: "Sisiyo is pursuing a BSc at Addis Ababa Science and Technology University (AASTU)." },
  { keys: ["experience", "intern", "a2sv", "training", "gdg"], answer: "Sisiyo shared that he trained with A2SV, completed AI/ML training through a Google Developer Group, and interned at the Ethiopian Artificial Intelligence Institute." },
  { keys: ["contact", "email", "reach", "linkedin", "github"], answer: "You can reach Sisiyo at sisiyotakele1@gmail.com, or visit github.com/sisiyotakele and linkedin.com/in/sisiyo-takele1/." },
  { keys: ["who", "about", "yourself", "sisiyo"], answer: "Sisiyo Takele is a software engineer interested in full-stack, backend, mobile, and AI/ML development. He enjoys turning practical problems into useful software." },
];
const testimonials = [
  { quote: "I’ve watched Sisiyo grow as a programmer. His strong fundamentals, logical approach, curiosity, and steady commitment to learning make him a promising developer with the potential to contribute meaningfully to technology.", person: "Henok Weldu", role: "Programming Instructor · Academic Mentor" },
  { quote: "Sisiyo is ambitious, committed to growth, and skilled at turning theory into practical solutions. His interest in software engineering and AI reflects a forward-looking mindset and a determination to keep improving.", person: "Tesfaye Jira", role: "University Advisor" },
  { quote: "Sisiyo understood the project requirements, communicated clearly, and approached challenges with professionalism. He translated our needs into practical solutions and stayed committed to delivering quality work.", person: "Adam Smith", role: "Upwork Client" },
  { quote: "During his internship, Sisiyo showed initiative, adaptability, and enthusiasm for backend development. He learned independently, collaborated well, and applied JavaScript, Node.js, PHP, Laravel, and database skills to practical work.", person: "Worku Abebe", role: "Internship Supervisor" },
  { quote: "Sisiyo was thoughtful, responsive, and attentive to our project goals. He handled challenges proactively and focused on delivering a useful, polished solution.", person: "Hana Demese", role: "Freelance Client" },
  { quote: "Sisiyo brings technical curiosity, problem-solving, and a collaborative spirit to the team. He takes ownership, shares ideas, and keeps learning across backend engineering and AI/ML.", person: "James White", role: "Team Leader" },
  { quote: "Sisiyo is curious, adaptable, and driven to solve real problems. He experiments, turns ideas into practical solutions, and shows strong promise in software engineering and AI.", person: "Niki Peter", role: "Startup Founder" },
];
const stackTools = [
  { name: "HTML5", icon: "html5", tone: "coral" }, { name: "CSS3", icon: "css3", tone: "blue" }, { name: "JavaScript", icon: "javascript", tone: "gold" }, { name: "TypeScript", icon: "typescript", tone: "blue" },
  { name: "React", icon: "react", tone: "react" }, { name: "Next.js", icon: "nextdotjs", tone: "next" }, { name: "Node.js", icon: "nodedotjs", tone: "green" }, { name: "Express.js", icon: "express", tone: "plain" },
  { name: "Python", icon: "python", tone: "python" }, { name: "Java", icon: "openjdk", tone: "java" }, { name: "Flask", icon: "flask", tone: "plain" }, { name: "PostgreSQL", icon: "postgresql", tone: "blue" },
  { name: "FastAPI", icon: "fastapi", tone: "mint" }, { name: "Django", icon: "django", tone: "green" }, { name: "MongoDB", icon: "mongodb", tone: "green" }, { name: "Redis", icon: "redis", tone: "coral" }, { name: "Firebase", icon: "firebase", tone: "gold" }, { name: "Supabase", icon: "supabase", tone: "green" }, { name: "Socket.IO", icon: "socketdotio", tone: "plain" },
  { name: "NumPy", icon: "numpy", tone: "blue" }, { name: "Pandas", icon: "pandas", tone: "violet" }, { name: "scikit-learn", icon: "scikitlearn", tone: "gold" }, { name: "PyTorch", icon: "pytorch", tone: "coral" }, { name: "OpenCV", icon: "opencv", tone: "coral" }, { name: "MediaPipe", icon: "google", tone: "blue" }, { name: "TensorFlow", icon: "tensorflow", tone: "gold" }, { name: "Docker", icon: "docker", tone: "blue" },
  { name: "Git", icon: "git", tone: "coral" }, { name: "GitHub", icon: "github", tone: "plain" }, { name: "Linux", icon: "linux", tone: "gold" }, { name: "Vercel", icon: "vercel", tone: "plain" }, { name: "Netlify", icon: "netlify", tone: "mint" }, { name: "Raspberry Pi", icon: "raspberrypi", tone: "coral" },
  { name: "Supabase Auth", icon: "supabase", tone: "green" }, { name: "REST API", icon: "swagger", tone: "green" }, { name: "AI / ML", icon: "scikitlearn", tone: "violet" }, { name: "Computer Vision", icon: "opencv", tone: "coral" },
  { name: "ESP32 · IoT", icon: "espressif", tone: "mint" }, { name: "Vite", icon: "vite", tone: "violet" }, { name: "Tailwind CSS", icon: "tailwindcss", tone: "blue" },
];
const stackLanes = [
  { label: "WEB & INTERFACES", names: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS"] },
  { label: "BACKEND & DATA", names: ["Node.js", "Express.js", "Python", "FastAPI", "Django", "Flask", "Java", "PostgreSQL", "MongoDB", "Redis", "Socket.IO", "REST API", "Supabase Auth"] },
  { label: "AI & COMPUTER VISION", names: ["NumPy", "Pandas", "scikit-learn", "PyTorch", "OpenCV", "MediaPipe", "TensorFlow", "AI / ML", "Computer Vision"] },
  { label: "CLOUD & CONNECTED", names: ["Git", "GitHub", "Linux", "Firebase", "Supabase", "Docker", "Vercel", "Netlify", "Raspberry Pi", "ESP32 · IoT"] },
].map((lane) => ({ ...lane, tools: lane.names.map((name) => stackTools.find((tool) => tool.name === name)!).filter(Boolean) }));

function CursorPortraitVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(2.5);
  const lastPointerX = useRef<number | null>(null);
  const seekFrame = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seekToTarget = () => {
      if (!video.duration || !Number.isFinite(video.duration) || video.seeking || video.readyState < 2) return;
      const nextTime = Math.min(video.duration - .025, Math.max(0, targetTime.current));
      if (Math.abs(video.currentTime - nextTime) > .025) video.currentTime = nextTime;
    };
    const scheduleSeek = () => {
      if (seekFrame.current !== null) return;
      seekFrame.current = requestAnimationFrame(() => {
        seekFrame.current = null;
        seekToTarget();
      });
    };
    const updateFromX = (clientX: number) => {
      lastPointerX.current = clientX;
      if (!video.duration || !Number.isFinite(video.duration)) return;
      const inset = 16;
      const ratio = Math.max(0, Math.min(1, (clientX - inset) / Math.max(1, window.innerWidth - inset * 2)));
      targetTime.current = ratio * Math.max(0, video.duration - .05);
      scheduleSeek();
    };
    const handlePointerMove = (event: PointerEvent) => updateFromX(event.clientX);
    const handleLoadedMetadata = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      const ratio = lastPointerX.current === null
        ? .5
        : Math.max(0, Math.min(1, lastPointerX.current / Math.max(1, window.innerWidth)));
      targetTime.current = ratio * Math.max(0, video.duration - .05);
      video.currentTime = targetTime.current;
    };
    const handleSeeked = () => {
      if (Math.abs(video.currentTime - targetTime.current) > .04) scheduleSeek();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      if (seekFrame.current !== null) cancelAnimationFrame(seekFrame.current);
    };
  }, []);

  return <div className="scene hero-video-scene"><video ref={videoRef} className="cursor-scrub-video" src="/media/sisiyo-cursor-portrait.mp4" muted playsInline preload="auto" aria-hidden="true"/><span className="visually-hidden">Move your cursor horizontally to turn Sisiyo’s animated portrait.</span></div>;
}

function SectionTitle({ eyebrow, title, italic }: { eyebrow: string; title: string; italic?: string }) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title} {italic && <em>{italic}</em>}</h2></div>;
}

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [light, setLight] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("about");
  const [testimonialDirection, setTestimonialDirection] = useState(1);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ from: "bot" | "visitor"; text: string }[]>([{ from: "bot", text: "Hi! Ask me about Sisiyo’s projects, skills, education, or experience." }]);
  const email = "sisiyotakele1@gmail.com";
  const [contactSending, setContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState("");
  const sendContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setContactSending(true);
    setContactStatus("");
    try {
      const fields = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      const result = await response.json();
      if (!response.ok || result.success === false) throw new Error("Message could not be sent");
      form.reset();
      setContactStatus("Thanks for reaching out. Your message has been sent.");
    } catch {
      setContactStatus(`Sorry, your message could not be sent. Email ${email} directly.`);
    } finally {
      setContactSending(false);
    }
  };
  const shownProjects = projects.filter((p) => filter === "All" || (filter === "AI / ML" && /AI|MACHINE|SECURITY/.test(p.type)) || (filter === "Full-stack" && /FULL-STACK/.test(p.type)) || (filter === "Backend" && /FULL-STACK|FINTECH/.test(p.type)) || (filter === "IoT" && /IOT/.test(p.type)));
  const testimonialGroups = Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, groupIndex) => testimonials.slice(groupIndex * 2, groupIndex * 2 + 2));
  const moveTestimonials = (direction: number) => setTestimonialDirection(direction);
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: "-25% 0px -65% 0px" });
    sections.forEach((s) => observer.observe(s)); return () => observer.disconnect();
  }, []);
  const sendChat = (event: FormEvent) => { event.preventDefault(); const question = chatInput.trim(); if (!question) return; const normalized = question.toLowerCase(); const fact = profileFacts.find((item) => item.keys.some((key) => normalized.includes(key))); const answer = fact?.answer ?? "I can answer questions about Sisiyo’s projects, technical stack, education, training, experience, and public contact links. Try asking about one of those."; setChatMessages((current) => [...current, { from: "visitor", text: question }, { from: "bot", text: answer }]); setChatInput(""); };
  return <main className={light ? "site light" : "site"}>
    <div className="grain" aria-hidden="true" />
    <header className="nav"><a className="brand" href="#home">Sisiyo<span>.</span></a><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? "×" : "☰"}</button><nav className={menu ? "nav-links open" : "nav-links"}>{[["about","About"],["stack","Stack"],["work","Work"],["journey","Journey"],["education","Education"],["testimonials","Testimonials"],["contact","Contact"]].map(([id,label]) => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}</nav><button className="theme-switch" onClick={() => setLight(!light)} aria-label="Toggle color theme"><span>{light ? "☀" : "☾"}</span><i /></button></header>
    <section className="hero" id="home"><div className="hero-copy"><div className="status-row"><span className="status"><i /> Open to meaningful opportunities</span><span className="location">✳ Addis Ababa, Ethiopia</span></div><p className="hero-kicker">ENGINEER · BUILDER · CURIOUS BY DEFAULT</p><h1>Sisiyo<br /><em>Takele.</em></h1><p className="hero-intro">I build thoughtful software across <strong>full-stack, backend, mobile, and AI.</strong> Turning ambitious ideas into useful, reliable products.</p><div className="role-chip">Software Engineer <span>·</span> AI / ML</div><div className="hero-actions"><a className="button light-button" href="#work">Explore my work <span>↗</span></a><a className="button dark-button" href="#contact">Let’s connect <span>↗</span></a></div><div className="hero-footnote"><span className="tiny-orbit">✳</span> Curious mind. Practical builder. Always learning.</div></div><div className="hero-art"><CursorPortraitVideo/><div className="video-cursor-hint"><i/> Move cursor to turn portrait</div></div><a className="scroll-cue" href="#about"><span /> SCROLL TO EXPLORE</a></section>
    <div className="ticker" aria-label="Areas of work"><div>{[...skills.slice(0, 10), ...skills.slice(0, 10)].map((s,i) => <span key={`${s}-${i}`}>{s}<b>✳</b></span>)}</div></div>
    <section className="section about-section" id="about"><div className="about-aside"><div className="number-card"><strong>06<span>+</span></strong><small>Featured builds</small></div><div className="number-card"><strong>04</strong><small>Ways to engineer</small></div><div className="number-card"><strong>∞</strong><small>Curiosity</small></div><div className="vertical-note">SOFTWARE WITH PURPOSE <span>✳</span></div></div><div className="about-main"><SectionTitle eyebrow="01 — A LITTLE ABOUT ME" title="Building with" italic="purpose."/><p className="lead">I’m <strong>Sisiyo Takele</strong>, a software engineer drawn to the space where strong engineering meets real-world needs.</p><p>My work spans full-stack and backend systems, mobile experiences, and AI/ML. I enjoy turning complex problems into clear products, from predictive tools and connected devices to services people can rely on every day.</p><p>I’m currently pursuing a BSc at <strong>Addis Ababa Science and Technology University (AASTU)</strong>. Along the way, I’ve trained with A2SV, completed AI/ML training through a Google Developer Group, and interned at the Ethiopian Artificial Intelligence Institute.</p><div className="tag-cloud">{["Software Engineering", "AI / Machine Learning", "Backend Systems", "Product Thinking", "Always Learning"].map((t) => <span key={t}>{t}</span>)}</div></div></section>
    <section className="section stack-section" id="stack"><SectionTitle eyebrow="02 — TOOLS I REACH FOR" title="Technologies I" italic="work with."/><p className="section-intro">A growing toolkit across web, backend, AI, computer vision, and connected products.</p><div className="stack-flow">{stackLanes.map((lane,index)=><div className={`stack-lane lane-${index+1}`} key={lane.label}><span className="lane-label">{String(index+1).padStart(2,"0")} <i/> {lane.label}</span><div className="stack-lane-window"><div className="stack-lane-track">{[...lane.tools,...lane.tools].map((tool,itemIndex)=><div className="stack-chip" key={`${lane.label}-${itemIndex}`} aria-hidden={itemIndex>=lane.tools.length}><span className={`stack-chip-icon ${tool.tone}`}><img src={`/stack-icons/${tool.icon}.svg`} alt="" onError={(event)=>{const icon=event.currentTarget;icon.parentElement?.setAttribute("data-fallback",tool.name==="Linux"?"🐧":tool.name==="Git"?"G":tool.name==="Django"?"Dj":tool.name.slice(0,2));icon.remove();}} /></span><span>{tool.name}</span></div>)}</div></div></div>)}</div><p className="stack-flow-note"><span/> Hover a lane to pause · {stackTools.length} tools in rotation</p></section>
    <section className="section work-section" id="work"><SectionTitle eyebrow="03 — SELECTED BUILDS" title="Projects with" italic="purpose."/><div className="work-heading-row"><p className="section-intro">A selection of products and experiments that turn technology into something useful.</p><span className="project-count">{String(shownProjects.length).padStart(2,"0")} <small>PROJECTS</small></span></div><div className="filters" role="group" aria-label="Filter projects">{categories.map((c)=><button className={filter===c?"selected":""} onClick={()=>setFilter(c)} key={c}>{c}</button>)}</div><div className="projects-grid">{shownProjects.map((p,i)=><article className={`project-card ${p.accent}`} key={p.title}><div className="project-card-head"><span>{p.type}</span><small>0{i+1}</small></div><div className="project-icon">{p.icon}</div><h3>{p.title}</h3><p>{p.description}</p><div className="project-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><a className="project-link" href={p.url} target="_blank" rel="noreferrer" aria-label={`Open ${p.title} project`}><span>View project</span><b>↗</b></a></article>)}</div><a className="github-link" href="https://github.com/sisiyotakele" target="_blank" rel="noreferrer">Explore all my work on GitHub <span>↗</span></a></section>
    <section className="section journey-section" id="journey"><div className="experience-heading"><span className="eyebrow">04 — PROFESSIONAL JOURNEY</span><h2>Experience<span>.</span></h2><p>Learning by building, one opportunity at a time.</p></div><div className="timeline">{[{date:"CURRENT",title:"BSc in Software Engineering",org:"Addis Ababa Science and Technology University",desc:"Undergraduate studies focused on the foundations of software and computing."},{date:"TRAINING",title:"A2SV Trainee",org:"Africa to Silicon Valley",desc:"Developing problem-solving and software engineering skills through an intensive training community."},{date:"AI / ML",title:"AI/ML Training Graduate",org:"Google Developer Group",desc:"Training in artificial intelligence and machine learning fundamentals."},{date:"INTERNSHIP",title:"AI/ML Intern",org:"Ethiopian Artificial Intelligence Institute",desc:"Contributing and learning in an applied artificial intelligence environment."}].map((item,i)=><article className="timeline-item" key={item.title}><div className="timeline-marker"><span>{String(i+1).padStart(2,"0")}</span></div><div className="timeline-date">{item.date}</div><div className="timeline-content"><div className="timeline-org">♧ <span>{item.org}</span></div><h3>{item.title}</h3><p>{item.desc}</p></div><span className="timeline-spark">&lt;/&gt;</span></article>)}</div></section>
    <section className="section education-section" id="education"><div><SectionTitle eyebrow="05 — FOUNDATIONS" title="Learning is a" italic="practice."/><p className="section-intro">Formal study, hands-on training, and the habit of staying curious all shape how I approach engineering.</p></div><div className="education-card"><span className="edu-icon">⌂</span><div><small>UNDERGRADUATE · IN PROGRESS</small><h3>Bachelor of Science</h3><p>Addis Ababa Science and Technology University</p><span className="edu-note">Software Engineering</span></div><span className="edu-arrow">↗</span></div><div className="learning-strip" aria-label="Training and development"><div className="learning-strip-track">{[0,1].map((copy)=><div className="learning-group" key={copy} aria-hidden="true"><span>TRAINING &amp; DEVELOPMENT</span><b>A2SV trainee</b><i>✳</i><b>AI/ML · Google Developer Group</b><i>✳</i><b>Applied AI · Internship</b><i>✳</i></div>)}</div></div></section>
    <section className="section testimonials-section" id="testimonials"><div className="testimonial-heading"><span className="eyebrow">06 — TESTIMONIALS</span><h2>What people <em>say</em></h2><p>Perspectives from mentors, clients, supervisors, and collaborators.</p></div><div className="testimonial-carousel"><div className="testimonial-viewport"><div className={`testimonial-track${testimonialPaused?" paused":""}${testimonialDirection<0?" reverse":""}`} aria-label="Testimonials, two visible at a time">{[...testimonialGroups,...testimonialGroups].map((group,groupIndex)=><div className="testimonial-pair" key={`pair-${groupIndex}`} aria-hidden={groupIndex>=testimonialGroups.length}>{group.map((item,index)=>{const itemIndex=(groupIndex%testimonialGroups.length)*2+index;return <article className="testimonial-pair-card" key={item.person}><div className="pair-card-top"><span aria-hidden="true">“</span><span>{String(itemIndex+1).padStart(2,"0")} / {String(testimonials.length).padStart(2,"0")}</span></div><blockquote>“{item.quote}”</blockquote><div className="testimonial-person"><span className={`testimonial-avatar avatar-${itemIndex%4}`}>{item.person.split(" ").map((part)=>part[0]).join("")}</span><div><b>{item.person}</b><small>{item.role}</small></div></div></article>;})}</div>)}</div></div><div className="testimonial-controls-row"><span className="pair-count">2 AT A TIME <i>·</i> {String(testimonials.length).padStart(2,"0")} TOTAL</span><button className="testimonial-autoplay" onClick={()=>setTestimonialPaused(!testimonialPaused)} aria-label={testimonialPaused?"Resume automatic testimonial movement":"Pause automatic testimonial movement"}>{testimonialPaused?"▶ Resume":"Ⅱ Pause"}</button><button className="testimonial-direction" onClick={()=>moveTestimonials(-1)} aria-label="Move testimonials from right to left">← <span>Reverse</span></button><button className="testimonial-direction next" onClick={()=>moveTestimonials(1)} aria-label="Move testimonials from left to right"><span>Forward</span> →</button></div></div></section>
    <section className="contact-section" id="contact"><div className="contact-heading"><span className="eyebrow">07 — CONTACT</span><h2>Let’s build <em>something.</em></h2></div><div className="contact-columns"><div className="contact-links"><span className="contact-label">REACH OUT VIA</span><a href={`mailto:${email}`}><span className="contact-icon">✉</span>{email}</a><a href="https://github.com/sisiyotakele" target="_blank" rel="noreferrer"><span className="contact-icon">⌘</span>github.com/sisiyotakele</a><a href="https://www.linkedin.com/in/sisiyo-takele1/" target="_blank" rel="noreferrer"><span className="contact-icon">in</span>linkedin.com/in/sisiyo-takele1</a><div className="contact-location"><i/>ADDIS ABABA, ETHIOPIA</div><p className="contact-note">Have a project idea, a question, or just want to connect? I’d be glad to hear from you.</p></div><form className="contact-form" onSubmit={sendContact}><input type="hidden" name="_subject" value="New portfolio message for Sisiyo Takele"/><input type="hidden" name="_template" value="table"/><p className="honeypot"><label>Leave this field empty<input name="_honey" tabIndex={-1} autoComplete="off"/></label></p><label>Your name<input name="name" type="text" placeholder="Your name" required/></label><label>Email address<input name="email" type="email" placeholder="yourname@example.com" required/></label><label>Message<textarea name="message" rows={5} placeholder="Let’s collaborate on something great…" required/></label><button className="button light-button" type="submit" disabled={contactSending}>{contactSending ? "Sending…" : <>Send message <span>↗</span></>}</button><p className="form-note" aria-live="polite">{contactStatus || "I’d love to hear what you’re building."}</p></form></div></section>
    <footer className="footer"><a className="brand" href="#home">Sisiyo<span>.</span></a><p>Made with curiosity <span>✳</span></p><span>© {new Date().getFullYear()} SISiyo TAKELE</span></footer>
    <div className={chatOpen?"chat-panel visible":"chat-panel"} aria-hidden={!chatOpen}><div className="chat-head"><div><span className="chat-online"/><b>Ask about Sisiyo</b><small>Portfolio assistant · instant answers</small></div><button onClick={()=>setChatOpen(false)} aria-label="Close chat">×</button></div><div className="chat-log">{chatMessages.map((message,i)=><div key={`${i}-${message.from}`} className={`chat-message ${message.from}`}>{message.text}</div>)}<div className="chat-suggestions"><button onClick={()=>setChatInput("What projects has Sisiyo built?")}>Projects</button><button onClick={()=>setChatInput("What skills does Sisiyo have?")}>Skills</button><button onClick={()=>setChatInput("How can I contact Sisiyo?")}>Contact</button></div></div><form className="chat-form" onSubmit={sendChat}><input value={chatInput} onChange={(e)=>setChatInput(e.target.value)} placeholder="Ask about Sisiyo…" aria-label="Ask about Sisiyo"/><button type="submit" aria-label="Send message">↑</button></form></div><button className={chatOpen?"chat-launcher opened":"chat-launcher"} onClick={()=>setChatOpen(!chatOpen)} aria-label={chatOpen?"Close portfolio assistant":"Ask about me"}>{chatOpen?<span className="chat-close">×</span>:<><img src="/chatbot-avatar.svg" alt=""/><span className="chat-tooltip">Ask about me</span></>}</button>
    <a href="#home" className="back-top" aria-label="Back to profile" title="Back to profile"><span>↑</span></a>
  </main>;
}
