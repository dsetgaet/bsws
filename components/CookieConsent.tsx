// components/CookieConsent.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiCheck, FiShield } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router";

export default function CookieConsent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      setHasConsent(true);
      setShowBanner(false);
      return;
    }

    const path = window.location.pathname;
    setIsHomePage(path === "/" || path === "");

    // Show banner immediately
    setShowBanner(true);

    // Block navigation to other pages
    const allowedPaths = ["/", "/privacy-policy", "/cookie-policy"];
    if (!allowedPaths.includes(path) && !consent) {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  // Block ALL interactions on homepage except the cookie banner
  useEffect(() => {
    if (!showBanner || !isHomePage) return;

    const blockInteractions = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if click is on the cookie banner or its children
      const bannerElement = document.getElementById('cookie-banner');
      if (bannerElement && bannerElement.contains(target)) {
        return; // Allow clicks on the banner
      }

      // Check if click is on Privacy Policy or Cookie Policy links
      if (target.closest('a[href="/privacy-policy"]') || 
          target.closest('a[href="/cookie-policy"]')) {
        return; // Allow these links
      }

      // Check if click is on the overlay itself (only if it exists)
      if (target.closest('.cookie-overlay')) {
        return; // Allow clicks on the overlay (it's transparent anyway)
      }

      // Block everything else
      e.preventDefault();
      e.stopPropagation();
      
      // Show a subtle indication that they need to accept cookies
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.style.animation = 'none';
        setTimeout(() => {
          banner.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
      }
    };

    // Block scroll
    const blockScroll = (e: Event) => {
      e.preventDefault();
    };

    // Block keyboard interactions
    const blockKeyboard = (e: KeyboardEvent) => {
      // Allow Tab key to navigate within the banner
      const bannerElement = document.getElementById('cookie-banner');
      if (bannerElement && bannerElement.contains(document.activeElement)) {
        return;
      }
      e.preventDefault();
    };

    // Add styles for shake animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      .cookie-overlay {
        cursor: default !important;
      }
      .cookie-overlay a, .cookie-overlay button {
        cursor: pointer !important;
      }
      .cookie-overlay *:not(#cookie-banner *) {
        pointer-events: none !important;
        user-select: none !important;
      }
      #cookie-banner * {
        pointer-events: auto !important;
        user-select: auto !important;
      }
    `;
    document.head.appendChild(style);

    // Add overlay div to block interactions
    const overlay = document.createElement('div');
    overlay.className = 'cookie-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9998;
      cursor: default;
    `;
    document.body.appendChild(overlay);

    // Event listeners
    document.addEventListener('click', blockInteractions, true);
    document.addEventListener('touchstart', blockInteractions, { passive: false, capture: true });
    document.addEventListener('wheel', blockScroll, { passive: false });
    document.addEventListener('keydown', blockKeyboard);
    document.addEventListener('scroll', blockScroll, { passive: false });

    return () => {
      document.removeEventListener('click', blockInteractions, true);
      document.removeEventListener('touchstart', blockInteractions);
      document.removeEventListener('wheel', blockScroll);
      document.removeEventListener('keydown', blockKeyboard);
      document.removeEventListener('scroll', blockScroll);
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [showBanner, isHomePage, navigate]);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setHasConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setHasConsent(true);
    setShowBanner(false);
  };

  // If user has consent, don't show banner
  if (hasConsent) {
    return null;
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          id="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div 
            className={`max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden ${
              isHomePage 
                ? "bg-black/40 backdrop-blur-md border border-white/10" 
                : "bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl"
            }`}
          >
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon */}
                <div className={`hidden md:flex w-10 h-10 rounded-full items-center justify-center shrink-0 ${
                  isHomePage 
                    ? "bg-blue-500/20 text-blue-400" 
                    : "bg-blue-50 text-blue-600"
                }`}>
                  <FiShield className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className={`text-sm leading-relaxed ${
                    isHomePage ? "text-white/90" : "text-slate-600"
                  }`}>
                    <span className={`font-semibold ${isHomePage ? "text-white" : "text-slate-900"}`}>
                      We Value Your Privacy
                    </span>
                    {" "}— We use cookies to enhance your experience. Please accept or decline to continue browsing.
                  </p>
                  
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="/privacy-policy"
                      className={`text-xs font-medium transition-colors ${
                        isHomePage 
                          ? "text-blue-400 hover:text-blue-300" 
                          : "text-blue-600 hover:text-blue-700"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/privacy-policy");
                      }}
                    >
                      Privacy Policy
                    </a>
                    <span className={isHomePage ? "text-white/20" : "text-slate-300"}>|</span>
                    <a
                      href="/cookie-policy"
                      className={`text-xs font-medium transition-colors ${
                        isHomePage 
                          ? "text-blue-400 hover:text-blue-300" 
                          : "text-blue-600 hover:text-blue-700"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/cookie-policy");
                      }}
                    >
                      Cookie Policy
                    </a>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={handleDecline}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      isHomePage 
                        ? "bg-white/10 text-white hover:bg-white/20 border border-white/10" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAccept}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                      isHomePage 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <FiCheck className="w-3 h-3" />
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}