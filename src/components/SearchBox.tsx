'use client'

import React, { useState, useCallback, KeyboardEvent, ChangeEvent } from 'react'
import { useFinmindStore } from '@/store/finmindStore'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'

const CenteredContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const StyledTextField = styled(TextField)({
  maxWidth: 400,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    paddingLeft: 12,
    paddingRight: 16,
    borderRadius: 8,
  },
})

export default function SearchBox() {
  const [stockId, setStockId] = useState<string>('2330')

  const fetchStockInfo = useFinmindStore(s => s.fetchStockInfo)
  const fetchStockRevenue = useFinmindStore(s => s.fetchStockRevenue)

  const handleSearch = useCallback(() => {
    const id = stockId.trim()
    if (!id) {
      console.warn('Input field cannot be empty.')
      return
    }

    const now = dayjs()
    const start_date = now.subtract(4, 'year').format('YYYY-MM-DD')
    const end_date = now.format('YYYY-MM-DD')

    fetchStockInfo(id)
    fetchStockRevenue(id, start_date, end_date)
  }, [stockId, fetchStockInfo, fetchStockRevenue])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStockId(e.target.value)
  }

  return (
    <CenteredContainer>
      <StyledTextField
        variant="outlined"
        placeholder="輸入台/美股代號，查看公司價值"
        value={stockId}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          },
        }}
      />
    </CenteredContainer>
  )
}
