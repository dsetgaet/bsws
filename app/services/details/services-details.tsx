import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import { useParams } from "react-router";
import data from "../../../lib/data.json";
import ServicesDetailsHero from "./services-details-hero";
import ServicesDetailsPriceListDetails from "./services-details-price-list-details";
import ServicesDetailsServiceDetails from "./services-details-service-details";

type ServicesDetailsParams = { id?: string };

export default function ServicesDetails({ packageId }: { packageId?: string }) {
  const params = useParams();
  const id = packageId ?? (params as ServicesDetailsParams).id;

  const servicesData = (data as ServicesData).services;
  const overview = servicesData.overview;
  const engagementPackages = servicesData.engagementPackages.items;

  const selectedPackage = id
    ? engagementPackages.find((p) => p.id === id)
    : undefined;

  if (!selectedPackage) {
    throw new Response("Service package not found", { status: 404 });
  }

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="pt-20"
    >
      <ServicesDetailsHero selectedPackage={selectedPackage} />

      <section className="py-20 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <div className="mb-12 flex flex-wrap gap-3">
            <a
              href="#service-details"
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors scroll-mt-24"
            >
              Service Details
            </a>
            <a
              href="#price-list-details"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors scroll-mt-24"
            >
              Price List Details
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <ServicesDetailsServiceDetails overview={overview} />

              <ServicesDetailsPriceListDetails
                selectedPackage={selectedPackage}
              />
            </div>

            <aside className="space-y-8">
              <div className="p-8 bg-slate-900 rounded-3xl text-white">
                <h4 className="text-xl font-bold mb-6">Engagement Timeline</h4>

                <div className="space-y-8 relative">
                  <div className="flex gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0 z-10">
                      01
                    </div>
                    <div>
                      <h5 className="font-bold">Discovery &amp; Audit</h5>
                      <p className="text-xs text-slate-400 mt-1">
                        Weeks 1-2: Internal assessment &amp; stakeholder
                        interviews.
                      </p>
                    </div>
                    <div className="absolute left-4 top-8 w-px h-8 bg-slate-700" />
                  </div>

                  <div className="flex gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 z-10">
                      02
                    </div>
                    <div>
                      <h5 className="font-bold">Strategy Synthesis</h5>
                      <p className="text-xs text-slate-400 mt-1">
                        Weeks 3-6: Market research and roadmap development.
                      </p>
                    </div>
                    <div className="absolute left-4 top-8 w-px h-8 bg-slate-700" />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 z-10">
                      03
                    </div>
                    <div>
                      <h5 className="font-bold">Final Implementation</h5>
                      <p className="text-xs text-slate-400 mt-1">
                        Weeks 7-10: Handover and execution training.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-slate-200 rounded-3xl space-y-6">
                <h4 className="text-xl font-bold text-slate-900">
                  Specialized Consultant
                </h4>

                <div className="flex items-center gap-4">
                  <img
                    src="/images/team/dev1.jpg"
                    alt="Dr. Karlheinz"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <h5 className="font-bold text-slate-900">
                      Dr. Karlheinz
                    </h5>
                    <p className="text-slate-500">
                      Talent Acquisition, Strategy
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 italic">
                  "We don't just look at the numbers; we look at the culture and
                  the capability to ensure every strategy we build can actually
                  cross the finish line."
                </p>

                <Link
                  to="/team"
                  id="sidebar-team-link"
                  className="text-blue-600 text-sm font-bold flex items-center gap-2"
                >
                  View full team{" "}
                  <FaArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-10">
            <IoSparkles className="w-10 h-10" aria-hidden="true" />
          </div>

          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Ready to architect your market dominance?
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Join 500+ global leaders who have transformed their business
            outcomes through the Block Sherpa framework.
          </p>

          <div className="flex justify-center gap-4 pt-4 flex-wrap">
            <Link
              to="/#contact"
              id="cta-bottom-btn"
              className="px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-3 justify-center"
            >
              <span>Book Strategy Workshop</span>
              <FiCalendar className="w-5 h-5" aria-hidden="true" />
            </Link>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FiClock className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span>Response time: within 1-2 business days</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}






// import React from "react";

// import { FaArrowRight } from "react-icons/fa";

// import { FiCalendar, FiClock } from "react-icons/fi";

// import { IoSparkles } from "react-icons/io5";

// import { useParams } from "react-router";

// import data from "../../../lib/data.json";

// import ServicesDetailsHero from "./services-details-hero";

// import ServicesDetailsPriceListDetails from "./services-details-price-list-details";

// import ServicesDetailsServiceDetails from "./services-details-service-details";

// type ServicesDetailsParams = { id?: string };

// export default function ServicesDetails({ packageId }: { packageId?: string }) {
//   const params = useParams();
//   const id = packageId ?? (params as ServicesDetailsParams).id;

//   const servicesData = (data as ServicesData).services;
//   const overview = servicesData.overview;
//   const engagementPackages = servicesData.engagementPackages.items;

//   const selectedPackage = id
//     ? engagementPackages.find((p) => p.id === id)
//     : undefined;

//   if (!selectedPackage) {
//     throw new Response("Service package not found", { status: 404 });
//   }

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="pt-20"
//     >
//       <ServicesDetailsHero selectedPackage={selectedPackage} />

//       <section className="py-20 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="mb-12 flex flex-wrap gap-3">
//             <a
//               href="#service-details"
//               className="px-4 py-2 rounded-xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors scroll-mt-24"
//             >
//               Service Details
//             </a>
//             <a
//               href="#price-list-details"
//               className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors scroll-mt-24"
//             >
//               Price List Details
//             </a>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-16">
//             <div className="lg:col-span-2 space-y-12">
//               <ServicesDetailsServiceDetails overview={overview} />

//               <ServicesDetailsPriceListDetails
//                 selectedPackage={selectedPackage}
//               />
//             </div>

//             <aside className="space-y-8">
//               <div className="p-8 bg-slate-900 rounded-3xl text-white">
//                 <h4 className="text-xl font-bold mb-6">Engagement Timeline</h4>

//                 <div className="space-y-8 relative">
//                   <div className="flex gap-4 relative">
//                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0 z-10">
//                       01
//                     </div>
//                     <div>
//                       <h5 className="font-bold">Discovery &amp; Audit</h5>
//                       <p className="text-xs text-slate-400 mt-1">
//                         Weeks 1-2: Internal assessment &amp; stakeholder
//                         interviews.
//                       </p>
//                     </div>
//                     <div className="absolute left-4 top-8 w-px h-8 bg-slate-700" />
//                   </div>

//                   <div className="flex gap-4 relative">
//                     <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 z-10">
//                       02
//                     </div>
//                     <div>
//                       <h5 className="font-bold">Strategy Synthesis</h5>
//                       <p className="text-xs text-slate-400 mt-1">
//                         Weeks 3-6: Market research and roadmap development.
//                       </p>
//                     </div>
//                     <div className="absolute left-4 top-8 w-px h-8 bg-slate-700" />
//                   </div>

//                   <div className="flex gap-4">
//                     <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 z-10">
//                       03
//                     </div>
//                     <div>
//                       <h5 className="font-bold">Final Implementation</h5>
//                       <p className="text-xs text-slate-400 mt-1">
//                         Weeks 7-10: Handover and execution training.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-8 border border-slate-200 rounded-3xl space-y-6">
//                 <h4 className="text-xl font-bold text-slate-900">
//                   Specialized Consultant
//                 </h4>

//                 <div className="flex items-center gap-4">
//                   <img
//                     src="/images/team/dev1.jpg"
//                     alt="Marek Vance"
//                     className="w-14 h-14 rounded-full object-cover"
//                   />
//                   <div className="text-sm">
//                     <h5 className="font-bold text-slate-900">
//                       Dr. Karlheinz
//                     </h5>
//                     <p className="text-slate-500">
//                     Talent Acquisition, Strategy
//                     </p>
//                   </div>
//                 </div>

//                 <p className="text-sm text-slate-600 italic">
//                   "We don't just look at the numbers; we look at the culture and
//                   the capability to ensure every strategy we build can actually
//                   cross the finish line."
//                 </p>

//                 <a
//                   href="/#team"
//                   id="sidebar-team-link"
//                   className="text-blue-600 text-sm font-bold flex items-center gap-2"
//                 >
//                   View full team{" "}
//                   <FaArrowRight className="w-4 h-4" aria-hidden="true" />
//                 </a>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-white border-t border-slate-100">
//         <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
//           <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-10">
//             <IoSparkles className="w-10 h-10" aria-hidden="true" />
//           </div>

//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//             Ready to architect your market dominance?
//           </h2>
//           <p className="text-xl text-slate-500 max-w-2xl mx-auto">
//             Join 500+ global leaders who have transformed their business
//             outcomes through the BlockSherpa framework.
//           </p>

//           <div className="flex justify-center gap-4 pt-4 flex-wrap">
//             <a
//               href="/#contact"
//               id="cta-bottom-btn"
//               className="px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-3 justify-center"
//             >
//               <span>Book Strategy Workshop</span>
//               <FiCalendar className="w-5 h-5" aria-hidden="true" />
//             </a>

//             <div className="flex items-center gap-2 text-sm text-slate-400">
//               <FiClock className="w-4 h-4 text-blue-400" aria-hidden="true" />
//               <span>Response time: within 1-2 business days</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
