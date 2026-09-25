import React, { useState } from 'react';
import { Lock, X, Activity, UserCheck, Calendar, DollarSign, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  passcode: string;
}

export const AdminPortalModal: React.FC<Props> = ({ isOpen, onClose, passcode }) => {
  const [inputCode, setInputCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'intake' | 'inventory' | 'finance'>('intake');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().toLowerCase() === passcode.toLowerCase()) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Clinical Passkey. Click '[ AUTO-FILL DEMO KEY ]' to test.");
    }
  };

  const handleAutoFill = () => {
    setInputCode(passcode);
    setIsAuthenticated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#0d0e14] border border-rose-300/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 border border-rose-400/40 flex items-center justify-center text-rose-300">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">Clinical Provider Gate</h3>
              <p className="text-base text-zinc-300 mt-2">Enter your physician or aesthetic nurse practitioner passkey.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter clinical passkey..."
                className="w-full py-3 px-4 bg-zinc-900/90 border border-zinc-700 rounded-xl text-base text-white focus:border-rose-400 outline-none min-h-[44px]"
              />
              <button
                type="submit"
                className="w-full py-3 px-5 bg-gradient-to-r from-rose-400 to-rose-300 hover:opacity-95 text-black font-bold rounded-xl text-base min-h-[44px] tracking-wider transition-all"
              >
                UNLOCK CLINICAL EMR
              </button>
            </form>
            <div className="pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-sm font-semibold text-rose-300 hover:underline py-2 px-4 rounded-lg bg-rose-500/10 border border-rose-500/30"
              >
                ⚡ [ AUTO-FILL DEMO KEY: {passcode} ]
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-rose-300 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
                  AURA DERM CLINIC EMR
                </span>
                <h3 className="text-2xl font-bold text-white font-serif-luxury mt-2">Beverly Hills Aesthetic Provider Hub</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('intake')}
                  className={`py-2 px-4 rounded-lg text-sm font-semibold min-h-[44px] ${activeTab === 'intake' ? 'bg-rose-400 text-black' : 'bg-zinc-800 text-zinc-300'}`}
                >
                  Patient Intake Queue
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`py-2 px-4 rounded-lg text-sm font-semibold min-h-[44px] ${activeTab === 'inventory' ? 'bg-rose-400 text-black' : 'bg-zinc-800 text-zinc-300'}`}
                >
                  Injectable Vault
                </button>
                <button
                  onClick={() => setActiveTab('finance')}
                  className={`py-2 px-4 rounded-lg text-sm font-semibold min-h-[44px] ${activeTab === 'finance' ? 'bg-rose-400 text-black' : 'bg-zinc-800 text-zinc-300'}`}
                >
                  0% APR Cherry Ledger
                </button>
              </div>
            </div>

            {activeTab === 'intake' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                    <span className="text-xs text-zinc-400 font-medium">Pending Consults</span>
                    <p className="text-3xl font-extrabold text-white mt-1">14</p>
                    <span className="text-xs text-rose-300 font-semibold">Today's In-Clinic Appointments</span>
                  </div>
                  <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                    <span className="text-xs text-zinc-400 font-medium">Average Treatment Ticket</span>
                    <p className="text-3xl font-extrabold text-rose-300 mt-1">$2,140</p>
                    <span className="text-xs text-zinc-300 font-medium">Neurotoxin + Dermal Filler Blend</span>
                  </div>
                  <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                    <span className="text-xs text-zinc-400 font-medium">EMR Clearance Rate</span>
                    <p className="text-3xl font-extrabold text-emerald-400 mt-1">98.2%</p>
                    <span className="text-xs text-zinc-300 font-medium">Zero adverse reaction flags</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
                  <h4 className="text-lg font-bold text-white">Active Treatment Pipeline</h4>
                  <div className="divide-y divide-zinc-800">
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-white">Sophia Kensington • Patient #4921</span>
                        <p className="text-sm text-zinc-300">Upper Face Daxxify (64 Units) + Jawline Volux (2 Syringes)</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ROOM 02 INJECTED
                      </span>
                    </div>
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-white">Victoria Vance • Patient #4922</span>
                        <p className="text-sm text-zinc-300">Full Face Morpheus8 RF + Exosome Topical Recovery Mask</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        NUMBING APPLIED
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-3">
                <h4 className="text-lg font-bold text-rose-300">Cold-Chain Injectables Telemetry</h4>
                <div className="space-y-2 text-base">
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-200">Botox Cosmetic (100 Unit Vials)</span>
                    <span className="font-bold text-emerald-400">42 Vials in Refrigerator (38.2°F)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-200">Juvéderm Volux XC (1.0mL Syringes)</span>
                    <span className="font-bold text-emerald-400">28 Syringes Sealed</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-200">Sculptra Aesthetic (PLLA Vials)</span>
                    <span className="font-bold text-emerald-400">18 Reconstituted</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-3">
                <h4 className="text-lg font-bold text-white">Patient Financing Portal (Cherry & CareCredit)</h4>
                <p className="text-base text-zinc-300">0% APR 12-month and 24-month loan originations with automated merchant payout confirmation.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
