import React, { useState } from "react";

import { FiLayers, FiMenu, FiX } from "react-icons/fi";

import { Link, NavLink } from "react-router";

import logoImage from "/favicon.ico";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold px-3 py-1.5 rounded-md transition-all ${
      isActive
        ? "text-white bg-slate-800 shadow-sm"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  const ctaClassName = ({ isActive }: { isActive: boolean }) =>
    `px-5 py-2.5 text-sm font-semibold rounded-full transition-all ${
      isActive
        ? "bg-slate-700 text-white ring-2 ring-slate-400"
        : "bg-slate-900 text-white hover:bg-slate-800"
    }`;

  const mobileNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-sm font-semibold rounded-md transition-all ${
      isActive
        ? "text-slate-900 bg-slate-100"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
      style={{ viewTransitionName: "main-nav" } as React.CSSProperties}
    >
      <div className="max-w-full-sm xl:container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" id="nav-logo-link" className="flex items-center gap-2">
          <div className="w-10 h-10  rounded-lg flex items-center justify-center">
            <img
              src={logoImage}
              alt="Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            BlockSherpa
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/" id="nav-home" className={navLinkClassName} end>
            Home
          </NavLink>
          <NavLink to="/about" id="nav-about" className={navLinkClassName}>
            About
          </NavLink>
          <NavLink
            to="/services"
            id="nav-services"
            className={navLinkClassName}
          >
            Services
          </NavLink>
          <NavLink
            to="/portofolio"
            id="nav-portfolio"
            className={navLinkClassName}
          >
            Portfolio
          </NavLink>
          <NavLink to="/team" id="nav-team" className={navLinkClassName}>
            Team
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <NavLink
            to="/work-with-us"
            id="nav-cta-btn"
            className={({ isActive }) =>
              `${ctaClassName({ isActive })} hidden md:inline-flex`
            }
          >
            Work With Us
          </NavLink>

          <button
            className="lg:hidden text-slate-900"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="mobile-nav-menu" className="lg:hidden px-6 pb-5 pt-2">
          <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <NavLink
              to="/"
              id="mobile-nav-home"
              className={mobileNavLinkClassName}
              end
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              id="mobile-nav-about"
              className={mobileNavLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              id="mobile-nav-services"
              className={mobileNavLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/portofolio"
              id="mobile-nav-portfolio"
              className={mobileNavLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/team"
              id="mobile-nav-team"
              className={mobileNavLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
