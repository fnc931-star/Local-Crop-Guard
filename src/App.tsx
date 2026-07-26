import { useCallback, useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DiagnosisTab from '@/components/DiagnosisTab';
import SymptomTracker from '@/components/SymptomTracker';
import AboutGuide from '@/components/AboutGuide';
import {
  loadEntries,
  saveEntries,
  type TrackerEntry,
} from '@/lib/storage';

export type TabId = 'diagnosis' | 'tracker' | 'about';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('diagnosis');
  const [entries, setEntries] = useState<TrackerEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const addEntry = useCallback((entry: TrackerEntry) => {
    setEntries((prev) => {
      const next = [entry, ...prev];
      saveEntries(next);
      return next;
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveEntries(next);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {activeTab === 'diagnosis' && (
          <>
            <Hero />
            <DiagnosisTab onSaveEntry={addEntry} />
          </>
        )}
        {activeTab === 'tracker' && (
          <SymptomTracker entries={entries} onDelete={deleteEntry} />
        )}
        {activeTab === 'about' && <AboutGuide />}
      </main>

      <footer className="border-t border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-6 text-sm text-emerald-700 sm:px-6">
          <Leaf className="h-4 w-4" />
          <span>Local Crop Guard — helping smallholder farms thrive.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
