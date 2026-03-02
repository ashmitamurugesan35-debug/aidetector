import React, { useState } from 'react'
import { Mail, Lock, Check } from 'lucide-react'

export default function Landing({ onEnter }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberDevice, setRememberDevice] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = e => {
    e.preventDefault()
    if (email && password) {
      onEnter()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D111B] via-[#0F1419] to-[#1a1f29] flex overflow-hidden">
      {/* LEFT SIDE - Surveillance Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-cyan-900/20 to-transparent flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Animated Surveillance Illustration */}
        <div className="relative z-10 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-cyan-700/10 rounded-full flex items-center justify-center border border-cyan-500/30 relative">
              <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-pulse"></div>
              <div className="text-7xl">📹</div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white mb-4">
            Intelligent Surveillance<br />
            for Safer Spaces
          </h2>

          <div className="max-w-sm mx-auto">
            <p className="text-lg text-cyan-400 font-semibold mb-2">Monitor. Detect. Prevent.</p>
            <p className="text-white/70 text-sm leading-relaxed">
              AI-powered security that identifies threats in real time. Advanced facial recognition, behavior analysis, and predictive threat detection.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="mt-12 space-y-4 text-left inline-block">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-white/80 text-sm">Real-time AI threat detection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-white/80 text-sm">24/7 continuous monitoring</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-white/80 text-sm">Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-white/80 text-sm">Instant emergency alerts</span>
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-md animate-fadeIn">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="text-xl font-bold text-white">S</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Sentinel AI</h1>
            <p className="text-white/60 text-sm">Secure Access to Smart Monitoring System</p>
          </div>

          {/* Login Card */}
          <form onSubmit={handleSignIn} className="bg-[#121722]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/40">
            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#1a1f29] border border-white/15 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1f29] border border-white/15 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition text-sm"
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {/* Remember Device Checkbox */}
            <div className="mb-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRememberDevice(!rememberDevice)}
                className={`w-5 h-5 rounded border transition flex items-center justify-center ${
                  rememberDevice
                    ? 'bg-cyan-500 border-cyan-500'
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
                {rememberDevice && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className="text-sm text-white/70">Remember this device</span>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/30 mb-4"
            >
              Sign In
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition">
                Forgot Password?
              </a>
            </div>
          </form>

          {/* System Status */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/60">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Secure Connection Established</span>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-white/40 border-t border-white/10 pt-6">
            Authorized personnel only. All access is monitored.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
