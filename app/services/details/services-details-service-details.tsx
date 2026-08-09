import React from "react";

import { FiShield, FiTrendingUp } from "react-icons/fi";

type ServicesDetailsServiceDetailsProps = {
  overview: ServicesData["services"]["overview"];
};

const overviewIcons: Record<
  OverviewHighlightIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  trendingUp: FiTrendingUp,
  shield: FiShield,
};

export default function ServicesDetailsServiceDetails({
  overview,
}: ServicesDetailsServiceDetailsProps) {
  return (
    <div id="service-details" className="scroll-mt-24 space-y-6 pt-2">
      <h2 className="text-3xl font-bold text-slate-900">Service Details</h2>

      <div className="space-y-6">
        {overview.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {overview.highlights.map((highlight) => {
          const Icon = overviewIcons[highlight.icon];
          return (
            <div
              key={highlight.title}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" aria-hidden={true} />
              </div>

              <h4 className="font-bold text-slate-900 mb-2">
                {highlight.title}
              </h4>
              <p className="text-sm text-slate-600">
                {highlight.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">
          Key Deliverables
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {overview.deliverables.map((deliverable) => (
            <div key={deliverable} className="flex items-start gap-3">
              <span className="mt-1 text-blue-600" aria-hidden="true">
                ✓
              </span>
              <span className="text-slate-700">{deliverable}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

