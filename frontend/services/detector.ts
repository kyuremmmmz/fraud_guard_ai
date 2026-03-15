import { AnalysisData } from "@/interfaces/analysis_data";

export const analyzeAddress = async (address: string):Promise<AnalysisData> => {
    try {
        const response = await fetch('http://127.0.0.1:8000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                address:address
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result:AnalysisData  = await response.json();
        return result
    } catch (error) {
        console.log(error);
        throw error
    }
}

