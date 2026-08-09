import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { FiArrowLeft, FiBriefcase, FiMapPin, FiSend, FiX } from "react-icons/fi";
import data from "../../lib/data.json";

const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
const OPENINGS = workWithUsData.openings;
const OPENING_CONTENT = workWithUsData.openingDetails;

export default function WorkWithUsDetails({
  openingId,
}: {
  openingId?: string;
}) {
  const params = useParams();
  const id = openingId ?? (params as { id?: string }).id;

  const opening = OPENINGS.find((item) => item.id === id);
  if (!opening) {
    throw new Response("Opening not found", { status: 404 });
  }

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitMessageType, setSubmitMessageType] = useState<"success" | "error" | "">("");

  // Map category to openingDetails key
  const categoryToKey: Record<string, string> = {
    "Blockchain Development": "Blockchain",
    "Smart Contract Development Intern": "Smart Contract Intern",
    "Product Design": "Design",
    "Backend Engineering": "Backend",
    "Frontend Engineering": "Frontend",
    "Mobile Engineering": "Mobile",
    "AI Development": "AI-Developer",
    "AI-Assisted Development": "AI-Agent",
    "Systems Engineering":"Rust-Go-Engineer",
    "Product Design2":"VaultWise-Designer",
    "Technical Leadership":"TechLead-Pet360",
    "Project Management": "ProjectManager-Pet360"
  };

  const detailsKey = categoryToKey[opening.category] || "Strategy";
  const openingContent = OPENING_CONTENT[detailsKey];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      portfolio: "",
      message: "",
    });
    setSubmitMessage("");
    setSubmitMessageType("");
    setIsSubmitting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      setSubmitMessage("Please enter your full name.");
      setSubmitMessageType("error");
      setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
      return;
    }

    if (!formData.email.trim()) {
      setSubmitMessage("Please enter your email address.");
      setSubmitMessageType("error");
      setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage("Please enter a valid email address.");
      setSubmitMessageType("error");
      setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
      return;
    }

    // Simulate submission
    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      setSubmitMessage("Application submitted successfully! We'll review your application and get back to you soon.");
      setSubmitMessageType("success");

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        portfolio: "",
        message: "",
      });

      setIsSubmitting(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitMessage("");
        setSubmitMessageType("");
      }, 3000);

      // Close modal after 2 seconds
      setTimeout(() => {
        closeModal();
      }, 2000);
    }, 1500);
  };

  return (
    <main
      style={{ viewTransitionName: "main-content" } as React.CSSProperties}
      className="flex-1 pt-20"
    >
      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            
            <div className="p-5 sm:p-6">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Apply for {opening.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors hover:bg-slate-100 rounded-full"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-slate-500 text-sm mb-6">
                Fill out the form below to apply for the {opening.title} position.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Portfolio / LinkedIn / GitHub (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Portfolio / LinkedIn / GitHub <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="https://..."
                  />
                </div>

                {/* Cover Letter (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Cover Letter / Message <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    placeholder="Tell us why you'are interested in this role and what makes you a great fit for this position"
                  />
                </div>

         {/* Resume Required Notice - Aligned with Block Sherpa design */}
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div className="flex items-start gap-3">
    <svg className="w-5 h-5 text-black-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <div>
      <p className="text-sm font-semibold text-black-800">
        Resume/CV Required
      </p>
      <p className="text-sm text-black-700 mt-1">
        Please email your resume separately to <span className="font-mono font-bold text-black-800">hello@blockcsherpa.dev</span> after submitting the form.
      </p>
    </div>
  </div>
</div>

{submitMessage && (
  <div className={`p-3 rounded-lg text-sm ${
    submitMessageType === "success"
      ? "bg-slate-800 text-slate-100 border border-slate-700"
      : "bg-red-900 text-red-100 border border-red-800"
  }`}>
    {submitMessage}
  </div>
)}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <FiSend className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
        </div>

        <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
          <Link
            to="/work-with-us"
            id="back-to-openings"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Current Openings
          </Link>

          <div className="max-w-4xl space-y-6">
            <span
              className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
            >
              {opening.category}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              {opening.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-300">
              <div className="inline-flex items-center gap-2">
                <FiBriefcase className="w-4 h-4" />
                <span className="text-sm">{opening.details}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <FiMapPin className="w-4 h-4" />
                <span className="text-sm">Global Team Collaboration</span>
              </div>
            </div>

            <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
              {opening.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-full-sm xl:container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
                  Role Overview
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {opening.description}
                </p>
              </div>

              <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
                  Qualifications
                </h2>
                <ul className="space-y-3">
                  {openingContent?.qualifications?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {openingContent?.responsibilities?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
              <h3 className="text-xl font-bold">How to Apply</h3>
              <ul className="space-y-3">
                {openingContent?.applicationSteps?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openModal}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
              >
                Apply Now <FaArrowRight className="w-4 h-4" />
              </button>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}








// import React, { useState } from "react";
// import { Link, useParams } from "react-router";
// import { FaArrowRight } from "react-icons/fa";
// import { FiArrowLeft, FiBriefcase, FiMapPin, FiSend, FiX } from "react-icons/fi";
// import data from "../../lib/data.json";

// const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
// const OPENINGS = workWithUsData.openings;
// const OPENING_CONTENT = workWithUsData.openingDetails;

// export default function WorkWithUsDetails({
//   openingId,
// }: {
//   openingId?: string;
// }) {
//   const params = useParams();
//   const id = openingId ?? (params as { id?: string }).id;

//   const opening = OPENINGS.find((item) => item.id === id);
//   if (!opening) {
//     throw new Response("Opening not found", { status: 404 });
//   }

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     portfolio: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState("");
//   const [submitMessageType, setSubmitMessageType] = useState<"success" | "error" | "">("");

//   // Map category to openingDetails key
//   const categoryToKey: Record<string, string> = {
//     "Blockchain Development": "Blockchain",
//     "Smart Contract Development Intern": "Smart Contract Intern",
//     "Product Design": "Design",
//     "Backend Engineering": "Backend",
//     "Frontend Engineering": "Frontend",
//     "Mobile Engineering": "Mobile",
//     "AI Development": "AI-Developer",
//     "AI-Assisted Development": "AI-Agent"
//   };

//   const detailsKey = categoryToKey[opening.category] || "Strategy";
//   const openingContent = OPENING_CONTENT[detailsKey];

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       portfolio: "",
//       message: "",
//     });
//     setSubmitMessage("");
//     setSubmitMessageType("");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.fullName.trim()) {
//       setSubmitMessage("Please enter your full name.");
//       setSubmitMessageType("error");
//       setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
//       return;
//     }

//     if (!formData.email.trim()) {
//       setSubmitMessage("Please enter your email address.");
//       setSubmitMessageType("error");
//       setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setSubmitMessage("Please enter a valid email address.");
//       setSubmitMessageType("error");
//       setTimeout(() => { setSubmitMessage(""); setSubmitMessageType(""); }, 4000);
//       return;
//     }

//     setIsSubmitting(true);

//     // Build email content
//     const subject = `Job Application: ${opening.title} from ${formData.fullName}`;
//     const body = `
// Full Name: ${formData.fullName}
// Email: ${formData.email}
// Phone: ${formData.phone || "Not provided"}
// Portfolio/LinkedIn/GitHub: ${formData.portfolio || "Not provided"}
// Position: ${opening.title}

// Message:
// ${formData.message || "No message provided"}

// ---
// Please send your resume/CV to: hello@blockcsherpa.dev
//     `.trim();

//     // Open email client
//     window.location.href = `mailto:hello@blockcsherpa.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

//     setSubmitMessage("✅ Application information sent! Please check your email client and attach your resume/CV to complete your application.");
//     setSubmitMessageType("success");

//     // Clear form
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       portfolio: "",
//       message: "",
//     });

//     setIsSubmitting(false);

//     // Clear status after 5 seconds
//     setTimeout(() => setSubmitMessage(""), 5000);

//     // Close modal after 5 seconds
//     setTimeout(() => closeModal(), 5000);
//   };

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1 pt-20"
//     >
//       {/* Application Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            
//             <div className="p-5 sm:p-6">
              
//               {/* Header */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
//                   Apply for {opening.title}
//                 </h2>
//                 <button
//                   onClick={closeModal}
//                   className="p-2 text-slate-400 hover:text-slate-600 transition-colors hover:bg-slate-100 rounded-full"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               </div>
              
//               <p className="text-slate-500 text-sm mb-6">
//                 Fill out the form below to apply for the {opening.title} position.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Full Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="jhon@example.com"
//                     required
//                   />
//                 </div>

//                 {/* Phone (Optional) */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Phone Number <span className="text-slate-400 text-xs font-normal">(Optional)</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="+1 (555) 000-0000"
//                   />
//                 </div>

//                 {/* Portfolio / LinkedIn / GitHub (Optional) */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Portfolio / LinkedIn / GitHub <span className="text-slate-400 text-xs font-normal">(Optional)</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="portfolio"
//                     value={formData.portfolio}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="https://..."
//                   />
//                 </div>

//                 {/* Cover Letter (Optional) */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">
//                     Cover Letter / Message <span className="text-slate-400 text-xs font-normal">(Optional)</span>
//                   </label>
//                   <textarea
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
//                     placeholder="Tell us why you'are interested in this role and what makes you a great fit for this position"
//                   />
//                 </div>

//                 {/* Resume Required Notice */}
//                 <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//                   <p className="text-sm text-amber-800 font-medium">
//                     📄 Resume/CV Required
//                   </p>
//                   <p className="text-xs text-amber-700 mt-1">
//                     Please email your resume separately to <span className="font-mono font-bold">hello@blockcsherpa.dev</span> after submitting the form.
//                   </p>
//                 </div>

//                 {submitMessage && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     submitMessageType === "success"
//                       ? "bg-green-50 text-green-700 border border-green-200"
//                       : "bg-red-50 text-red-600 border border-red-200"
//                   }`}>
//                     {submitMessage}
//                   </div>
//                 )}

//                 {/* Buttons */}
//                 <div className="flex gap-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       <>
//                         Submit Application
//                         <FiSend className="w-4 h-4" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
//           <Link
//             to="/work-with-us"
//             id="back-to-openings"
//             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
//           >
//             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Current Openings
//           </Link>

//           <div className="max-w-4xl space-y-6">
//             <span
//               className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
//             >
//               {opening.category}
//             </span>

//             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
//               {opening.title}
//             </h1>

//             <div className="flex flex-wrap items-center gap-6 text-slate-300">
//               <div className="inline-flex items-center gap-2">
//                 <FiBriefcase className="w-4 h-4" />
//                 <span className="text-sm">{opening.details}</span>
//               </div>
//               <div className="inline-flex items-center gap-2">
//                 <FiMapPin className="w-4 h-4" />
//                 <span className="text-sm">Global Team Collaboration</span>
//               </div>
//             </div>

//             <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
//               {opening.description}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content Section */}
//       <section className="py-10 md:py-20 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-8">
//               <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Role Overview
//                 </h2>
//                 <p className="text-slate-600 leading-relaxed">
//                   {opening.description}
//                 </p>
//               </div>

//               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Qualifications
//                 </h2>
//                 <ul className="space-y-3">
//                   {openingContent?.qualifications?.map((item: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 text-slate-700">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Key Responsibilities
//                 </h2>
//                 <ul className="space-y-3">
//                   {openingContent?.responsibilities?.map((item: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 text-slate-700">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
//               <h3 className="text-xl font-bold">How to Apply</h3>
//               <ul className="space-y-3">
//                 {openingContent?.applicationSteps?.map((item: string, idx: number) => (
//                   <li key={idx} className="flex items-start gap-3 text-slate-300">
//                     <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
//                     <span className="text-sm">{item}</span>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={openModal}
//                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
//               >
//                 Apply Now <FaArrowRight className="w-4 h-4" />
//               </button>
//             </aside>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }








// // import React from "react";

// // import { Link, useParams } from "react-router";

// // import { FaArrowRight } from "react-icons/fa";

// // import { FiArrowLeft, FiBriefcase, FiMapPin } from "react-icons/fi";

// // import data from "../../lib/data.json";

// // const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
// // const OPENINGS = workWithUsData.openings;
// // const OPENING_CONTENT = workWithUsData.openingDetails;

// // export default function WorkWithUsDetails({
// //   openingId,
// // }: {
// //   openingId?: string;
// // }) {
// //   const params = useParams();
// //   const id = openingId ?? (params as { id?: string }).id;

// //   const opening = OPENINGS.find((item) => item.id === id);
// //   if (!opening) {
// //     throw new Response("Opening not found", { status: 404 });
// //   }


// //   const openingContent =
// //     OPENING_CONTENT[opening.category] ?? OPENING_CONTENT.Strategy;

// //   return (
// //     <main
// //       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
// //       className="flex-1 pt-20"
// //     >
// //       <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
// //         <div className="absolute inset-0 opacity-10">
// //           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
// //         </div>

// //         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
// //           <Link
// //             to="/work-With-us"
// //             id="back-to-openings"
// //             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
// //           >
// //             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
// //             Back to Current Openings
// //           </Link>

// //           <div className="max-w-4xl space-y-6">
// //             <span
// //               className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
// //             >
// //               {opening.category}
// //             </span>

// //             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
// //               {opening.title}
// //             </h1>

// //             <div className="flex flex-wrap items-center gap-6 text-slate-300">
// //               <div className="inline-flex items-center gap-2">
// //                 <FiBriefcase className="w-4 h-4" />
// //                 <span className="text-sm">{opening.details}</span>
// //               </div>
// //               <div className="inline-flex items-center gap-2">
// //                 <FiMapPin className="w-4 h-4" />
// //                 <span className="text-sm">Global Team Collaboration</span>
// //               </div>
// //             </div>

// //             <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
// //               {opening.description}
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="py-10 md:py-20 bg-white">
// //         <div className="max-w-full-sm xl:container mx-auto px-6">
// //           <div className="grid lg:grid-cols-3 gap-8">
// //             <div className="lg:col-span-2 space-y-8">
// //               <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Role Overview
// //                 </h2>
// //                 <p className="text-slate-600 leading-relaxed">
// //                   {opening.description}
// //                 </p>
// //               </div>

// //               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Qualifications
// //                 </h2>
// //                 <ul className="space-y-3">
// //                   {openingContent.qualifications.map((item) => (
// //                     <li key={item} className="flex items-start gap-3 text-slate-700">
// //                       <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>

// //               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Responsibilities
// //                 </h2>
// //                 <ul className="space-y-3">
// //                   {openingContent.responsibilities.map((item) => (
// //                     <li key={item} className="flex items-start gap-3 text-slate-700">
// //                       <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>

// //             <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
// //               <h3 className="text-xl font-bold">How to Apply</h3>
// //               <ul className="space-y-3">
// //                 {openingContent.applicationSteps.map((item) => (
// //                   <li key={item} className="flex items-start gap-3 text-slate-300">
// //                     <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
// //                     <span className="text-sm">{item}</span>
// //                   </li>
// //                 ))}
// //               </ul>

// //               <p className="text-slate-300 text-sm pt-2">
// //                 Send to our careers team and include the role code.:{" "}
// //                 <span className="font-bold text-white">{opening.id}</span>.
// //               </p>

// //               <a
// //                 href={`mailto:careers@blocksherpa.com?subject=Application%20for%20${encodeURIComponent(opening.title)}`}
// //                 id="apply-mail-link"
// //                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
// //               >
// //                 Apply via Email <FaArrowRight className="w-4 h-4" />
// //               </a>
// //             </aside>
// //           </div>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }
// // import React from "react";
// // import { Link, useParams } from "react-router";
// // import { FaArrowRight } from "react-icons/fa";
// // import { FiArrowLeft, FiBriefcase, FiMapPin } from "react-icons/fi";
// // import data from "../../lib/data.json";

// // const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
// // const OPENINGS = workWithUsData.openings;
// // const OPENING_CONTENT = workWithUsData.openingDetails;

// // export default function WorkWithUsDetails({
// //   openingId,
// // }: {
// //   openingId?: string;
// // }) {
// //   const params = useParams();
// //   const id = openingId ?? (params as { id?: string }).id;

// //   const opening = OPENINGS.find((item) => item.id === id);
// //   if (!opening) {
// //     throw new Response("Opening not found", { status: 404 });
// //   }

// //   // Map category to openingDetails key
// //   const categoryToKey: Record<string, string> = {
// //     "Blockchain Development": "Blockchain",
// //         "Smart Contract Development Intern": "Smart Contract Intern",
// //     "Product Design": "Design",
// //     "Backend Engineering": "Backend",
// //     "Frontend Engineering": "Frontend",
// //     "Mobile Engineering": "Mobile",
// //   "AI-Assisted Development":"AI-Agent"  };

// //   const detailsKey = categoryToKey[opening.category] || "Strategy";
// //   const openingContent = OPENING_CONTENT[detailsKey];

// //   return (
// //     <main
// //       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
// //       className="flex-1 pt-20"
// //     >
// //       <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
// //         <div className="absolute inset-0 opacity-10">
// //           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
// //         </div>

// //         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
// //           <Link
// //             to="/work-with-us"
// //             id="back-to-openings"
// //             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
// //           >
// //             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
// //             Back to Current Openings
// //           </Link>

// //           <div className="max-w-4xl space-y-6">
// //             <span
// //               className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
// //             >
// //               {opening.category}
// //             </span>

// //             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
// //               {opening.title}
// //             </h1>

// //             <div className="flex flex-wrap items-center gap-6 text-slate-300">
// //               <div className="inline-flex items-center gap-2">
// //                 <FiBriefcase className="w-4 h-4" />
// //                 <span className="text-sm">{opening.details}</span>
// //               </div>
// //               <div className="inline-flex items-center gap-2">
// //                 <FiMapPin className="w-4 h-4" />
// //                 <span className="text-sm">Global Team Collaboration</span>
// //               </div>
// //             </div>

// //             <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
// //               {opening.description}
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="py-10 md:py-20 bg-white">
// //         <div className="max-w-full-sm xl:container mx-auto px-6">
// //           <div className="grid lg:grid-cols-3 gap-8">
// //             <div className="lg:col-span-2 space-y-8">
// //               <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Role Overview
// //                 </h2>
// //                 <p className="text-slate-600 leading-relaxed">
// //                   {opening.description}
// //                 </p>
// //               </div>

// //               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Qualifications
// //                 </h2>
// //                 <ul className="space-y-3">
// //                   {openingContent?.qualifications?.map((item: string, idx: number) => (
// //                     <li key={idx} className="flex items-start gap-3 text-slate-700">
// //                       <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>

// //               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
// //                   Key Responsibilities
// //                 </h2>
// //                 <ul className="space-y-3">
// //                   {openingContent?.responsibilities?.map((item: string, idx: number) => (
// //                     <li key={idx} className="flex items-start gap-3 text-slate-700">
// //                       <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>

// //             <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
// //               <h3 className="text-xl font-bold">How to Apply</h3>
// //               <ul className="space-y-3">
// //                 {openingContent?.applicationSteps?.map((item: string, idx: number) => (
// //                   <li key={idx} className="flex items-start gap-3 text-slate-300">
// //                     <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
// //                     <span className="text-sm">{item}</span>
// //                   </li>
// //                 ))}
// //               </ul>

// //               {/* <p className="text-slate-300 text-sm pt-2">
// //                 Send to our careers team and include the role code:{" "}
// //                 <span className="font-bold text-white">{opening.id}</span>
// //               </p> */}

// //               <a
// //                 href={`mailto:hello@blockcsherpa.dev?subject=Application%20for%20${encodeURIComponent(opening.title)}`}
// //                 id="apply-mail-link"
// //                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
// //               >
// //                 Apply via Email <FaArrowRight className="w-4 h-4" />
// //               </a>
// //             </aside>
// //           </div>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }



// import React, { useState } from "react";
// import { Link, useParams } from "react-router";
// import { FaArrowRight } from "react-icons/fa";
// import { FiArrowLeft, FiBriefcase, FiMapPin, FiSend, FiX } from "react-icons/fi";
// import data from "../../lib/data.json";

// const workWithUsData = (data as unknown as WorkWithUsData).workWithUs;
// const OPENINGS = workWithUsData.openings;
// const OPENING_CONTENT = workWithUsData.openingDetails;

// // Web3Forms Configuration - YOUR ACCESS KEY
// const WEB3FORMS_ACCESS_KEY = "7be6a23a-864a-41f5-849f-265762877bcd";

// export default function WorkWithUsDetails({
//   openingId,
// }: {
//   openingId?: string;
// }) {
//   const params = useParams();
//   const id = openingId ?? (params as { id?: string }).id;

//   const opening = OPENINGS.find((item) => item.id === id);
//   if (!opening) {
//     throw new Response("Opening not found", { status: 404 });
//   }

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message: "",
//     resume: null as File | null,
//   });
//   const [formStatus, setFormStatus] = useState({ type: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Map category to openingDetails key
//   const categoryToKey: Record<string, string> = {
//     "Blockchain Development": "Blockchain",
//     "Smart Contract Development Intern": "Smart Contract Intern",
//     "Product Design": "Design",
//     "Backend Engineering": "Backend",
//     "Frontend Engineering": "Frontend",
//     "Mobile Engineering": "Mobile",
//     "AI Development": "AI-Developer",
//     "AI-Assisted Development": "AI-Agent"
//   };

//   const detailsKey = categoryToKey[opening.category] || "Strategy";
//   const openingContent = OPENING_CONTENT[detailsKey];

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const maxSize = 5 * 1024 * 1024; // 5MB
//       if (file.size > maxSize) {
//         alert("File size must be less than 5MB");
//         return;
//       }
//       setFormData((prev) => ({ ...prev, resume: file }));
//     }
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       message: "",
//       resume: null,
//     });
//     setFormStatus({ type: "", message: "" });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.firstName.trim()) {
//       setFormStatus({ type: "error", message: "Please enter your first name." });
//       setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
//       return;
//     }

//     if (!formData.lastName.trim()) {
//       setFormStatus({ type: "error", message: "Please enter your last name." });
//       setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
//       return;
//     }

//     if (!formData.email.trim()) {
//       setFormStatus({ type: "error", message: "Please enter your email address." });
//       setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setFormStatus({ type: "error", message: "Please enter a valid email address." });
//       setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
//       return;
//     }

//     setIsSubmitting(true);

//     // Prepare form data for Web3Forms
//     const formPayload = new FormData();
//     formPayload.append("access_key", WEB3FORMS_ACCESS_KEY);
//     formPayload.append("name", `${formData.firstName} ${formData.lastName}`);
//     formPayload.append("email", formData.email);
//     formPayload.append("phone", formData.phone || "");
//     formPayload.append("position", opening.title);
//     formPayload.append("message", formData.message);
//     formPayload.append(
//       "subject",
//       `Job Application: ${opening.title} from ${formData.firstName} ${formData.lastName}`
//     );
//     formPayload.append("from_name", "Block Sherpa Careers");

//     if (formData.resume) {
//       formPayload.append("attachment", formData.resume);
//     }

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: formPayload,
//       });

//       const result = await response.json();

//       if (result.success) {
//         setFormStatus({
//           type: "success",
//           message:
//             "✅ Application submitted successfully! We'll review it and get back to you within 5-7 business days.",
//         });

//         // Clear form after successful submission
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           message: "",
//           resume: null,
//         });

//         // Close modal after 3 seconds
//         setTimeout(() => {
//           closeModal();
//         }, 3000);
//       } else {
//         throw new Error(result.message || "Failed to submit application");
//       }
//     } catch (error) {
//       console.error("Web3Forms Error:", error);
//       setFormStatus({
//         type: "error",
//         message:
//           "❌ Something went wrong. Please try again or email us directly at hello@blockcsherpa.dev.",
//       });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <main
//       style={{ viewTransitionName: "main-content" } as React.CSSProperties}
//       className="flex-1 pt-20"
//     >
//       {/* Application Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            
//             <div className="p-5 sm:p-6">
              
//               {/* Header - Close button */}
//               <div className="flex justify-end mb-3">
//                 <button
//                   onClick={closeModal}
//                   className="p-2 text-slate-400 hover:text-slate-600 transition-colors hover:bg-slate-100 rounded-full"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               </div>
              
//               <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
//                 Apply for {opening.title}
//               </h2>
              
//               <p className="text-slate-500 text-sm mb-6">
//                 Fill out the form below to submit your application. We'll review it and get back to you soon.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                       First Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                       placeholder="John"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                       Last Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                       placeholder="Doe"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     placeholder="john@company.com"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                     Phone Number (Optional)
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     placeholder="+44 20 7946 0123"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                     Resume/CV <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="file"
//                     name="resume"
//                     onChange={handleFileChange}
//                     accept=".pdf,.doc,.docx,.jpg,.png"
//                     className="w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                     required
//                   />
//                   <p className="text-xs text-slate-400 mt-1">
//                     Max 5MB. PDF, DOC, DOCX, JPG, PNG
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
//                     Cover Letter / Why you're a great fit
//                   </label>
//                   <textarea
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     placeholder="Describe your relevant experience, key skills, and what makes you a great fit for this position."
//                   />
//                 </div>

//                 {formStatus.message && (
//                   <div className={`p-3 rounded-lg text-sm ${
//                     formStatus.type === "success"
//                       ? "bg-green-50 text-green-700 border border-green-200"
//                       : "bg-red-50 text-red-600 border border-red-200"
//                   }`}>
//                     {formStatus.message}
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       Submit Application
//                       <FiSend className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <section className="pt-14 pb-24 hero-gradient relative overflow-hidden text-white">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] -mr-48 -mt-48" />
//         </div>

//         <div className="max-w-full-sm xl:container mx-auto px-6 relative z-10">
//           <Link
//             to="/work-with-us"
//             id="back-to-openings"
//             className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 mb-10 hover:text-white transition-colors group"
//           >
//             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Current Openings
//           </Link>

//           <div className="max-w-4xl space-y-6">
//             <span
//               className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${opening.categoryColor}`}
//             >
//               {opening.category}
//             </span>

//             <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
//               {opening.title}
//             </h1>

//             <div className="flex flex-wrap items-center gap-6 text-slate-300">
//               <div className="inline-flex items-center gap-2">
//                 <FiBriefcase className="w-4 h-4" />
//                 <span className="text-sm">{opening.details}</span>
//               </div>
//               <div className="inline-flex items-center gap-2">
//                 <FiMapPin className="w-4 h-4" />
//                 <span className="text-sm">Global Team Collaboration</span>
//               </div>
//             </div>

//             <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
//               {opening.description}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content Section */}
//       <section className="py-10 md:py-20 bg-white">
//         <div className="max-w-full-sm xl:container mx-auto px-6">
//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-8">
//               <div className="p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Role Overview
//                 </h2>
//                 <p className="text-slate-600 leading-relaxed">
//                   {opening.description}
//                 </p>
//               </div>

//               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Qualifications
//                 </h2>
//                 <ul className="space-y-3">
//                   {openingContent?.qualifications?.map((item: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 text-slate-700">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="p-8 md:p-10 bg-white rounded-3xl border border-slate-200">
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
//                   Key Responsibilities
//                 </h2>
//                 <ul className="space-y-3">
//                   {openingContent?.responsibilities?.map((item: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 text-slate-700">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 shrink-0" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <aside className="p-8 bg-slate-900 text-white rounded-3xl space-y-5 h-fit">
//               <h3 className="text-xl font-bold">How to Apply</h3>
//               <ul className="space-y-3">
//                 {openingContent?.applicationSteps?.map((item: string, idx: number) => (
//                   <li key={idx} className="flex items-start gap-3 text-slate-300">
//                     <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
//                     <span className="text-sm">{item}</span>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={openModal}
//                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
//               >
//                 Apply Now <FaArrowRight className="w-4 h-4" />
//               </button>
//             </aside>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
