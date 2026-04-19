'use client'

import Background from '@/components/Background'
import CreatorsForm from '@/components/CreatorsForm'
import { siteConfig } from '@/config/site.config'

const BENEFITS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Free Business Plan',
    description: 'Get full access to our $79/mo Business plan at zero cost',
    gradient: 'from-emerald-500/20 to-green-500/10',
    borderColor: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Unlimited Automations',
    description: 'Create unlimited comment-to-DM workflows for your content',
    gradient: 'from-purple-500/20 to-violet-500/10',
    borderColor: 'border-purple-500/30',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Advanced Analytics',
    description: 'Track conversions, engagement, and optimize your funnel',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Priority Support',
    description: 'Get direct access to our team for any questions or issues',
    gradient: 'from-orange-500/20 to-amber-500/10',
    borderColor: 'border-orange-500/30',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
  },
]

const REQUIREMENTS = [
  'Send at least 300 automated DMs per month',
  'Run at least 2 automation campaigns every 30 days',
  'Keep "Powered by Reactova" footer on your bio link page',
]

export default function CreatorsView() {
  const { brand } = siteConfig

  return (
    <>
      <Background />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12 sm:mb-16">
          <span className="w-2 h-2 rounded-full bg-[#7C6AF7] animate-pulse" />
          <span className="font-[Syne] font-extrabold text-lg text-[#E8E8F0] tracking-tight">
            {brand.name}
          </span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C6AF7]/10 border border-[#7C6AF7]/30 mb-6 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C6AF7]" />
          <span className="text-xs font-medium text-[#7C6AF7] tracking-wide">
            Creators Program
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[Syne] font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center text-[#E8E8F0] leading-tight tracking-tight mb-6 animate-fade-up [animation-delay:100ms]">
          <span className="block">Get <span className="text-[#7C6AF7] relative">
            free access
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#F97316] rounded-full transform scale-x-0 animate-underline-in [animation-delay:800ms]" />
          </span></span>
          <span className="block">to our Business plan</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-[#6B6B80] text-center max-w-lg leading-relaxed mb-10 sm:mb-12 font-light animate-fade-up [animation-delay:200ms]">
          Join 50 selected creators who get full platform access at zero cost. 
          Automate your Instagram DMs and convert more followers into customers.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-10 sm:mb-12 animate-fade-up [animation-delay:300ms]">
          {BENEFITS.map((benefit, i) => (
            <div 
              key={i} 
              className={`group relative bg-gradient-to-br ${benefit.gradient} backdrop-blur-sm border ${benefit.borderColor} rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#7C6AF7]/5`}
            >
              <div className={`w-12 h-12 ${benefit.iconBg} rounded-xl flex items-center justify-center mb-4 ${benefit.iconColor} transition-transform group-hover:scale-110`}>
                {benefit.icon}
              </div>
              <h3 className="font-[Syne] font-bold text-base text-[#E8E8F0] mb-2 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#6B6B80] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Requirements Card */}
        <div className="w-full max-w-xl bg-gradient-to-br from-[#F97316]/8 to-[#F97316]/3 border border-[#F97316]/20 rounded-2xl p-6 mb-10 sm:mb-12 animate-fade-up [animation-delay:400ms]">
          <h3 className="font-[Syne] font-bold text-lg text-[#F97316] mb-5 flex items-center gap-3">
            <span className="w-1 h-6 bg-gradient-to-b from-[#7C6AF7] to-[#F97316] rounded-full" />
            What we ask in return
          </h3>
          <ul className="space-y-3">
            {REQUIREMENTS.map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#E8E8F0]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F97316]/20 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Application Form */}
        <CreatorsForm />

        {/* Footer */}
        <div className="mt-10 sm:mt-12 animate-fade-up [animation-delay:600ms]">
          <p className="text-xs text-[#6B6B80] text-center flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
            Limited to 50 creators in the initial launch phase
          </p>
        </div>

        {/* Decorative gradient line */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#7C6AF7]/60 to-transparent z-10 hidden sm:block" />
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-[#F97316]/40 to-transparent z-10 hidden sm:block" />
      </div>
    </>
  )
}
