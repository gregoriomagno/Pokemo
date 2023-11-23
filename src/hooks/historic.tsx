
import { HistoricContext, IHistoricContext } from '@/contexts/HistoricContext'
import { useContext } from 'react'

function useHistoric(): IHistoricContext {
    const context = useContext(HistoricContext)

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }

    return context
}

export { useHistoric }
