'use client'

import React from 'react'
import { useFinmindStore } from '@/store/finmindStore'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const TitleContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.custom.borderColor}`,
  backgroundColor: theme.palette.custom.titleBg,
  height: 60,
  width: 650,
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  padding: theme.spacing(0, 3),
}))

export default function StockTitle() {
  const { data: stockInfo } = useFinmindStore(state => state.stockInfo)
  const stock = stockInfo?.[0]

  return (
    <TitleContainer>
      {stock ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {stock.stock_name} ({stock.stock_id})
          </Typography>
        </Box>
      ) : (
        <Typography variant="h6">請輸入股票代號查詢</Typography>
      )}
    </TitleContainer>
  )
}