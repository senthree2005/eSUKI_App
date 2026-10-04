import React, { useState } from 'react';
import { X, BookOpen, Award, CheckCircle, Sparkles, Plus, Edit2, Shield } from 'lucide-react';
import { SukiRecord } from '../types';

interface SukiLedgerModalProps {
  records: SukiRecord[];
  onClose: () => void;
  onUpdateNotes: (vendorId: string, note: string) => void;
}

export const SukiLedgerModal: React.FC<SukiLedgerModalProps> = ({
  records,
  onClose,
  onUpdateNotes,
}) => {
  const [selectedRecord, setSelectedRecord] = useState<SukiRecord>(records[0]);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(selectedRecord.sukiNotes);

  const handleSelectRecord = (record: SukiRecord) => {
    setSelectedRecord(record);
    setNoteText(record.sukiNotes);
    setIsEditingNote(false);
  };

  const handleSaveNote = () => {
    onUpdateNotes(selectedRecord.vendorId, noteText);
    setSelectedRecord({ ...selectedRecord, sukiNotes: noteText });
    setIsEditingNote(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#f3fcf2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dce5db] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#004328] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#a9f3c5]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">
                Maria's Suki Listahan
              </h3>
              <p className="text-[11px] text-[#a9f3c5]">
                Official Market Trust & Loyalty Ledger
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vendor Tabs */}
        <div className="flex items-center gap-1.5 p-3 bg-white border-b border-[#e2ebe1] overflow-x-auto scrollbar-none">
          {records.map((record) => {
            const isSelected = selectedRecord.vendorId === record.vendorId;
            return (
              <button
                key={record.vendorId}
                onClick={() => handleSelectRecord(record)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#0d5c3a] text-white shadow-xs'
                    : 'bg-[#edf6ec] text-[#404942] hover:bg-[#e2ebe1]'
                }`}
              >
                {record.vendorName.split(' ')[0]} ({record.tier})
              </button>
            );
          })}
        </div>

        {/* Body content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Suki Tier Banner */}
          <div className="bg-gradient-to-r from-[#004328] to-[#0d5c3a] text-white rounded-2xl p-4 shadow-md space-y-2 relative overflow-hidden">
            <div className="absolute right-2 -bottom-2 opacity-15">
              <Award className="w-24 h-24" />
            </div>
            <div className="flex items-center justify-between">
              <span className="bg-[#febb2d] text-[#271900] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {selectedRecord.tier} STATUS
              </span>
              <span className="text-xs text-[#a9f3c5]">
                {selectedRecord.durationYears} Years Loyal Customer
              </span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                {selectedRecord.vendorName}
              </h4>
              <p className="text-xs text-[#8ed6aa]">
                {selectedRecord.stallNumber} • Lifetime Purchases: ₱{selectedRecord.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Suki Stamp Card */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2ebe1] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-[#161d18] uppercase tracking-wider">
                Suki Stamp Reward Card
              </h5>
              <span className="text-xs font-bold text-[#0d5c3a]">
                {selectedRecord.stampsCount}/5 Stamps
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((idx) => {
                const isStamped = idx <= selectedRecord.stampsCount;
                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-1 text-center transition-all ${
                      isStamped
                        ? 'bg-[#a9f3c5]/30 border-[#0d5c3a] text-[#004328]'
                        : 'bg-[#f3fcf2] border-dashed border-[#bfc9c0] text-[#707971]'
                    }`}
                  >
                    {isStamped ? (
                      <CheckCircle className="w-5 h-5 text-[#0d5c3a]" />
                    ) : (
                      <span className="text-xs font-bold">{idx}</span>
                    )}
                    <span className="text-[8px] font-semibold mt-0.5">
                      {idx === 5 ? 'FREE GIFT' : 'STAMP'}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#5e4100] bg-[#ffdea9]/50 p-2.5 rounded-xl border border-[#febb2d]/40 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7d5800] shrink-0" />
              <span>{selectedRecord.nextReward}</span>
            </p>
          </div>

          {/* Unlocked Suki Perks */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2ebe1] shadow-xs space-y-2.5">
            <h5 className="text-xs font-bold text-[#707971] uppercase tracking-wider">
              Unlocked Suki Privileges
            </h5>
            <ul className="space-y-2 text-xs">
              {selectedRecord.perksUnlocked.map((perk, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#161d18]">
                  <CheckCircle className="w-4 h-4 text-[#0d5c3a] shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suki Preference Notes */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2ebe1] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-[#707971] uppercase tracking-wider">
                My Suki Request Note (Tindera Handlist)
              </h5>
              {!isEditingNote && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-xs text-[#0d5c3a] font-bold flex items-center gap-1 hover:underline"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {isEditingNote ? (
              <div className="space-y-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#0d5c3a] focus:outline-none bg-[#f3fcf2]"
                  rows={3}
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-3 py-1.5 text-xs text-[#707971] hover:text-[#161d18]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-3 py-1.5 bg-[#0d5c3a] text-white text-xs font-bold rounded-lg shadow-xs"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs italic text-[#404942] bg-[#f3fcf2] p-3 rounded-xl border border-[#dce5db]">
                "{selectedRecord.sukiNotes}"
              </p>
            )}
          </div>

          {/* Trust Score & Credit Standings */}
          <div className="bg-[#edf6ec] rounded-2xl p-3.5 border border-[#dce5db] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#0d5c3a]" />
              <div>
                <p className="text-xs font-bold text-[#004328]">
                  Verified Trust Standing: 100%
                </p>
                <p className="text-[11px] text-[#404942]">
                  Zero outstanding utang. Cashless COD on delivery.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#005232] bg-[#a9f3c5] px-2 py-0.5 rounded-full">
              Good Payer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
