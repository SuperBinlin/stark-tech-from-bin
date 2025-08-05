'use client'

import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

interface YearSelectProps {
  initialYear?: number
  onYearChange: (year: number) => void
}

export default function YearSelect({ initialYear = 5, onYearChange }: YearSelectProps) {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear)

  const handleChange = (event: SelectChangeEvent<number>) => {
    const year = Number(event.target.value)
    setSelectedYear(year)
    onYearChange(year)
  }

  return (
    <Select
      value={selectedYear}
      onChange={handleChange}
      variant="standard"
      disableUnderline
      sx={{
        fontSize: '1rem',
        color: 'primary.contrastText',
        backgroundColor: 'primary.main',
        borderRadius: '4px',
        '& .MuiSelect-select': {
          padding: '4px 8px',
          minWidth: '60px',
          textAlign: 'center',
          color: 'inherit'
        },
        '& .MuiSelect-icon': {
          color: 'primary.contrastText'
        },
        '&:hover': {
          backgroundColor: 'primary.dark'
        }
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            marginTop: '4px',
            backgroundColor: 'primary.main',
            '& .MuiMenuItem-root': {
              color: 'primary.contrastText',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark'
              },
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              },
              '&.Mui-selected.Mui-focusVisible': {
                backgroundColor: 'primary.light'
              }
            }
          }
        },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        }
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((year) => (
        <MenuItem 
          key={year} 
          value={year}
          selected={selectedYear === year}
        >
          {`近 ${year} 年`}
        </MenuItem>
      ))}
    </Select>
  )
}
