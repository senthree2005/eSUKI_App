import React, { useState } from 'react';
import { X, Send, Clock, Sparkles } from 'lucide-react';
import { ateLornaImg } from '../../data/mockDataItems';

interface ChatMessage {
  id: string;
  sender: 'user' | 'vendor';
  text: string;
  time: string;
}

interface ChatWithVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName?: string;
  stallName?: string;
}

export const ChatWithVendorModal: React.FC<ChatWithVendorModalProps> = ({
  isOpen,
  onClose,
  vendorName = 'Ate Lorna Capulong',
  stallName = "Ate Lorna's Fish Stall",
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'vendor',
      text: 'Maayong adlaw suki! Bag-ong abot ang dagupan bangus gikan sa port kaganinang 6 AM. Unsay tabang nako nimo karon?',
      time: '8:30 AM',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Ate, pwede po bang pakilinis nang maayos ang himbis at hiwaing daing cut?',
      time: '8:32 AM',
    },
    {
      id: '3',
      sender: 'vendor',
      text: 'Oo suki! Hawanon gyud nako pag-ayo ang hasang ug himbis, unya butterfly daing cut. Libre limpyo na diri sa stall #14!',
      time: '8:33 AM',
    },
  ]);

  const quickPrompts = [
    'Ate, paki-extrahan ug dinurog nga yelo sa bayong packaging',
    'Pila ka piraso ang 1 kilo karon?',
    'Pwede ipa-deliver diretso via Manong Junjun tricycle?',
    'Naa bay tamban o tilapia karon?',
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Vendor reply simulation
    setTimeout(() => {
      let reply = 'Noted suki! Ako mismo ang mag-preparar ana para sigurado ang kalab-as!';
      if (textToSend.toLowerCase().includes('yelo')) {
        reply = 'Sigurado suki! Pun-on gyud nako og dinurog nga yelo ang insulated bayong para bugnaw pag-abot sa inyoha.';
      } else if (textToSend.toLowerCase().includes('pila') || textToSend.toLowerCase().includes('kilo')) {
        reply = 'Mga 2 hangtod 3 ka dagko nga piraso sa 1 kilo suki, tam-is ug tambok kaayo ang tiyan.';
      } else if (textToSend.toLowerCase().includes('tricycle') || textToSend.toLowerCase().includes('deliver')) {
        reply = 'Oo suki, si Manong Junjun naghulat na sa Toda gate 2. Mga 15–20 minutos abot na diha sa inyoha!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'vendor',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-xl sm:rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[650px] border border-emerald-900/10">
        {/* Header */}
        <div className="p-4 bg-[#0d5c3a] text-white flex items-center justify-between shadow">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={ateLornaImg}
                alt={vendorName}
                className="w-11 h-11 rounded-lg object-cover border-2 border-white/60"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0d5c3a] rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">{stallName}</h3>
              <p className="text-xs text-emerald-200">{vendorName} • Wet Stall #14</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-100/90 mt-0.5">
                <Clock className="w-3 h-3 text-amber-300" />
                <span>Replies in &lt; 2 mins • Active Now</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Chat"
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Palengke Assurance Bar */}
        <div className="bg-[#edf6ec] px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs text-[#0d5c3a]">
          <div className="flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Direct Suki Line • Free Fish Cleaning & Gutting</span>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8faf8]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-lg text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#0d5c3a] text-white rounded-br-none shadow-sm'
                    : 'bg-white text-zinc-800 border border-emerald-900/10 rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-zinc-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-zinc-100 overflow-x-auto scrollbar-none flex gap-2">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="whitespace-nowrap shrink-0 text-[11px] bg-[#edf6ec] text-[#0d5c3a] hover:bg-[#dce5db] font-medium px-3 py-1.5 rounded-md border border-emerald-200/60 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="p-3 bg-white border-t border-zinc-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message for Ate Lorna..."
            className="flex-1 bg-zinc-100 border border-zinc-200 rounded-lg px-3.5 py-2 text-xs text-zinc-800 focus:outline-none focus:border-[#0d5c3a] focus:bg-white"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send Message"
            className="p-2.5 rounded-lg bg-[#0d5c3a] text-white disabled:opacity-40 hover:bg-[#084229] transition active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
