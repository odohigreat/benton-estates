'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Lock, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  LogOut, 
  Eye, 
  Building,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import BentonLogo from '@/components/ui/BentonLogo';

export default function AdminDashboardPage() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'enquiries' | 'realtors' | 'subscriptions'>('enquiries');
  const [data, setData] = useState<{
    enquiries: any[];
    realtors: any[];
    subscriptions: any[];
    properties: any[];
  }>({
    enquiries: [],
    realtors: [],
    subscriptions: [],
    properties: []
  });

  const [selectedItem, setSelectedItem] = useState<{
    type: 'enquiry' | 'realtor' | 'subscription';
    item: any;
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Check existing token
  useEffect(() => {
    const saved = localStorage.getItem('benton_admin_token');
    if (saved) {
      setAuthToken(saved);
      fetchData(saved);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setAuthToken(resData.token);
        localStorage.setItem('benton_admin_token', resData.token);
        fetchData(resData.token);
      } else {
        setAuthError(resData.error || 'Invalid passcode');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('benton_admin_token');
  };

  const fetchData = async (token: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        setData(resData.data);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRealtorStatus = async (id: string, status: string, assignedManager = '', adminNotes = '') => {
    if (!authToken) return;
    try {
      const res = await fetch('/api/admin/data', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          action: 'update_realtor',
          id,
          status,
          assignedManager,
          adminNotes
        })
      });
      if (res.ok) {
        setActionSuccess(`Realtor status updated to ${status}`);
        fetchData(authToken);
        if (selectedItem?.item?.id === id) {
          setSelectedItem({
            ...selectedItem,
            item: { ...selectedItem.item, status, assigned_manager: assignedManager, admin_notes: adminNotes }
          });
        }
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (err) {
      console.error('Error updating realtor:', err);
    }
  };

  const updateEnquiryStatus = async (id: string, status: string) => {
    if (!authToken) return;
    try {
      const res = await fetch('/api/admin/data', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          action: 'update_enquiry',
          id,
          status
        })
      });
      if (res.ok) {
        setActionSuccess(`Enquiry status updated to ${status}`);
        fetchData(authToken);
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (err) {
      console.error('Error updating enquiry:', err);
    }
  };

  const updateSubscriptionStatus = async (id: string, status: string) => {
    if (!authToken) return;
    try {
      const res = await fetch('/api/admin/data', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          action: 'update_subscription',
          id,
          status
        })
      });
      if (res.ok) {
        setActionSuccess(`Subscription status updated to ${status}`);
        fetchData(authToken);
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (err) {
      console.error('Error updating subscription:', err);
    }
  };

  // Login Screen if not authenticated
  if (!authToken) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full text-center space-y-6">
          <BentonLogo size="md" showSubtitle className="justify-center" />
          
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-serif">Staff Administrative Portal</h2>
            <p className="text-xs text-slate-500">
              Authorized Benton Homes personnel only.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {authError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter admin passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Default system passcode: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">benton2026!admin</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#0304CE] hover:bg-[#143F9D] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-60"
            >
              {isLoading ? 'Verifying Access...' : 'Unlock Administrative Console'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Portal
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Bar */}
      <div className="bg-[#0A142F] text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <BentonLogo variant="white" size="sm" />
          <div>
            <h1 className="text-lg font-bold">Benton Administrative Management Console</h1>
            <span className="text-xs text-blue-300">
              Persistent Records: Contact Enquiries, Realtor Submissions &amp; Elevation Estate Applications
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => authToken && fetchData(authToken)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-xs px-3 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-900/40 hover:bg-red-900/60 text-red-200 text-xs px-3 py-2 rounded-lg transition-colors border border-red-800"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={() => { setActiveTab('enquiries'); setSelectedItem(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'enquiries'
              ? 'bg-[#0304CE] text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Contact Enquiries ({data.enquiries.length})
        </button>

        <button
          onClick={() => { setActiveTab('realtors'); setSelectedItem(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'realtors'
              ? 'bg-[#0304CE] text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Realtor Applications ({data.realtors.length})
        </button>

        <button
          onClick={() => { setActiveTab('subscriptions'); setSelectedItem(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'subscriptions'
              ? 'bg-[#0304CE] text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Elevation Subscriptions ({data.subscriptions.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Table / List Column */}
        <div className={`${selectedItem ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
          
          {/* TAB 1: CONTACT ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <span className="font-bold text-xs uppercase text-slate-700">General Enquiries Received</span>
                <span className="text-xs text-slate-500">{data.enquiries.length} total entries</span>
              </div>

              {data.enquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">
                  No contact enquiries submitted yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {data.enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      onClick={() => setSelectedItem({ type: 'enquiry', item: enq })}
                      className="p-4 hover:bg-blue-50/40 cursor-pointer transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{enq.full_name}</span>
                          <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-[#0304CE]">
                            {enq.reference_id}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-3">
                          <span>{enq.phone}</span>
                          <span>•</span>
                          <span>{enq.enquiry_type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === 'RESOLVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {enq.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REALTOR APPLICATIONS */}
          {activeTab === 'realtors' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <span className="font-bold text-xs uppercase text-slate-700">Official Realtor Applications</span>
                <span className="text-xs text-slate-500">{data.realtors.length} applications</span>
              </div>

              {data.realtors.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">
                  No realtor applications registered yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {data.realtors.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedItem({ type: 'realtor', item: r })}
                      className="p-4 hover:bg-blue-50/40 cursor-pointer transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{r.full_name}</span>
                          <span className="font-mono text-[11px] bg-blue-50 text-[#0304CE] px-2 py-0.5 rounded font-bold">
                            {r.application_ref}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{r.city_state}</span>
                          <span>•</span>
                          <span>Exp: {r.experience}</span>
                          <span>•</span>
                          <span>{r.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          r.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'Declined'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ELEVATION SUBSCRIPTIONS */}
          {activeTab === 'subscriptions' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <span className="font-bold text-xs uppercase text-slate-700">Elevation Estate Land Subscriptions</span>
                <span className="text-xs text-slate-500">{data.subscriptions.length} applications</span>
              </div>

              {data.subscriptions.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">
                  No estate subscriptions received yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {data.subscriptions.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedItem({ type: 'subscription', item: sub })}
                      className="p-4 hover:bg-blue-50/40 cursor-pointer transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{sub.title} {sub.surname} {sub.other_names}</span>
                          <span className="font-mono text-[11px] bg-red-50 text-[#E40C05] px-2 py-0.5 rounded font-bold">
                            {sub.subscription_ref}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{sub.number_of_plots} Plot(s) ({sub.plot_type})</span>
                          <span>•</span>
                          <span>Plan: {sub.payment_plan}</span>
                          <span>•</span>
                          <span>{sub.mobile_number}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          sub.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {sub.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Detail Inspection Column */}
        {selectedItem && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block">Record Details</span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedItem.type === 'enquiry' && selectedItem.item.reference_id}
                  {selectedItem.type === 'realtor' && selectedItem.item.application_ref}
                  {selectedItem.type === 'subscription' && selectedItem.item.subscription_ref}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-xs text-slate-400 hover:text-slate-700 font-bold px-2 py-1 rounded"
              >
                Close
              </button>
            </div>

            {/* ENQUIRY DETAILS */}
            {selectedItem.type === 'enquiry' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block">Name:</span>
                    <span className="font-bold text-slate-800">{selectedItem.item.full_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone:</span>
                    <span className="font-bold text-slate-800">{selectedItem.item.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email:</span>
                    <span className="font-bold text-slate-800">{selectedItem.item.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Type:</span>
                    <span className="font-bold text-slate-800">{selectedItem.item.enquiry_type}</span>
                  </div>
                </div>

                {selectedItem.item.property_of_interest && (
                  <div>
                    <span className="text-slate-400 block">Property of Interest:</span>
                    <span className="font-semibold text-[#0304CE]">{selectedItem.item.property_of_interest}</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 block mb-1">Message:</span>
                  <div className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed border border-slate-200">
                    {selectedItem.item.message}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Status: <strong>{selectedItem.item.status}</strong></span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateEnquiryStatus(selectedItem.item.id, 'RESOLVED')}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                    >
                      Mark Resolved
                    </button>
                    <button
                      onClick={() => updateEnquiryStatus(selectedItem.item.id, 'IN_PROGRESS')}
                      className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700"
                    >
                      In Progress
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* REALTOR DETAILS */}
            {selectedItem.type === 'realtor' && (
              <div className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-1">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#0304CE] block">Section 8: Office Status</span>
                  <div className="flex items-center justify-between">
                    <span>Status: <strong className="text-slate-900">{selectedItem.item.status}</strong></span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => updateRealtorStatus(selectedItem.item.id, 'Approved', 'Manager Effurun Desk', 'Approved partner')}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateRealtorStatus(selectedItem.item.id, 'Declined', '', 'Application declined')}
                        className="px-2.5 py-1 bg-red-600 text-white rounded text-[11px] font-bold hover:bg-red-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">1. Personal Details</h4>
                  <p><strong>Name:</strong> {selectedItem.item.full_name}</p>
                  <p><strong>Phone:</strong> {selectedItem.item.phone}</p>
                  <p><strong>Email:</strong> {selectedItem.item.email}</p>
                  <p><strong>City/State:</strong> {selectedItem.item.city_state}</p>
                  <p><strong>Address:</strong> {selectedItem.item.residential_address}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">2. Realtor Profile</h4>
                  <p><strong>Current Realtor?</strong> {selectedItem.item.is_realtor}</p>
                  <p><strong>Experience:</strong> {selectedItem.item.experience}</p>
                  <p><strong>Role:</strong> {selectedItem.item.role}</p>
                  <p><strong>Company:</strong> {selectedItem.item.current_company || 'N/A'}</p>
                  <p><strong>Areas Operate:</strong> {selectedItem.item.areas_operate}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">3. Sales &amp; Marketing</h4>
                  <p><strong>Deals Closed:</strong> {selectedItem.item.properties_closed}</p>
                  <p><strong>Strongest Skill:</strong> {selectedItem.item.strongest_skill}</p>
                  <p><strong>Main Lead Source:</strong> {selectedItem.item.main_lead_source}</p>
                  <p><strong>Available for Inspections?</strong> {selectedItem.item.available_inspections}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">4. Identification &amp; Next of Kin</h4>
                  <p><strong>Means of ID:</strong> {selectedItem.item.means_of_id} ({selectedItem.item.id_number})</p>
                  <p><strong>Reference / Next of Kin:</strong> {selectedItem.item.next_of_kin_name} ({selectedItem.item.next_of_kin_phone})</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">5. Declaration</h4>
                  <p><strong>Signature Name:</strong> {selectedItem.item.signature_name}</p>
                  <p><strong>Date:</strong> {selectedItem.item.signature_date}</p>
                </div>
              </div>
            )}

            {/* SUBSCRIPTION DETAILS */}
            {selectedItem.type === 'subscription' && (
              <div className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-1">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#E40C05] block">Subscription Processing</span>
                  <div className="flex items-center justify-between">
                    <span>Status: <strong className="text-slate-900">{selectedItem.item.status}</strong></span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => updateSubscriptionStatus(selectedItem.item.id, 'Verified')}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => updateSubscriptionStatus(selectedItem.item.id, 'Allocated')}
                        className="px-2.5 py-1 bg-blue-600 text-white rounded text-[11px] font-bold hover:bg-blue-700"
                      >
                        Allocate Plot
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">1. Subscriber Details</h4>
                  <p><strong>Full Name:</strong> {selectedItem.item.title} {selectedItem.item.surname} {selectedItem.item.other_names}</p>
                  <p><strong>Mobile:</strong> {selectedItem.item.mobile_number}</p>
                  <p><strong>Email:</strong> {selectedItem.item.email}</p>
                  <p><strong>DOB:</strong> {selectedItem.item.dob} ({selectedItem.item.gender})</p>
                  <p><strong>Nationality:</strong> {selectedItem.item.nationality}</p>
                  <p><strong>PEP Status:</strong> {selectedItem.item.is_pep} {selectedItem.item.pep_category && `(${selectedItem.item.pep_category})`}</p>
                  <p><strong>ID Type:</strong> {selectedItem.item.id_type}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">2. Allocation &amp; Payment Details</h4>
                  <p><strong>Plot Type:</strong> {selectedItem.item.plot_type}</p>
                  <p><strong>Plots:</strong> {selectedItem.item.number_of_plots} plot(s) • 464 SQM each</p>
                  <p><strong>Payment Plan:</strong> {selectedItem.item.payment_plan}</p>
                  <p><strong>Corner Piece:</strong> {selectedItem.item.is_corner_piece ? 'Yes (+10%)' : 'No'}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">3. Next of Kin</h4>
                  <p><strong>Name:</strong> {selectedItem.item.nok_name}</p>
                  <p><strong>Phone:</strong> {selectedItem.item.nok_phone}</p>
                  <p><strong>Address:</strong> {selectedItem.item.nok_address}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 border-b pb-1">4. Terms Acceptance (Page 2)</h4>
                  <p><strong>Terms Version:</strong> {selectedItem.item.terms_version}</p>
                  <p><strong>Signature:</strong> {selectedItem.item.acceptance_signature}</p>
                  <p><strong>Date Accepted:</strong> {selectedItem.item.acceptance_date}</p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
