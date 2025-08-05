'use client'

import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, useTheme } from '@mui/material'
import { useFinmindStore } from '@/store/finmindStore'

export default function RevenueTable() {
  const theme = useTheme()
  const { tableData } = useFinmindStore()

  if (!tableData.data || tableData.data.chartData.length === 0) {
    return <Box sx={{ marginTop: 2, width: 648 }} />
  }

  const { chartData } = tableData.data

  return (
    <Box sx={{ marginTop: 2, width: 648 }}>
      <TableContainer 
        component={Paper}
        sx={{ 
          display: 'block',
          minWidth: 400,
          maxHeight: 400,
          overflow: 'auto',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 0,
          '&::-webkit-scrollbar': {
            height: '8px',
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: 0
          }
        }}
      >
        <Table stickyHeader aria-label="revenue table">
          <TableBody sx={{ 
            '& td': { 
              textAlign: 'right',
              border: `1px solid ${theme.palette.divider}`,
              whiteSpace: 'nowrap'
            }
          }}>
            <TableRow>
              <TableCell 
                sx={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  backgroundColor: theme.palette.grey[50],
                  '&:first-of-type': { textAlign: 'left' },
                  minWidth: 120,
                  borderRadius: 0
                }}
              >
                年度月份
              </TableCell>
              {chartData.map((item) => (
                <TableCell 
                  key={item.date}
                  sx={{
                    backgroundColor: theme.palette.grey[50],
                  }}
                >
                  {item.date}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell 
                sx={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  backgroundColor: theme.palette.background.paper,
                  '&:first-of-type': { textAlign: 'left' },
                  minWidth: 120
                }}
              >
                每月营收
              </TableCell>
              {chartData.map((item) => (
                <TableCell key={`revenue-${item.date}`}>
                  {(item.revenue / 1000).toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell 
                sx={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  backgroundColor: theme.palette.grey[50],
                  '&:first-of-type': { textAlign: 'left' },
                  minWidth: 120
                }}
              >
                单月营收年增率(%)
              </TableCell>
              {chartData.map((item) => (
                <TableCell 
                  key={`growth-${item.date}`}
                  sx={{
                    backgroundColor: theme.palette.grey[50],
                    color: item.growthRate >= 0 ? 'success.main' : 'error.main'
                  }}
                >
                  {item.growthRate >= 0 ? '+' : ''}{item.growthRate.toFixed(2)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
