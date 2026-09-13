import React, { useState } from "react";
import { motion } from "motion/react";
import {
  FaArrowRight,
  FaLinkedin,
  FaQuoteLeft,
  FaTwitter,
  FaBriefcase,
  FaRegCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaGlobe,
} from "react-icons/fa";
import { IoBarChart, IoLayers } from "react-icons/io5";
import {
  FiMapPin,
  FiMail,
  FiMonitor,
  FiPhone,
  FiSend,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import data from "../../lib/data.json";
import { Link, useNavigate } from "react-router";
import { slugifyServiceTitle } from "../../lib/service-slug";

const homePageData = (data as HomePageData).homePage;
const CASE_STUDIES = (data as PortfolioData).portfolio.caseStudies;
const teamData = (data as TeamData).team;
const TEAM_LEADERS = teamData.leaders;
const TEAM_SPECIALISTS = teamData.specialists;

const getTeamMemberSlug = (name: string) => {
  const leader = TEAM_LEADERS.find((m) => m.name === name);
  if (leader) return leader.slug;
  const specialist = TEAM_SPECIALISTS.find((m) => m.name === name);
  return specialist?.slug;
};

const aboutHighlightIcons: Record<
  HomeAboutHighlight["icon"],
  React.ComponentType<{ className?: string }>
> = {
  target: FiTarget,
  zap: FiZap,
};

const servicesIcons: Record<
  HomeService["icon"],
  React.ComponentType<{ className?: string }>
> = {
  trendingUp: FiTrendingUp,
  barChart: IoBarChart,
  monitor: FiMonitor,
  users: FiUsers,
  globe: FaGlobe,
  briefcase: FaBriefcase,
};

export default function Home() {
  const navigate = useNavigate();
  const portfolioScrollRef = React.useRef<HTMLDivElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "Blockchain Strategy",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to contact form function
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim()) {
      setFormStatus({ type: "error", message: "Please enter your first name." });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
      return;
    }
    
    if (!formData.lastName.trim()) {
      setFormStatus({ type: "error", message: "Please enter your last name." });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
      return;
    }
    
    if (!formData.email.trim()) {
      setFormStatus({ type: "error", message: "Please enter your email address." });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: "error", message: "Please enter a valid email address." });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
      return;
    }
    
    if (!formData.message.trim()) {
      setFormStatus({ type: "error", message: "Please tell us how we can help." });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare form data for Web3Forms
    const formPayload = new FormData();
    formPayload.append("access_key", "7be6a23a-864a-41f5-849f-265762877bcd");
    formPayload.append("name", `${formData.firstName} ${formData.lastName}`);
    formPayload.append("email", formData.email);
    formPayload.append("service", formData.service);
    formPayload.append("message", formData.message);
    formPayload.append("subject", `BlockSherpa Contact Form: ${formData.service} inquiry from ${formData.firstName} ${formData.lastName}`);
    formPayload.append("from_name", "BlockSherpa Website");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Success
        setFormStatus({ 
          type: "success", 
          message: "Thank you! Your message has been sent. We'll get back to you within 24 hours." 
        });
        
        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          service: "Blockchain Strategy",
          message: ""
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
      
    } catch (error) {
      console.error("Web3Forms Error:", error);
      setFormStatus({ 
        type: "error", 
        message: "Something went wrong. Please try again or email us directly at hello@blocksherpa.dev." 
      });
    }
    
    setIsSubmitting(false);
    
    // Clear status after 5 seconds
    setTimeout(() => setFormStatus({ type: "", message: "" }), 5000);
  };

  const scrollPortfolio = (direction: "prev" | "next") => {
    const el = portfolioScrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("a, [role='link'], div");
    const cardWidth = firstCard?.offsetWidth ?? 360;
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = cardWidth + gap;
    const left = direction === "next" ? step : -step;
    el.scrollBy({ left, behavior: "smooth" });
  };

  const heroContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;

  const heroItem = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const gridContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;

  const gridItem = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <>
      {/* Full Page Loading Overlay - Hides EVERYTHING until video loads */}
      {!videoLoaded && (
        <div className="fixed inset-0 z-[9999] bg-white" />
      )}

      <main
        style={{ viewTransitionName: "main-content" } as React.CSSProperties}
        className="flex-1"
      >
        {/* Hero Section */}
        <section
          id="home"
          className="lg:pt-24 pt-32 pb-10 min-h-full lg:min-h-screen flex items-center relative overflow-hidden bg-black"
        >
          {/* Video Background - Full width */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              preload="auto"
              muted
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src="/images/landing/landing.mp4" type="video/mp4" />
              <source src="/images/landing/landing.webm" type="video/webm" />
            </video>
            
            {/* Dark overlay for readability - appears with video */}
            {videoLoaded && (
              <div className="absolute inset-0 bg-black/50 transition-opacity duration-500" />
            )}
          </div>

          {/* Content - Only shows after video is loaded */}
          {videoLoaded && (
            <div className="max-w-full-sm xl:container mx-auto px-4 sm:px-6 w-full relative z-10">
              <motion.div
                className="max-w-3xl mx-auto text-center text-white space-y-8"
                variants={heroContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={heroItem}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {homePageData.home.badge}
                </motion.div>

                <motion.h1
                  variants={heroItem}
                  className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                >
                  {homePageData.home.title}
                </motion.h1>

                <motion.p
                  variants={heroItem}
                  className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                >
                  {homePageData.home.description}
                </motion.p>

                <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  <button
                    onClick={scrollToContact}
                    id="hero-primary-cta"
                    className="w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {homePageData.home.primaryCta.label}
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(homePageData.home.secondaryCta.href)}
                    id="hero-secondary-cta"
                    className="w-full sm:w-auto text-center px-6 sm:px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                  >
                    {homePageData.home.secondaryCta.label}
                  </button>
                </motion.div>

                <motion.div
                  variants={heroItem}
                  className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-white/10 w-full"
                >
                  {homePageData.home.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-tighter">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Trusted by */}
                <motion.div
                  variants={heroItem}
                  className="pt-4 flex flex-wrap items-center justify-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {homePageData.home.trustedBy.avatars.map((avatar, index) => (
                        <img
                          key={avatar}
                          src={avatar}
                          className="w-10 h-10 rounded-full border-2 border-white"
                          alt={`Team ${index + 1}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {homePageData.home.trustedBy.text}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="py-10 sm:py-20 bg-slate-50 overflow-hidden">
          <div className="max-w-full-sm xl:container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                className="space-y-6"
                variants={heroContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <div>
                  <motion.span
                    variants={heroItem}
                    className="text-blue-600 font-bold uppercase tracking-widest text-sm"
                  >
                    {homePageData.about.badge}
                  </motion.span>
                  <motion.h2
                    variants={heroItem}
                    className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight"
                  >
                    {homePageData.about.title}
                  </motion.h2>
                </div>
                <motion.p
                  variants={heroItem}
                  className="text-base sm:text-lg text-slate-600 leading-relaxed"
                >
                  {homePageData.about.description}
                </motion.p>
                <motion.div
                  variants={heroItem}
                  className="grid sm:grid-cols-2 gap-6"
                >
                  {homePageData.about.highlights.map((highlight) => {
                    const Icon = aboutHighlightIcons[highlight.icon];
                    return (
                      <div key={highlight.title} className="flex gap-4">
                        <div className="w-12 h-12 shrink-0 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">
                            {highlight.title}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
                <motion.div
                  variants={heroItem}
                  className="p-6 bg-white border border-slate-200 rounded-xl flex items-center gap-6 shadow-sm"
                >
                  <div className="text-4xl font-black text-blue-600">
                    {homePageData.about.retention.value}
                  </div>
                  <div className="text-slate-600">
                    {homePageData.about.retention.description}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {homePageData.about.images.slice(0, 2).map((image) => (
                      <img
                        key={image.alt}
                        src={image.src}
                        className={image.className}
                        alt={image.alt}
                      />
                    ))}
                  </div>
                  <div className="space-y-4 pt-8">
                    {homePageData.about.images.slice(2, 4).map((image) => (
                      <img
                        key={image.alt}
                        src={image.src}
                        className={image.className}
                        alt={image.alt}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-10 sm:py-20 bg-white">
          <motion.div
            className="max-w-full-sm xl:container mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.span
              variants={heroItem}
              className="text-blue-600 font-bold uppercase tracking-widest text-sm"
            >
              {homePageData.services.badge}
            </motion.span>
            <motion.h2
              variants={heroItem}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight"
            >
              {homePageData.services.title}
            </motion.h2>
            <motion.p
              variants={heroItem}
              className="text-slate-500 max-w-2xl mx-auto mt-4"
            >
              {homePageData.services.description}
            </motion.p>
          </motion.div>

          <motion.div
            className="max-w-full-sm xl:container mx-auto px-4 sm:px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {homePageData.services.items.map((service) => {
              const Icon = servicesIcons[service.icon];
              const slug = slugifyServiceTitle(service.title);
              return (
                <motion.div key={service.title} variants={gridItem}>
                  <Link
                    to={`/services/${slug}`}
                    className="p-8 bg-slate-50 border border-slate-100 rounded-2xl card-hover group block"
                  >
                    <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-600">{service.description}</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-500">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <FaRegCheckCircle className="w-4 h-4 text-blue-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-10 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-full-sm xl:container mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
            <motion.div
              className="max-w-xl"
              variants={heroContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.span
                variants={heroItem}
                className="text-blue-400 font-bold uppercase tracking-widest text-sm"
              >
                {homePageData.portfolio.badge}
              </motion.span>
              <motion.h2
                variants={heroItem}
                className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight"
              >
                {homePageData.portfolio.title}
              </motion.h2>
              <motion.p variants={heroItem} className="text-slate-400 mt-4">
                {homePageData.portfolio.description}
              </motion.p>
            </motion.div>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            >
              <button
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"
                type="button"
                aria-label="Previous"
                aria-controls="portfolio-carousel"
                onClick={() => scrollPortfolio("prev")}
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-all"
                type="button"
                aria-label="Next"
                aria-controls="portfolio-carousel"
                onClick={() => scrollPortfolio("next")}
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          <div
            id="portfolio-carousel"
            ref={portfolioScrollRef}
            className="max-w-full-sm xl:container mx-auto px-4 sm:px-6 overflow-x-auto pb-8 scrollbar-hide"
          >
            <motion.div
              className="flex gap-6 sm:gap-8 w-max"
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {CASE_STUDIES.map((c) => (
                <motion.div key={c.slug} variants={gridItem}>
                  <Link
                    to={`/portfolio/${c.slug}`}
                    className="w-[280px] sm:w-[360px] lg:w-[400px] group cursor-pointer block"
                  >
                    <div className="aspect-4/5 rounded-3xl overflow-hidden mb-6 relative">
                      <img
                        src={c.imageSrc}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={c.imageAlt}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {c.industry}
                          </span>
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {c.outcomeLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{c.title}</h3>
                    <p className="text-slate-400">{c.description}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-10 sm:py-20 bg-white">
          <div className="max-w-full-sm xl:container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 sm:mb-16">
              <motion.div
                className="max-w-2xl"
                variants={heroContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <motion.span
                  variants={heroItem}
                  className="text-blue-600 font-bold uppercase tracking-widest text-sm"
                >
                  {homePageData.team.badge}
                </motion.span>
                <motion.h2
                  variants={heroItem}
                  className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight"
                >
                  {homePageData.team.title}
                </motion.h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              >
                <Link
                  to="/team"
                  id="team-all-link"
                  className="text-blue-600 font-bold flex items-center gap-2 group"
                >
                  {homePageData.team.joinLabel}
                  <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {homePageData.team.members.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={gridItem}
                  className="group text-center cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    const slug = getTeamMemberSlug(member.name);
                    if (slug) navigate(`/team/${slug}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    const slug = getTeamMemberSlug(member.name);
                    if (slug) navigate(`/team/${slug}`);
                  }}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                    <img
                      src={member.imageSrc}
                      className="w-full h-full object-cover"
                      alt={member.imageAlt}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {member.name}
                  </h4>
                  <p className="text-slate-500 text-sm mb-4">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-10 sm:py-20 bg-slate-50">
          <motion.div
            className="max-w-full-sm xl:container mx-auto px-4 sm:px-6 text-center"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.div variants={heroItem} className="mb-8">
              <FaQuoteLeft className="w-12 h-12 text-blue-200" />
            </motion.div>
            <motion.blockquote
              variants={heroItem}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 italic leading-snug mb-10"
            >
              "BlockSherpa didn't just give us a strategy; they stayed with us through the execution. Our Web3 transformation journey was seamless because of their deep blockchain expertise and hands-on approach."
            </motion.blockquote>
            <motion.div variants={heroItem} className="flex flex-col items-center">
              <motion.img
                src="/images/landing/client_portrait.jpg"
                className="w-16 h-16 rounded-full mb-4 ring-4 ring-white shadow-lg"
                alt="Client Portrait"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <h5 className="font-bold text-slate-900">Alexander Dupont</h5>
              <p className="text-slate-500 text-sm">CEO, Global Retail Systems</p>
              <div className="mt-8 flex gap-6 sm:gap-12 grayscale opacity-50">
                <IoLayers className="w-7 h-7 sm:w-9 sm:h-9" />
                <FaGlobe className="w-7 h-7 sm:w-9 sm:h-9" />
                <FaBriefcase className="w-7 h-7 sm:w-9 sm:h-9" />
                <FiTrendingUp className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section with Web3Forms */}
        <section id="contact" className="py-10 sm:py-20 bg-white">
          <div className="max-w-full-sm xl:container mx-auto px-4 sm:px-6">
            <div className="bg-slate-900 rounded-3xl sm:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row">
              <motion.div
                className="lg:w-1/2 p-8 sm:p-12 lg:p-20 text-white space-y-10 sm:space-y-12"
                variants={heroContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div variants={heroItem} className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Ready to Redefine Your Future?
                  </h2>
                  <p className="text-slate-400">
                    Fill out the form and a senior consultant will reach out to
                    schedule a discovery call within 24 hours.
                  </p>
                </motion.div>

                <motion.div variants={heroItem} className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 shrink-0">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Email Us</h4>
                      <p className="text-slate-400">hello@blocksherpa.dev</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 shrink-0">
                      <FiPhone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Call Us</h4>
                      <p className="text-slate-400">+44 20 3793 8842</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 shrink-0">
                      <FiMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Office</h4>
                      <p className="text-slate-400">London, GB</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Working Contact Form with Web3Forms */}
              <motion.div
                className="lg:w-1/2 bg-white p-8 sm:p-12 lg:p-20"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option>Blockchain Strategy</option>
                      <option>DeFi & Tokenomics</option>
                      <option>Web3 Transformation</option>
                      <option>Smart Contract Development</option>
                      <option>Sustainable Blockchain Solutions</option>
                      <option>Community & Human Capital</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      How can we help? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Tell us about your Web3 project..."
                      required
                    />
                  </div>
                  
                  {/* Status Messages */}
                  {formStatus.message && (
                    <div className={`p-3 rounded-lg text-sm ${
                      formStatus.type === "success" 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}>
                      {formStatus.message}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}