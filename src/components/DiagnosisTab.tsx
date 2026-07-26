import { useRef, useState } from 'react';
import {
  UploadCloud,
  ImagePlus,
  AlertTriangle,
  Activity,
  Leaf,
  FlaskConical,
  Sun,
  Droplets,
  ShieldCheck,
  Loader2,
  Camera,
  RefreshCw,
  CheckCircle2,
  Sprout,
  Bookmark,
} from 'lucide-react';
import {
  diagnoseLeaf,
  type DiagnosisResult,
  type Severity,
} from '@/lib/diagnosis';
import { fileToThumbnail, type TrackerEntry } from '@/lib/storage';

type Status = 'idle' | 'loading' | 'done' | 'error';

const severityStyles: Record<
  Severity,
  { badge: string; bar: string; ring: string; label: string }
> = {
  Healthy: {
    badge: 'bg-emerald-100 text-emerald-700',
    bar: 'from-emerald-400 to-emerald-500',
    ring: 'border-emerald-200 bg-emerald-50',
    label: 'Healthy',
  },
  Low: {
    badge: 'bg-emerald-100 text-emerald-700',
    bar: 'from-emerald-400 to-emerald-500',
    ring: 'border-emerald-200 bg-emerald-50',
    label: 'Low',
  },
  Medium: {
    badge: 'bg-amber-100 text-amber-700',
    bar: 'from-amber-400 to-amber-500',
    ring: 'border-amber-200 bg-amber-50',
    label: 'Medium',
  },
  High: {
    badge: 'bg-red-100 text-red-700',
    bar: 'from-red-400 to-red-500',
    ring: 'border-red-200 bg-red-50',
    label: 'High',
  },
};

interface DiagnosisTabProps {
  onSaveEntry: (entry: TrackerEntry) => void;
}

export default function DiagnosisTab({ onSaveEntry }: DiagnosisTabProps) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleFile = (f?: File) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
    setStatus('idle');
    setSaved(false);
  };

  const runDiagnosis = async () => {
    if (!file) return;
    setStatus('loading');
    setError(null);
    setSaved(false);
    try {
      const res = await diagnoseLeaf(file);
      setResult(res);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const handleSave = async () => {
    if (!file || !result || saved) return;
    const thumbnail = await fileToThumbnail(file);
    const entry: TrackerEntry = {
      id: crypto.randomUUID(),
      diseaseName: result.diseaseName,
      thumbnail,
      severity: result.severity,
      date: new Date().toISOString(),
      treatmentPlan: result.remediation,
    };
    onSaveEntry(entry);
    setSaved(true);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setStatus('idle');
    setSaved(false);
  };

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-2">
      {/* Upload card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <ImagePlus className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-stone-800">
              Upload a plant photo
            </h3>
            <p className="text-sm text-stone-500">
              Drag &amp; drop or choose a clear leaf close-up.
            </p>
          </div>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
            dragging
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-stone-300 bg-stone-50 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="Selected plant"
              className="max-h-full max-w-full rounded-xl object-contain shadow-sm"
            />
          ) : (
            <>
              <UploadCloud className="h-10 w-10 text-emerald-500" />
              <p className="mt-3 text-sm font-medium text-stone-700">
                Drag your photo here
              </p>
              <p className="text-xs text-stone-400">JPG or PNG, up to 10MB</p>
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <ImagePlus className="h-4 w-4" /> Select Photo
          </button>
          <button
            onClick={() => cameraRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            <Camera className="h-4 w-4" /> Snap
          </button>
          {preview && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
            >
              <RefreshCw className="h-4 w-4" /> Clear
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        {preview && status !== 'loading' && (
          <button
            onClick={runDiagnosis}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800"
          >
            <Activity className="h-4 w-4" /> Diagnose with Gemini
          </button>
        )}
      </div>

      {/* Results / loading / placeholder */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && (
          <ErrorState message={error ?? 'Unknown error'} onRetry={runDiagnosis} />
        )}
        {status === 'idle' && !result && <PlaceholderState />}
        {status === 'done' && result && (
          <ResultView
            result={result}
            saved={saved}
            onSave={handleSave}
          />
        )}
      </div>
    </section>
  );
}

function PlaceholderState() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-stone-800">
            Diagnosis Results
          </h3>
          <p className="text-sm text-stone-500">
            Upload a photo to see the AI analysis here.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center">
        <Sprout className="h-10 w-10 text-emerald-300" />
        <p className="mt-3 text-sm text-stone-400">
          Your diagnosis will appear here with severity, disease name, and
          tailored remedies.
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-16 text-center">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      <p className="mt-4 text-sm font-medium text-stone-700">
        Analyzing leaf pattern &amp; extracting symptoms...
      </p>
      <p className="mt-1 text-xs text-stone-400">
        Gemini is reviewing your photo.
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <p className="mt-3 text-sm font-semibold text-stone-800">
        Diagnosis failed
      </p>
      <p className="mt-1 max-w-xs text-xs text-stone-500">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        <RefreshCw className="h-4 w-4" /> Try again
      </button>
    </div>
  );
}

function ResultView({
  result,
  saved,
  onSave,
}: {
  result: DiagnosisResult;
  saved: boolean;
  onSave: () => void;
}) {
  const s = severityStyles[result.severity];
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-stone-800">
            Diagnosis Results
          </h3>
          <p className="text-sm text-stone-500">
            AI analysis complete — review below.
          </p>
        </div>
      </div>

      {/* Severity */}
      <div className={`rounded-xl border p-4 ${s.ring}`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium text-stone-700">
            <AlertTriangle className="h-4 w-4" /> Severity
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.badge}`}>
            {s.label}
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${s.bar}`}
            style={{ width: `${Math.min(100, Math.max(5, result.confidence))}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-stone-500">
          Confidence: {result.confidence}%
        </p>
      </div>

      {/* Disease name */}
      <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
        <span className="flex items-center gap-2 text-sm font-medium text-stone-600">
          <Leaf className="h-4 w-4 text-emerald-600" /> Disease Name
        </span>
        <p className="mt-1 text-lg font-bold text-stone-800">
          {result.diseaseName}
        </p>
      </div>

      {/* Symptoms */}
      {result.symptoms.length > 0 && (
        <div className="mt-4">
          <span className="flex items-center gap-2 text-sm font-medium text-stone-600">
            <Activity className="h-4 w-4 text-emerald-600" /> Visual Symptoms
          </span>
          <ul className="mt-2 space-y-1.5">
            {result.symptoms.map((sym) => (
              <li
                key={sym}
                className="flex items-start gap-2 rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                {sym}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Remediation */}
      <div className="mt-4">
        <span className="flex items-center gap-2 text-sm font-medium text-stone-600">
          <FlaskConical className="h-4 w-4 text-emerald-600" /> Remediation Plan
        </span>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          <RemediationCard
            icon={Sun}
            title="Organic"
            tone="emerald"
            items={result.remediation.organic}
          />
          <RemediationCard
            icon={Droplets}
            title="Chemical"
            tone="sky"
            items={result.remediation.chemical}
          />
          <RemediationCard
            icon={ShieldCheck}
            title="Watering & Soil"
            tone="violet"
            items={result.remediation.wateringSoil}
          />
        </div>
      </div>

      {/* Save to tracker */}
      <button
        onClick={onSave}
        disabled={saved}
        className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
          saved
            ? 'cursor-default bg-emerald-100 text-emerald-700'
            : 'bg-emerald-600 text-white hover:bg-emerald-700'
        }`}
      >
        {saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> Saved to Tracker
          </>
        ) : (
          <>
            <Bookmark className="h-4 w-4" /> Save to Tracker
          </>
        )}
      </button>
    </div>
  );
}

function RemediationCard({
  icon: Icon,
  title,
  items,
  tone,
}: {
  icon: typeof Sun;
  title: string;
  items: string[];
  tone: 'emerald' | 'sky' | 'violet';
}) {
  const tones: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    sky: 'bg-sky-50 text-sky-700 border-sky-100',
    violet: 'bg-violet-50 text-violet-700 border-violet-100',
  };
  return (
    <div className={`rounded-xl border p-3.5 ${tones[tone]}`}>
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <Icon className="h-4 w-4" /> {title}
      </div>
      {items.length === 0 ? (
        <p className="mt-2 text-xs text-stone-400">No specific advice.</p>
      ) : (
        <ul className="mt-2 space-y-1 text-xs text-stone-600">
          {items.map((i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-stone-400" />
              {i}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
