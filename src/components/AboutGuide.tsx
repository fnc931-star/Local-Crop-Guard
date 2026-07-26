import {
  BookOpen,
  Camera,
  Leaf,
  ShieldCheck,
  Heart,
  Brain,
  Microscope,
  ClipboardList,
} from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: '1. Capture a clear photo',
    text: 'Photograph the affected leaf in good daylight, filling the frame with the symptom. Use the Snap button to take it directly, or upload an existing image.',
  },
  {
    icon: Microscope,
    title: '2. Review the AI diagnosis',
    text: 'The app identifies the likely disease, rates severity (Low, Medium, High, or Healthy), and lists the visible symptoms it detected on the leaf.',
  },
  {
    icon: ClipboardList,
    title: '3. Apply remedies & track recovery',
    text: 'Follow the tailored organic, chemical, and watering plan. Tap "Save to Tracker" to log the case and monitor how your plants recover over time.',
  },
];

export default function AboutGuide() {
  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-stone-800">About &amp; Guide</h2>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
          Local Crop Guard is a friendly tool for smallholder farmers and
          agricultural students. It turns a simple photo into an actionable
          plant-health reading so diseases are caught early and harvests are
          protected — without needing a laboratory.
        </p>
      </div>

      {/* 3-step usage guide */}
      <div>
        <h3 className="mb-3 px-1 text-sm font-semibold uppercase tracking-wide text-stone-500">
          How to use it — 3 simple steps
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-sm font-semibold text-stone-800">
                {title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-stone-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How the AI works */}
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-800">
            How the Plant Pathologist AI works
          </h3>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-100 bg-white p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Leaf className="h-4 w-4" /> Vision model
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
              Your photo is sent to Google's Gemini multimodal model, which has
              been trained on millions of images and can recognize visual
              patterns on leaves — spots, discoloration, curling, and lesions —
              the same way a trained pathologist studies a sample.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-white p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <ShieldCheck className="h-4 w-4" /> Expert reasoning
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
              The model is guided by a plant-pathologist system prompt: it
              extracts symptoms, estimates severity, and builds a low-cost
              remediation plan tailored for smallholder farmers — using
              affordable organic, chemical, and watering practices.
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-stone-500">
          Results are advisory and not a substitute for a lab test. Always
          confirm chemical dosages with your local agricultural extension
          officer before application.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
        <Heart className="h-4 w-4 flex-shrink-0" />
        Built to support resilient, sustainable smallholder farming.
      </div>
    </section>
  );
}
