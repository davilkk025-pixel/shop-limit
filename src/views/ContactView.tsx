import React, { useState } from 'react';
import { Mail, Send, Check, MessageSquare, HelpCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Product Suggestion',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          topic: 'Product Suggestion',
          message: '',
        });
      }, 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#064E3B] flex items-center justify-center text-white mx-auto shadow-md">
          <Mail className="w-5 h-5" />
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#102A24]">
          Get in Touch with Shop Limit
        </h1>
        <p className="text-xs sm:text-sm text-[#102A24]/75 max-w-lg mx-auto">
          Have a product you want us to put through our limit testing? Found an error in a spec sheet? We read every message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="md:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/95">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#00C896]/20 text-[#064E3B] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-[#00C896]" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#102A24]">
                Message Received!
              </h3>
              <p className="text-xs text-[#102A24]/75 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out to the Shop Limit editorial desk. Our team will review your inquiry within 2 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-[#00C896] underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#064E3B] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#DDEBE5] focus:outline-none focus:border-[#00C896] text-[#102A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E3B] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#DDEBE5] focus:outline-none focus:border-[#00C896] text-[#102A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E3B] mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#DDEBE5] focus:outline-none focus:border-[#00C896] text-[#102A24] cursor-pointer"
                >
                  <option value="Product Suggestion">Product Review Suggestion</option>
                  <option value="Editorial Correction">Editorial Correction / Spec Question</option>
                  <option value="Affiliate Partnership">Amazon Affiliate Query</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E3B] mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you'd like to share or ask..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#DDEBE5] focus:outline-none focus:border-[#00C896] text-[#102A24] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full emerald-gradient-btn py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQ Sidebar */}
        <div className="md:col-span-5 space-y-4">
          <div className="glass-card p-6 rounded-2xl border border-[#DDEBE5] space-y-3">
            <h3 className="font-display font-semibold text-sm text-[#064E3B] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#00C896]" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-3 pt-2 text-xs text-[#102A24]/80">
              <div>
                <h4 className="font-bold text-[#102A24]">Do you accept paid reviews from sellers?</h4>
                <p className="mt-0.5 text-[#102A24]/70 leading-relaxed">
                  No. We do not accept sponsored placements, free items with editorial conditions, or kickbacks.
                </p>
              </div>

              <div className="pt-2 border-t border-[#DDEBE5]/70">
                <h4 className="font-bold text-[#102A24]">Why do some products have no buy button?</h4>
                <p className="mt-0.5 text-[#102A24]/70 leading-relaxed">
                  Per strict compliance rules, if an item is a layout preview or lacks a genuine verified Amazon Special Link, we cleanly omit the purchase button.
                </p>
              </div>

              <div className="pt-2 border-t border-[#DDEBE5]/70">
                <h4 className="font-bold text-[#102A24]">Are your prices live?</h4>
                <p className="mt-0.5 text-[#102A24]/70 leading-relaxed">
                  Amazon prices fluctuate in real time. We do not claim to display live prices; users can click our Amazon links to view current rates directly on Amazon.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
