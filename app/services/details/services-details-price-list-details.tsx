import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

type ServicesDetailsPriceListDetailsProps = {
  selectedPackage: ServicesData["services"]["engagementPackages"]["items"][number];
};

export default function ServicesDetailsPriceListDetails({
  selectedPackage,
}: ServicesDetailsPriceListDetailsProps) {
  return (
    <div id="price-list-details" className="scroll-mt-24 space-y-6 pt-2">
      <h2 className="text-3xl font-bold text-slate-900">Price List Details</h2>

      <div className="p-10 bg-slate-50 border border-slate-100 rounded-3xl">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            {selectedPackage.isFeatured && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                {selectedPackage.badgeText}
              </div>
            )}

            <div className="text-3xl font-black text-slate-900">
              {selectedPackage.priceMain}
              <span className="text-lg font-normal text-slate-500">
                {selectedPackage.priceSuffix}
              </span>
            </div>

            <p className="text-sm text-slate-600 mt-2">
              {selectedPackage.description}
            </p>
          </div>

          <Link
            to="/services"
            className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:text-blue-700 transition-colors"
          >
            Back to services{" "}
            <FaArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="space-y-4 mt-8">
          {selectedPackage.features.map((feature) => (
            <li
              key={feature.text}
              className={`flex items-center gap-3 text-sm ${
                feature.included ? "text-slate-700" : "text-slate-400"
              }`}
            >
              <span
                className={
                  feature.included
                    ? "text-green-500"
                    : "text-slate-300 line-through"
                }
                aria-hidden="true"
              >
                {feature.included ? "✓" : "✕"}
              </span>
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// import { FaArrowRight } from "react-icons/fa";

// type ServicesDetailsPriceListDetailsProps = {
//   selectedPackage: ServicesData["services"]["engagementPackages"]["items"][number];
// };

// export default function ServicesDetailsPriceListDetails({
//   selectedPackage,
// }: ServicesDetailsPriceListDetailsProps) {
//   return (
//     <div id="price-list-details" className="scroll-mt-24 space-y-6 pt-2">
//       <h2 className="text-3xl font-bold text-slate-900">Price List Details</h2>

//       <div className="p-10 bg-slate-50 border border-slate-100 rounded-3xl">
//         <div className="flex items-start justify-between gap-6 flex-wrap">
//           <div>
//             {selectedPackage.isFeatured && (
//               <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
//                 {selectedPackage.badgeText}
//               </div>
//             )}

//             <div className="text-3xl font-black text-slate-900">
//               {selectedPackage.priceMain}
//               <span className="text-lg font-normal text-slate-500">
//                 {selectedPackage.priceSuffix}
//               </span>
//             </div>

//             <p className="text-sm text-slate-600 mt-2">
//               {selectedPackage.description}
//             </p>
//           </div>

//           <a
//             href="/services"
//             className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:text-blue-700 transition-colors"
//           >
//             Back to services{" "}
//             <FaArrowRight className="w-4 h-4" aria-hidden="true" />
//           </a>
//         </div>

//         <ul className="space-y-4 mt-8">
//           {selectedPackage.features.map((feature) => (
//             <li
//               key={feature.text}
//               className={`flex items-center gap-3 text-sm ${
//                 feature.included ? "text-slate-700" : "text-slate-400"
//               }`}
//             >
//               <span
//                 className={
//                   feature.included
//                     ? "text-green-500"
//                     : "text-slate-300 line-through"
//                 }
//                 aria-hidden="true"
//               >
//                 {feature.included ? "✓" : "✕"}
//               </span>
//               {feature.text}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
