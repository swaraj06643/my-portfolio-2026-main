"use client";

import { motion, useInView } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const CONTACT_EMAIL = "subhasishrath6@gmail.com";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const linkedInUrl = String(formData.get("linkedinUrl") ?? "").trim();
    const githubUrl = String(formData.get("githubUrl") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nLinkedIn URL: ${linkedInUrl}\nGitHub URL: ${githubUrl}\n\nMessage:\n${message}`
    );

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
    e.currentTarget.reset();
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="scroll-mt-24 px-6 py-8 md:py-12 md:px-8"
    >
      <div className="mx-auto max-w-xl">
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6 text-lg text-muted-foreground"
        >
          Have a project in mind? Say hello.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="liquid-glass-card rounded-2xl p-6 md:p-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
                autoComplete="name"
                className="transition-all duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="transition-all duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={4}
                required
                className="transition-all duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="linkedinUrl"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                LinkedIn URL
              </label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                placeholder="https://www.linkedin.com/in/your-profile"
                className="transition-all duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="githubUrl"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                GitHub URL
              </label>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                placeholder="https://github.com/your-username"
                className="transition-all duration-300"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </motion.form>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
            role="status"
            aria-live="polite"
          >
            Message prepared successfully. Your mail app opened to send it to {CONTACT_EMAIL}.
          </motion.div>
        )}
      </div>
    </section>
  );
}
