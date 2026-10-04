import React, { useState } from 'react';
import { X, Settings, MapPin, User, Bell, Check, Shield } from 'lucide-react';
import { UserProfile } from '../../types';

interface AccountSettingsModalProps {
  user: UserProfile;
  onClose: () => void;
  onSave: (updatedLocation: string) => void;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [location, setLocation] = useState(user.location);
  const [fishDebonePref, setFishDebonePref] = useState(true);
  const [separateBagsPref, setSeparateBagsPref] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(location);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#f3fcf2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dce5db] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 border-b border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#004328] text-white flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#161d18]">
                Account Settings
              </h3>
              <p className="text-[11px] text-[#707971]">
                Maria Santos • Palengke Preferences
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#edf6ec] text-[#404942] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Profile Details */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2ebe1] shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-[#707971] uppercase tracking-wider">
              Delivery Address
            </h4>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#161d18] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#0d5c3a]" />
                <span>Primary Street Address</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#dce5db] bg-[#f3fcf2] focus:outline-none focus:border-[#0d5c3a]"
              />
              <p className="text-[10px] text-[#707971]">
                Near Pioneer Ave, Tagum City, Davao del Norte
              </p>
            </div>
          </div>

          {/* Suki Handling Preferences */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2ebe1] shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-[#707971] uppercase tracking-wider">
              Market Vendor Default Instructions
            </h4>

            <div className="space-y-2.5">
              <label className="flex items-center justify-between cursor-pointer text-xs text-[#161d18]">
                <span>Automatic scaling & gutting on wet market fish</span>
                <input
                  type="checkbox"
                  checked={fishDebonePref}
                  onChange={(e) => setFishDebonePref(e.target.checked)}
                  className="w-4 h-4 accent-[#0d5c3a] rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-xs text-[#161d18]">
                <span>Separate wet seafood from dry goods & mountain greens</span>
                <input
                  type="checkbox"
                  checked={separateBagsPref}
                  onChange={(e) => setSeparateBagsPref(e.target.checked)}
                  className="w-4 h-4 accent-[#0d5c3a] rounded"
                />
              </label>
            </div>
          </div>

          {/* App Info & Region */}
          <div className="bg-[#edf6ec] rounded-2xl p-3.5 border border-[#dce5db] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#004328]">
              <Shield className="w-4 h-4" />
              <span className="font-semibold">Regional Coverage: Tagum City Central</span>
            </div>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded font-mono font-bold text-[#707971]">
              v2.4.1
            </span>
          </div>
        </div>

        {/* Footer save */}
        <div className="p-4 bg-white border-t border-[#e2ebe1]">
          <button
            onClick={handleSave}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
              saved
                ? 'bg-[#a9f3c5] text-[#004328]'
                : 'bg-[#004328] hover:bg-[#0d5c3a] text-white'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Preferences Saved!</span>
              </>
            ) : (
              <span>Save Account Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
