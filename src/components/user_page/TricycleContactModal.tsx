import React, { useState } from 'react';
import { X, Phone, MessageSquare, Send, Bike, Check } from 'lucide-react';
import { DeliveryRider } from '../types';

interface TricycleContactModalProps {
  rider: DeliveryRider;
  onClose: () => void;
  onSendMessage: (msg: string) => void;
}

export const TricycleContactModal: React.FC<TricycleContactModalProps> = ({
  rider,
  onClose,
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'rider'; text: string; time: string }>>([
    {
      sender: 'rider',
      text: 'Magandang araw Maam Maria! Nakuha ko na po ang Bangus kay Ate Lorna at Kangkong kay Mang Toring. Papunta na po ako sa Magugpo West via Pioneer Ave.',
      time: '8:10 AM',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isCalling, setIsCalling] = useState(false);

  const quickReplies = [
    'Paki-iwan nalang po sa gate.',
    'May pambarya po ba kayo sa ₱500?',
    'Ingat po sa daan Manong!',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: text.trim(), time: 'Just now' },
    ]);
    onSendMessage(text.trim());
    setInputVal('');

    // Simulated quick rider reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'rider',
          text: 'Opo Maam Maria, noted po! Salamat kaayo!',
          time: 'Just now',
        },
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#f3fcf2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dce5db] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 border-b border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={rider.avatarUrl}
              alt={rider.name}
              className="w-11 h-11 rounded-full object-cover border border-[#0d5c3a]"
            />
            <div>
              <h3 className="font-bold text-sm text-[#161d18]">
                {rider.name}
              </h3>
              <p className="text-xs text-[#707971]">
                {rider.todaAssociation} {rider.tricycleNumber} • {rider.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsCalling(!isCalling)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isCalling
                  ? 'bg-[#ba1a1a] text-white animate-pulse'
                  : 'bg-[#0d5c3a] text-white hover:bg-[#004328]'
              }`}
              title={isCalling ? 'End Call' : 'Call Manong Junjun'}
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#edf6ec] text-[#404942] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* In-Call Banner */}
        {isCalling && (
          <div className="bg-[#004328] text-white p-3 text-center text-xs flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a9f3c5] animate-ping" />
            <span>Calling Manong Junjun (+63 917 842 1102)... Connected (00:08)</span>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[220px]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0d5c3a] text-white rounded-br-xs'
                    : 'bg-white text-[#161d18] border border-[#e2ebe1] rounded-bl-xs shadow-2xs'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-[#707971]'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Presets */}
        <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-t border-[#e2ebe1] bg-white">
          {quickReplies.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-semibold bg-[#edf6ec] text-[#005232] hover:bg-[#dce5db] py-1 px-2.5 rounded-full whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#e2ebe1]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Mensahe para kay Manong Junjun..."
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
