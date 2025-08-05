'use client'

import React, { useState, KeyboardEvent, ChangeEvent } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

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
    height: 40,
  },
})

interface SearchBoxProps {
  onSearch: (stockId: string) => void
  initialStockId?: string
}

export default function SearchBox({ 
  onSearch, 
  initialStockId = '2330' 
}: SearchBoxProps) {
  const [stockId, setStockId] = useState<string>(initialStockId)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onSearch(stockId.trim())
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </CenteredContainer>
  )
}
