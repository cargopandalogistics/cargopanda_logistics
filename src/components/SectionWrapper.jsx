import React from "react";
import { motion } from "framer-motion";

const SectionWrapper = ({ children, id, className }) => {
  return (
    <section id={id} className={`py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;