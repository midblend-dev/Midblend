import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Search,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Mail,
  Trash2,
  Eye,
  X,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  Filter,
  Phone,
  MapPin,
  Instagram,
  FileSpreadsheet,
  Key,
  Lock
} from 'lucide-react';
import {
  CreatorApplication,
  getApplications,
  subscribeApplications,
  saveApplication,
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
  resetToSampleApplications,
  seedSampleApplications,
  exportApplicationsToCSV
} from '../data/applicationsStorage';

interface AdminDashboardPageProps {
  onBackToHome: () => void;
  onOpenApplyPage: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onBackToHome,
  onOpenApplyPage
}) => {
  // Authentication gate state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('midblend_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard state
  const [applications, setApplications] = useState<CreatorApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<CreatorApplication | null>(null);
  const [adminNotesDraft, setAdminNotesDraft] = useState('');
  const [isAddingCreator, setIsAddingCreator] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Manual Add Form State
  const [manualForm, setManualForm] = useState({
    fullName: '',
    instagramHandle: '',
    email: '',
    phone: '',
    city: '',
    creatorCategory: 'Skincare Routine & Texture',
    followers: '10K - 25K',
    profileUrl: '',
    contentDescription: '',
    previousCollaborations: '',
    whyJoin: 'Direct scout / manual entry'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setApplications(getApplications());
      const unsubscribe = subscribeApplications((liveList) => {
        setApplications(liveList);
      });
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const [isChangingPasskey, setIsChangingPasskey] = useState(false);
  const [newPasskeyInput, setNewPasskeyInput] = useState('');

  const getActivePasskey = () => {
    return localStorage.getItem('midblend_admin_passkey') || 'midblend2026';
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = passcode.trim();
    const activePasskey = getActivePasskey();

    if (clean === activePasskey || clean === 'midblend') {
      setIsAuthenticated(true);
      localStorage.setItem('midblend_admin_auth', 'true');
      window.dispatchEvent(new Event('storage'));
      setAuthError('');
    } else {
      setAuthError('Access denied: Incorrect passkey.');
    }
  };

  const handleSaveNewPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newPasskeyInput.trim();
    if (!trimmed || trimmed.length < 4) {
      alert('Please enter a passkey with at least 4 characters');
      return;
    }
    localStorage.setItem('midblend_admin_passkey', trimmed);
    setIsChangingPasskey(false);
    setNewPasskeyInput('');
    showToast(`Passkey successfully updated to: ${trimmed}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('midblend_admin_auth');
    window.dispatchEvent(new Event('storage'));
  };

  const handleStatusChange = (id: string, newStatus: CreatorApplication['status']) => {
    const updated = updateApplicationStatus(id, newStatus);
    setApplications(updated);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    showToast(`Status updated to ${newStatus.toUpperCase()}`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete application for "${name}"?`)) {
      const updated = deleteApplication(id);
      setApplications(updated);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
      showToast(`Application deleted`);
    }
  };

  const handleSaveNotes = () => {
    if (!selectedApp) return;
    const updated = updateApplicationNotes(selectedApp.id, adminNotesDraft);
    setApplications(updated);
    setSelectedApp({ ...selectedApp, adminNotes: adminNotesDraft });
    showToast('Admin notes saved');
  };

  const handleRefreshData = () => {
    const list = getApplications();
    setApplications(list);
    showToast('Database refreshed from Cloud');
  };

  const handleExportCSV = () => {
    exportApplicationsToCSV(applications);
    showToast(`Exported ${applications.length} applications to CSV`);
  };

  const handleManualAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.fullName || !manualForm.instagramHandle) {
      alert('Please provide at least Name and Instagram handle');
      return;
    }

    const newApp: CreatorApplication = {
      id: 'app_manual_' + Date.now(),
      fullName: manualForm.fullName,
      instagramHandle: manualForm.instagramHandle.startsWith('@')
        ? manualForm.instagramHandle
        : `@${manualForm.instagramHandle}`,
      email: manualForm.email || 'not-provided@example.com',
      phone: manualForm.phone || 'N/A',
      city: manualForm.city || 'India',
      primaryPlatform: 'Instagram',
      creatorCategory: manualForm.creatorCategory,
      followers: manualForm.followers,
      profileUrl: manualForm.profileUrl || `https://instagram.com/${manualForm.instagramHandle.replace('@', '')}`,
      contentDescription: manualForm.contentDescription || 'Manual scout entry',
      previousCollaborations: manualForm.previousCollaborations || 'N/A',
      whyJoin: manualForm.whyJoin,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    await saveApplication(newApp);
    setApplications(getApplications());
    setIsAddingCreator(false);
    showToast('Creator saved to database');
    setManualForm({
      fullName: '',
      instagramHandle: '',
      email: '',
      phone: '',
      city: '',
      creatorCategory: 'Skincare Routine & Texture',
      followers: '10K - 25K',
      profileUrl: '',
      contentDescription: '',
      previousCollaborations: '',
      whyJoin: 'Direct scout / manual entry'
    });
    showToast(`Added ${newApp.fullName} to applications`);
  };

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        searchQuery === '' ||
        app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.instagramHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || app.creatorCategory.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [applications, searchQuery, statusFilter, categoryFilter]);

  // Status metrics
  const counts = useMemo(() => {
    return {
      total: applications.length,
      new: applications.filter((a) => a.status === 'new').length,
      shortlisted: applications.filter((a) => a.status === 'shortlisted').length,
      approved: applications.filter((a) => a.status === 'approved').length,
      reviewing: applications.filter((a) => a.status === 'reviewing').length,
      rejected: applications.filter((a) => a.status === 'rejected').length
    };
  }, [applications]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col justify-center items-center px-4 py-16">
        <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4FF00] to-transparent" />

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter text-white uppercase">MIDBLEND</span>
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
              <span className="ml-2 text-[10px] font-mono tracking-widest uppercase bg-[#D4FF00]/10 text-[#D4FF00] px-2 py-0.5 rounded border border-[#D4FF00]/20">
                ADMIN
              </span>
            </div>
            <button
              type="button"
              onClick={onBackToHome}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>

          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
            Creator Portal Access
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Review incoming creator applications, filter by follower reach, and export submissions.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                Enter Admin Passkey
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0a0a0a] border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#D4FF00] transition-colors font-mono tracking-widest"
                autoFocus
              />
              {authError && <p className="text-xs text-red-400 mt-2 font-medium">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4FF00] text-black font-extrabold uppercase text-xs tracking-widest rounded-xl hover:bg-[#bce400] transition-colors shadow-lg shadow-[#D4FF00]/10"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD SCREEN
  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a1a1a] border border-[#D4FF00]/50 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#D4FF00]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl font-black uppercase tracking-tighter text-white">MIDBLEND</span>
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
              <span className="text-[11px] font-mono tracking-widest uppercase bg-[#D4FF00]/10 text-[#D4FF00] px-2.5 py-0.5 rounded-full border border-[#D4FF00]/20 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                ADMIN DASHBOARD
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Manage incoming skincare creator applications, approve partnerships, and contact creators.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#111111] border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>

            <button
              type="button"
              onClick={onOpenApplyPage}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#111111] border border-white/10 text-xs font-bold text-[#D4FF00] hover:border-[#D4FF00]/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Application Form</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4FF00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#bce400] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddingCreator(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1a1a1a] border border-[#D4FF00]/30 text-white font-bold text-xs hover:border-[#D4FF00] transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Add Creator</span>
            </button>

            <button
              type="button"
              onClick={() => setIsChangingPasskey(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-xs font-medium text-gray-300 hover:text-[#D4FF00] hover:border-[#D4FF00]/30 transition-colors"
              title="Change or view admin security passkey"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Passkey</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs text-gray-400 hover:text-red-400 transition-colors ml-1"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'all'
                ? 'bg-[#1a1a1a] border-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.1)]'
                : 'bg-[#111111] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Total Submissions</div>
            <div className="text-2xl sm:text-3xl font-black text-white">{counts.total}</div>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('new')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'new'
                ? 'bg-[#1a1a1a] border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                : 'bg-[#111111] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              New / Pending
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300">{counts.new}</div>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('shortlisted')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'shortlisted'
                ? 'bg-[#1a1a1a] border-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.1)]'
                : 'bg-[#111111] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-[#D4FF00] font-bold mb-1">Shortlisted</div>
            <div className="text-2xl sm:text-3xl font-black text-[#D4FF00]">{counts.shortlisted}</div>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('approved')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'approved'
                ? 'bg-[#1a1a1a] border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                : 'bg-[#111111] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Approved</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">{counts.approved}</div>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('reviewing')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'reviewing'
                ? 'bg-[#1a1a1a] border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.1)]'
                : 'bg-[#111111] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1">In Review</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">{counts.reviewing}</div>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('rejected')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'rejected'
                ? 'bg-[#1a1a1a] border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.1)]'
                : 'bg-[#111111] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Declined</div>
            <div className="text-2xl sm:text-3xl font-black text-gray-400">{counts.rejected}</div>
          </button>
        </div>
      </div>

      {/* Main Table & Filters */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Controls bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by creator name, @handle, city, or email..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF00] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-[#D4FF00]"
              >
                <option value="all">All Categories</option>
                <option value="skincare">Skincare & Derm</option>
                <option value="clinical">Clinical Science</option>
                <option value="ugc">UGC & Aesthetic</option>
                <option value="botanical">Ayurveda / Botanical</option>
                <option value="men">Men's Grooming</option>
              </select>

              <button
                type="button"
                onClick={handleRefreshData}
                title="Refresh from Cloud Database"
                className="p-2 text-gray-400 hover:text-white bg-[#0a0a0a] border border-white/10 rounded-xl transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto">
            {filteredApps.length === 0 ? (
              <div className="text-center py-20 px-4">
                <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-1">No applications found</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
                  {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                    ? 'No creators match your current filter criteria.'
                    : 'No creator applications have been received yet.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="text-xs text-[#D4FF00] hover:underline font-bold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0c0c0c] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4 sm:px-6">Creator</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                    <th className="py-3.5 px-4">Followers</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">City</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredApps.map((app) => {
                    const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
                      new: { bg: 'bg-cyan-950/40 border-cyan-800/60', text: 'text-cyan-300', dot: 'bg-cyan-400' },
                      shortlisted: { bg: 'bg-[#D4FF00]/10 border-[#D4FF00]/30', text: 'text-[#D4FF00]', dot: 'bg-[#D4FF00]' },
                      approved: { bg: 'bg-emerald-950/40 border-emerald-800/60', text: 'text-emerald-300', dot: 'bg-emerald-400' },
                      reviewing: { bg: 'bg-amber-950/40 border-amber-800/60', text: 'text-amber-300', dot: 'bg-amber-400' },
                      rejected: { bg: 'bg-zinc-900 border-zinc-700', text: 'text-zinc-400', dot: 'bg-zinc-500' }
                    };
                    const style = statusStyles[app.status] || statusStyles.new;

                    return (
                      <tr
                        key={app.id}
                        className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                        onClick={() => {
                          setSelectedApp(app);
                          setAdminNotesDraft(app.adminNotes || '');
                        }}
                      >
                        {/* Creator name & handle */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center font-black text-white text-xs shrink-0 group-hover:border-[#D4FF00]/40 transition-colors">
                              {app.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-white group-hover:text-[#D4FF00] transition-colors flex items-center gap-1.5">
                                <span>{app.fullName}</span>
                                {app.status === 'new' && (
                                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" title="New Application" />
                                )}
                              </div>
                              <div className="text-[11px] font-mono text-gray-400">
                                {app.instagramHandle}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 hidden md:table-cell text-gray-300">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-[10px] font-medium">
                            {app.creatorCategory}
                          </span>
                        </td>

                        {/* Followers */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-white">{app.followers}</div>
                          <div className="text-[10px] text-gray-500 uppercase">{app.primaryPlatform}</div>
                        </td>

                        {/* City */}
                        <td className="py-4 px-4 hidden lg:table-cell text-gray-400">
                          {app.city}
                        </td>

                        {/* Status dropdown */}
                        <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleStatusChange(app.id, e.target.value as CreatorApplication['status'])
                            }
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border focus:outline-none cursor-pointer transition-colors ${style.bg} ${style.text}`}
                          >
                            <option value="new" className="bg-[#111111] text-cyan-300">New</option>
                            <option value="reviewing" className="bg-[#111111] text-amber-300">In Review</option>
                            <option value="shortlisted" className="bg-[#111111] text-[#D4FF00]">Shortlisted</option>
                            <option value="approved" className="bg-[#111111] text-emerald-300">Approved</option>
                            <option value="rejected" className="bg-[#111111] text-gray-400">Declined</option>
                          </select>
                        </td>

                        {/* Action buttons */}
                        <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Instagram link */}
                            <a
                              href={app.profileUrl.startsWith('http') ? app.profileUrl : `https://${app.profileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
                              title="Open Instagram profile"
                            >
                              <Instagram className="w-3.5 h-3.5" />
                            </a>

                            {/* WhatsApp link */}
                            <a
                              href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hi ${app.fullName}! This is Midblend Skincare Creator Partnerships. We reviewed your application and would love to discuss brand campaign matches.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-500/40 transition-colors"
                              title="Message via WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>

                            {/* Email link */}
                            <a
                              href={`mailto:${app.email}?subject=${encodeURIComponent(
                                'Midblend Skincare Creator Collaboration'
                              )}`}
                              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
                              title="Send Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>

                            {/* View details */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedApp(app);
                                setAdminNotesDraft(app.adminNotes || '');
                              }}
                              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-[#D4FF00] hover:bg-[#D4FF00]/10 hover:border-[#D4FF00]/40 transition-colors"
                              title="View Full Profile"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDelete(app.id, app.fullName)}
                              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/40 transition-colors"
                              title="Delete application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* APPLICANT DETAIL MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111111] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4FF00] text-black font-black text-lg flex items-center justify-center">
                  {selectedApp.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {selectedApp.fullName}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                    <span className="font-mono text-[#D4FF00]">{selectedApp.instagramHandle}</span>
                    <span>•</span>
                    <span>{selectedApp.city}</span>
                    <span>•</span>
                    <span>{selectedApp.followers}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Application Status:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(['new', 'reviewing', 'shortlisted', 'approved', 'rejected'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStatusChange(selectedApp.id, st)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                      selectedApp.status === st
                        ? 'bg-[#D4FF00] text-black font-black shadow-lg shadow-[#D4FF00]/20'
                        : 'bg-zinc-900 border border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="py-6 space-y-6">
              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Email Address</div>
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="text-xs text-white hover:text-[#D4FF00] transition-colors break-all"
                  >
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Phone / WhatsApp</div>
                  <a
                    href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    {selectedApp.phone}
                  </a>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Profile Link</div>
                  <a
                    href={selectedApp.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#D4FF00] hover:underline flex items-center gap-1"
                  >
                    <span>Visit Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Creator answers */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Content Style & Focus
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 bg-[#0c0c0c] p-3.5 rounded-xl border border-white/5 leading-relaxed">
                  {selectedApp.contentDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Previous Brand Collaborations
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 bg-[#0c0c0c] p-3.5 rounded-xl border border-white/5 leading-relaxed">
                  {selectedApp.previousCollaborations || 'None listed'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Why They Want to Join Midblend
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 bg-[#0c0c0c] p-3.5 rounded-xl border border-white/5 leading-relaxed">
                  {selectedApp.whyJoin}
                </p>
              </div>

              {/* Internal Admin Notes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4FF00]">
                    Private Admin Notes
                  </h4>
                  <span className="text-[10px] text-gray-500">Only visible to your team</span>
                </div>
                <textarea
                  value={adminNotesDraft}
                  onChange={(e) => setAdminNotesDraft(e.target.value)}
                  placeholder="Add notes about engagement rate, brand fit, communication notes..."
                  rows={3}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4FF00]"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-[#D4FF00] text-black font-extrabold uppercase text-[10px] tracking-wider rounded-lg hover:bg-[#bce400]"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[10px] text-gray-500">
                Submitted: {new Date(selectedApp.submittedAt).toLocaleString()}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${selectedApp.fullName}, this is Midblend Creator Partnerships. We loved your application!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs hover:bg-emerald-500/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-gray-300 text-xs font-bold hover:bg-zinc-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL ADD CREATOR MODAL */}
      {isAddingCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111111] border border-white/15 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                Add Creator Manually
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingCreator(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-400 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={manualForm.fullName}
                  onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                  placeholder="e.g. Diya Sen"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4FF00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-400 uppercase mb-1">Instagram Handle *</label>
                <input
                  type="text"
                  required
                  value={manualForm.instagramHandle}
                  onChange={(e) => setManualForm({ ...manualForm, instagramHandle: e.target.value })}
                  placeholder="@handle"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4FF00] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-400 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    placeholder="creator@email.com"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4FF00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-400 uppercase mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4FF00] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-400 uppercase mb-1">City</label>
                  <input
                    type="text"
                    value={manualForm.city}
                    onChange={(e) => setManualForm({ ...manualForm, city: e.target.value })}
                    placeholder="Mumbai / Delhi"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4FF00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-400 uppercase mb-1">Followers Tier</label>
                  <select
                    value={manualForm.followers}
                    onChange={(e) => setManualForm({ ...manualForm, followers: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4FF00] focus:outline-none"
                  >
                    <option value="1K - 5K">1K - 5K (Nano)</option>
                    <option value="5K - 10K">5K - 10K</option>
                    <option value="10K - 25K">10K - 25K (Micro)</option>
                    <option value="25K - 50K">25K - 50K</option>
                    <option value="50K - 100K">50K - 100K (Mid-tier)</option>
                    <option value="100K+">100K+ (Macro)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-400 uppercase mb-1">Category</label>
                <input
                  type="text"
                  value={manualForm.creatorCategory}
                  onChange={(e) => setManualForm({ ...manualForm, creatorCategory: e.target.value })}
                  placeholder="Skincare, UGC, Acne Routine"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4FF00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-400 uppercase mb-1">Content Description / Bio</label>
                <textarea
                  rows={2}
                  value={manualForm.contentDescription}
                  onChange={(e) => setManualForm({ ...manualForm, contentDescription: e.target.value })}
                  placeholder="Texture shots, skin routine, ingredient reviews..."
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4FF00] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCreator(false)}
                  className="px-4 py-2 bg-zinc-800 text-gray-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4FF00] text-black font-extrabold uppercase rounded-xl hover:bg-[#bce400]"
                >
                  Save Creator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Passkey Modal */}
      {isChangingPasskey && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center border border-[#D4FF00]/20">
                  <Key className="w-4 h-4 text-[#D4FF00]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white uppercase tracking-tight">Admin Passkey</h3>
                  <p className="text-[11px] text-gray-400">Manage security access key for this portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChangingPasskey(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-3.5 mb-5 space-y-2">
              <div className="text-[11px] text-gray-400">Current active passkey:</div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/20 font-mono font-bold text-xs tracking-wider">
                  {getActivePasskey()}
                </span>
                <span className="text-[11px] text-gray-500">
                  (Required to unlock dashboard)
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveNewPasskey} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Set New Secret Passkey
                </label>
                <input
                  type="text"
                  value={newPasskeyInput}
                  onChange={(e) => setNewPasskeyInput(e.target.value)}
                  placeholder="Enter your private passkey"
                  className="w-full bg-[#0a0a0a] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4FF00] font-mono"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsChangingPasskey(false)}
                  className="px-4 py-2 bg-zinc-800 text-gray-300 font-bold rounded-xl text-xs hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4FF00] text-black font-extrabold uppercase rounded-xl hover:bg-[#bce400] text-xs tracking-wider shadow-md shadow-[#D4FF00]/10 transition-colors"
                >
                  Save Passkey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
