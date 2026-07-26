import { Leaf, Microscope, ClipboardList, BookOpen } from 'lucide-react';
import type { TabId } from '@/App';

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Leaf }[] = [
  { id: 'diagnosis', label: 'Diagnosis', icon: Microscope },
  { id: 'tracker', label: 'Symptom Tracker', icon: ClipboardList },
  { id: 'about', label: 'About & Guide', icon: BookOpen },
];

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Leaf className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-tight text-emerald-800">
              Local Crop Guard
            </h1>
            <p className="text-xs text-emerald-600">Plant health, in your hands</p>
          </div>
        </div>

        <nav className="flex gap-1.5 overflow-x-auto rounded-2xl bg-emerald-50 p-1.5">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex flex-shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
