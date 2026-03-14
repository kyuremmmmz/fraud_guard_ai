'use client'

import { Navbar } from '@/components/navbar'
import { WalletAnalyzer } from '@/components/wallet-analyzer'
import { AIRiskAnalysis } from '@/components/ai-risk-analysis'
import { FraudScoreWidget } from '@/components/fraud-score-widget'
import { TransactionTable } from '@/components/transaction-table'
import { ComingSoonGrid } from '@/components/coming-soon-grid'
import { useState } from 'react'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (address: string) => {
    setWalletAddress(address)
    setLoading(true)
    
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setAnalysisData({
      totalTransactions: 1247,
      totalValueTransferred: 524.8,
      suspiciousScore: 62,
      riskLevel: 'High',
      riskExplanation: 'This wallet shows multiple red flags: frequent small incoming transactions (possible money laundering), sudden large transfers, and interaction with flagged addresses.',
      patterns: [
        { type: 'Many small incoming transactions', severity: 'high' },
        { type: 'Sudden large transfer detected', severity: 'critical' },
        { type: 'Interaction with flagged wallets', severity: 'high' },
        { type: 'New wallet with high volume', severity: 'medium' }
      ],
      transactions: [
        { hash: '0x1a2b3c4d5e6f7g8h9i0j', value: 12.5, timestamp: '2 hours ago', risk: 'high' },
        { hash: '0x2b3c4d5e6f7g8h9i0j1k', value: 0.25, timestamp: '4 hours ago', risk: 'low' },
        { hash: '0x3c4d5e6f7g8h9i0j1k2l', value: 156.0, timestamp: '6 hours ago', risk: 'critical' },
        { hash: '0x4d5e6f7g8h9i0j1k2l3m', value: 0.15, timestamp: '8 hours ago', risk: 'low' },
        { hash: '0x5e6f7g8h9i0j1k2l3m4n', value: 45.2, timestamp: '1 day ago', risk: 'high' },
      ]
    })
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Wallet Analyzer Section */}
        <section className="mb-8">
          <WalletAnalyzer onAnalyze={handleAnalyze} loading={loading} />
        </section>

        {/* Main Content Grid */}
        {analysisData && (
          <div className="space-y-8">
            {/* AI Analysis and Fraud Score Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIRiskAnalysis 
                  riskLevel={analysisData.riskLevel}
                  explanation={analysisData.riskExplanation}
                  walletAddress={walletAddress}
                  totalTransactions={analysisData.totalTransactions}
                />
              </div>
              <div>
                <FraudScoreWidget score={analysisData.suspiciousScore} />
              </div>
            </div>

            {/* Transaction Table */}
            <section>
              <TransactionTable transactions={analysisData.transactions} patterns={analysisData.patterns} />
            </section>
          </div>
        )}

        {/* Coming Soon Features */}
        <section className="mt-12">
          <ComingSoonGrid />
        </section>
      </main>
    </div>
  )
}
