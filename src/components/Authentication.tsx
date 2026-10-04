import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ArrowRight, ShieldCheck, ChevronRight, ChevronDown, RefreshCw, X, Sparkles } from 'lucide-react';

interface AuthScreenProps {
  onSuccessLogin: (user: { name: string; phone: string; method: string }) => void;
  onExploreAsGuest: () => void;
}

const COUNTRY_CODES = [
  { code: '+63', flag: '🇵🇭', country: 'Philippines' },
  { code: '+1', flag: '🇺🇸', country: 'United States' },
  { code: '+65', flag: '🇸🇬', country: 'Singapore' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+852', flag: '🇭🇰', country: 'Hong Kong' },
];

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccessLogin, onExploreAsGuest }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [phoneNumber, setPhoneNumber] = useState('917 555 8899');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [otpError, setOtpError] = useState('');
  const [authSuccessNotice, setAuthSuccessNotice] = useState<string | null>(null);

  const DEMO_OTP = '4892';

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsOtpModalOpen(true);
      setCountdown(45);
      setOtpError('');
    }, 400);
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify if all 4 digits entered
    if (index === 3 && value) {
      const fullCode = updated.slice(0, 3).join('') + value;
      if (fullCode === DEMO_OTP || fullCode.length === 4) {
        completeVerification();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const autoFillOtp = () => {
    setOtpDigits(['4', '8', '9', '2']);
    setTimeout(() => {
      completeVerification();
    }, 300);
  };

  const completeVerification = () => {
    setAuthSuccessNotice(`Authenticated as ${selectedCountry.code} ${phoneNumber}`);
    setTimeout(() => {
      setIsOtpModalOpen(false);
      onSuccessLogin({
        name: tab === 'signup' ? 'New Suki Member' : 'Suki Customer',
        phone: `${selectedCountry.code} ${phoneNumber}`,
        method: 'SMS OTP'
      });
    }, 700);
  };

  const handleSocialLogin = (platform: 'Facebook' | 'Google') => {
    setAuthSuccessNotice(`Connecting to ${platform}...`);
    setTimeout(() => {
      onSuccessLogin({
        name: platform === 'Google' ? 'Maria Santos' : 'Juan dela Cruz',
        phone: '+63 917 882 1923',
        method: platform
      });
    }, 600);
  };

  return (
    <div className="min-h-full flex flex-col justify-between items-center py-6 px-4 max-w-md mx-auto relative select-none">
      {/* Top spacing to match vertical rhythm of mobile screen */}
      <div className="w-full flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img src="/src/img/logo1.png" className="w-10 h-10" />
          <h1 className="font-extrabold font-sans text-[20px] mt-3"><span className='text-[#ff832d]'>e</span>Suki</h1>
        </div>
        <button
          onClick={onExploreAsGuest}
          className="text-xs font-semibold text-[#004328] bg-[#eaf4ed] hover:bg-[#d8edd9] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 shadow-2xs"
        >
          <span>Skip to Palengke Market</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#004328]" />
        </button>
      </div>

      <div className="w-full space-y-6 my-auto">
        {/* Main Card (Pixel-perfect match to provided screen) */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(13,92,58,0.08),0_2px_6px_0_rgba(0,0,0,0.04)] border border-[#e2ebe1] transition-all">
          
          {/* Top Segmented Tabs: Log In / Sign Up */}
          <div className="bg-[#e8f0e7] p-1.5 rounded-2xl flex items-center mb-6">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 text-center text-sm font-bold rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-white text-[#161d18] shadow-sm'
                  : 'text-[#404942] hover:text-[#161d18]'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setTab('signup')}
              className={`flex-1 py-2.5 text-center text-sm font-bold rounded-xl transition-all ${
                tab === 'signup'
                  ? 'bg-white text-[#161d18] shadow-sm'
                  : 'text-[#404942] hover:text-[#161d18]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Phone Number Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#161d18] stroke-[2.2]" />
              <span className="text-xl font-extrabold text-[#161d18] tracking-tight">
                Phone Number
              </span>
            </div>
            <span className="bg-[#a9f3c5] text-[#004328] font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#004328]" />
              Fast Login
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* Phone Input Row */}
            <div className="flex items-center gap-2 relative">
              {/* Country Code Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryPicker(!showCountryPicker)}
                  className="bg-[#edf6ec] hover:bg-[#e2ebe1] text-[#161d18] font-semibold text-sm rounded-xl px-3 py-3 flex items-center gap-1.5 border border-transparent transition-colors min-h-[48px]"
                >
                  <span className="text-base">{selectedCountry.flag}</span>
                  <span className="font-bold">{selectedCountry.code}</span>
                  <ChevronDown className="w-4 h-4 text-[#404942]" />
                </button>

                {/* Country dropdown popover */}
                {showCountryPicker && (
                  <div className="absolute top-full left-0 mt-1 z-30 bg-white border border-[#bfc9c0] rounded-xl shadow-lg py-1 w-44">
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c);
                          setShowCountryPicker(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-medium hover:bg-[#edf6ec] flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.country}</span>
                        </span>
                        <span className="font-bold text-[#004328]">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Number Input Box */}
              <div className="flex-1 bg-[#edf6ec] border border-[#bfc9c0] focus-within:border-[#004328] focus-within:ring-2 focus-within:ring-[#004328]/10 rounded-xl px-3.5 py-2.5 flex items-center transition-all min-h-[48px]">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9XX XXX XXXX"
                  className="w-full bg-transparent text-[#161d18] font-semibold text-base outline-none placeholder:text-[#707971] tracking-wide"
                />
              </div>
            </div>

            {/* Helper Note */}
            <div className="flex items-start gap-2 pt-1 text-xs text-[#404942] leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#004328] shrink-0 mt-0.5" />
              <span>
                No password needed — we'll send a 4-digit SMS OTP code to your phone.
              </span>
            </div>

            {/* Continue / Send OTP Code CTA Button */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-[#004328] hover:bg-[#0d5c3a] active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-base cursor-pointer mt-2"
            >
              {isSending ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#febb2d]" />
                  <span>Sending OTP via SMS...</span>
                </div>
              ) : (
                <>
                  <span>Continue / Send OTP Code</span>
                  <ArrowRight className="w-5 h-5 text-[#febb2d] stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#dce5db] w-full" />
          <span className="bg-[#f3fcf2] px-3 text-[11px] font-bold text-[#404942] tracking-wider uppercase whitespace-nowrap">
            Or continue with one-tap login
          </span>
        </div>

        {/* Social Login Cards */}
        <div className="space-y-3">
          {/* Continue with Facebook */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Facebook')}
            className="w-full bg-white rounded-2xl p-3.5 border border-[#e2ebe1] shadow-2xs hover:shadow-xs hover:border-[#a9f3c5] flex items-center justify-between text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#161d18]">
                  Continue with Facebook
                </div>
                <div className="text-xs text-[#404942]">
                  Quick login or sign up with Facebook
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#707971] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="w-full bg-white rounded-2xl p-3.5 border border-[#e2ebe1] shadow-2xs hover:shadow-xs hover:border-[#a9f3c5] flex items-center justify-between text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#161d18]">
                  Continue with Google
                </div>
                <div className="text-xs text-[#404942]">
                  Quick login or sign up with Google
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#707971] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Trust & Registration Badges at Bottom */}
      <div className="w-full mt-6 space-y-2 text-center">
        {/* Protected by Association Badge */}
        <div className="bg-[#e8f0e7] rounded-full py-2 px-4 flex items-center justify-center gap-2 mx-auto max-w-sm border border-[#dce5db]/60">
          <ShieldCheck className="w-4 h-4 text-[#7d5800] shrink-0" />
          <span className="text-[11px] font-bold text-[#161d18] tracking-tight">
            Protected by Tagum City Public Market Merchant Association
          </span>
        </div>

        {/* Footer info */}
        <div className="text-[11px] font-semibold text-[#404942]">
          SUKI Local Delivery • DTI Registered
        </div>
      </div>

      {/* Interactive SMS OTP Verification Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#e2ebe1] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOtpModalOpen(false)}
              className="absolute top-4 right-4 text-[#707971] hover:text-[#161d18] p-1.5 rounded-full hover:bg-[#edf6ec]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[#a9f3c5]/40 rounded-full flex items-center justify-center mx-auto text-[#004328]">
                <Smartphone className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-extrabold text-[#161d18]">
                Verify Your Number
              </h3>
              <p className="text-xs text-[#404942] leading-relaxed">
                Enter the 4-digit code sent via SMS to{' '}
                <span className="font-bold text-[#161d18]">
                  {selectedCountry.code} {phoneNumber}
                </span>
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 my-6">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-extrabold text-[#004328] bg-[#edf6ec] border-2 border-[#bfc9c0] focus:border-[#004328] focus:bg-white rounded-xl outline-none transition-all"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Demo Code Auto-fill Helper */}
            <div className="bg-[#edf6ec] rounded-xl p-3 text-center mb-4 border border-[#dce5db]">
              <div className="text-xs text-[#404942] mb-1">
                For demo testing: Use SMS code <span className="font-bold text-[#004328]">4892</span>
              </div>
              <button
                type="button"
                onClick={autoFillOtp}
                className="text-xs font-bold text-[#004328] hover:underline inline-flex items-center gap-1"
              >
                <span>Tap here to auto-fill (4892)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {otpError && (
              <div className="text-xs text-[#ba1a1a] text-center mb-3 font-semibold">
                {otpError}
              </div>
            )}

            {/* Verify CTA */}
            <button
              type="button"
              onClick={completeVerification}
              className="w-full bg-[#004328] hover:bg-[#0d5c3a] text-white font-bold py-3 px-4 rounded-xl text-sm shadow-sm transition-all"
            >
              Verify & Enter Palengke
            </button>

            {/* Resend timer */}
            <div className="mt-4 text-center text-xs text-[#404942]">
              {countdown > 0 ? (
                <span>Resend code in {countdown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setCountdown(45)}
                  className="text-[#004328] font-bold hover:underline"
                >
                  Resend SMS Code
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Notice Toast */}
      {authSuccessNotice && (
        <div className="fixed bottom-6 z-50 bg-[#004328] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-[#a9f3c5]" />
          <span>{authSuccessNotice}</span>
        </div>
      )}
    </div>
  );
};
