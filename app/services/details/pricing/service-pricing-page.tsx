import React from "react";
import { Link } from "react-router";
import { FiCalendar, FiChevronRight } from "react-icons/fi";
import { slugifyServiceTitle } from "../../../../lib/service-slug";
import {
  getServicesData,
  requireServiceBySlug,
} from "../../../../service/services.service";

export default function ServicePricingPage({ slug }: { slug?: string }) {
  const service = requireServiceBySlug(slug);
  const servicesData = getServicesData();
  const engagementPackages = servicesData.engagementPackages;

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="pt-20"
    >
      <section className="hero-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
        </div>

        <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10 text-white">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link to="/" className="hover:text-white" id="breadcrumb-home">
              Home
            </Link>
            <FiChevronRight className="w-4 h-4" aria-hidden="true" />
            <Link to="/services" className="hover:text-white">
              Services
            </Link>
            <FiChevronRight className="w-4 h-4" aria-hidden="true" />
            <Link
              to={`/services/${slugifyServiceTitle(service.title)}`}
              className="hover:text-white"
            >
              {service.title}
            </Link>
            <FiChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-blue-400">Price List</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Price List
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Package options for{" "}
              <span className="text-white font-bold">{service.title}</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-full-sm xl:container mx-auto px-6 text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Engagement Packages
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">
            {engagementPackages.heading}
          </h2>
        </div>

        <div className="max-w-full-sm xl:container mx-auto px-6 grid lg:grid-cols-3 gap-8">
          {engagementPackages.items.map((pkg) => (
            <div
              key={pkg.id}
              className={
                pkg.isFeatured
                  ? "bg-slate-900 p-10 rounded-3xl border border-blue-600/30 shadow-2xl flex flex-col transform lg:scale-105 relative"
                  : "bg-white p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col"
              }
            >
              {pkg.isFeatured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  {pkg.badgeText}
                </div>
              )}
              <h3
                className={`text-xl font-bold mb-2 ${
                  pkg.isFeatured ? "text-white" : "text-slate-900"
                }`}
              >
                {pkg.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  pkg.isFeatured ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {pkg.description}
              </p>
              <div
                className={`text-4xl font-black mb-8 ${
                  pkg.isFeatured ? "text-white" : "text-slate-900"
                }`}
              >
                {pkg.priceMain}
                <span
                  className={`text-lg font-normal ${
                    pkg.isFeatured ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {pkg.priceSuffix}
                </span>
              </div>

              <ul className="space-y-4 mb-10 grow">
                {pkg.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={`flex items-center gap-3 text-sm ${
                      feature.included
                        ? pkg.isFeatured
                          ? "text-slate-300"
                          : "text-slate-600"
                        : "text-slate-400 line-through"
                    }`}
                  >
                    <span
                      className={
                        feature.included
                          ? pkg.isFeatured
                            ? "text-blue-400"
                            : "text-green-500"
                          : "text-slate-300"
                      }
                      aria-hidden="true"
                    >
                      {feature.included ? "✓" : "✕"}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              <Link
                to={`/services/${slugifyServiceTitle(service.title)}/schedule`}
                className={
                  pkg.isFeatured
                    ? "w-full py-4 text-center bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
                    : "w-full py-4 text-center border border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all"
                }
              >
                {pkg.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Tell us what you're working on and we'll recommend the best package.
          </p>

          <div className="flex justify-center gap-4 pt-4 flex-wrap">
            <Link
              to={`/services/${slugifyServiceTitle(service.title)}/schedule`}
              className="px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-3 justify-center"
            >
              Book a Consultation{" "}
              <FiCalendar className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              to={`/services/${slugifyServiceTitle(service.title)}`}
              className="px-10 py-5 border border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all"
            >
              Back to Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}






// import React from "react";

// import { FiCalendar, FiChevronRight } from "react-icons/fi";

// import { slugifyServiceTitle } from "../../../../lib/service-slug";

// import {
//   getServicesData,
//   requireServiceBySlug,
// } from "../../../../service/services.service";

// export default function ServicePricingPage({ slug }: { slug?: string }) {
//   const service = requireServiceBySlug(slug);
//   const servicesData = getServicesData();
//   const engagementPackages = servicesData.engagementPackages;

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="pt-20"
//     >
//       <section className="hero-gradient py-24 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10 text-white">
//           <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
//             <a href="/" className="hover:text-white" id="breadcrumb-home">
//               Home
//             </a>
//             <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//             <a href="/services" className="hover:text-white">
//               Services
//             </a>
//             <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//             <a
//               href={`/services/${slugifyServiceTitle(service.title)}`}
//               className="hover:text-white"
//             >
//               {service.title}
//             </a>
//             <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//             <span className="text-blue-400">Price List</span>
//           </nav>

//           <div className="max-w-3xl space-y-6">
//             <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
//               Price List
//             </h1>
//             <p className="text-xl text-slate-300 leading-relaxed">
//               Package options for{" "}
//               <span className="text-white font-bold">{service.title}</span>.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-slate-50">
//         <div className="max-w-full-sm xl:container mx-auto px-6 text-center mb-16">
//           <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
//             Engagement Packages
//           </span>
//           <h2 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">
//             {engagementPackages.heading}
//           </h2>
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 grid lg:grid-cols-3 gap-8">
//           {engagementPackages.items.map((pkg) => (
//             <div
//               key={pkg.id}
//               className={
//                 pkg.isFeatured
//                   ? "bg-slate-900 p-10 rounded-3xl border border-blue-600/30 shadow-2xl flex flex-col transform lg:scale-105 relative"
//                   : "bg-white p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col"
//               }
//             >
//               {pkg.isFeatured && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
//                   {pkg.badgeText}
//                 </div>
//               )}
//               <h3
//                 className={`text-xl font-bold mb-2 ${
//                   pkg.isFeatured ? "text-white" : "text-slate-900"
//                 }`}
//               >
//                 {pkg.name}
//               </h3>
//               <p
//                 className={`text-sm mb-6 ${
//                   pkg.isFeatured ? "text-slate-400" : "text-slate-500"
//                 }`}
//               >
//                 {pkg.description}
//               </p>
//               <div
//                 className={`text-4xl font-black mb-8 ${
//                   pkg.isFeatured ? "text-white" : "text-slate-900"
//                 }`}
//               >
//                 {pkg.priceMain}
//                 <span
//                   className={`text-lg font-normal ${
//                     pkg.isFeatured ? "text-slate-500" : "text-slate-400"
//                   }`}
//                 >
//                   {pkg.priceSuffix}
//                 </span>
//               </div>

//               <ul className="space-y-4 mb-10 grow">
//                 {pkg.features.map((feature) => (
//                   <li
//                     key={feature.text}
//                     className={`flex items-center gap-3 text-sm ${
//                       feature.included
//                         ? pkg.isFeatured
//                           ? "text-slate-300"
//                           : "text-slate-600"
//                         : "text-slate-400 line-through"
//                     }`}
//                   >
//                     <span
//                       className={
//                         feature.included
//                           ? pkg.isFeatured
//                             ? "text-blue-400"
//                             : "text-green-500"
//                           : "text-slate-300"
//                       }
//                       aria-hidden="true"
//                     >
//                       {feature.included ? "✓" : "✕"}
//                     </span>
//                     {feature.text}
//                   </li>
//                 ))}
//               </ul>

//               <a
//                 href={`/services/${slugifyServiceTitle(service.title)}/schedule`}
//                 className={
//                   pkg.isFeatured
//                     ? "w-full py-4 text-center bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
//                     : "w-full py-4 text-center border border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all"
//                 }
//               >
//                 {pkg.ctaLabel}
//               </a>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="py-20 bg-white border-t border-slate-100">
//         <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//             Ready to get started?
//           </h2>
//           <p className="text-xl text-slate-500 max-w-2xl mx-auto">
//             Tell us what you’re working on and we’ll recommend the best package.
//           </p>

//           <div className="flex justify-center gap-4 pt-4 flex-wrap">
//             <a
//               href={`/services/${slugifyServiceTitle(service.title)}/schedule`}
//               className="px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-3 justify-center"
//             >
//               Book a Consultation{" "}
//               <FiCalendar className="w-5 h-5" aria-hidden="true" />
//             </a>
//             <a
//               href={`/services/${slugifyServiceTitle(service.title)}`}
//               className="px-10 py-5 border border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all"
//             >
//               Back to Details
//             </a>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
