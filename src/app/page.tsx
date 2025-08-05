'use client'

import { useState } from 'react'
import SearchBox from '@/components/SearchBox'
import StockTitle from '@/components/StockTitle'
import StockChart from '@/components/StockChart'
import Title from '@/components/Title'
import dayjs from 'dayjs'

export default function Home() {
  const [stockId, setStockId] = useState<string>('2330')
  
  const handleSearch = (newStockId: string) => {
    setStockId(newStockId)
  }

  const now = dayjs()
  const startDate = now.subtract(5, 'year').format('YYYY-MM-DD')
  const endDate = now.format('YYYY-MM-DD')

  return (
    <>
      <div className="h-20 w-full bg-[var(--color-surface)]">
        <SearchBox 
          onSearch={handleSearch} 
          initialStockId={stockId}
        />
      </div>
      <div className="flex flex-col items-center justify-center pt-3">
        <StockTitle />
        <div className='pt-3 bg-[var(--color-surface)] border border-[var(--color-border)] mt-2'>
          <div className='flex justify-between px-4'>
            <Title text='每月营收' />
            <Title text='近 5 年' />
          </div>
          <StockChart 
            stockId={stockId}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </>
  )
}
