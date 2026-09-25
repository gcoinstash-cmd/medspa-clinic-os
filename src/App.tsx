import React, { useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  UserCheck, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  DollarSign, 
  Lock, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal';

interface TreatmentOption {
  id: string;
  name: string;
  zone: 'upper' | 'mid' | 'lower' | 'laser';
  price: number;
  downtime: string;
  units: string;
  description: string;
}

const TREATMENTS: TreatmentOption[] = [
  { id: 't1', name: 'Upper Face Neurotoxin Smooth (Botox/Daxxify)', zone: 'upper', price: 650, downtime: 'Zero (4 hr upright)', units: '45-60 Units', description: 'Precision smoothing of forehead horizontal lines, glabella 11s, and lateral canthal crow’s feet.' },
  { id: 't2', name: 'Mid-Face Structural High-Cheek Volumization', zone: 'mid', price: 1400, downtime: '24-48 hrs mild swelling', units: '2 Syringes Voluma', description: 'Restores malar apex projection and alleviates nasolabial pull with cross-linked hyaluronic acid.' },
  { id: 't3', name: 'Tear Trough PRF & Gentle Under-Eye Rejuvenation', zone: 'mid', price: 950, downtime: '2-3 days pinpoint bruising', units: 'Autologous PRF Matrix', description: 'Natural bio-filler derived from your own concentrated platelets to brighten dark under-eye hollows.' },
  { id: 't4', name: 'Bespoke Russian Lip Sculpt & Vermilion Border', zone: 'lower', price: 850, downtime: '48 hrs contour swelling', units: '1.0mL Kysse', description: 'Natural height and crisp Cupid’s bow definition without anterior migration or duck-bill effect.' },
  { id: 't5', name: 'Masseter Slimming & Bruxism Relief Protocol', zone: 'lower', price: 750, downtime: 'Zero downtime', units: '50-60 Units Dysport', description: 'Slenderizes muscular lower third jawline while relieving tension clenching and TMJ discomfort.' },
  { id: 't6', name: 'Morpheus8 Burst RF Microneedling & Exosome Mask', zone: 'laser', price: 1250, downtime: '3-4 days sunburn glow', units: 'Subdermal Adipose Remodeling', description: 'Fractional radiofrequency energy tightens elastin and triggers collagen synthesis with topical exosomes.' }
];

const PROVIDERS = [
  { id: 'p1', name: 'Dr. Aria Vance, M.D.', title: 'Double Board-Certified Facial Plastic Surgeon', fee: 350, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80', badge: 'SURGICAL DIRECTOR' },
  { id: 'p2', name: 'Nicole Sterling, RN, CANS', title: 'Master Aesthetic Injector & Clinical Faculty', fee: 150, image: 'https://images.unsplash.com/photo-1594824813589-98a44976c666?auto=format&fit=crop&w=600&q=80', badge: 'LEAD INJECTOR' }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedZone, setSelectedZone] = useState<'all' | 'upper' | 'mid' | 'lower' | 'laser'>('all');
  const [selectedTreatments, setSelectedTreatments] = useState<TreatmentOption[]>([TREATMENTS[0], TREATMENTS[1]]);
  const [selectedProvider, setSelectedProvider] = useState(PROVIDERS[0]);
  
  // Medical Intake Questionnaire State
  const [hasPreviousFiller, setHasPreviousFiller] = useState<boolean>(true);
  const [isPregnantOrNursing, setIsPregnantOrNursing] = useState<boolean>(false);
  const [hasColdSores, setHasColdSores] = useState<boolean>(false);
  const [hasBloodThinners, setHasBloodThinners] = useState<boolean>(false);
  const [primaryGoal, setPrimaryGoal] = useState<string>('Refined Anti-Aging & Jawline Definition');
  
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const toggleTreatment = (t: TreatmentOption) => {
    if (selectedTreatments.some(item => item.id === t.id)) {
      setSelectedTreatments(selectedTreatments.filter(item => item.id !== t.id));
    } else {
      setSelectedTreatments([...selectedTreatments, t]);
    }
  };

  const filteredTreatments = selectedZone === 'all' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.zone === selectedZone);

  const treatmentSubtotal = selectedTreatments.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = treatmentSubtotal + selectedProvider.fee;
  const monthlyCherryInstallment = Math.round(grandTotal / 12);

  return (
    <div className="min-h-screen bg-[#090A0E] text-zinc-100 selection:bg-rose-400 selection:text-black">
      
      {/* Top Banner & Clinical Passkey Gate */}
      <div className="bg-[#0f1118] border-b border-rose-400/20 px-4 py-2.5 text-center text-sm font-semibold tracking-wider text-zinc-300 flex items-center justify-center gap-3">
        <span>💎 BEVERLY HILLS AESTHETIC SURGERY & INJECTABLE SUITES</span>
        <span className="text-zinc-600">•</span>
        <button
          onClick={() => setIsAdminOpen(true)}
          className="text-rose-300 hover:text-rose-200 font-mono text-xs font-semibold underline px-3 py-1 bg-rose-500/10 rounded-md border border-rose-500/30"
        >
          [ CLINICAL EMR PORTAL ]
        </button>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#090A0E]/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-400/40 flex items-center justify-center text-rose-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif-luxury tracking-wider text-white">AURA DERM CLINIC</h1>
              <p className="text-xs uppercase tracking-widest text-rose-300 font-mono">Aesthetic Treatment Wizard OS</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-base font-semibold min-h-[44px] transition-all flex items-center gap-2"
          >
            <Lock className="w-4 h-4" /> Provider EMR Access
          </button>
        </div>
      </header>

      {/* Hero Introduction */}
      <section className="py-12 px-4 sm:px-8 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 rounded-full inline-block">
            ARCHETYPE C: STEP-BY-STEP PROGRESSIVE WIZARD
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-serif-luxury tracking-tight">
            Curate Your Bespoke <span className="text-rose-300">Aesthetic Journey</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-200 max-w-2xl mx-auto leading-relaxed">
            Select targeted anatomical zones, complete clinical medical triage, choose your board-certified injector, and unlock 0% APR financing options.
          </p>
        </div>
      </section>

      {/* Main Wizard Container */}
      <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto">
        
        {/* Step Indicator Progress Bar */}
        <div className="mb-10 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { step: 1, label: '1. Anatomy & Treatments' },
              { step: 2, label: '2. Clinical Intake' },
              { step: 3, label: '3. Master Provider' },
              { step: 4, label: '4. Financing & Plan' }
            ].map((s) => (
              <div
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`cursor-pointer pb-2 border-b-2 transition-all ${
                  currentStep === s.step
                    ? 'border-rose-400 text-white font-bold'
                    : currentStep > s.step
                      ? 'border-emerald-400 text-emerald-400 font-semibold'
                      : 'border-zinc-800 text-zinc-500'
                }`}
              >
                <span className="text-xs sm:text-sm uppercase tracking-wider block font-mono">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: ANATOMICAL ZONE SELECTOR */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold font-serif-luxury text-white">Select Targeted Facial & Skin Zones</h3>
                <p className="text-base text-zinc-300">Click treatments to build your personalized aesthetic transformation plan.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Zones' },
                  { id: 'upper', label: 'Upper Face' },
                  { id: 'mid', label: 'Mid Face' },
                  { id: 'lower', label: 'Lower Face' },
                  { id: 'laser', label: 'Laser & RF' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedZone(tab.id as any)}
                    className={`py-2 px-4 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                      selectedZone === tab.id ? 'bg-rose-400 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTreatments.map((t) => {
                const isSelected = selectedTreatments.some(item => item.id === t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTreatment(t)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500/10 border-rose-400 ring-1 ring-rose-400 shadow-xl'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded-md">
                        {t.zone.toUpperCase()} ZONE
                      </span>
                      <span className="text-xl font-bold text-white font-mono">${t.price}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mt-2">{t.name}</h4>
                    <p className="text-base text-zinc-200 mt-2 leading-relaxed">{t.description}</p>
                    
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex justify-between text-sm text-zinc-300">
                      <span>Downtime: {t.downtime}</span>
                      <span className="text-rose-300 font-medium">{t.units}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: CLINICAL INTAKE QUESTIONNAIRE */}
        {currentStep === 2 && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-serif-luxury text-white">Medical Clearance & Aesthetic History</h3>
              <p className="text-base text-zinc-300">Required pre-consultation intake for Beverly Hills clinical compliance.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-zinc-300 block mb-1">Primary Aesthetic Goal</label>
                <input
                  type="text"
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full py-3 px-4 bg-zinc-900 border border-zinc-700 rounded-xl text-base text-white focus:border-rose-400 outline-none min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-base font-semibold text-white block">Previous Dermal Fillers?</span>
                    <span className="text-sm text-zinc-400">Treated in past 18 months</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasPreviousFiller(!hasPreviousFiller)}
                    className={`py-2 px-4 rounded-lg text-sm font-bold min-h-[44px] ${hasPreviousFiller ? 'bg-rose-400 text-black' : 'bg-zinc-800 text-zinc-300'}`}
                  >
                    {hasPreviousFiller ? 'YES' : 'NO'}
                  </button>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-base font-semibold text-white block">Pregnant or Breastfeeding?</span>
                    <span className="text-sm text-zinc-400">Strict medical contraindication</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPregnantOrNursing(!isPregnantOrNursing)}
                    className={`py-2 px-4 rounded-lg text-sm font-bold min-h-[44px] ${isPregnantOrNursing ? 'bg-rose-400 text-black' : 'bg-zinc-800 text-zinc-300'}`}
                  >
                    {isPregnantOrNursing ? 'YES' : 'NO'}
                  </button>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-base font-semibold text-white block">Active Cold Sore / Oral Lesion?</span>
                    <span className="text-sm text-zinc-400">Lip injections require pre-treatment Valtrex</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasColdSores(!hasColdSores)}
                    className={`py-2 px-4 rounded-lg text-sm font-bold min-h-[44px] ${hasColdSores ? 'bg-rose-400 text-black' : 'bg-zinc-800 text-zinc-300'}`}
                  >
                    {hasColdSores ? 'YES' : 'NO'}
                  </button>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-base font-semibold text-white block">Blood Thinners or Aspirin?</span>
                    <span className="text-sm text-zinc-400">Increases hematoma / bruising probability</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasBloodThinners(!hasBloodThinners)}
                    className={`py-2 px-4 rounded-lg text-sm font-bold min-h-[44px] ${hasBloodThinners ? 'bg-rose-400 text-black' : 'bg-zinc-800 text-zinc-300'}`}
                  >
                    {hasBloodThinners ? 'YES' : 'NO'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PROVIDER SELECTION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-serif-luxury text-white">Choose Your Master Aesthetic Provider</h3>
              <p className="text-base text-zinc-300">All treatments are personally planned and administered by board-certified clinical specialists.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PROVIDERS.map((p) => {
                const isSelected = selectedProvider.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProvider(p)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500/10 border-rose-400 ring-1 ring-rose-400 shadow-xl'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <img src={p.image} alt={p.name} className="w-full h-56 object-cover rounded-xl mb-4" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded">
                      {p.badge}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2">{p.name}</h4>
                    <p className="text-base text-zinc-300 mt-1">{p.title}</p>
                    <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
                      <span className="text-sm text-zinc-400">Comprehensive Consult Fee:</span>
                      <span className="text-lg font-bold text-white font-mono">${p.fee}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: FINANCING & TREATMENT PLAN */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-2xl font-bold font-serif-luxury text-white">Comprehensive Treatment Summary</h3>
              
              <div className="divide-y divide-zinc-800">
                {selectedTreatments.map(t => (
                  <div key={t.id} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="text-base font-bold text-white">{t.name}</span>
                      <p className="text-sm text-zinc-300">{t.units} • Downtime: {t.downtime}</p>
                    </div>
                    <span className="text-base font-mono font-bold text-rose-300">${t.price}</span>
                  </div>
                ))}
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <span className="text-base font-bold text-white">Consultation with {selectedProvider.name}</span>
                    <p className="text-sm text-zinc-300">{selectedProvider.title}</p>
                  </div>
                  <span className="text-base font-mono font-bold text-rose-300">${selectedProvider.fee}</span>
                </div>
              </div>

              {/* Cherry 0% APR Financing Calculator */}
              <div className="p-6 bg-rose-500/10 border border-rose-400/30 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-rose-300">
                    CHERRY & CARECREDIT 0% APR FINANCING
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">NO HARD CREDIT INQUIRY</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-3xl font-extrabold text-white font-mono">
                      ${monthlyCherryInstallment} <span className="text-base font-normal text-zinc-300">/ month</span>
                    </p>
                    <p className="text-sm text-zinc-300">12 Months • 0% APR Interest Promo Available</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-zinc-400 block font-mono">Total Treatment Package</span>
                    <span className="text-2xl font-extrabold text-rose-300 font-mono">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-zinc-400">
                  A \$200 non-refundable consultation retainer is applied toward your same-day clinical treatment.
                </p>
                <button
                  onClick={() => setIsConfirmed(true)}
                  className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-rose-400 to-rose-300 hover:opacity-95 text-black font-bold text-base min-h-[44px] rounded-xl transition-all shadow-xl shadow-rose-400/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> CONFIRM & BOOK INTAKE
                </button>
              </div>

              {isConfirmed && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-300 text-base font-semibold flex items-center justify-between">
                  <span>🎉 Your clinical consult with {selectedProvider.name} is reserved! A pre-visit digital EMR packet has been sent to your email.</span>
                  <button onClick={() => setIsConfirmed(false)} className="text-xs underline font-mono">Dismiss</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wizard Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className={`py-3 px-6 rounded-xl text-base font-semibold min-h-[44px] flex items-center gap-2 border ${
              currentStep === 1 ? 'opacity-30 border-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous Stage
          </button>

          {currentStep < 4 && (
            <button
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              className="py-3 px-6 rounded-xl text-base font-bold min-h-[44px] bg-rose-400 hover:bg-rose-300 text-black flex items-center gap-2 transition-all shadow-lg shadow-rose-400/20"
            >
              Next Stage <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* Admin EMR Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        passcode="medspaclinic2026"
      />
    </div>
  );
}
