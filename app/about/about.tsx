import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  FiAward,
  FiClock,
  FiGlobe,
  FiPhone,
  FiShield,
  FiTarget,
  FiZap,
  FiUsers,
} from "react-icons/fi";
import data from "../../lib/data.json";
import { useAboutStatsAnimation } from "../../service/about.service";

const aboutData = (data as AboutData).about;

const values = aboutData.values;
const journey = aboutData.journey;
const stats = aboutData.stats;
const presence = aboutData.presence;
const recognitions = aboutData.recognitions;

const valueIcons: Record<
  AboutValueIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  award: FiAward,
  shield: FiShield,
  zap: FiZap,
  users: FiUsers,
};

const recognitionIcons: Record<
  RecognitionIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  award: FiAward,
  shield: FiShield,
  target: FiTarget,
  zap: FiZap,
};

export default function About() {
  const navigate = useNavigate();
  const { statsSectionRef, animatedStats } = useAboutStatsAnimation();

  // Scroll to contact form on homepage
  const scrollToContactForm = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
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

  const sectionContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  } as const;

  const sectionItem = {
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

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="pt-20"
    >
      <section className="hero-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
        </div>

        <motion.div
          className="max-w-full-sm xl:container mx-auto px-6 relative z-10 text-white text-center"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={heroItem}
            className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Our Identity
          </motion.span>
          <motion.h1
            variants={heroItem}
            className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
          >
            Transforming Complexity into <br />
            Competitive Advantage.
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="text-xl text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            BlockSherpa is a global Web3-native consulting and development firm dedicated to guiding leaders through their most critical blockchain transitions.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              variants={sectionContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.div
                variants={sectionItem}
                className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-sm tracking-wide"
              >
                <FiClock className="w-5 h-5" aria-hidden="true" />
                Established in 2022
              </motion.div>

              <motion.h2
                variants={sectionItem}
                className="text-4xl font-bold text-slate-900 leading-tight"
              >
                Driven by a Passion for <br />
                Strategic Clarity.
              </motion.h2>

              <motion.p
                variants={sectionItem}
                className="text-lg text-slate-600 leading-relaxed"
              >
                Founded in England by a collective of crypto investors and blockchain veterans, BlockSherpa combines strategic capital with hands-on development to launch real-world blockchain applications.
              </motion.p>

              <motion.div
                variants={sectionItem}
                className="p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h4 className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4">
                    Our Mission
                  </h4>
                  <p className="text-2xl font-medium leading-snug">
                    "To empower institutional leaders, enterprises, and Web3 natives with the actionable clarity needed to navigate the rapidly shifting decentralized economy and achieve sustainable blockchain-powered growth."
                  </p>
                </div>
                <FiTarget
                  className="absolute -right-6 -bottom-6 text-9xl text-white/5"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 }}
            >
              <div className="space-y-4 pt-12">
                <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/about/office.avif"
                    className="w-full h-full object-cover"
                    alt="Modern Office"
                  />
                </div>

                <div className="p-6 bg-blue-600 rounded-2xl text-white text-center">
                  <div className="text-4xl font-black">5+</div>
                  <div className="text-xs uppercase font-bold mt-1 opacity-80">
                    Years of Web3 Impact
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center p-8">
                  <FiGlobe
                    className="w-full h-full text-6xl text-slate-300"
                    aria-hidden="true"
                  />
                </div>

                <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/about/teamcollaboration.avif"
                    className="w-full h-full object-cover"
                    alt="Team Collaboration"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.span
              variants={sectionItem}
              className="text-blue-600 font-bold uppercase tracking-widest text-sm"
            >
              Our Values
            </motion.span>
            <motion.h2
              variants={sectionItem}
              className="text-4xl font-bold text-slate-900 mt-2"
            >
              The Pillars of Our Success
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {values.map((value) => {
              const Icon = valueIcons[value.icon];
              return (
                <motion.div
                  key={value.title}
                  variants={gridItem}
                  className="p-8 bg-white border border-slate-200 rounded-3xl card-hover"
                >
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="text-3xl" aria-hidden={true} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.span
              variants={sectionItem}
              className="text-blue-600 font-bold uppercase tracking-widest text-sm"
            >
              Our Journey
            </motion.span>
            <motion.h2
              variants={sectionItem}
              className="text-4xl font-bold text-slate-900 mt-2"
            >
              Milestones of Growth
            </motion.h2>
          </motion.div>

          <div className="relative px-4 lg:px-6">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-300 hidden lg:block z-0" />

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10"
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {journey.map((item) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  variants={gridItem}
                  className="bg-white p-8 lg:p-8 rounded-2xl relative z-10"
                >
                  <div className="hidden lg:block timeline-dot absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className={item.offsetClassName}>
                    <span className="text-3xl font-black text-slate-200 block mb-2">
                      {item.year}
                    </span>
                    <h4 className="font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={statsSectionRef} className="py-20 bg-slate-900 text-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-4 gap-12 text-center"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            {stats.map((item) => (
              <motion.div
                key={item.key}
                variants={gridItem}
                className="space-y-2"
              >
                <div className="text-5xl font-black text-blue-500">
                  {item.prefix}
                  {animatedStats[item.key]}
                  {item.suffix}
                </div>
                <div className="text-sm uppercase tracking-widest font-bold opacity-60">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <motion.div
              className="max-w-xl"
              variants={sectionContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.span
                variants={sectionItem}
                className="text-blue-600 font-bold uppercase tracking-widest text-sm"
              >
                Our Presence
              </motion.span>
              <motion.h2
                variants={sectionItem}
                className="text-4xl font-bold text-slate-900 mt-2"
              >
                {presence.heading}
              </motion.h2>
            </motion.div>

            <motion.button
              onClick={scrollToContactForm}
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            >
              Contact Regional HQ
            </motion.button>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {presence.offices.map((office) => (
              <motion.div
                key={office.city}
                variants={gridItem}
                className="p-6 border border-slate-100 rounded-3xl bg-slate-50 space-y-4"
              >
                <h4 className="text-xl font-bold text-slate-900">
                  {office.city}
                </h4>
                <p className="text-sm text-slate-500">
                  {office.type}
                  <br />
                  {office.address}
                </p>
                <div className="pt-4 flex items-center gap-2 text-blue-600 text-xs font-bold">
                  <FiPhone className="w-4 h-4" aria-hidden={true} />
                  {office.phone}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-full-sm xl:container mx-auto px-6 text-center">
          <motion.h4
            className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Recognized for Operational Excellence
          </motion.h4>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-40"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {recognitions.map((recognition) => {
              const Icon = recognitionIcons[recognition.icon];
              return (
                <motion.div
                  key={`${recognition.icon}-${recognition.label}`}
                  variants={gridItem}
                  className="flex flex-col items-center gap-2"
                >
                  <Icon
                    className="text-5xl text-slate-400"
                    aria-hidden={true}
                  />
                  <span className="text-[10px] font-bold">
                    {recognition.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}