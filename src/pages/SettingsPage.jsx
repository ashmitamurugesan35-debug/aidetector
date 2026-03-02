import React, { useState } from 'react'
import { Save, AlertCircle, Bell, Shield, Camera, Clock, Phone, Info } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({
    monitoringEnabled: true,
    locationName: 'My Home',
    cameraZone: 'front-door',
    timeZone: 'UTC-5',
    
    unknownPersonAlert: true,
    suspiciousActivityAlert: true,
    nightModeAlert: true,
    theftDetectionAlert: true,
    weaponDetectionAlert: true,
    
    aiSensitivity: 75,
    confidenceThreshold: 80,
    
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    callEmergency: true,
    
    autoRecord: true,
    videoRetention: 30,
    recordingQuality: '1080p',
    
    emergencyContact1: '+1 (555) 123-4567',
    emergencyContact2: '',
    
    systemAutoUpdate: true,
    dataEncryption: true,
  })

  const [saveMessage, setSaveMessage] = useState('')

  const handleToggle = key => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  return (
    <div className="min-h-screen bg-[#0D111B] p-6">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">Configure how the AI surveillance system monitors, detects, and alerts.</p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="max-w-4xl mx-auto mb-6 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
          ✓ {saveMessage}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* SECTION 1 — SYSTEM CONTROL */}
        <div className="bg-[#121722] rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">System Control</h2>
          </div>
          <p className="text-xs text-white/50 mb-6">Controls the overall operation of the surveillance system.</p>

          <div className="space-y-6">
            {/* Monitoring Status */}
            <div className="flex items-center justify-between p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <div>
                <p className="text-sm font-semibold text-white">Monitoring Status</p>
                <p className="text-xs text-white/50">Enable or disable all surveillance</p>
              </div>
              <button
                onClick={() => handleToggle('monitoringEnabled')}
                className={`relative w-14 h-7 rounded-full transition ${
                  settings.monitoringEnabled ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
                    settings.monitoringEnabled ? 'translate-x-8' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>

            {/* Location Name */}
            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <p className="text-sm font-semibold text-white mb-2">Location Name</p>
              <input
                type="text"
                value={settings.locationName}
                onChange={e => handleChange('locationName', e.target.value)}
                className="w-full bg-[#0D111B] border border-white/20 rounded px-3 py-2 text-white placeholder-white/30 text-sm"
                placeholder="Enter location name..."
              />
            </div>

            {/* Camera Zone */}
            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <p className="text-sm font-semibold text-white mb-2">Camera Zone</p>
              <select
                value={settings.cameraZone}
                onChange={e => handleChange('cameraZone', e.target.value)}
                className="w-full bg-[#0D111B] border border-white/20 rounded px-3 py-2 text-white text-sm"
              >
                <option value="front-door">Front Door</option>
                <option value="backyard">Backyard</option>
                <option value="garage">Garage</option>
                <option value="gate">Gate</option>
              </select>
            </div>

            {/* Time Zone */}
            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <p className="text-sm font-semibold text-white mb-2">Time Zone</p>
              <select
                value={settings.timeZone}
                onChange={e => handleChange('timeZone', e.target.value)}
                className="w-full bg-[#0D111B] border border-white/20 rounded px-3 py-2 text-white text-sm"
              >
                <option value="UTC-8">UTC-8 (PST)</option>
                <option value="UTC-6">UTC-6 (CST)</option>
                <option value="UTC-5">UTC-5 (EST)</option>
                <option value="UTC">UTC</option>
                <option value="UTC+1">UTC+1 (CET)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2 — ALERT RULES */}
        <div className="bg-[#121722] rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold text-white">Alert Rules</h2>
          </div>
          <p className="text-xs text-white/50 mb-6">Choose which events trigger alerts and notifications.</p>

          <div className="space-y-3">
            {[
              { key: 'unknownPersonAlert', label: 'Unknown Person Detection', desc: 'Alert when unrecognized individual detected' },
              { key: 'suspiciousActivityAlert', label: 'Suspicious Activity', desc: 'Alert on unusual behavior patterns' },
              { key: 'nightModeAlert', label: 'Night-Time Activity (11 PM – 5 AM)', desc: 'Flag movement during restricted hours' },
              { key: 'theftDetectionAlert', label: 'Theft / Break-In Detection', desc: 'Critical alert on attempted intrusion' },
              { key: 'weaponDetectionAlert', label: 'Weapon / Threat Detection', desc: 'High-priority alert on detected weapons' },
            ].map(alert => (
              <div key={alert.key} className="flex items-center justify-between p-4 bg-[#1a1f29] rounded-lg border border-white/10">
                <div>
                  <p className="text-sm font-semibold text-white">{alert.label}</p>
                  <p className="text-xs text-white/50">{alert.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(alert.key)}
                  className={`relative w-14 h-7 rounded-full transition ${
                    settings[alert.key] ? 'bg-cyan-500' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
                      settings[alert.key] ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3 — AI CONFIGURATION */}
        <div className="bg-[#121722] rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">AI Configuration</h2>
          </div>
          <p className="text-xs text-white/50 mb-6">Fine-tune AI detection parameters.</p>

          <div className="space-y-6">
            {/* AI Sensitivity */}
            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">AI Sensitivity Level</p>
                <span className="text-sm text-cyan-400 font-bold">{settings.aiSensitivity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.aiSensitivity}
                onChange={e => handleChange('aiSensitivity', parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${settings.aiSensitivity}%, rgba(255,255,255,0.2) ${settings.aiSensitivity}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <p className="text-xs text-white/50 mt-2">Higher = More detections (more false positives)</p>
            </div>

            {/* Confidence Threshold */}
            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">Confidence Threshold</p>
                <span className="text-sm text-cyan-400 font-bold">{settings.confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={settings.confidenceThreshold}
                onChange={e => handleChange('confidenceThreshold', parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((settings.confidenceThreshold - 50) / 49) * 100}%, rgba(255,255,255,0.2) ${((settings.confidenceThreshold - 50) / 49) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <p className="text-xs text-white/50 mt-2">Minimum confidence level to trigger alerts</p>
            </div>
          </div>
        </div>

        {/* SECTION 4 — NOTIFICATIONS */}
        <div className="bg-[#121722] rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          <p className="text-xs text-white/50 mb-6">Choose how you want to be notified of events.</p>

          <div className="space-y-3">
            {[
              { key: 'pushNotifications', label: 'Push Notifications', desc: 'In-app alerts on device' },
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Detailed alerts via email' },
              { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Critical alerts via text message' },
              { key: 'callEmergency', label: 'Call Emergency Services', desc: 'Auto-call emergency on critical threat' },
            ].map(notif => (
              <div key={notif.key} className="flex items-center justify-between p-4 bg-[#1a1f29] rounded-lg border border-white/10">
                <div>
                  <p className="text-sm font-semibold text-white">{notif.label}</p>
                  <p className="text-xs text-white/50">{notif.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(notif.key)}
                  className={`relative w-14 h-7 rounded-full transition ${
                    settings[notif.key] ? 'bg-yellow-500' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
                      settings[notif.key] ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5 — RECORDING */}
        <div className="bg-[#121722] rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Recording Settings</h2>
          </div>
          <p className="text-xs text-white/50 mb-6">Configure video storage and recording preferences.</p>

          <div className="space-y-6">
            {/* Auto Record */}
            <div className="flex items-center justify-between p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <div>
                <p className="text-sm font-semibold text-white">Auto-Record on Detection</p>
                <p className="text-xs text-white/50">Automatically save footage when threat detected</p>
              </div>
              <button
                onClick={() => handleToggle('autoRecord')}
                className={`relative w-14 h-7 rounded-full transition ${
                  settings.autoRecord ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
                    settings.autoRecord ? 'translate-x-8' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>

            {/* Video Retention */}
            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <p className="text-sm font-semibold text-white mb-2">Video Retention (Days)</p>
              <select
                value={settings.videoRetention}
                onChange={e => handleChange('videoRetention', parseInt(e.target.value))}
                className="w-full bg-[#0D111B] border border-white/20 rounded px-3 py-2 text-white text-sm"
              >
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
              <p className="text-xs text-white/50 mt-2">Older footage is automatically deleted</p>
            </div>

            {/* Recording Quality */}
            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <p className="text-sm font-semibold text-white mb-2">Recording Quality</p>
              <select
                value={settings.recordingQuality}
                onChange={e => handleChange('recordingQuality', e.target.value)}
                className="w-full bg-[#0D111B] border border-white/20 rounded px-3 py-2 text-white text-sm"
              >
                <option value="480p">480p (Low bandwidth)</option>
                <option value="720p">720p (Standard)</option>
                <option value="1080p">1080p (High quality)</option>
                <option value="4k">4K (Premium - high storage)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 6 — EMERGENCY CONTACTS */}
        <div className="bg-[#121722] rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-bold text-white">Emergency Contacts</h2>
          </div>
          <p className="text-xs text-white/50 mb-6">Add contacts to notify during critical threats.</p>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-white/50 mb-2">Primary Contact</p>
              <input
                type="tel"
                value={settings.emergencyContact1}
                onChange={e => handleChange('emergencyContact1', e.target.value)}
                className="w-full bg-[#1a1f29] border border-white/20 rounded px-3 py-2 text-white placeholder-white/30 text-sm"
                placeholder="Phone number..."
              />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-2">Secondary Contact</p>
              <input
                type="tel"
                value={settings.emergencyContact2}
                onChange={e => handleChange('emergencyContact2', e.target.value)}
                className="w-full bg-[#1a1f29] border border-white/20 rounded px-3 py-2 text-white placeholder-white/30 text-sm"
                placeholder="Phone number (optional)..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 7 — SYSTEM */}
        <div className="bg-[#121722] rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold text-white">System & Security</h2>
          </div>
          <p className="text-xs text-white/50 mb-6">System preferences and security settings.</p>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <div>
                <p className="text-sm font-semibold text-white">Automatic Updates</p>
                <p className="text-xs text-white/50">Keep system up-to-date with latest features</p>
              </div>
              <button
                onClick={() => handleToggle('systemAutoUpdate')}
                className={`relative w-14 h-7 rounded-full transition ${
                  settings.systemAutoUpdate ? 'bg-cyan-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
                    settings.systemAutoUpdate ? 'translate-x-8' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <div>
                <p className="text-sm font-semibold text-white">End-to-End Encryption</p>
                <p className="text-xs text-white/50">Encrypt all video and data transmission</p>
              </div>
              <button
                onClick={() => handleToggle('dataEncryption')}
                className={`relative w-14 h-7 rounded-full transition ${
                  settings.dataEncryption ? 'bg-green-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
                    settings.dataEncryption ? 'translate-x-8' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <p className="text-xs text-white/50 mb-2">App Version</p>
              <p className="text-sm text-white font-semibold">v1.0.0 (Build 2026.03.02)</p>
            </div>

            <div className="p-4 bg-[#1a1f29] rounded-lg border border-white/10">
              <p className="text-xs text-white/50 mb-2">Last Updated</p>
              <p className="text-sm text-white font-semibold">March 2, 2026 at 2:14 PM</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4 pb-12">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
          <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition">
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  )
}
