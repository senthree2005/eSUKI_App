import React, { useState } from 'react';
import { X, Send, Store, Sparkles } from 'lucide-react';
import { Vendor } from '../../types';

interface ChatVendorModalProps {
  vendor: Vendor;
  onClose: () => void;
  onSendMessage: (msg: string) => void;
}

export const ChatVendorModal: React.FC<ChatVendorModalProps> = ({
  vendor,
  onClose,
  onSendMessage,
}) => {
  const [messages, setMessages] = useState([
    {
      sender: 'vendor',
      text: `Hello Suki Maria! Kumusta ka? May bagong dating kaming Yellowfin Tuna at Bangus mula Davao Gulf kaninang 4:30 AM. Scaled and debone natin?`,
      time: '7:45 AM',
    },
  ]);
  const [text, setText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: text.trim(), time: 'Just now' },
    ]);
    onSendMessage(text.trim());
    setText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'vendor',
          text: `Sige po Maam Maria, nilagay ko na sa fresh ice pack kasama ng 4 pcs calamansi at luya freebie mo! Ingat po kayo!`,
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#f3fcf2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dce5db] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 border-b border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={vendor.avatarUrl}
              alt={vendor.name}
              className="w-11 h-11 rounded-full object-cover border border-[#0d5c3a]"
            />
            <div>
              <h3 className="font-bold text-sm text-[#161d18]">
                {vendor.name}
              </h3>
              <p className="text-xs text-[#707971]">
                {vendor.stallNumber} • {vendor.sukiDuration}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#edf6ec] text-[#404942] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suki Gold status badge */}
        <div className="bg-[#ffdea9]/70 px-4 py-2 border-b border-[#febb2d]/30 text-xs text-[#3c2500] font-semibold flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#7d5800]" />
            <span>Chatting as Gold Suki (2 Years)</span>
          </div>
          <span className="text-[10px] bg-[#febb2d] px-2 py-0.5 rounded-full text-[#271900]">
            Priority Response
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[220px]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#0d5c3a] text-white rounded-br-xs'
                    : 'bg-white text-[#161d18] border border-[#e2ebe1] rounded-bl-xs shadow-2xs'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 ${
                    m.sender === 'user' ? 'text-white/70' : 'text-[#707971]'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-[#e2ebe1]">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Message ${vendor.name.split("'")[0]}...`}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#dce5db] bg-[#f3fcf2] text-[#161d18] focus:outline-none focus:border-[#0d5c3a]"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-[#0d5c3a] text-white flex items-center justify-center hover:bg-[#004328] active:scale-95 shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
