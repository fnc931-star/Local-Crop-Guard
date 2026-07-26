import { useMemo, useState } from 'react';
import {
  ClipboardList,
  Trash2,
  Filter,
  Leaf,
  Calendar,
  Inbox,
} from 'lucide-react';
import type { TrackerEntry } from '@/lib/storage';
import type { Severity } from '@/lib/diagnosis';

type FilterValue = 'All' | Severity;

const severityStyles: Record<Severity, string> = {
  Healthy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  High: 'bg-red-100 text-red-700 border-red-200',
};

const severityDot: Record<Severity, string> = {
  Healthy: 'bg-emerald-500',
  Low: 'bg-emerald-500',
  Medium: 'bg-amber-500',
  High: 'bg-red-500',
};

interface SymptomTrackerProps {
  entries: TrackerEntry[];
  onDelete: (id: string) => void;
}

export default function SymptomTracker({
  entries,
  onDelete,
}: SymptomTrackerProps) {
  const [filter, setFilter] = useState<FilterValue>('All');

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? entries
        : entries.filter((e) => e.severity === filter),
    [entries, filter],
  );

  const filters: FilterValue[] = ['All', 'Healthy', 'Low', 'Medium', 'High'];

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-800">
                Symptom Tracker
              </h2>
              <p className="text-sm text-stone-500">
                Your saved plant recovery logs, stored on this device.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-stone-400" />
            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    filter === f
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-10 text-center shadow-sm">
          <Inbox className="mx-auto h-10 w-10 text-stone-300" />
          <p className="mt-3 text-sm font-medium text-stone-600">
            No saved logs {filter !== 'All' && `for ${filter} severity`} yet.
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Run a diagnosis and tap "Save to Tracker" to start your history.
          </p>
        </div>
      ) : (
        <ol className="relative space-y-4 border-l-2 border-emerald-100 pl-6">
          {filtered.map((entry) => (
            <li key={entry.id} className="relative">
              <span
                className={`absolute -left-[31px] top-5 h-4 w-4 rounded-full ring-4 ring-stone-50 ${severityDot[entry.severity]}`}
              />
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {entry.thumbnail && (
                    <img
                      src={entry.thumbnail}
                      alt={entry.diseaseName}
                      className="h-24 w-24 flex-shrink-0 rounded-xl object-cover border border-stone-100"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${severityStyles[entry.severity]}`}
                      >
                        {entry.severity}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-stone-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(entry.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="mt-2 flex items-center gap-1.5 text-base font-bold text-stone-800">
                      <Leaf className="h-4 w-4 text-emerald-600" />
                      {entry.diseaseName}
                    </h3>

                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      <PlanBlock
                        title="Organic"
                        items={entry.treatmentPlan.organic}
                        tone="text-emerald-700"
                      />
                      <PlanBlock
                        title="Chemical"
                        items={entry.treatmentPlan.chemical}
                        tone="text-sky-700"
                      />
                      <PlanBlock
                        title="Watering & Soil"
                        items={entry.treatmentPlan.wateringSoil}
                        tone="text-violet-700"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onDelete(entry.id)}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center self-start rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                    aria-label="Delete log"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function PlanBlock({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: string;
}) {
  return (
    <div className="rounded-lg bg-stone-50 p-2.5">
      <p className={`text-xs font-semibold ${tone}`}>{title}</p>
      {items.length === 0 ? (
        <p className="mt-1 text-[11px] text-stone-400">—</p>
      ) : (
        <ul className="mt-1 space-y-0.5">
          {items.map((i) => (
            <li key={i} className="text-[11px] leading-snug text-stone-600">
              • {i}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
