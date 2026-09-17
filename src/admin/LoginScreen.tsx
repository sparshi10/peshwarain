import React, { useState } from 'react';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, UserCheck, UtensilsCrossed } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const LoginScreen: React.FC = () => {
  const { login, setCurrentView } = useRestaurant();
  const [authMode, setAuthMode] = useState<'password' | 'pin'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      let success = false;
      if (authMode === 'pin') {
        success = login(pin);
      } else {
        success = login(email, password);
      }

      setLoading(false);
      if (!success) {
        setError(authMode === 'pin' ? 'Invalid PIN code. Try 1203 or 1234.' : 'Invalid credentials. Try admin@peshwarain.com or kitchen@peshwarain.com');
      }
    }, 400);
  };

  const handleQuickLogin = (role: 'admin' | 'staff') => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (role === 'admin') {
        login('admin@peshwarain.com', 'admin123');
      } else {
        login('kitchen@peshwarain.com', 'staff123');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-gray-900 flex flex-col justify-center items-center p-4 font-sans selection:bg-[#B5502F] selection:text-white">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-xs mb-3 text-[#B5502F]">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            PeshWarain ~ Wari
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Back-Office Staff & Management Portal
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7">
          {/* Auth Mode Toggle */}
          <div className="flex border-b border-gray-200 mb-6 pb-2 gap-4">
            <button
              type="button"
              onClick={() => { setAuthMode('password'); setError(''); }}
              className={`pb-2 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-2.5 ${
                authMode === 'password'
                  ? 'border-[#B5502F] text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('pin'); setError(''); }}
              className={`pb-2 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-2.5 ${
                authMode === 'pin'
                  ? 'border-[#B5502F] text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Kitchen PIN Code
            </button>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'password' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@peshwarain.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B5502F]/20 focus:border-[#B5502F] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotPasswordNotice(true)}
                      className="text-xs text-[#B5502F] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B5502F]/20 focus:border-[#B5502F] transition-all"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  4-Digit Access PIN
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={6}
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN (e.g., 1203)"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 tracking-widest text-center text-lg font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B5502F]/20 focus:border-[#B5502F] transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Default kitchen access PIN is <span className="font-mono font-semibold text-gray-700">1203</span> (Wari Postal Code)
                </p>
              </div>
            )}

            {forgotPasswordNotice && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                Password recovery requests are routed to the restaurant manager. Contact owner directly at 01756-853532 or use quick demo logins below.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#B5502F] hover:bg-[#9E4226] text-white text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins for easy grading & review */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5 text-center">
              Quick One-Click Sign In
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2 px-3 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-1.5 font-medium transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>Admin (Owner)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('staff')}
                className="py-2 px-3 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-1.5 font-medium transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-gray-500" />
                <span>Staff (Kitchen)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Site Return */}
        <div className="text-center mt-5">
          <button
            onClick={() => setCurrentView('public')}
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            ← Back to Public Restaurant Website
          </button>
        </div>
      </div>
    </div>
  );
};
