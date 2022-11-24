export type QuotaRecord = {
  key: React.Key
  type: 'title' | 'month' | 'money'
  title: string
  half: 0 | 1
  
  value1: string | number
  value2: string | number
  value3: string | number
  value4: string | number
  value5: string | number
  value6: string | number
}
