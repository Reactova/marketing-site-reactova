'use client'
import React from 'react'
import Navbar from './Navbar'
import Background from './Background'

interface LegalPageProps {
  title: string
  lastUpdated: string
  content: string
}

export default function LegalPage({ title, lastUpdated, content }: LegalPageProps) {
  // Split content by newlines to create paragraphs
  const paragraphs = content.split('\n').filter(p => p.trim() !== '')

  return (
    <>
      <Background />
      <Navbar ctaHref="/creators-program" ctaLabel="Apply as Creator →" ctaVariant="primary" />
      
      <main className="legal-wrap py-20!">
        <div className="container max-w-4xl!">
          <div className="legal-header">
            <h1 className="legal-title text-4xl! font-extrabold! mb-4! grad-text inline-block">{title}</h1>
            <p className="legal-meta text-sm! text-slate-400! font-mono! uppercase! letter-spacing-0.05em">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <div className="legal-content glass-card p-10! md:p-16! md:pt-6! leading-relaxed!">
            {paragraphs.map((p, i) => {
              // Check if it's a section header (starts with a number or matches certain patterns)
              const isHeader = /^\d+\./.test(p.trim()) || p.trim().length < 40 && p.trim().endsWith(':')
              
              if (isHeader) {
                return (
                  <h2 key={i} className="text-xl! font-bold! text-slate-800! mt-10! mb-4! font-outfit!">
                    {p}
                  </h2>
                )
              }
              
              return (
                <p key={i} className="text-slate-600! mb-4! font-inter!">
                  {p}
                </p>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
