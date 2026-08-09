import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaArrowRight, FaLinkedin, FaTwitter } from "react-icons/fa";
import data from "../../lib/data.json";

const teamData = (data as TeamData).team;
const LEADERS = teamData.leaders;
const SPECIALISTS = teamData.specialists;

export default function Team() {
  const navigate = useNavigate();

  // Scroll to contact form on homepage
  const scrollToContactForm = () => {
    if (window.location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#contact");
    }
  };

  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  } as const;

  const gridItem = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const goToMember = (slug?: string) => {
    if (!slug) return;
    navigate(`/team/${slug}`);
  };

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1"
    >
      <section
        id="team"
        className="pt-40 pb-24 hero-gradient relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-6 relative z-10 text-center"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={heroItem}
            className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Our People
          </motion.span>
          <motion.h1
            variants={heroItem}
            className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight"
          >
            The Minds Shaping Tomorrow&apos;s Web3 Strategies.
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            BlockSherpa is built on the collective brilliance of blockchain veterans, decentralized finance masters, and visionary Web3 leaders. Our diverse expertise is your competitive advantage.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-10 xl:py-20 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-b border-slate-100 pb-8">
            <motion.div
              variants={heroContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.h2
                variants={heroItem}
                className="text-3xl font-bold text-slate-900 tracking-tight"
              >
                Executive Leadership
              </motion.h2>
              <motion.p variants={heroItem} className="text-slate-500 mt-2">
                The core steering committee guiding BlockSherpa&apos;s global Web3 strategy and execution.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex gap-4 p-1 bg-slate-50 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            >
              <button
                className="px-6 py-2 rounded-lg text-sm font-bold bg-white text-slate-900 shadow-sm"
                type="button"
              >
                All Leaders
              </button>
              <button
                className="px-6 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-slate-900 transition-all"
                type="button"
              >
                Strategy
              </button>
              <button
                className="px-6 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-slate-900 transition-all"
                type="button"
              >
                Operations
              </button>
            </motion.div>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {LEADERS.map((leader, idx) => (
              <motion.div
                key={leader.name}
                variants={gridItem}
                className="group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/team/${leader.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/team/${leader.slug}`);
                }}
              >
                <div className="relative aspect-4/5 rounded-3xl overflow-hidden mb-6 bg-slate-100">
                  <img
                    src={leader.imageSrc}
                    alt={leader.imageAlt}
                    className="w-full h-full object-cover grayscale-to-color"
                  />
                  <div className="team-card-overlay absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <div className="space-y-4">
                      <p className="text-sm text-slate-200">
                        {leader.overlayText}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-slate-900">
                    {leader.name}
                  </h4>
                  <p className="text-blue-600 font-semibold">{leader.role}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {leader.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] font-bold uppercase tracking-widest badge-outline px-2 py-1 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-10 xl:py-20 bg-slate-50">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <motion.div
            className="mb-16 border-b border-slate-200 pb-8"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.h2
              variants={heroItem}
              className="text-3xl font-bold text-slate-900 tracking-tight"
            >
              Senior Consultants &amp; Specialists
            </motion.h2>
            <motion.p variants={heroItem} className="text-slate-500 mt-2">
              The deep domain experts executing change across industries.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SPECIALISTS.map((s) => (
              <motion.div
                key={s.name}
                variants={gridItem}
                className="bg-white p-6 rounded-4xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => goToMember(s.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goToMember(s.slug);
                }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100 grayscale hover:grayscale-0 transition-all duration-500">
                  <img
                    src={s.imageSrc}
                    alt={s.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-slate-900">{s.name}</h4>
                <p className="text-slate-500 text-sm">{s.role}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {s.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`text-[9px] font-bold ${t.bgTextClassName} px-2 py-0.5 rounded`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-10 xl:py-20 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <motion.div
            className="bg-slate-900 rounded-4xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-8 lg:p-14 xl:p-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              variants={heroItem}
              className="flex-1 space-y-5 sm:space-y-6 text-white text-center lg:text-left w-full"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Want to work with our experts?
              </h2>
              <p className="text-base sm:text-lg xl:text-xl text-slate-400 leading-relaxed">
                Our team doesn&apos;t just provide answers; we solve your
                specific organizational puzzles side-by-side with your
                leadership.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 w-full">
                <button
                  onClick={scrollToContactForm}
                  id="team-cta-btn"
                  className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Contact BlockSherpa{" "}
                  <FaArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
  onClick={() => navigate("/work-with-us")}
  id="team-cta-careers"
  className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all cursor-pointer"
>
  Join Our Global Network
</button>
              </div>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex-1 w-full max-w-md lg:max-w-none grid grid-cols-2 gap-3 sm:gap-4"
            >
              <div className="space-y-4">
                <div className="p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    15+
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                    Senior Partners
                  </div>
                </div>
                <div className="p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    12
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                    Nationalities
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 sm:pt-8">
                <div className="p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    40+
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                    Specialists
                  </div>
                </div>
                <div className="p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                    Dedication
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}