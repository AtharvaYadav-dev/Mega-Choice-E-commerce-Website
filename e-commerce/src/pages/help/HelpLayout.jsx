import React from "react";

const HelpLayout = ({ title, subtitle, sections = [], sidebar }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 text-gray-600 max-w-3xl">{subtitle}</p>}
      </header>
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-8">
          {sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2 className="text-xl font-semibold text-gray-900">{s.heading}</h2>}
              {s.body && <p className="mt-2 text-gray-700 leading-relaxed">{s.body}</p>}
              {Array.isArray(s.points) && s.points.length > 0 && (
                <ul className="mt-3 list-disc pl-6 space-y-1 text-gray-700">
                  {s.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <aside className="md:col-span-4 space-y-4">
          {sidebar}
        </aside>
      </div>
    </div>
  );
};

export default HelpLayout;
