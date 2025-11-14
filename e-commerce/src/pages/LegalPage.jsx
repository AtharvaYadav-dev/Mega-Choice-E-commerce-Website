import React from "react";

const LegalPage = ({ title, sections = [] }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <div className="mt-6 space-y-8 text-gray-700">
        {sections.length === 0 ? (
          <p>Content coming soon.</p>
        ) : (
          sections.map((s, i) => (
            <section key={i}>
              {s.heading && (
                <h2 className="text-xl font-semibold text-gray-900">{s.heading}</h2>
              )}
              {s.body && (
                <p className="mt-2 leading-relaxed">{s.body}</p>
              )}
              {Array.isArray(s.points) && s.points.length > 0 && (
                <ul className="mt-3 list-disc pl-6 space-y-1">
                  {s.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              )}
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default LegalPage;
