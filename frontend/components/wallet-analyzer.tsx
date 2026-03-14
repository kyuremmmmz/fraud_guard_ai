'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Search } from 'lucide-react'

interface WalletAnalyzerProps {
  onAnalyze: (address: string) => void
  loading?: boolean
}

export function WalletAnalyzer({ onAnalyze, loading = false }: WalletAnalyzerProps) {
  const [address, setAddress] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      onAnalyze(address)
    }
  }

  return (
    <Card className="border-border bg-card/40 backdrop-blur-sm hover:bg-card/50 transition-colors">
      <CardHeader>
        <CardTitle>Wallet Analyzer</CardTitle>
        <CardDescription>
          Enter a blockchain wallet address to analyze for suspicious patterns and risk factors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Paste wallet address (0x...)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
              disabled={loading}
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading || !address.trim()}
            className="gap-2"
          >
            {loading ? (
              <>
                <Spinner className="w-4 h-4" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Analyze
              </>
            )}
          </Button>
        </form>

        {/* Example addresses */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Try example addresses:</p>
          <div className="flex flex-wrap gap-2">
            {[
              '0x742d35Cc6634C0532925a3b844Bc91e5b8b76e4D',
              '0x3dC20D5A7d11f0B6F82a42d1c28e1cdf2C3Ce5a1'
            ].map((example) => (
              <button
                key={example}
                onClick={() => setAddress(example)}
                className="text-xs px-3 py-1 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full transition-colors"
              >
                {example.slice(0, 10)}...
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
