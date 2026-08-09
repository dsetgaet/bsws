import { Link } from "react-router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

// Your Calendly link - REPLACE WITH YOUR ACTUAL CALENDLY LINK
// Format: https://calendly.com/your-username/event-name
const CALENDLY_URL = "https://calendly.com/blockcsherpa/blocksherpa-discovery-call-30-min";

export default function ServiceSchedulePage({ slug }: { slug?: string }) {
  // Handle booking - redirect to Calendly
  const handleBookOnCalendly = () => {
    // Open Calendly in a new tab
    window.open(CALENDLY_URL, "_blank");
  };

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="grow pt-32 pb-10 bg-slate-50"
    >
      <div className="max-w-full-sm xl:container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12 text-center lg:text-left">
          <Link
            to={`/services/${slug}`}
            id="back-to-service-link"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Service Details
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Book a Discovery Call with Block Sherpa
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl">
            Select your preferred time below. You will be redirected to Calendly to complete your booking with our Web3 experts.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Calendly Booking Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
              {/* Icon */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-10 h-10 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Schedule Your Consultation
                </h3>
                <p className="text-slate-500">
                  Choose a time that works best for you. Our Web3 experts are available for 30-minute discovery calls.
                </p>
              </div>

              {/* Calendly Booking Button */}
              <button
                onClick={handleBookOnCalendly}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Book on Calendly
                <FaArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-slate-400 mt-4">
                You will be redirected to Calendly to select your preferred date and time. A Zoom link will be generated automatically.
              </p>
            </div>

            {/* How It Works Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">1</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">Book a Time</h4>
                  <p className="text-sm text-slate-500">
                    Click the button above and select your preferred date and time on Calendly.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">2</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">Get Confirmation</h4>
                  <p className="text-sm text-slate-500">
                    Receive an email confirmation with a unique Zoom meeting link for your consultation.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">3</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">Join the Call</h4>
                  <p className="text-sm text-slate-500">
                    Click the Zoom link at your scheduled time and meet with our expert.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Why Book With Us */}
          <div className="space-y-8">
            <div className="bg-blue-600 p-8 rounded-3xl text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  <FiInfo aria-hidden="true" />
                </div>
                <h4 className="text-lg font-bold">Why book with us?</h4>
              </div>

              <ul className="space-y-4 text-sm text-blue-100">
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-blue-300 mt-1" />
                  <span>Immediate Web3 expert feedback on your current strategy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-blue-300 mt-1" />
                  <span>Personalized blockchain growth roadmap tailored to your industry.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-blue-300 mt-1" />
                  <span>Access to our proprietary Web3 analytics dashboard demo.</span>
                </li>
              </ul>
            </div>

            {/* What's Included */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-3">What's Included?</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 w-4 h-4" />
                  30-minute discovery call
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 w-4 h-4" />
                  Zoom video consultation
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 w-4 h-4" />
                  Personalized next-step recommendations
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 w-4 h-4" />
                  Follow-up email with resources
                </li>
              </ul>
            </div>

            {/* Need Help? */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Need help?</h4>
              <p className="text-sm text-slate-500 mb-3">
                Having trouble booking? Contact us directly.
              </p>
              <a
                href="mailto:hello@blockcsherpa.dev"
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                hello@blockcsherpa.dev
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}






// // import React from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { FiCheckCircle, FiInfo } from "react-icons/fi";
// import { useNavigate } from "react-router";
// import { slugifyServiceTitle } from "../../../../../lib/service-slug";

// // Your Calendly link - REPLACE WITH YOUR ACTUAL CALENDLY LINK
// // Format: https://calendly.com/your-username/event-name
// const CALENDLY_URL = "https://calendly.com/blockcsherpa/blocksherpa-discovery-call-30-min";

// export default function ServiceSchedulePage({ slug }: { slug?: string }) {
//   const navigate = useNavigate();

//   // Handle booking - redirect to Calendly
//   const handleBookOnCalendly = () => {
//     // Open Calendly in a new tab
//     window.open(CALENDLY_URL, "_blank");
    
//     // Optional: Navigate back to service page or show a confirmation modal
//     // navigate(`/services/${slug}`);
//   };

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="grow pt-32 pb-10 bg-slate-50"
//     >
//       <div className="max-w-full-sm xl:container mx-auto px-6">
//         {/* Header Section */}
//         <div className="mb-12 text-center lg:text-left">
//           <a
//             href={`/services/${slug}`}
//             id="back-to-service-link"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mb-4"
//           >
//             <FaArrowLeft className="w-4 h-4" />
//             Back to Service Details
//           </a>

//           <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
//             Book a Discovery Call with BlockSherpa
//           </h1>
//           <p className="text-slate-500 mt-4 max-w-2xl">
//             Select your preferred time below. You will be redirected to Calendly to complete your booking with our Web3 experts.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Content - Calendly Booking Card */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
//               {/* Icon */}
//               <div className="mb-6">
//                 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg 
//                     className="w-10 h-10 text-blue-600" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round" 
//                       strokeWidth={2} 
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-2">
//                   Schedule Your Consultation
//                 </h3>
//                 <p className="text-slate-500">
//                   Choose a time that works best for you. Our Web3 experts are available for 30-minute discovery calls.
//                 </p>
//               </div>

//               {/* Calendly Booking Button */}
//               <button
//                 onClick={handleBookOnCalendly}
//                 className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
//               >
//                 Book on Calendly
//                 <FaArrowRight className="w-5 h-5" />
//               </button>

//               <p className="text-xs text-slate-400 mt-4">
//                 You will be redirected to Calendly to select your preferred date and time. A Zoom link will be generated automatically.
//               </p>
//             </div>

//             {/* How It Works Section */}
//             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
//                 How It Works
//               </h3>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <span className="text-blue-600 font-bold text-xl">1</span>
//                   </div>
//                   <h4 className="font-bold text-slate-900 mb-1">Book a Time</h4>
//                   <p className="text-sm text-slate-500">
//                     Click the button above and select your preferred date and time on Calendly.
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <span className="text-blue-600 font-bold text-xl">2</span>
//                   </div>
//                   <h4 className="font-bold text-slate-900 mb-1">Get Confirmation</h4>
//                   <p className="text-sm text-slate-500">
//                    Receive an email confirmation with a unique Zoom meeting link for your consultation.
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <span className="text-blue-600 font-bold text-xl">3</span>
//                   </div>
//                   <h4 className="font-bold text-slate-900 mb-1">Join the Call</h4>
//                   <p className="text-sm text-slate-500">
//                    Click the Zoom link at your scheduled time and meet with our expert.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar - Why Book With Us */}
//           <div className="space-y-8">
//             <div className="bg-blue-600 p-8 rounded-3xl text-white">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
//                   <FiInfo aria-hidden="true" />
//                 </div>
//                 <h4 className="text-lg font-bold">Why book with us?</h4>
//               </div>

//               <ul className="space-y-4 text-sm text-blue-100">
//                 <li className="flex items-start gap-3">
//                   <FiCheckCircle className="text-blue-300 mt-1" />
//                   <span>Immediate Web3 expert feedback on your current strategy.</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <FiCheckCircle className="text-blue-300 mt-1" />
//                   <span>Personalized blockchain growth roadmap tailored to your industry.</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <FiCheckCircle className="text-blue-300 mt-1" />
//                   <span>Access to our proprietary Web3 analytics dashboard demo.</span>
//                 </li>
//               </ul>
//             </div>

//             {/* What's Included */}
//             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
//               <h4 className="font-bold text-slate-900 mb-3">What's Included?</h4>
//               <ul className="space-y-2 text-sm text-slate-600">
//                 <li className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500 w-4 h-4" />
//                   30-minute discovery call
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500 w-4 h-4" />
//                   Zoom video consultation                </li>
//                 <li className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500 w-4 h-4" />
//                   Personalized next-step recommendations
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500 w-4 h-4" />
//                   Follow-up email with resources
//                 </li>
//               </ul>
//             </div>

//             {/* Need Help? */}
//             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
//               <h4 className="font-bold text-slate-900 mb-2">Need help?</h4>
//               <p className="text-sm text-slate-500 mb-3">
//                 Having trouble booking? Contact us directly.
//               </p>
//               <a
//                 href="mailto:hello@blockcsherpa.dev"
//                 className="text-blue-600 text-sm font-semibold hover:underline"
//               >
//                 hello@blockcsherpa.dev
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }