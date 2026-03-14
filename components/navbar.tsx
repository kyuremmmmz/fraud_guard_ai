'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-lg">🛡️</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">FraudGuard AI</h1>
            <p className="text-xs text-muted-foreground">Blockchain Fraud Detection</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
