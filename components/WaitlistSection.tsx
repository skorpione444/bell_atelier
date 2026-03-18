"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SHOE_SIZES = [
  "US 7 / EU 40",
  "US 7.5 / EU 40.5",
  "US 8 / EU 41",
  "US 8.5 / EU 41.5",
  "US 9 / EU 42",
  "US 9.5 / EU 42.5",
  "US 10 / EU 43",
  "US 10.5 / EU 43.5",
  "US 11 / EU 44",
  "US 11.5 / EU 44.5",
  "US 12 / EU 45",
  "US 12.5 / EU 45.5",
  "US 13 / EU 46",
  "US 13.5 / EU 46.5",
  "US 14 / EU 47",
];

type FormState = "idle" | "submitting" | "success";

const stagger = (i: number) => ({ delay: 0.1 + i * 0.1 });

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const, ...stagger(i) },
});

export default function WaitlistSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  function validate() {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "First name is required.";
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!shoeSize) errs.shoeSize = "Please select your shoe size.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), shoeSize }),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        const data = await res.json();
        if (data.errors) {
          setErrors(data.errors);
          setFormState("idle");
        } else {
          setServerError(data.error || "Something went wrong. Please try again.");
          setFormState("idle");
        }
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
      setFormState("idle");
    }
  }

  const inputClass =
    "w-full bg-transparent border border-[rgba(246,244,237,0.15)] rounded-none px-4 py-3.5 text-[#f6f4ed] placeholder-[#f6f4ed]/40 text-sm tracking-wide focus:outline-none focus:border-[#bcb69a] transition-colors duration-300";

  return (
    <section
      className="relative py-32 grain-overlay-dark overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {formState !== "success" ? (
            <motion.div
              key="form"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Label */}
              <motion.p
                {...fadeUp(0)}
                className="glitch-flicker text-xs tracking-[0.35em] uppercase text-[#f6f4ed]/60 mb-6"
              >
                Exclusive Access
              </motion.p>

              {/* Heading */}
              <motion.h2
                {...fadeUp(1)}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f6f4ed] mb-6"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                The Inner Circle
              </motion.h2>

              {/* Subtext */}
              <motion.p
                {...fadeUp(2)}
                className="text-[#f6f4ed]/60 text-sm md:text-base leading-relaxed mb-12 max-w-lg mx-auto"
              >
                Bell Atelier launches with a limited founding collection.
                <br className="hidden sm:block" />
                Reserve your place before doors open to the public.
              </motion.p>

              {/* Form */}
              <motion.form
                {...fadeUp(3)}
                onSubmit={handleSubmit}
                className="space-y-4 mb-8"
                noValidate
              >
                {/* First Name */}
                <div className="text-left">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                    disabled={formState === "submitting"}
                  />
                  <AnimatePresence>
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[#c9544d] text-xs mt-1.5 ml-1"
                      >
                        {errors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div className="text-left">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    disabled={formState === "submitting"}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[#c9544d] text-xs mt-1.5 ml-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shoe Size */}
                <div className="text-left">
                  <select
                    value={shoeSize}
                    onChange={(e) => setShoeSize(e.target.value)}
                    className={`${inputClass} waitlist-select ${
                      !shoeSize ? "text-[#f6f4ed]/40" : ""
                    }`}
                    disabled={formState === "submitting"}
                  >
                    <option value="" disabled>
                      Shoe Size
                    </option>
                    {SHOE_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.shoeSize && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[#c9544d] text-xs mt-1.5 ml-1"
                      >
                        {errors.shoeSize}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full border border-[#bcb69a] text-[#bcb69a] py-3.5 text-xs tracking-[0.3em] uppercase transition-colors duration-300 hover:bg-[#bcb69a] hover:text-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  animate={
                    serverError
                      ? { x: [-8, 8, -4, 4, 0] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  {formState === "submitting" ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Requesting…
                    </span>
                  ) : (
                    "Request Access"
                  )}
                </motion.button>

                {/* Server Error */}
                <AnimatePresence>
                  {serverError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[#c9544d] text-sm mt-2"
                    >
                      {serverError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>

              {/* Fine print */}
              <motion.p
                {...fadeUp(4)}
                className="text-[#f6f4ed]/40 text-xs tracking-wide"
              >
                Limited to the first 200 founding members. No spam, ever.
              </motion.p>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="py-16 flex flex-col items-center"
            >
              {/* Animated Checkmark */}
              <svg
                className="waitlist-checkmark w-20 h-20 mb-8"
                viewBox="0 0 52 52"
              >
                <circle
                  className="waitlist-checkmark-circle"
                  cx="26"
                  cy="26"
                  r="24"
                  fill="none"
                  stroke="#bcb69a"
                  strokeWidth="1.5"
                />
                <path
                  className="waitlist-checkmark-check"
                  fill="none"
                  stroke="#bcb69a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 27l7 7 15-15"
                />
              </svg>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="font-serif text-3xl md:text-4xl text-[#f6f4ed]"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                You&apos;re In.
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-[#f6f4ed]/50 text-sm mt-4"
              >
                We&apos;ll be in touch before doors open.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
