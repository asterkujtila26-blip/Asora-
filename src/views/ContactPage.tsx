import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { Mail, Clock, MapPin, Check, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-12 sm:py-20 px-4 sm:px-10 max-w-5xl mx-auto">
      <div className="border-b border-[#0A0A0B]/10 pb-8 mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-neutral-500 block mb-1">
          CLIENT CONCIERGE
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#0A0A0B]">
          Direct Communication
        </h1>
        <p className="text-xs text-neutral-600 mt-2 max-w-xl">
          Our Paris atelier team is available for sizing guidance, garment inquiries, bespoke orders, and order assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white/70 border border-[#0A0A0B]/10 p-6 sm:p-8">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <Check size={32} className="mx-auto text-emerald-800" />
              <h3 className="font-editorial text-2xl text-[#0A0A0B]">
                Message Transmitted to Paris
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you. A member of our concierge team will respond to {formData.email} within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setFormData({ name: '', email: '', orderNumber: '', subject: 'General Inquiry', message: '' });
                }}
                className="mt-4 px-6 py-2 border border-[#0A0A0B] text-xs uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-editorial text-2xl text-[#0A0A0B] mb-4">
                Transmit a Message
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 focus:outline-none focus:border-[#0A0A0B]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 focus:outline-none focus:border-[#0A0A0B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                    SUBJECT
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 focus:outline-none focus:border-[#0A0A0B]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Size & Fit Consultation">Size & Fit Consultation</option>
                    <option value="Order Fulfillment Status">Order Fulfillment Status</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Private Appointments">Paris Studio Appointment</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                    ORDER # (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    placeholder="ASR-2026-XXXX"
                    className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 font-mono focus:outline-none focus:border-[#0A0A0B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry..."
                  className="w-full bg-white border border-[#0A0A0B]/20 p-2.5 focus:outline-none focus:border-[#0A0A0B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0A0A0B] text-[#F1EBDD] text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#2A2B2E] transition-colors flex items-center justify-center gap-2"
              >
                <Send size={13} />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          )}
        </div>

        {/* Concierge Details Card */}
        <div className="lg:col-span-5 bg-white/60 border border-[#0A0A0B]/10 p-6 sm:p-8 space-y-6 text-xs">
          <div className="flex items-center gap-3">
            <AsoraEmblem size={28} color="#0A0A0B" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block">
                CONCIERGE OFFICE
              </span>
              <h4 className="font-editorial text-2xl font-light text-[#0A0A0B]">
                ASORA PARIS
              </h4>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#0A0A0B]/10">
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-neutral-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-mono text-[10px] uppercase text-neutral-500 block">
                  EMAIL ENQUIRIES
                </span>
                <a href={`mailto:${settings.contactEmail}`} className="font-semibold text-sm underline">
                  {settings.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={16} className="text-neutral-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-mono text-[10px] uppercase text-neutral-500 block">
                  OPERATING HOURS
                </span>
                <p className="text-neutral-700">{settings.supportHours}</p>
                <p className="text-[11px] text-neutral-500">Typical response time within 1 business day</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-neutral-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-mono text-[10px] uppercase text-neutral-500 block">
                  STUDIO ATELIER (BY APPOINTMENT)
                </span>
                <p className="text-neutral-700">14 Rue de Turenne, 75004 Paris, France</p>
                <p className="text-[11px] text-neutral-500">Private client fittings upon invitation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
