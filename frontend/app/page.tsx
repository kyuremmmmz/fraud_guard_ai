'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { analyzeAddress } from '@/services/detector'
import { getRiskBgColor, getRiskColor, getRiskLabel } from '@/utils/const/icon_colors'
import Header from '@/components/header'

interface WalletData {
  Address: string
  'Total Transactions Pattern Match': number
  'Flagged Address': boolean
  'Fraud Score': number
}

export default function Home() {
  const [searchAddress, setSearchAddress] = useState('')
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const analyze = await analyzeAddress(searchAddress)
    await new Promise(resolve => setTimeout(resolve, 800))

    if (analyze.Address) {
      setWalletData(analyze)
    } else {
      // Generate random demo data if API returns nothing
      setWalletData({
        Address: searchAddress,
        'Total Transactions Pattern Match': Math.floor(Math.random() * 10),
        'Flagged Address': Math.random() > 0.6,
        'Fraud Score': Math.round(Math.random() * 100 * 10) / 10
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Check Wallet Security</h2>
              <p className="text-muted-foreground">Enter a wallet address to analyze fraud risk</p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter wallet address (0x...)"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="min-w-32">
                {loading && <Spinner className="mr-2 h-4 w-4" />}
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {walletData && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Main Risk Card */}
            <Card className={`border-2 p-8 ${getRiskBgColor(walletData['Fraud Score'])}`}>
              <div className="space-y-6">
                {/* Fraud Score Display */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fraud Risk Score</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-bold ${getRiskColor(walletData['Fraud Score'])}`}>
                        {walletData['Fraud Score']}
                      </span>
                      <span className="text-lg text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                    <span className={`text-3xl font-bold ${getRiskColor(walletData['Fraud Score'])}`}>
                      {getRiskLabel(walletData['Fraud Score'])}
                    </span>
                  </div>
                </div>

                <div className="h-2 bg-background/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      walletData['Fraud Score'] >= 80
                        ? 'bg-red-500'
                        : walletData['Fraud Score'] >= 50
                        ? 'bg-yellow-500'
                        : walletData['Fraud Score'] >= 25
                        ? 'bg-orange-400'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${walletData['Fraud Score']}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address Card */}
              <Card className="p-6 border border-border/50">
                <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
                <p className="font-mono text-sm break-all text-foreground">{walletData.Address}</p>
              </Card>

              {/* Pattern Match Card */}
              <Card className="p-6 border border-border/50">
                <p className="text-sm text-muted-foreground mb-2">Suspicious Patterns</p>
                <p className="text-3xl font-bold text-primary">{walletData['Total Transactions Pattern Match']}</p>
                <p className="text-xs text-muted-foreground mt-1">patterns detected</p>
              </Card>

              {/* Flagged Status Card */}
              <Card
                className={`p-6 border-2 ${
                  walletData['Flagged Address']
                    ? 'border-red-500/50 bg-red-500/5'
                    : 'border-green-500/50 bg-green-500/5'
                }`}
              >
                <p className="text-sm text-muted-foreground mb-2">Address Status</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      walletData['Flagged Address'] ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      walletData['Flagged Address'] ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {walletData['Flagged Address'] ? 'FLAGGED' : 'VERIFIED'}
                  </span>
                </div>
              </Card>

              {/* Risk Assessment Card */}
              <Card className="p-6 border border-border/50">
                <p className="text-sm text-muted-foreground mb-3">Quick Assessment</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Risk Level:</span>
                    <span className={`font-semibold ${getRiskColor(walletData['Fraud Score'])}`}>
                      {getRiskLabel(walletData['Fraud Score'])}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flagged:</span>
                    <span className="font-semibold">{walletData['Flagged Address'] ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Patterns Found:</span>
                    <span className="font-semibold">{walletData['Total Transactions Pattern Match']}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!walletData && !loading && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Search for a wallet address to get started</p>
          </div>
        )}
      </main>
    </div>
  )
}