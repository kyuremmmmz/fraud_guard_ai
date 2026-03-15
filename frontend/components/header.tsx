export default function Header() {
    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">FraudGuard</h1>
              <p className="text-sm text-muted-foreground">Wallet Fraud Detection</p>
            </div>
          </div>
        </div>
      </header>
    )
}