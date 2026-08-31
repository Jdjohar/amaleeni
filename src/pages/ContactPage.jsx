import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  Award,
  Compass,
  Globe2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Pink Pages registration and Amaleeni Womenpreneurs 2027 attendance',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const routedDesks = [
    {
      title: 'Pink Pages registration & summit attendance',
      desc: 'Delegate passes, enterprise directory onboarding, and attendee inquiries.',
      email: 'delegates@amaleeni.org',
      phone: '+91 98765 43210',
      icon: Users,
      badge: 'Delegates Desk',
    },
    {
      title: 'Partnership, sponsorship and CSR',
      desc: 'Institutional alliances, corporate sponsorships, exhibition pavilions, and CSR impact desks.',
      email: 'partner@amaleeni.org',
      phone: '+91 98765 43210',
      icon: Award,
      badge: 'Partnership Desk',
    },
    {
      title: 'Speaking, mentoring and nominations',
      desc: 'Keynote inquiries, masterclass mentors, pitch floor judges, and speaker nominations.',
      email: 'speakers@amaleeni.org',
      phone: null,
      icon: Compass,
      badge: 'Speaker Desk',
    },
    {
      title: 'Press and media',
      desc: 'Accreditation, press releases, interviews with convenors, and official media partnerships.',
      email: 'media@amaleeni.org',
      phone: null,
      icon: Globe2,
      badge: 'Media Desk',
    },
    {
      title: 'Anything else',
      desc: 'General inquiries, volunteer requests, feedback, or foundation governance.',
      email: 'hello@amaleeni.org',
      phone: null,
      icon: Building2,
      badge: 'General Desk',
    },
  ];

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 8.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Secretariat &amp; Communications</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629] tracking-tight">
            Get in touch.
          </h1>

          <p className="text-lg sm:text-xl text-[#3D5C4A] font-serif leading-relaxed">
            Whether you want to attend, partner, speak or simply understand what we are building – we would like to hear from you.
          </p>
        </div>
      </section>

      {/* 8.3 Quick Contact Banner (High Priority Channels) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#E5D7C3] shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E5D7C3]">
            
            {/* WhatsApp */}
            <div className="flex items-start gap-4 pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D32]">
                  Fastest Response
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1B3629]">WhatsApp</h3>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-mono font-bold text-[#1B3629] hover:text-[#C83B46] block transition-colors"
                >
                  +91 98765 43210
                </a>
                <p className="text-xs text-[#5A7B68] font-serif">
                  The primary channel for delegates across India.
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-[#C83B46]/10 text-[#C83B46] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C83B46]">
                  Direct Telephone
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1B3629]">Secretariat Desk</h3>
                <a
                  href="tel:+919876543210"
                  className="text-base font-mono font-bold text-[#1B3629] hover:text-[#C83B46] block transition-colors"
                >
                  +91 98765 43210
                </a>
                <p className="text-xs text-[#5A7B68] font-serif flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7A6750]" />
                  <span>Monday to Saturday, 10am–6pm IST</span>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D49B4B]/20 text-[#D49B4B] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6750]">
                  Official Email
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1B3629]">General Enquiries</h3>
                <a
                  href="mailto:hello@amaleeni.org"
                  className="text-base font-bold text-[#1B3629] hover:text-[#C83B46] block transition-colors underline"
                >
                  hello@amaleeni.org
                </a>
                <p className="text-xs text-[#5A7B68] font-serif">
                  Routed to the central foundation secretariat.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8.2 Who to write to & 8.4 Enquiry form (Split Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8.2 Who to write to): Five routed addresses */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C83B46]">
                Targeted Communication
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3629]">
                Who to write to
              </h2>
              <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                Five routed addresses rather than one general inbox. It costs nothing to set up, it stops a sponsorship enquiry sitting behind two hundred delegate questions, and it signals that there is an organized team rather than one person with a phone.
              </p>
            </div>

            {/* Note callout */}
            <div className="bg-[#F2E8D7] p-4 rounded-2xl border border-[#E0D2BC] text-xs text-[#4E6B5A] font-serif">
              <span className="font-bold text-[#1B3629]">Note: </span>
              These can all forward to a single mailbox at the start. What matters is that the sender chooses the right one, so the enquiry can be triaged later without asking them to repeat themselves.
            </div>

            {/* The 5 Routed Desks */}
            <div className="space-y-3.5 pt-2">
              {routedDesks.map((desk, idx) => {
                const IconComp = desk.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#FAF5EB] rounded-2xl p-5 border border-[#E5D7C3] hover:border-[#C83B46] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center shrink-0 mt-0.5">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1B3629]/10 text-[#1B3629] px-2 py-0.5 rounded-md">
                            {desk.badge}
                          </span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#1B3629]">
                          {desk.title}
                        </h4>
                        <p className="text-xs text-[#5A7B68] font-serif">
                          {desk.desc}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#EAE0D0] space-y-1">
                      <a
                        href={`mailto:${desk.email}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C83B46] hover:underline font-mono"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{desk.email}</span>
                      </a>
                      {desk.phone && (
                        <a
                          href={`tel:${desk.phone}`}
                          className="block text-xs font-mono text-[#1B3629] hover:text-[#C83B46]"
                        >
                          {desk.phone}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column (8.4 Short Enquiry Form) */}
          <div className="lg:col-span-5">
            <div className="bg-[#1B3629] text-white rounded-3xl p-6 sm:p-8 border border-[#2D5440] shadow-2xl space-y-6 sticky top-28">
              
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
                  Send a Direct Message
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EB]">
                  Enquiry Form
                </h3>
                <p className="text-xs text-[#A8C2B3] font-serif">
                  A short form. Tell us who you are and what you need, and we will route it to the right desk.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#244735] p-8 rounded-2xl text-center space-y-4 animate-fadeIn border border-[#37644D]">
                  <CheckCircle2 className="w-14 h-14 text-[#81C784] mx-auto" />
                  <div className="space-y-1">
                    <h4 className="font-serif text-2xl font-bold text-white">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-[#A8C2B3] font-serif">
                      Thank you, {formData.name}. Your message has been routed to our{' '}
                      <span className="text-[#D49B4B] font-bold">{formData.category}</span> team.
                    </p>
                  </div>
                  <p className="text-xs text-[#FAF5EB]/80 italic pt-2 border-t border-[#37644D]">
                    Our secretariat typically responds within one working day.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'Pink Pages registration and Amaleeni Womenpreneurs 2027 attendance',
                        message: '',
                      });
                    }}
                    className="mt-2 text-xs text-[#D49B4B] underline font-bold hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#A8C2B3] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#A8C2B3] uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A8C2B3] uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
                      />
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-[#A8C2B3] uppercase tracking-wider mb-1">
                      I am writing about *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white text-xs sm:text-sm focus:outline-none focus:border-[#C83B46]"
                    >
                      <option value="Pink Pages registration and Amaleeni Womenpreneurs 2027 attendance">
                        Pink Pages registration &amp; summit attendance
                      </option>
                      <option value="Partnership, sponsorship and CSR">
                        Partnership, sponsorship and CSR
                      </option>
                      <option value="Speaking, mentoring and nominations">
                        Speaking, mentoring and nominations
                      </option>
                      <option value="Press and media">Press and media</option>
                      <option value="Anything else">Anything else</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-[#A8C2B3] uppercase tracking-wider mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Briefly describe your question or requirement..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-3.5 rounded-full text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <span>Send message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* 8.5 Where we are (Registered Office, Event Office & Map) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-10 border border-[#E5D7C3] shadow-lg space-y-8">
          
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C83B46]">
              Due Diligence &amp; Location
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3629]">
              Where we are
            </h2>
            <p className="text-sm text-[#4E6B5A] font-serif max-w-3xl leading-relaxed">
              The registered address matters more than it looks: it is a routine due-diligence check for CSR teams and government departments, and its absence is noticed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Registered Office Address */}
            <div className="bg-[#F2E8D7] rounded-2xl p-6 border border-[#E0D2BC] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B3629]">
                <MapPin className="w-4 h-4 text-[#C83B46]" />
                <span>Registered Foundation Office</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B3629]">
                Amaleeni Foundation
              </h3>
              <p className="text-sm text-[#3E5C4B] font-serif leading-relaxed">
                Registered under Section 8 of the Companies Act, 2013.<br />
                Sector 14, Indira Nagar, Lucknow, Uttar Pradesh - 226016, India.
              </p>
              <div className="pt-2 text-xs text-[#7A6750] border-t border-[#E0D2BC] flex items-center justify-between">
                <span>CIN / Reg: Verified Non-Profit</span>
                <span className="text-[#2E7D32] font-semibold">Government Registered</span>
              </div>
            </div>

            {/* Event Secretariat Office Address */}
            <div className="bg-[#F2E8D7] rounded-2xl p-6 border border-[#E0D2BC] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B3629]">
                <Building2 className="w-4 h-4 text-[#D49B4B]" />
                <span>Summit Secretariat Office</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B3629]">
                Amaleeni Womenpreneurs 2027 Secretariat
              </h3>
              <p className="text-sm text-[#3E5C4B] font-serif leading-relaxed">
                Coordination Desks: Lucknow &amp; New Delhi NCR.<br />
                Liaison Office: Barakhamba Road, Connaught Place, New Delhi - 110001.
              </p>
              <div className="pt-2 text-xs text-[#7A6750] border-t border-[#E0D2BC] flex items-center justify-between">
                <span>Hours: Mon–Sat, 10am–6pm IST</span>
                <span className="text-[#C83B46] font-semibold">Active Coordination</span>
              </div>
            </div>

          </div>

          {/* Embedded Map */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#E0D2BC] shadow-inner bg-[#EAE0D0] relative h-[320px] sm:h-[380px]">
            <iframe
              title="Amaleeni Foundation Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113886.9204060855!2d80.859666!3d26.885147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd0a0b8529cb%3A0x6b40d04c10646c07!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-90"
            ></iframe>
          </div>

        </div>
      </section>

      {/* 8.6 Follow (Social Channels) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
            Social Media &amp; Broadcasts
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1B3629]">
            Follow Amaleeni
          </h2>
          <p className="text-sm text-[#4E6B5A] font-serif max-w-xl mx-auto">
            Stay updated with speaker reveals, delegate spotlights, sector masterclasses, and foundation initiatives.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#FAF5EB] hover:bg-[#F2E8D7] text-[#1B3629] px-6 py-3 rounded-full text-xs font-bold border border-[#E0D2BC] shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#C83B46] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#FAF5EB] hover:bg-[#F2E8D7] text-[#1B3629] px-6 py-3 rounded-full text-xs font-bold border border-[#E0D2BC] shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#0077B5] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#FAF5EB] hover:bg-[#F2E8D7] text-[#1B3629] px-6 py-3 rounded-full text-xs font-bold border border-[#E0D2BC] shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#1877F2] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
            <span>Facebook</span>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#FAF5EB] hover:bg-[#F2E8D7] text-[#1B3629] px-6 py-3 rounded-full text-xs font-bold border border-[#E0D2BC] shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#FF0000] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span>YouTube</span>
          </a>
        </div>
      </section>

      {/* 8.7 Closing Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1B3629] to-[#12241C] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#D49B4B]/40 shadow-2xl text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Take The Next Step
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FAF5EB]">
              Join Amaleeni Womenpreneurs 2027
            </h2>
            <p className="text-base text-[#A8C2B3] font-serif max-w-xl mx-auto">
              Register on Pink Pages for verified business visibility and Early Bird summit access, or connect with our partnership secretariat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/pink-pages/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Register on Pink Pages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/partner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF5EB] hover:bg-white text-[#1B3629] px-8 py-4 rounded-full text-base font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
