import { Link } from "react-router";
import { FiCalendar, FiChevronRight } from "react-icons/fi";

type ServicesDetailsHeroProps = {
  selectedPackage: ServicesData["services"]["engagementPackages"]["items"][number];
};

export default function ServicesDetailsHero({
  selectedPackage,
}: ServicesDetailsHeroProps) {
  return (
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
          <Link
            to="/services"
            className="hover:text-white"
            id="breadcrumb-services"
          >
            Services
          </Link>
        </nav>

        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {selectedPackage.name}
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed">
            {selectedPackage.description}
          </p>

          <div className="flex items-center gap-6 pt-4 flex-wrap">
            <Link
              to="/#contact"
              id="hero-book-btn"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              {selectedPackage.ctaLabel}
            </Link>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FiCalendar
                className="w-5 h-5 text-blue-400"
                aria-hidden="true"
              />
              <span>
                {selectedPackage.priceMain}
                <span className="text-slate-400">
                  {selectedPackage.priceSuffix}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// import { FiCalendar, FiChevronRight } from "react-icons/fi";

// type ServicesDetailsHeroProps = {
//   selectedPackage: ServicesData["services"]["engagementPackages"]["items"][number];
// };

// export default function ServicesDetailsHero({
//   selectedPackage,
// }: ServicesDetailsHeroProps) {
//   return (
//     <section className="hero-gradient py-24 relative overflow-hidden">
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//       </div>

//       <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10 text-white">
//         <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
//           <a href="/" className="hover:text-white" id="breadcrumb-home">
//             Home
//           </a>
//           <FiChevronRight className="w-4 h-4" aria-hidden="true" />
//           <a
//             href="/services"
//             className="hover:text-white"
//             id="breadcrumb-services"
//           >
//             Services
//           </a>
//         </nav>

//         <div className="max-w-3xl space-y-6">
//           <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
//             {selectedPackage.name}
//           </h1>

//           <p className="text-xl text-slate-300 leading-relaxed">
//             {selectedPackage.description}
//           </p>

//           <div className="flex items-center gap-6 pt-4 flex-wrap">
//             <a
//               href="/#contact"
//               id="hero-book-btn"
//               className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
//             >
//               {selectedPackage.ctaLabel}
//             </a>

//             <div className="flex items-center gap-2 text-sm text-slate-400">
//               <FiCalendar
//                 className="w-5 h-5 text-blue-400"
//                 aria-hidden="true"
//               />
//               <span>
//                 {selectedPackage.priceMain}
//                 <span className="text-slate-400">
//                   {selectedPackage.priceSuffix}
//                 </span>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
