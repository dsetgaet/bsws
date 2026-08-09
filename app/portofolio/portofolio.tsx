import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaArrowRight, FaQuoteLeft, FaTrophy } from "react-icons/fa";
import { Link } from "react-router";
import data from "../../lib/data.json";

const CASE_STUDIES = (data as PortfolioData).portfolio.caseStudies;

export default function Portfolio() {
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

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 pt-20"
    >
      <section className="hero-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] -mr-96 -mt-96" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-400 rounded-full blur-[100px] -ml-48 -mb-48" />
        </div>

        <motion.div
          className="max-w-full-sm xl:container mx-auto px-6 relative z-10 text-center"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <FaTrophy className="w-4 h-4" aria-hidden="true" />
            Excellence in Execution
          </motion.div>
          <motion.h1
            variants={heroItem}
            className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            Our Impact in Action
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Explore how Block Sherpa has partnered with global leaders to
            navigate disruption and unlock sustainable growth across diverse
            industries.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-4 md:py-10 border-b border-slate-100 bg-white sticky top-20 z-40">
        <div className="max-w-full-sm xl:container mx-auto px-6 flex flex-wrap items-center justify-center gap-4">
          <button
            id="filter-all"
            className="px-6 py-2 rounded-full bg-slate-900 text-white text-sm font-bold transition-all"
            type="button"
          >
            All Industries
          </button>
          <button
            id="filter-fintech"
            className="px-6 py-2 rounded-full bg-slate-50 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-all"
            type="button"
          >
            Fintech
          </button>
          <button
            id="filter-retail"
            className="px-6 py-2 rounded-full bg-slate-50 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-all"
            type="button"
          >
            Retail
          </button>
          <button
            id="filter-energy"
            className="px-6 py-2 rounded-full bg-slate-50 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-all"
            type="button"
          >
            Energy
          </button>
          <button
            id="filter-tech"
            className="px-6 py-2 rounded-full bg-slate-50 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-all"
            type="button"
          >
            Technology
          </button>
        </div>
      </section>

      <section className="py-10 xl:py-20 bg-white" id="portfolio">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {CASE_STUDIES.map((c) => (
              <motion.div key={c.slug ?? c.title} variants={gridItem}>
                <Link
                  to={`/portofolio/${c.slug}`}
                  className="group cursor-pointer block"
                >
                  <div className="aspect-4/5 rounded-3xl overflow-hidden mb-6 relative bg-slate-100">
                    <img
                      src={c.imageSrc}
                      alt={c.imageAlt}
                      className="case-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {c.industry}
                      </span>
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {c.outcomeLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-slate-500 mb-6">{c.description}</p>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    Read Case Study{" "}
                    <FaArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-10 xl:py-20 bg-slate-50">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              variants={heroContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.span
                variants={heroItem}
                className="text-blue-600 font-bold uppercase tracking-widest text-sm"
              >
                Measurable Results
              </motion.span>
              <motion.h2
                variants={heroItem}
                className="text-4xl font-bold text-slate-900 tracking-tight"
              >
                We measure our success by the success of our clients.
              </motion.h2>
              <motion.p
                variants={heroItem}
                className="text-lg text-slate-600 leading-relaxed"
              >
                Beyond the strategies and slides, we focus on tangible metrics
                that move the needle. Our results are validated by the growth of
                our partners over long-term engagements.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="grid grid-cols-2 gap-8"
              >
                <div className="border-l-2 border-slate-200 pl-6">
                  <div className="text-4xl font-black text-slate-900">
                    $2.4B+
                  </div>
                  <div className="text-sm text-slate-500 mt-2 uppercase tracking-wide">
                    Client Capital Optimized
                  </div>
                </div>
                <div className="border-l-2 border-slate-200 pl-6">
                  <div className="text-4xl font-black text-slate-900">120%</div>
                  <div className="text-sm text-slate-500 mt-2 uppercase tracking-wide">
                    Avg. Efficiency Increase
                  </div>
                </div>
                <div className="border-l-2 border-slate-200 pl-6">
                  <div className="text-4xl font-black text-slate-900">45+</div>
                  <div className="text-sm text-slate-500 mt-2 uppercase tracking-wide">
                    Fortune 100 Partners
                  </div>
                </div>
                <div className="border-l-2 border-slate-200 pl-6">
                  <div className="text-4xl font-black text-slate-900">15+</div>
                  <div className="text-sm text-slate-500 mt-2 uppercase tracking-wide">
                    Industry Awards
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 }}
            >
              <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <FaQuoteLeft
                  className="text-5xl text-blue-500/30 mb-8"
                  aria-hidden="true"
                />
                <blockquote className="text-2xl font-medium leading-relaxed italic mb-8 text-slate-200">
                  "Block Sherpa didn't just deliver a plan; they integrated
                  into our culture and stayed through the execution phase. The
                  $40M in operational savings we achieved was a direct result of
                  their hands-on methodology."
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src="/images/clients/ThomasReed.jpg"
                    alt="Thomas Reed"
                    className="w-14 h-14 rounded-full border-2 border-white/20"
                  />
                  <div className="text-sm">
                    <h5 className="font-bold">Thomas Reed</h5>
                    <p className="text-slate-400">COO, Global Logistics Corp</p>
                  </div>
                </div>

                <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 xl:py-20 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <motion.div
            className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden"
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -mr-48 -mt-48" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <motion.h2
                variants={heroItem}
                className="text-4xl lg:text-5xl font-bold tracking-tight"
              >
                Ready to be our next success story?
              </motion.h2>
              <motion.p
                variants={heroItem}
                className="text-xl text-slate-400 leading-relaxed"
              >
                Let's discuss how our strategic framework can be tailored to
                solve your organization's most pressing challenges.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="flex flex-wrap justify-center gap-6 pt-4"
              >
                <button
                  onClick={scrollToContactForm}
                  id="cta-start-project"
                  className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3 cursor-pointer"
                >
                  Start a Partnership{" "}
                  <FaArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <Link
                  to="/services"
                  id="cta-learn-more"
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                >
                  Our Methodology
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}