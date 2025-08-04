'use client'

import React, { useState, useCallback, KeyboardEvent } from 'react'
import { useSearchStore } from '@/store/searchStore'
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
  },
})

export default function SearchBox() {
  const [localQuery, setLocalQuery] = useState('')

  const handleSearch = useCallback(async () => {
    console.log('handleSearch', localQuery)
  }, [localQuery])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <CenteredContainer>
      <StyledTextField
        variant="outlined"
        placeholder="輸入台/美股代號，查看公司價值"
        value={localQuery}
        onChange={e => setLocalQuery(e.target.value)}
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
