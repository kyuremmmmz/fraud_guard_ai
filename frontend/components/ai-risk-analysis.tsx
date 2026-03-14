'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Check, AlertCircle, Zap } from 'lucide-react'

interface AIRiskAnalysisProps {
  riskLevel: string
  explanation: string
  walletAddress: string
  totalTransactions: number
}

export function AIRiskAnalysis({
  riskLevel,
  explanation,
  walletAddress,
  totalTransactions,
}: AIRiskAnalysisProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-accent/10 border-accent text-accent'
      case 'Medium':
        return 'bg-warning/10 border-warning text-warning'
      case 'High':
        return 'bg-destructive/10 border-destructive text-destructive'
      default:
        return 'bg-muted/10 border-muted text-muted-foreground'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Low':
        return <Check className="w-4 h-4" />
      case 'Medium':
        return <AlertCircle className="w-4 h-4" />
      case 'High':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Zap className="w-4 h-4" />
    }
  }

  return (
    <Card className="border-border bg-card/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>AI Risk Analysis</CardTitle>
            <CardDescription>Powered by advanced ML fraud detection</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={`gap-2 ${getRiskColor(riskLevel)}`}
          >
            {getRiskIcon(riskLevel)}
            {riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Wallet Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg border border-border">
          <div>
            <p className="text-xs text-muted-foreground">Wallet Address</p>
            <p className="text-sm font-mono text-foreground">{walletAddress.slice(0, 16)}...</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Transactions</p>
            <p className="text-sm font-semibold text-foreground">{totalTransactions.toLocaleString()}</p>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Analysis Summary</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {explanation}
          </p>
        </div>

        {/* Key Indicators */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          <div className="p-3 bg-muted/10 rounded-lg">
            <p className="text-xs text-muted-foreground">Pattern Match</p>
            <p className="text-lg font-bold text-primary">92%</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-lg">
            <p className="text-xs text-muted-foreground">Flagged Address</p>
            <p className="text-lg font-bold text-destructive">5</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-lg">
            <p className="text-xs text-muted-foreground">Chain Age</p>
            <p className="text-lg font-bold text-warning">3 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
