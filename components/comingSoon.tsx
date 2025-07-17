"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin,
  Mail, 
  Bell,
  Sparkles,
  Rocket,
  Clock
} from 'lucide-react';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 75);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 group">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
            <Rocket className="w-12 h-12 text-white" />
          </div>
          <div className="mt-1">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Workfit India
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Something Amazing is
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Coming Your Way
            </span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stop Screen Fatigue Before It Stops You - Intelligent Workplace Wellness That Actually Works
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-purple-400 font-semibold">Launch Countdown</span>
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">
                    {item.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        {/* <div className="mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Bell className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white font-semibold">Get Notified</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Be the first to know when we launch. No spam, just updates.
              </p>
              
              {isSubscribed ? (
                <div className="text-green-400 text-sm font-medium py-3">
                  ✓ Successfully subscribed! We'll keep you updated.
                </div>
              ) : (
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-slate-400 focus:border-purple-400"
                  />
                  <Button
                    onClick={handleEmailSubmit}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 transform hover:scale-105 transition-all duration-200"
                  >
                    Notify Me
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div> */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm mb-4">Follow us for updates</p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`text-slate-400 ${social.color} transform hover:scale-110 transition-all duration-200`}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="text-slate-500 text-sm">
          <p>© 2025 Workfit India. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}