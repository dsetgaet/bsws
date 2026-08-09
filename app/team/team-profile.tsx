import React from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import {
  FaArrowRight,
  FaLinkedin,
  FaTwitter,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import {
  getMemberOverlayText,
  getTeamMemberOrThrow,
  academicIconMap,
} from "../../service/team.service";

export default function TeamProfile({ memberId }: { memberId?: string }) {
  const params = useParams();
  const id = memberId ?? (params as { id?: string }).id;
  const member = getTeamMemberOrThrow(id);

  if (!member.profileDetails) {
    return (
      <main
        style={{ viewTransitionName: "main-content" } as React.CSSProperties}
        className="flex-1"
      >
        <section className="pt-28 pb-24 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Link
              to="/team"
              id="back-to-team-btn"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-12 hover:text-white transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Leadership Team
            </Link>

            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-4">
                <div className="aspect-4/5 rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative group">
                  <img
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
                </div>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
                    Strategic Leadership
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
                    {member.name}
                  </h1>
                  <p className="text-2xl text-blue-400 font-semibold">
                    {member.role}
                  </p>
                </div>

                <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                  {getMemberOverlayText(member)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const d = member.profileDetails;

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1"
    >
      <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
        </div>

        <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
          <Link
            to="/team"
            id="back-to-team-btn"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-12 hover:text-white transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Leadership Team
          </Link>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4">
              <div className="aspect-4/5 rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <img
                  src={member.imageSrc}
                  alt={member.imageAlt}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
                  {d.heroChip}
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
                  {d.heroTitle}
                </h1>
                <p className="text-2xl text-blue-400 font-semibold">
                  {d.heroSubtitle}
                </p>
              </div>

              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                {d.shortBio}
              </p>

              {/* <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={d.scheduleHref}
                  id="cta-schedule-member"
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  {d.scheduleLabel}{" "}
                  <FiCalendar className="w-5 h-5" aria-hidden="true" />
                </a>

                <div className="flex gap-3">
                  <a
                    href={d.socialLinks.linkedinHref}
                    id="member-social-li"
                    className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                  <a
                    href={d.socialLinks.twitterHref}
                    id="member-social-tw"
                    className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-2xl" />
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="xl:py-24 py-10 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-20">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Professional Biography
                </h2>
                <div className="space-y-6">
                  {d.biography.map((p) => (
                    <p
                      key={p}
                      className="text-lg leading-relaxed text-slate-600"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-10">
                  Specialized Expertise
                </h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  {d.expertise.map((ex, idx) => (
                    <div key={ex.title} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-slate-900">
                          {ex.title}
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {ex.percent}%
                        </span>
                      </div>
                      <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-600 rounded-full"
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${ex.percent}%` }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: idx * 0.12,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-10">
                  Career Journey
                </h2>

                <div className="space-y-0 ml-4 border-l-2 border-slate-100 pl-10">
                  {d.careerJourney.map((t) => (
                    <div key={t.period} className="relative pb-12">
                      <div className="absolute -left-[25px] top-[6px] w-3 h-3 rounded-full bg-blue-600" />
                      <span className="text-sm font-bold text-slate-600 block mb-1">
                        {t.period}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900">
                        {t.title}
                      </h4>
                      <p className="text-slate-500 font-medium">{t.role}</p>
                      <p className="text-slate-500 text-sm mt-2 max-w-xl">
                        {t.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-10">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-8">
                <h4 className="text-xl font-bold text-slate-900">
                  Academic Foundations
                </h4>
                <div className="space-y-6">
                  {d.academicFoundations.map((a) => {
                    const Icon = academicIconMap[a.icon];
                    return (
                      <div key={a.title} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
                          <Icon className="text-2xl" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900">
                            {a.title}
                          </h5>
                          <p className="text-sm text-slate-500">{a.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-8 bg-slate-900 text-white rounded-4xl space-y-8 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <h4 className="text-xl font-bold">Notable Impact</h4>
                  <div className="space-y-6">
                    {d.notableImpact.map((n) => (
                      <div key={n.title} className="space-y-2">
                        <p className="text-xs text-blue-400 uppercase font-bold tracking-widest">
                          {n.category}
                        </p>
                        <p className="font-bold">{n.title}</p>
                        <p className="text-sm text-slate-400">
                          {n.description}
                        </p>
                        <div className="w-full h-px bg-white/10" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -right-12 -bottom-12 opacity-10">
                  <span className="text-[10rem] leading-none">↑</span>
                </div>
              </div>

              <div className="p-8 border border-slate-200 rounded-3xl space-y-6">
                <h4 className="text-xl font-bold text-slate-900">
                  Direct Contact
                </h4>
                <div className="space-y-4">
                  <a
                    href={`mailto:${d.directContact.email}`}
                    className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <FiMail className="text-xl text-blue-600" />
                    {d.directContact.email}
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <FiPhone className="text-xl text-blue-600" />
                    {d.directContact.phone}
                  </a>
                  <div className="flex items-center gap-3 text-slate-600">
                    <FiMapPin className="text-xl text-blue-600" />
                    {d.directContact.location}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="xl:py-24 py-10 bg-slate-50">
        <div className="max-w-full-sm xl:container mx-auto px-6 text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Client Voice
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            Endorsements from the C-Suite
          </h2>
        </div>

        <div className="max-w-full-sm xl:container mx-auto px-6 grid md:grid-cols-2 gap-12">
          {d.clientVoice.map((v) => (
            <div
              key={v.name}
              className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative"
            >
              <FaQuoteLeft className="absolute top-10 right-10 text-5xl text-blue-50/50" />
              <div className="relative z-10 space-y-8">
                <blockquote className="text-xl font-medium italic text-slate-800 leading-relaxed">
                  “{v.quote}”
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden">
                    <img
                      src={v.imageSrc}
                      alt={v.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{v.name}</h5>
                    <p className="text-sm text-slate-500">{v.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="xl:py-24 py-10 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -mr-48 -mt-48" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {d.bottomCta.title}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                {d.bottomCta.description}
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link
  to={d.bottomCta.href}
  id="cta-member-bottom"
  className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3"
  target="_blank"
  rel="noopener noreferrer"
>
  {d.bottomCta.buttonLabel}{" "}
  <FaArrowRight className="w-4 h-4" aria-hidden="true" />
</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}






// import React from "react";

// import { motion } from "motion/react";

// import { Link, useParams } from "react-router";

// import {
//   FaArrowRight,
//   FaLinkedin,
//   FaTwitter,
//   FaQuoteLeft,
// } from "react-icons/fa";

// import {
//   FiArrowLeft,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiCalendar,
// } from "react-icons/fi";

// import {
//   getMemberOverlayText,
//   getTeamMemberOrThrow,
//   academicIconMap,
// } from "../../service/team.service";

// export default function TeamProfile({ memberId }: { memberId?: string }) {
//   const params = useParams();
//   const id = memberId ?? (params as { id?: string }).id;
//   const member = getTeamMemberOrThrow(id);

//   if (!member.profileDetails) {
//     return (
//       <main
//         style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//         className="flex-1"
//       >
//         <section className="pt-28 pb-24 hero-gradient relative overflow-hidden">
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//           </div>

//           <div className="max-w-7xl mx-auto px-6 relative z-10">
//             <Link
//               to="/team"
//               id="back-to-team-btn"
//               className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-12 hover:text-white transition-colors group"
//             >
//               <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//               Back to Leadership Team
//             </Link>

//             <div className="grid lg:grid-cols-12 gap-16 items-center">
//               <div className="lg:col-span-4">
//                 <div className="aspect-4/5 rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative group">
//                   <img
//                     src={member.imageSrc}
//                     alt={member.imageAlt}
//                     className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
//                   />
//                   <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
//                 </div>
//               </div>
//               <div className="lg:col-span-8 space-y-8">
//                 <div className="space-y-4">
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
//                     Strategic Leadership
//                   </div>
//                   <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
//                     {member.name}
//                   </h1>
//                   <p className="text-2xl text-blue-400 font-semibold">
//                     {member.role}
//                   </p>
//                 </div>

//                 <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
//                   {getMemberOverlayText(member)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     );
//   }

//   const d = member.profileDetails;

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1"
//     >
//       <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
//           <Link
//             to="/team"
//             id="back-to-team-btn"
//             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-12 hover:text-white transition-colors group"
//           >
//             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Leadership Team
//           </Link>

//           <div className="grid lg:grid-cols-12 gap-16 items-center">
//             <div className="lg:col-span-4">
//               <div className="aspect-4/5 rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative group">
//                 <img
//                   src={member.imageSrc}
//                   alt={member.imageAlt}
//                   className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
//                 />
//                 <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
//               </div>
//             </div>

//             <div className="lg:col-span-8 space-y-8">
//               <div className="space-y-4">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
//                   {d.heroChip}
//                 </div>
//                 <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
//                   {d.heroTitle}
//                 </h1>
//                 <p className="text-2xl text-blue-400 font-semibold">
//                   {d.heroSubtitle}
//                 </p>
//               </div>

//               <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
//                 {d.shortBio}
//               </p>

//               {/* <div className="flex flex-wrap gap-4 pt-4">
//                 <a
//                   href={d.scheduleHref}
//                   id="cta-schedule-member"
//                   className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
//                 >
//                   {d.scheduleLabel}{" "}
//                   <FiCalendar className="w-5 h-5" aria-hidden="true" />
//                 </a>

//                 <div className="flex gap-3">
//                   <a
//                     href={d.socialLinks.linkedinHref}
//                     id="member-social-li"
//                     className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
//                     aria-label="LinkedIn"
//                   >
//                     <FaLinkedin className="text-2xl" />
//                   </a>
//                   <a
//                     href={d.socialLinks.twitterHref}
//                     id="member-social-tw"
//                     className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
//                     aria-label="Twitter"
//                   >
//                     <FaTwitter className="text-2xl" />
//                   </a>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="xl:py-24 py-10 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-12 gap-20">
//             <div className="lg:col-span-8 space-y-20">
//               <div>
//                 <h2 className="text-3xl font-bold text-slate-900 mb-8">
//                   Professional Biography
//                 </h2>
//                 <div className="space-y-6">
//                   {d.biography.map((p) => (
//                     <p
//                       key={p}
//                       className="text-lg leading-relaxed text-slate-600"
//                     >
//                       {p}
//                     </p>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-3xl font-bold text-slate-900 mb-10">
//                   Specialized Expertise
//                 </h2>
//                 <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
//                   {d.expertise.map((ex, idx) => (
//                     <div key={ex.title} className="space-y-3">
//                       <div className="flex justify-between items-end">
//                         <span className="font-bold text-slate-900">
//                           {ex.title}
//                         </span>
//                         <span className="text-sm font-bold text-blue-600">
//                           {ex.percent}%
//                         </span>
//                       </div>
//                       <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
//                         <motion.div
//                           className="h-full bg-blue-600 rounded-full"
//                           initial={{ width: "0%" }}
//                           whileInView={{ width: `${ex.percent}%` }}
//                           viewport={{ once: true, amount: 0.35 }}
//                           transition={{
//                             duration: 1,
//                             ease: "easeOut",
//                             delay: idx * 0.12,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-3xl font-bold text-slate-900 mb-10">
//                   Career Journey
//                 </h2>

//                 <div className="space-y-0 ml-4 border-l-2 border-slate-100 pl-10">
//                   {d.careerJourney.map((t) => (
//                     <div key={t.period} className="relative pb-12">
//                       <div className="absolute -left-[25px] top-[6px] w-3 h-3 rounded-full bg-blue-600" />
//                       <span className="text-sm font-bold text-slate-600 block mb-1">
//                         {t.period}
//                       </span>
//                       <h4 className="text-xl font-bold text-slate-900">
//                         {t.title}
//                       </h4>
//                       <p className="text-slate-500 font-medium">{t.role}</p>
//                       <p className="text-slate-500 text-sm mt-2 max-w-xl">
//                         {t.description}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <aside className="lg:col-span-4 space-y-10">
//               <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-8">
//                 <h4 className="text-xl font-bold text-slate-900">
//                   Academic Foundations
//                 </h4>
//                 <div className="space-y-6">
//                   {d.academicFoundations.map((a) => {
//                     const Icon = academicIconMap[a.icon];
//                     return (
//                       <div key={a.title} className="flex gap-4">
//                         <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
//                           <Icon className="text-2xl" />
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-slate-900">
//                             {a.title}
//                           </h5>
//                           <p className="text-sm text-slate-500">{a.subtitle}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="p-8 bg-slate-900 text-white rounded-4xl space-y-8 relative overflow-hidden">
//                 <div className="relative z-10 space-y-6">
//                   <h4 className="text-xl font-bold">Notable Impact</h4>
//                   <div className="space-y-6">
//                     {d.notableImpact.map((n) => (
//                       <div key={n.title} className="space-y-2">
//                         <p className="text-xs text-blue-400 uppercase font-bold tracking-widest">
//                           {n.category}
//                         </p>
//                         <p className="font-bold">{n.title}</p>
//                         <p className="text-sm text-slate-400">
//                           {n.description}
//                         </p>
//                         <div className="w-full h-px bg-white/10" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="absolute -right-12 -bottom-12 opacity-10">
//                   {/* Decorative icon */}
//                   <span className="text-[10rem] leading-none">↑</span>
//                 </div>
//               </div>

//               <div className="p-8 border border-slate-200 rounded-3xl space-y-6">
//                 <h4 className="text-xl font-bold text-slate-900">
//                   Direct Contact
//                 </h4>
//                 <div className="space-y-4">
//                   <a
//                     href={`mailto:${d.directContact.email}`}
//                     className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
//                   >
//                     <FiMail className="text-xl text-blue-600" />
//                     {d.directContact.email}
//                   </a>
//                   <a
//                     href="#"
//                     onClick={(e) => e.preventDefault()}
//                     className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
//                   >
//                     <FiPhone className="text-xl text-blue-600" />
//                     {d.directContact.phone}
//                   </a>
//                   <div className="flex items-center gap-3 text-slate-600">
//                     <FiMapPin className="text-xl text-blue-600" />
//                     {d.directContact.location}
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>

//       <section className="xl:py-24 py-10 bg-slate-50">
//         <div className="max-w-full-sm xl:container mx-auto px-6 text-center mb-16">
//           <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
//             Client Voice
//           </span>
//           <h2 className="text-4xl font-bold text-slate-900 mt-2">
//             Endorsements from the C-Suite
//           </h2>
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 grid md:grid-cols-2 gap-12">
//           {d.clientVoice.map((v) => (
//             <div
//               key={v.name}
//               className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative"
//             >
//               <FaQuoteLeft className="absolute top-10 right-10 text-5xl text-blue-50/50" />
//               <div className="relative z-10 space-y-8">
//                 <blockquote className="text-xl font-medium italic text-slate-800 leading-relaxed">
//                   “{v.quote}”
//                 </blockquote>
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden">
//                     <img
//                       src={v.imageSrc}
//                       alt={v.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <h5 className="font-bold text-slate-900">{v.name}</h5>
//                     <p className="text-sm text-slate-500">{v.role}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="xl:py-24 py-10 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -mr-48 -mt-48" />
//             </div>

//             <div className="relative z-10 max-w-3xl mx-auto space-y-8">
//               <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
//                 {d.bottomCta.title}
//               </h2>
//               <p className="text-xl text-slate-400 leading-relaxed">
//                 {d.bottomCta.description}
//               </p>
//               <div className="flex flex-wrap justify-center gap-6 pt-4">
//                 <a target="_blank"
//                   href={d.bottomCta.href}
//                   id="cta-member-bottom"
//                   className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3"
//                 >
//                   {d.bottomCta.buttonLabel}{" "}
//                   <FaArrowRight className="w-4 h-4" aria-hidden="true" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
