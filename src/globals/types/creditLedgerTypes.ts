import { Status } from './types'

export interface CreditLedgerItem{
  id: string,
  total_credit: number,
  paidAmount: number,
  remainingAmount: number,
  lastPaymentDate: Date,
  dueDate: Date,
  orderId: string
}

export interface CreditLedgerState{
  creditLedger: CreditLedgerItem[],
  isLoading: boolean,
  error: string | null,
  status: Status
}