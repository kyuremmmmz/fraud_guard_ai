'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'

interface Transaction {
  hash: string
  value: number
  timestamp: string
  risk: 'low' | 'medium' | 'high' | 'critical'
}

interface Pattern {
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
}

interface TransactionTableProps {
  transactions: Transaction[]
  patterns: Pattern[]
}

export function TransactionTable({ transactions, patterns }: TransactionTableProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-accent/20 text-accent border-accent/50'
      case 'medium':
        return 'bg-warning/20 text-warning border-warning/50'
      case 'high':
        return 'bg-destructive/20 text-destructive border-destructive/50'
      case 'critical':
        return 'bg-destructive/30 text-destructive border-destructive'
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/50'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return <CheckCircle className="w-4 h-4" />
      case 'medium':
        return <AlertCircle className="w-4 h-4" />
      case 'high':
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/20 text-destructive border-destructive/50'
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/30'
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/30'
      case 'low':
        return 'bg-accent/10 text-accent border-accent/30'
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Suspicious Patterns */}
      <Card className="border-border bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Suspicious Pattern Detection</CardTitle>
          <CardDescription>Fraud indicators identified in wallet activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {patterns.map((pattern, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border ${getSeverityBadge(pattern.severity)}`}
              >
                {pattern.severity === 'critical' ? (
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <span className="text-sm">{pattern.type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card className="border-border bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last activity on this wallet address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Transaction Hash</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Value (ETH)</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Time</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4">
                      <code className="text-xs text-primary font-mono">{tx.hash.slice(0, 16)}...</code>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground">{tx.value}</td>
                    <td className="py-3 px-4 text-muted-foreground">{tx.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <Badge
                          variant="outline"
                          className={`gap-1.5 ${getRiskColor(tx.risk)}`}
                        >
                          {getRiskIcon(tx.risk)}
                          <span className="capitalize">{tx.risk}</span>
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
