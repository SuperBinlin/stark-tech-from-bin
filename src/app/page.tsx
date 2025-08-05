'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import SearchBox from '@/components/SearchBox'
import StockTitle from '@/components/StockTitle'
import StockChart from '@/components/StockChart'
import Title from '@/components/Title'
import YearSelect from '@/components/YearSelect'
import dayjs from 'dayjs'

export default function Home() {
  const [stockId, setStockId] = useState<string>('2330')
  const [selectedYear, setSelectedYear] = useState<number>(5)
  
  const handleSearch = (newStockId: string) => {
    setStockId(newStockId)
  }

  const now = dayjs()
  const startDate = now.subtract(selectedYear + 1, 'year').format('YYYY-MM-DD')
  const endDate = now.format('YYYY-MM-DD')

  return (
    <>
      <Box 
        sx={{ 
          height: 80, 
          width: '100%', 
          bgcolor: 'background.paper' 
        }}
      >
        <SearchBox 
          onSearch={handleSearch} 
          initialStockId={stockId}
        />
      </Box>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 3
        }}
      >
        <StockTitle />
        <Box 
          sx={{ 
            pt: 3,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            mt: 2
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              px: 4
            }}
          >
            <Title text='每月营收' />
            <YearSelect 
              initialYear={selectedYear}
              onYearChange={(year) => setSelectedYear(year)}
            />
          </Box>
          <StockChart 
            stockId={stockId}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
      </Box>
    </>
  )
}