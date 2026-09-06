import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { APPLICATION_ENDPOINT } from '../data/content';
import { CreatorApplicationFormData } from '../types';
import { saveApplication } from '../data/applicationsStorage';

interface ApplyPageProps {
  onBackToHome: () => void;
}

const INITIAL_FORM: CreatorApplicationFormData = {
  fullName: '',
  instagramHandle: '',
  email: '',
  phone: '',
  city: '',
  primaryPlatform: 'Instagram',
  creatorCategory: 'Skincare',
  followers: '',
  profileUrl: '',
  contentDescription: '',
  previousCollaborations: '',
  whyJoin: '',
  termsAccepted: false
};

export const ApplyPage: React.FC<ApplyPageProps> = ({ onBackToHome }) => {
  const [formData, setFormData] = useState<CreatorApplicationFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.instagramHandle.trim()) {
      newErrors.instagramHandle = 'Instagram Handle is required.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone validation
    const phoneClean = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required.';
    } else if (phoneClean.length < 7) {
      newErrors.phone = 'Please enter a valid phone number with country code.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City / Location is required.';
    }

    if (!formData.primaryPlatform) {
      newErrors.primaryPlatform = 'Please select your primary platform.';
    }

    if (!formData.creatorCategory) {
      newErrors.creatorCategory = 'Please select your creator category.';
    }

    if (!formData.followers.trim()) {
      newErrors.followers = 'Follower / subscriber count is required.';
    }

    // URL validation
    try {
      const url = new URL(formData.profileUrl.trim().startsWith('http') ? formData.profileUrl.trim() : `https://${formData.profileUrl.trim()}`);
      if (!url.hostname) {
        newErrors.profileUrl = 'Please enter a valid profile URL.';
      }
    } catch {
      newErrors.profileUrl = 'Please enter a valid URL (e.g. https://instagram.com/username).';
    }

    if (!formData.contentDescription.trim()) {
      newErrors.contentDescription = 'Please tell us briefly about your content.';
    } else if (formData.contentDescription.trim().length < 15) {
      newErrors.contentDescription = 'Please provide a bit more detail about your content (min 15 characters).';
    }

    if (!formData.whyJoin.trim()) {
      newErrors.whyJoin = 'Please share why you want to join MIDBLEND.';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must confirm the creator terms to continue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setSubmissionStatus('loading');
    setErrorMessage('');

    try {
      const params = new URLSearchParams();
      params.append('Full Name', formData.fullName);
      params.append('Instagram Handle', formData.instagramHandle);
      params.append('Email Address', formData.email);
      params.append('Phone Number', formData.phone);
      params.append('City', formData.city);
      params.append('Primary Platform', formData.primaryPlatform);
      params.append('Creator Category', formData.creatorCategory);
      params.append('Followers', formData.followers);
      params.append('Profile URL', formData.profileUrl);
      params.append('Content Description', formData.contentDescription);
      params.append('Previous Collaborations', formData.previousCollaborations || 'None specified');
      params.append('Why Join', formData.whyJoin);
      params.append('Submission Date', new Date().toISOString());

      // Submit to central configured endpoint
      await fetch(APPLICATION_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      // Also persist to Admin Dashboard
      saveApplication({
        id: 'app_' + Date.now(),
        fullName: formData.fullName,
        instagramHandle: formData.instagramHandle.startsWith('@')
          ? formData.instagramHandle
          : `@${formData.instagramHandle}`,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        primaryPlatform: formData.primaryPlatform,
        creatorCategory: formData.creatorCategory,
        followers: formData.followers,
        profileUrl: formData.profileUrl || `https://instagram.com/${formData.instagramHandle.replace('@', '')}`,
        contentDescription: formData.contentDescription,
        previousCollaborations: formData.previousCollaborations || 'None listed',
        whyJoin: formData.whyJoin,
        submittedAt: new Date().toISOString(),
        status: 'new'
      });

      // Successful submission
      setSubmissionStatus('success');
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmissionStatus('error');
      setErrorMessage(
        'Unable to submit your application at this moment due to a connection issue. Please check your network or DM us on Instagram @midblend.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top Header Bar for Native Apply Page */}
      <div className="max-w-4xl mx-auto mb-10 flex items-center justify-between border-b border-white/10 pb-6">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBackToHome();
          }}
          className="flex items-center gap-1.5 text-xl font-black tracking-tighter text-white uppercase"
        >
          <span>MIDBLEND</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4FF00]" />
        </a>

        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Page Hero Intro */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] font-bold bg-[#050505] mb-4">
            <Sparkles className="w-3 h-3" />
            <span>CREATOR APPLICATION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white uppercase mb-4">
            JOIN <span className="text-[#D4FF00] italic">MIDBLEND</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Join our community of <strong className="text-white font-semibold">300+ creators</strong> and discover opportunities with beauty, skincare, makeup, haircare and lifestyle brands.
          </p>
        </div>

        {/* SUCCESS SCREEN */}
        {submissionStatus === 'success' ? (
          <div
            id="application-success-card"
            className="rounded-2xl bg-[#111111] border border-[#D4FF00]/40 p-8 sm:p-12 text-center shadow-2xl shadow-[#D4FF00]/5 animate-in fade-in zoom-in-95 duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-[#1e2712] border-2 border-[#D4FF00] text-[#D4FF00] mx-auto flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,255,0,0.3)]">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-3">
              APPLICATION RECEIVED
            </h2>

            <p className="text-base sm:text-lg text-gray-300 max-w-md mx-auto leading-relaxed mb-8">
              Thanks for applying to MIDBLEND. We'll review your profile and get back to you.
            </p>

            <div className="p-4 rounded-xl bg-[#181818] border border-white/10 text-xs text-gray-400 max-w-sm mx-auto mb-8">
              Keep an eye on your email ({formData.email}) and Instagram DMs ({formData.instagramHandle}) for campaign briefings.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto bg-[#D4FF00] hover:bg-[#c2ea00] text-black font-extrabold uppercase text-xs tracking-widest px-8 py-4 rounded-sm transition-all duration-200"
              >
                Return to Homepage →
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(INITIAL_FORM);
                  setSubmissionStatus('idle');
                }}
                className="w-full sm:w-auto text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white px-6 py-4"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* Application Form Card */
          <div
            id="application-form-card"
            className="rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl relative"
          >
            {/* Error Notification Banner */}
            {submissionStatus === 'error' && (
              <div
                id="application-error-banner"
                className="mb-8 p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-300 mb-1">Submission encountered an issue</p>
                  <p className="text-xs text-red-200/90">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Section: Personal Info */}
              <div className="border-b border-white/10 pb-6">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4FF00] block mb-4">
                  01. CREATOR PROFILE
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 1. Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Jessica Sterling"
                      className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                        errors.fullName ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* 2. Instagram Handle */}
                  <div>
                    <label htmlFor="instagramHandle" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      Instagram Handle *
                    </label>
                    <input
                      id="instagramHandle"
                      name="instagramHandle"
                      type="text"
                      required
                      value={formData.instagramHandle}
                      onChange={handleChange}
                      placeholder="@yourhandle"
                      className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                        errors.instagramHandle ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors`}
                    />
                    {errors.instagramHandle && (
                      <p className="text-xs text-red-400 mt-1">{errors.instagramHandle}</p>
                    )}
                  </div>

                  {/* 3. Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@creator.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* 4. Phone / WhatsApp Number */}
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* 5. City */}
                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      City & Country *
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Los Angeles, CA or London, UK"
                      className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                        errors.city ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-400 mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Platform & Audience */}
              <div className="border-b border-white/10 pb-6">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4FF00] block mb-4">
                  02. PLATFORM & CATEGORY
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 6. Primary Platform */}
                  <div>
                    <label htmlFor="primaryPlatform" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      Primary Platform *
                    </label>
                    <select
                      id="primaryPlatform"
                      name="primaryPlatform"
                      required
                      value={formData.primaryPlatform}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Instagram + YouTube">Instagram + YouTube</option>
                      <option value="Other">Other (TikTok, Blog, etc.)</option>
                    </select>
                  </div>

                  {/* 7. Creator Category */}
                  <div>
                    <label htmlFor="creatorCategory" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      Creator Category *
                    </label>
                    <select
                      id="creatorCategory"
                      name="creatorCategory"
                      required
                      value={formData.creatorCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                    >
                      <option value="Beauty">Beauty</option>
                      <option value="Skincare">Skincare</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Haircare">Haircare</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* 8. Followers / Subscribers */}
                  <div>
                    <label htmlFor="followers" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      Followers / Subscribers *
                    </label>
                    <input
                      id="followers"
                      name="followers"
                      type="text"
                      required
                      value={formData.followers}
                      onChange={handleChange}
                      placeholder="e.g. 25K or 150,000"
                      className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                        errors.followers ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors`}
                    />
                    {errors.followers && (
                      <p className="text-xs text-red-400 mt-1">{errors.followers}</p>
                    )}
                  </div>

                  {/* 9. Profile URL */}
                  <div>
                    <label htmlFor="profileUrl" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                      Instagram / YouTube Profile URL *
                    </label>
                    <input
                      id="profileUrl"
                      name="profileUrl"
                      type="url"
                      required
                      value={formData.profileUrl}
                      onChange={handleChange}
                      placeholder="https://instagram.com/yourhandle"
                      className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                        errors.profileUrl ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors`}
                    />
                    {errors.profileUrl && (
                      <p className="text-xs text-red-400 mt-1">{errors.profileUrl}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Content & Collaboration Background */}
              <div className="border-b border-white/10 pb-6 space-y-5">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4FF00] block mb-2">
                  03. CONTENT & COLLABORATIONS
                </span>

                {/* 10. Tell us about your content */}
                <div>
                  <label htmlFor="contentDescription" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                    Tell us about your content *
                  </label>
                  <textarea
                    id="contentDescription"
                    name="contentDescription"
                    rows={3}
                    required
                    value={formData.contentDescription}
                    onChange={handleChange}
                    placeholder="Describe your content format, favorite beauty topics, tone, and audience demographics..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                      errors.contentDescription ? 'border-red-500' : 'border-white/10'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors resize-none`}
                  />
                  {errors.contentDescription && (
                    <p className="text-xs text-red-400 mt-1">{errors.contentDescription}</p>
                  )}
                </div>

                {/* 11. Previous Brand Collaborations */}
                <div>
                  <label htmlFor="previousCollaborations" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                    Previous Brand Collaborations (Optional)
                  </label>
                  <textarea
                    id="previousCollaborations"
                    name="previousCollaborations"
                    rows={2}
                    value={formData.previousCollaborations}
                    onChange={handleChange}
                    placeholder="List notable skincare or cosmetic brands you've worked with..."
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors resize-none"
                  />
                </div>

                {/* 12. Why do you want to join MIDBLEND? */}
                <div>
                  <label htmlFor="whyJoin" className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                    Why do you want to join MIDBLEND? *
                  </label>
                  <textarea
                    id="whyJoin"
                    name="whyJoin"
                    rows={3}
                    required
                    value={formData.whyJoin}
                    onChange={handleChange}
                    placeholder="What excites you about collaborating with skincare brands through our community?"
                    className={`w-full px-4 py-3 rounded-xl bg-[#181818] border ${
                      errors.whyJoin ? 'border-red-500' : 'border-white/10'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors resize-none`}
                  />
                  {errors.whyJoin && (
                    <p className="text-xs text-red-400 mt-1">{errors.whyJoin}</p>
                  )}
                </div>
              </div>

              {/* 13. Creator confirmation checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded bg-[#181818] border-white/20 text-[#D4FF00] focus:ring-[#D4FF00] focus:ring-offset-0 transition-colors"
                  />
                  <span className="text-xs text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    I confirm that the information provided is accurate and I agree to participate in MIDBLEND's creator community campaigns and brand briefing processes. *
                  </span>
                </label>
                {errors.termsAccepted && (
                  <p className="text-xs text-red-400 mt-1 ml-7">{errors.termsAccepted}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submissionStatus === 'loading'}
                  id="submit-application-btn"
                  className="w-full flex items-center justify-center gap-2 bg-[#D4FF00] hover:bg-[#c2ea00] disabled:bg-[#D4FF00]/60 text-black font-extrabold uppercase text-xs tracking-widest py-4 px-8 rounded-sm transition-all duration-200 shadow-xl shadow-[#D4FF00]/20"
                >
                  {submissionStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>SUBMITTING APPLICATION...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT APPLICATION →</span>
                    </>
                  )}
                </button>

                {/* Privacy Guarantee Note */}
                <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>Your information is safe with us.</span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
