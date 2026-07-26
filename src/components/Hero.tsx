import { Sprout, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-800 px-6 py-12 text-white shadow-lg sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide backdrop-blur">
          <Sprout className="h-3.5 w-3.5" /> For farmers & students
        </span>
        <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Visual Plant Pathology &amp; Remediation
        </h2>
        <p className="mt-4 text-base text-emerald-50/90 sm:text-lg">
          Snap a photo of a leaf, spot the disease early, and follow clear,
          field-tested remedies to protect your harvest — no lab required.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium backdrop-blur">
            <ImageIcon className="h-4 w-4" /> Photo-based diagnosis
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium backdrop-blur">
            <ShieldCheck className="h-4 w-4" /> Step-by-step remedies
          </div>
        </div>
      </div>
    </section>
  );
}
