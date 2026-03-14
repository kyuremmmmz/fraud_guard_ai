'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, ScrollText, AlertTriangle } from 'lucide-react'

const upcomingFeatures = [
  {
    title: 'Smart Contract Analyzer',
    description: 'Analyze smart contracts for vulnerabilities and malicious code patterns',
    icon: ScrollText,
    color: 'text-primary'
  },
  {
    title: 'Phishing Token Detector',
    description: 'Identify fake and scam tokens before they drain your wallet',
    icon: AlertTriangle,
    color: 'text-warning'
  },
  {
    title: 'DeFi Rugpull Monitor',
    description: 'Real-time monitoring and alerts for potential DeFi protocol exploits',
    icon: Zap,
    color: 'text-destructive'
  }
]

export function ComingSoonGrid() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Future Features</h2>
        <p className="text-muted-foreground">More advanced fraud detection tools coming soon</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <Card 
              key={feature.title} 
              className="border-border bg-card/20 backdrop-blur-sm opacity-60 hover:opacity-80 transition-opacity relative overflow-hidden cursor-not-allowed"
            >
              {/* Disabled overlay effect */}
              <div className="absolute inset-0 bg-muted/5" />
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    Coming Soon
                  </Badge>
                </div>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-24 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Feature in Development</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Check back soon for updates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
