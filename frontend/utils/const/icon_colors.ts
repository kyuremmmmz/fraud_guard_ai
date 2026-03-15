export const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-500'
    if (score >= 50) return 'text-yellow-500'
    if (score >= 25) return 'text-orange-400'
    return 'text-green-500'
  }

  export const getRiskBgColor = (score: number) => {
    if (score >= 80) return 'bg-red-500/10 border-red-500/30'
    if (score >= 50) return 'bg-yellow-500/10 border-yellow-500/30'
    if (score >= 25) return 'bg-orange-400/10 border-orange-400/30'
    return 'bg-green-500/10 border-green-500/30'
  }

  export const getRiskLabel = (score: number) => {
    if (score >= 80) return 'CRITICAL'
    if (score >= 50) return 'HIGH'
    if (score >= 25) return 'MEDIUM'
    return 'LOW'
  }