"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CAL_BOOKING_URL =
  process.env.NEXT_PUBLIC_CAL_BOOKING_URL ?? "https://cal.com/subhasish-rath-f741lu";

export function BookCallSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="book-call" className="scroll-mt-24 px-6 py-8 md:py-12 md:px-8">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-5 md:mb-6"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Book A Free Call
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Pick a scheduled date and time directly through Cal.com.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="overflow-hidden rounded-xl">
            <iframe
              title="Cal.com booking"
              src={`${CAL_BOOKING_URL}?embed=true`}
              className="h-[520px] w-full bg-transparent"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
            >
              Open booking page
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
