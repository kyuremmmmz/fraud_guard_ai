'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useMemo } from 'react'

interface FraudScoreWidgetProps {
  score: number
}

export function FraudScoreWidget({ score }: FraudScoreWidgetProps) {
  const { color, label, intensity } = useMemo(() => {
    if (score < 30) return { color: '#10b981', label: 'Safe', intensity: 'low' }
    if (score < 60) return { color: '#f59e0b', label: 'Suspicious', intensity: 'medium' }
    if (score < 80) return { color: '#ef4444', label: 'High Risk', intensity: 'high' }
    return { color: '#dc2626', label: 'Critical', intensity: 'critical' }
  }, [score])

  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference

  return (
    <Card className="border-border bg-card/40 backdrop-blur-sm flex flex-col">
      <CardHeader>
        <CardTitle>Fraud Score</CardTitle>
        <CardDescription>Risk Assessment</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-1 space-y-6">
        {/* Circular Progress */}
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-500"
              style={{
                filter: `drop-shadow(0 0 8px ${color}40)`,
              }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-foreground">{score}</div>
            <div className="text-xs text-muted-foreground">out of 100</div>
          </div>
        </div>

        {/* Label and Badge */}
        <div className="text-center space-y-2">
          <div
            className="px-4 py-2 rounded-full font-semibold text-white text-sm"
            style={{ backgroundColor: color }}
          >
            {label}
          </div>
          <p className="text-xs text-muted-foreground capitalize">
            {intensity} Risk Level
          </p>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10b981' }} />
            <span className="text-xs text-muted-foreground">0-29: Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
            <span className="text-xs text-muted-foreground">30-59: Suspicious</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ef4444' }} />
            <span className="text-xs text-muted-foreground">60-79: High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#dc2626' }} />
            <span className="text-xs text-muted-foreground">80-100: Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
