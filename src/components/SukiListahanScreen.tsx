import React, { useState } from 'react';
import { SukiCustomer } from '../types';

interface SukiListahanScreenProps {
  sukiCustomers: SukiCustomer[];
  onAddSuki: (customer: SukiCustomer) => void;
  onUpdateBalance: (customerId: string, newBalance: number) => void;
}

export const SukiListahanScreen: React.FC<SukiListahanScreenProps> = ({
  sukiCustomers,
  onAddSuki,
  onUpdateBalance,
}) => {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [tier, setTier] = useState<SukiCustomer['tier']>('Regular Suki');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = sukiCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const totalOutstanding = sukiCustomers.reduce(
    (sum, c) => sum + c.outstandingBalance,
    0
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // const newCustomer: SukiCustomer = {
    //   id: `suki-${name.trim()}`,
    //   name: name.trim(),
    //   phone: phone.trim() || '09xx-xxx-xxxx',
    //   tier,
    //   totalOrders: 1,
    //   totalSpent: 350,
    //   favoriteItems: ['Fresh Bangus', 'Talong'],
    //   outstandingBalance: 0,
    //   lastOrdered: 'Karon lang',
    //   notes: notes.trim() || 'Bag-ong suki sa Tagum market',
    // };
    const newCustomer: SukiCustomer = {
      customerId
    };

    onAddSuki(newCustomer);
    setName('');
    setPhone('');
    setNotes('');
    setShowAddModal(false);
    setToastMsg('Bag-ong suki na-rehistro sa Listahan!');
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-4 max-w-lg mx-auto">
      {/* Header Banner Styled like an authentic Palengke Notebook */}
      <div className="px-4 pt-1">
        <div className="bg-gradient-to-r from-[#004328] to-[#0d5c3a] text-white p-4 rounded-2xl shadow-md space-y-3 relative overflow-hidden">
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-full bg-[#febb2d] flex items-center justify-center text-[#271900]">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
              <div>
                <h1 className="font-extrabold text-[18px]">
                  Ate Lorna's Suki Listahan
                </h1>
                <p className="text-[11px] text-[#8ed6aa]">
                  Tagum City Community Trust &amp; Loyalty Ledger
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 bg-[#febb2d] hover:bg-[#ffdea9] active:scale-95 text-[#271900] rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[15px]">person_add</span>
              <span>Dugang Suki</span>
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-2 pt-1 border-t border-white/10 text-[12px]">
            <div className="bg-black/20 p-2 rounded-xl">
              <span className="text-[10px] text-[#8ed6aa] uppercase block font-bold">
                Total Suki
              </span>
              <span className="text-[16px] font-extrabold text-white">
                {sukiCustomers.length} Customers
              </span>
            </div>
            <div className="bg-black/20 p-2 rounded-xl">
              <span className="text-[10px] text-[#ffb09b] uppercase block font-bold">
                Trust Credit
              </span>
              <span className="text-[16px] font-extrabold text-[#febb2d]">
                ₱{totalOutstanding}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-4">
        <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white shadow-xs border border-[#bfc9c0]/40">
          <span className="material-symbols-outlined text-[#707971] text-[20px]">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pangitaa ang suki (Name o Phone)..."
            className="text-[13px] bg-transparent flex-1 focus:outline-none text-[#161d18] placeholder:text-[#bfc9c0]"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-[#707971]">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Customers Ledger Cards */}
      <div className="px-4 space-y-3">
        {filtered.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2ebe1] space-y-2.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#edf6ec] text-[#004328] font-extrabold flex items-center justify-center text-[14px]">
                  {customer.name.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-[14px] text-[#161d18]">
                      {customer.name}
                    </h3>
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                        customer.tier === 'Diamond Suki'
                          ? 'bg-[#a9f3c5] text-[#004328]'
                          : customer.tier === 'Gold Suki'
                          ? 'bg-[#ffdea9] text-[#6d4c00]'
                          : 'bg-[#edf6ec] text-[#404942]'
                      }`}
                    >
                      {customer.tier}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#707971]">
                    {customer.phone} • Last: {customer.lastOrdered}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#707971] uppercase block font-bold">
                  Credit / Utang
                </span>
                <span
                  className={`text-[14px] font-extrabold ${
                    customer.outstandingBalance > 0
                      ? 'text-[#ba1a1a]'
                      : 'text-[#226b47]'
                  }`}
                >
                  {customer.outstandingBalance > 0
                    ? `₱${customer.outstandingBalance}`
                    : '₱0'}
                </span>
              </div>
            </div>

            {/* Favorite catches / items */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] font-bold text-[#707971]">Suki Faves:</span>
              {customer.favoriteItems.map((fav, i) => (
                <span
                  key={i}
                  className="bg-[#edf6ec] text-[#004328] px-2 py-0.5 rounded-md text-[10px] font-bold"
                >
                  {fav}
                </span>
              ))}
            </div>

            {/* Tindera Personal Note */}
            {customer.notes && (
              <div className="bg-[#f3fcf2] p-2 rounded-xl text-[11px] text-[#404942] italic border border-[#bfc9c0]/30 flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#226b47] shrink-0">
                  edit_note
                </span>
                <span>"{customer.notes}"</span>
              </div>
            )}

            {/* Ledger Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-[#e2ebe1] text-[11px]">
              <span className="text-[#707971]">
                Total Orders: <strong>{customer.totalOrders}x</strong> (₱
                {customer.totalSpent})
              </span>

              {customer.outstandingBalance > 0 ? (
                <button
                  onClick={() => {
                    onUpdateBalance(customer.id, 0);
                    setToastMsg(`Nabayran na ang ₱${customer.outstandingBalance} ni ${customer.name}!`);
                    setTimeout(() => setToastMsg(null), 2500);
                  }}
                  className="px-2.5 py-1 bg-[#226b47] text-white font-bold rounded-lg active:scale-95 transition-all shadow-xs"
                >
                  Pay Credit
                </button>
              ) : (
                <button
                  onClick={() => {
                    onUpdateBalance(customer.id, 150);
                    setToastMsg(`Nadugang ang ₱150 sa notebook ni ${customer.name}`);
                    setTimeout(() => setToastMsg(null), 2500);
                  }}
                  className="text-[#004328] font-bold hover:underline"
                >
                  + Ilista sa Notebook
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {toastMsg && (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom max-w-md mx-auto">
          <div className="bg-[#004328] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-[#a9f3c5]/30">
            <span className="material-symbols-outlined text-[#a9f3c5] text-[20px]">
              check_circle
            </span>
            <span className="text-[12px] font-bold">{toastMsg}</span>
          </div>
        </div>
      )}

      {/* Add Suki Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-4 w-full max-w-sm shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2ebe1]">
              <h3 className="font-bold text-[15px] text-[#161d18]">
                Bag-ong Suki sa Listahan
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-[#edf6ec] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#707971] block mb-1">
                  Pangalan sa Suki
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nanay Remedios"
                  className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[13px] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#707971] block mb-1">
                  Cellphone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0917-xxx-xxxx"
                  className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#707971] block mb-1">
                  Suki Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as SukiCustomer['tier'])}
                  className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[13px] focus:outline-none"
                >
                  <option value="Regular Suki">Regular Suki</option>
                  <option value="Gold Suki">Gold Suki (Repeat Buyer)</option>
                  <option value="Diamond Suki">Diamond Suki (VIP Palengke)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#707971] block mb-1">
                  Personal Note sa Tindera
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Pirmi magpahiwa sa isda"
                  className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[13px] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#004328] hover:bg-[#0d5c3a] text-white font-bold rounded-xl text-[13px] flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>I-rehistro sa Listahan</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
