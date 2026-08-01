import React from "react";

/**
 * Plain section wrapper. Deliberately has no entrance animation.
 *
 * This used to be a framer-motion element with
 *   initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
 *
 * That was safe while the site was client-rendered: the browser built the DOM
 * and the IntersectionObserver always fired. Once the page was prerendered at
 * build time, `opacity: 0` started shipping in the HTML — so any time the
 * observer did not fire (during hydration, on fast scrolling, or when the
 * `amount` threshold was not met on a tall section) the content stayed
 * invisible permanently. Whole sections rendered as blank white space.
 *
 * Content visibility is not worth trading for a fade. Hover, flip, marquee and
 * hero animations are unaffected — they are driven by user interaction or run
 * unconditionally, so they cannot strand content in a hidden state.
 */
const SectionWrapper = ({ children, id, className = "" }) => (
  <section
    id={id}
    // scroll-mt clears the fixed navbar when jumping to #about, #services, etc.
    className={`scroll-mt-24 md:scroll-mt-28 py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 ${className}`}
  >
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

export default SectionWrapper;
