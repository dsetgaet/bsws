import React from "react";
import { Link } from "react-router";
import {
  FiCalendar,
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiFileText,
  FiInfo,
  FiUploadCloud,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import { useLocation } from "react-router";
import { getBookingConfirmedViewModel } from "../../../../../../service/services.service";

export default function ServiceBookingConfirmedPage({
  slug,
}: {
  slug?: string;
}) {
  const location = useLocation();
  const vm = React.useMemo(
    () => getBookingConfirmedViewModel({ slug, search: location.search }),
    [slug, location.search],
  );

  const copyMeetingLink = async () => {
    try {
      await navigator.clipboard.writeText(vm.meetingLink);
    } catch {
      // ignore
    }
  };

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 pt-32 pb-24 relative bg-slate-50"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 pointer-events-none">
        <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,#3B82F6_0%,transparent_70%)]" />
      </div>

      <div className="max-w-full-sm xl:container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4">
            <FiCheckCircle className="text-5xl" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Your Consultation is Confirmed
          </h1>
          <p className="text-lg text-slate-600">
            Confirmation ID:{" "}
            <span className="font-bold text-slate-900 tracking-wider">
              {vm.confirmationId}
            </span>
          </p>

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <a
              href="#"
              id="btn-cal-google"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
              onClick={(e) => e.preventDefault()}
            >
              <FiCalendar className="text-xl" aria-hidden="true" /> Add to
              Google Calendar
            </a>
            <a
              href="#"
              id="btn-cal-outlook"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
              onClick={(e) => e.preventDefault()}
            >
              <FiCalendar className="text-xl" aria-hidden="true" /> Add to
              Outlook
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <FiCalendar className="text-blue-600" aria-hidden="true" />{" "}
                Meeting Details
              </h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Date &amp; Time
                    </label>
                    <p className="text-xl font-bold text-slate-900 mt-1">
                      {vm.dateLabel}
                    </p>
                    <p className="text-slate-600">{vm.timeRangeLabel} (EST)</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Meeting Link
                    </label>
                    <div className="flex items-center gap-3 mt-1 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-all">
                      <span className="text-blue-600 font-medium truncate">
                        {vm.meetingLink}
                      </span>
                      <button
                        type="button"
                        className="ml-auto text-slate-400 hover:text-blue-600"
                        aria-label="Copy meeting link"
                        onClick={copyMeetingLink}
                      >
                        <FiCopy aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Format:{" "}
                      <span className="font-bold text-slate-600">
                        {vm.meetingFormat === "virtual" ? "Virtual" : "In-Person"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden">
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          vm.consultant?.imageSrc ??
                          "/images/team/dev1.jpg"
                        }
                        alt={vm.consultant?.imageAlt ?? vm.consultantName}
                        className="w-16 h-16 rounded-full border-2 border-white/20 object-cover"
                      />
                      <div className="space-y-1">
                        <h4 className="font-bold">{vm.consultantName}</h4>
                        <p className="text-xs text-slate-400 uppercase tracking-tighter">
                          {vm.consultant?.role ?? "Senior Strategic Partner"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link
                        to="/team"
                        id="btn-view-team-profile"
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-all"
                      >
                        View Full Expertise Profile{" "}
                        <FiExternalLink aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  <div className="absolute -right-8 -bottom-8 opacity-10">
                    <FiUsers className="text-9xl" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Meeting Agenda Highlights
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <div
                    className="text-2xl text-blue-600 mb-2"
                    aria-hidden="true"
                  >
                    ⌕
                  </div>
                  <h5 className="font-bold text-sm text-slate-900">
                    Market Audit
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Review of current position and competitive landscape.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div
                    className="text-2xl text-slate-600 mb-2"
                    aria-hidden="true"
                  >
                    ↗
                  </div>
                  <h5 className="font-bold text-sm text-slate-900">
                    Growth Mapping
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Identifying high-impact opportunities for Q4.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div
                    className="text-2xl text-slate-600 mb-2"
                    aria-hidden="true"
                  >
                    ✓
                  </div>
                  <h5 className="font-bold text-sm text-slate-900">
                    Risk Mitigation
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Discussing strategic safeguards and execution hurdles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-8">Next Steps</h3>

              <div className="space-y-8">
                <div className="flex gap-4 relative">
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-700" />
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 z-10">
                    <FiFileText className="text-lg" aria-hidden="true" />
                  </div>
                  <div>
                    <h5 className="font-bold">Complete Briefing Form</h5>
                    <p className="text-sm text-slate-400 mt-1">
                      Please provide deeper context on your current business
                      model.
                    </p>
                    <Link
                      to="/#contact"
                      id="step-link-form"
                      className="inline-block mt-3 text-sm text-blue-400 font-bold hover:underline"
                    >
                      Go to Form &rarr;
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-700" />
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 z-10">
                    <FiUploadCloud className="text-lg" aria-hidden="true" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-300">
                      Upload Documents
                    </h5>
                    <p className="text-sm text-slate-500 mt-1">
                      Upload any relevant financial statements or project
                      briefs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 z-10">
                    <FiVideo className="text-lg" aria-hidden="true" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-300">Join the Call</h5>
                    <p className="text-sm text-slate-500 mt-1">
                      {vm.dateLabel}. We recommend joining 5 mins early.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <FiInfo className="text-2xl text-blue-600" aria-hidden="true" />
                <h4 className="font-bold text-slate-900">
                  Need to Reschedule?
                </h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                We understand that plans change. You can reschedule or cancel
                your session up to 12 hours before the start time.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={vm.rescheduleHref}
                  id="btn-reschedule"
                  className="w-full py-3 bg-slate-50 text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all text-center"
                >
                  Manage Appointment
                </a>
                <Link
                  to="/#contact"
                  id="btn-contact-support"
                  className="w-full py-3 border border-slate-200 text-slate-500 font-medium text-sm rounded-xl hover:bg-slate-50 transition-all text-center"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}







// import React from "react";

// import {
//   FiCalendar,
//   FiCheckCircle,
//   FiCopy,
//   FiExternalLink,
//   FiFileText,
//   FiInfo,
//   FiUploadCloud,
//   FiUsers,
//   FiVideo,
// } from "react-icons/fi";

// import { useLocation } from "react-router";

// import { getBookingConfirmedViewModel } from "../../../../../../service/services.service";

// export default function ServiceBookingConfirmedPage({
//   slug,
// }: {
//   slug?: string;
// }) {
//   const location = useLocation();
//   const vm = React.useMemo(
//     () => getBookingConfirmedViewModel({ slug, search: location.search }),
//     [slug, location.search],
//   );

//   const copyMeetingLink = async () => {
//     try {
//       await navigator.clipboard.writeText(vm.meetingLink);
//     } catch {
//       // ignore
//     }
//   };

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1 pt-32 pb-24 relative bg-slate-50"
//     >
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 pointer-events-none">
//         <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,#3B82F6_0%,transparent_70%)]" />
//       </div>

//       <div className="max-w-full-sm xl:container mx-auto px-6">
//         <div className="text-center mb-16 space-y-4">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4">
//             <FiCheckCircle className="text-5xl" aria-hidden="true" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
//             Your Consultation is Confirmed
//           </h1>
//           <p className="text-lg text-slate-600">
//             Confirmation ID:{" "}
//             <span className="font-bold text-slate-900 tracking-wider">
//               {vm.confirmationId}
//             </span>
//           </p>

//           <div className="flex justify-center gap-4 mt-8 flex-wrap">
//             <a
//               href="#"
//               id="btn-cal-google"
//               className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
//               onClick={(e) => e.preventDefault()}
//             >
//               <FiCalendar className="text-xl" aria-hidden="true" /> Add to
//               Google Calendar
//             </a>
//             <a
//               href="#"
//               id="btn-cal-outlook"
//               className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
//               onClick={(e) => e.preventDefault()}
//             >
//               <FiCalendar className="text-xl" aria-hidden="true" /> Add to
//               Outlook
//             </a>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
//               <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
//                 <FiCalendar className="text-blue-600" aria-hidden="true" />{" "}
//                 Meeting Details
//               </h2>

//               <div className="grid md:grid-cols-2 gap-12">
//                 <div className="space-y-6">
//                   <div>
//                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//                       Date &amp; Time
//                     </label>
//                     <p className="text-xl font-bold text-slate-900 mt-1">
//                       {vm.dateLabel}
//                     </p>
//                     <p className="text-slate-600">{vm.timeRangeLabel} (EST)</p>
//                   </div>

//                   <div>
//                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//                       Meeting Link
//                     </label>
//                     <div className="flex items-center gap-3 mt-1 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-all">
//                       <span className="text-blue-600 font-medium truncate">
//                         {vm.meetingLink}
//                       </span>
//                       <button
//                         type="button"
//                         className="ml-auto text-slate-400 hover:text-blue-600"
//                         aria-label="Copy meeting link"
//                         onClick={copyMeetingLink}
//                       >
//                         <FiCopy aria-hidden="true" />
//                       </button>
//                     </div>
//                     <p className="mt-2 text-xs text-slate-400">
//                       Format:{" "}
//                       <span className="font-bold text-slate-600">
//                         {vm.meetingFormat === "virtual" ? "Virtual" : "In-Person"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden">
//                   <div className="relative z-10 flex flex-col h-full justify-between">
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={
//                           vm.consultant?.imageSrc ??
//                           "/images/team/dev1.jpg"
//                         }
//                         alt={vm.consultant?.imageAlt ?? vm.consultantName}
//                         className="w-16 h-16 rounded-full border-2 border-white/20 object-cover"
//                       />
//                       <div className="space-y-1">
//                         <h4 className="font-bold">{vm.consultantName}</h4>
//                         <p className="text-xs text-slate-400 uppercase tracking-tighter">
//                           {vm.consultant?.role ?? "Senior Strategic Partner"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-8">
//                       <a
//                         href="/team"
//                         id="btn-view-team-profile"
//                         className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-all"
//                       >
//                         View Full Expertise Profile{" "}
//                         <FiExternalLink aria-hidden="true" />
//                       </a>
//                     </div>
//                   </div>

//                   <div className="absolute -right-8 -bottom-8 opacity-10">
//                     <FiUsers className="text-9xl" aria-hidden="true" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-6">
//                 Meeting Agenda Highlights
//               </h3>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
//                   <div
//                     className="text-2xl text-blue-600 mb-2"
//                     aria-hidden="true"
//                   >
//                     ⌕
//                   </div>
//                   <h5 className="font-bold text-sm text-slate-900">
//                     Market Audit
//                   </h5>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Review of current position and competitive landscape.
//                   </p>
//                 </div>
//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
//                   <div
//                     className="text-2xl text-slate-600 mb-2"
//                     aria-hidden="true"
//                   >
//                     ↗
//                   </div>
//                   <h5 className="font-bold text-sm text-slate-900">
//                     Growth Mapping
//                   </h5>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Identifying high-impact opportunities for Q4.
//                   </p>
//                 </div>
//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
//                   <div
//                     className="text-2xl text-slate-600 mb-2"
//                     aria-hidden="true"
//                   >
//                     ✓
//                   </div>
//                   <h5 className="font-bold text-sm text-slate-900">
//                     Risk Mitigation
//                   </h5>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Discussing strategic safeguards and execution hurdles.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-8">
//             <div className="bg-slate-900 rounded-3xl p-8 text-white">
//               <h3 className="text-xl font-bold mb-8">Next Steps</h3>

//               <div className="space-y-8">
//                 <div className="flex gap-4 relative">
//                   <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-700" />
//                   <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 z-10">
//                     <FiFileText className="text-lg" aria-hidden="true" />
//                   </div>
//                   <div>
//                     <h5 className="font-bold">Complete Briefing Form</h5>
//                     <p className="text-sm text-slate-400 mt-1">
//                       Please provide deeper context on your current business
//                       model.
//                     </p>
//                     <a
//                       href="/#contact"
//                       id="step-link-form"
//                       className="inline-block mt-3 text-sm text-blue-400 font-bold hover:underline"
//                     >
//                       Go to Form &rarr;
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 relative">
//                   <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-700" />
//                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 z-10">
//                     <FiUploadCloud className="text-lg" aria-hidden="true" />
//                   </div>
//                   <div>
//                     <h5 className="font-bold text-slate-300">
//                       Upload Documents
//                     </h5>
//                     <p className="text-sm text-slate-500 mt-1">
//                       Upload any relevant financial statements or project
//                       briefs.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 relative">
//                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 z-10">
//                     <FiVideo className="text-lg" aria-hidden="true" />
//                   </div>
//                   <div>
//                     <h5 className="font-bold text-slate-300">Join the Call</h5>
//                     <p className="text-sm text-slate-500 mt-1">
//                       {vm.dateLabel}. We recommend joining 5 mins early.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
//               <div className="flex items-center gap-4 mb-6">
//                 <FiInfo className="text-2xl text-blue-600" aria-hidden="true" />
//                 <h4 className="font-bold text-slate-900">
//                   Need to Reschedule?
//                 </h4>
//               </div>
//               <p className="text-sm text-slate-500 leading-relaxed mb-6">
//                 We understand that plans change. You can reschedule or cancel
//                 your session up to 12 hours before the start time.
//               </p>
//               <div className="flex flex-col gap-3">
//                 <a
//                   href={vm.rescheduleHref}
//                   id="btn-reschedule"
//                   className="w-full py-3 bg-slate-50 text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all text-center"
//                 >
//                   Manage Appointment
//                 </a>
//                 <a
//                   href="/#contact"
//                   id="btn-contact-support"
//                   className="w-full py-3 border border-slate-200 text-slate-500 font-medium text-sm rounded-xl hover:bg-slate-50 transition-all text-center"
//                 >
//                   Contact Support
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
