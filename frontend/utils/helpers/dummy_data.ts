import { AnalysisData } from "@/interfaces/analysis_data";

const mockWallets: AnalysisData[] = [
  {
    Address: '0x5dA2adF1fA7e0DE839eE8A92aB06A1861A5D6671',
    'Total Transactions Pattern Match': 0,
    'Flagged Address': true,
    'Fraud Score': 100.0
  },
  {
    Address: '0x742d35Cc6634C0532925a3b844Bc9e7595f42bE',
    'Total Transactions Pattern Match': 3,
    'Flagged Address': false,
    'Fraud Score': 24.5
  },
  {
    Address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    'Total Transactions Pattern Match': 7,
    'Flagged Address': true,
    'Fraud Score': 87.2
  }
]