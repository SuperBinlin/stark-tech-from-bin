'use client'

import React, { useEffect } from 'react'
import { Box, CircularProgress, Alert, Typography } from '@mui/material'
import ReactECharts from 'echarts-for-react'
import { useFinmindStore } from '@/store/finmindStore'
import dayjs from 'dayjs'

interface StockChartProps {
  stockId: string
  startDate: string
  endDate?: string
}

const chartContainerStyle = {
  height: 350,
  width: 648,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const alertContainerStyle = {
  ...chartContainerStyle,
  '& .MuiAlert-root': {
    width: '80%'
  }
}

export default function StockChart({
  stockId,
  startDate,
  endDate,
}: StockChartProps) {
  const { tableData, fetchStockInfo, fetchStockRevenue } = useFinmindStore()
  const effectiveEndDate = endDate ?? dayjs().format('YYYY-MM-DD')

  useEffect(() => {
    if (stockId) {
      fetchStockInfo(stockId)
      fetchStockRevenue(stockId, startDate, effectiveEndDate)
    }
  }, [stockId, startDate, effectiveEndDate, fetchStockInfo, fetchStockRevenue])

  const renderContent = () => {
    if (tableData.loading) {
      return (
        <Box sx={chartContainerStyle}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>加载中...</Typography>
        </Box>
      )
    }

    if (tableData.error) {
      return (
        <Box sx={alertContainerStyle}>
          <Alert severity="error">{tableData.error.message}</Alert>
        </Box>
      )
    }

    if (!tableData.data) {
      return (
        <Box sx={chartContainerStyle}>
          <Typography variant="body1">数据初始化中...</Typography>
        </Box>
      )
    }

    if (tableData.data.chartData.length === 0) {
      return (
        <Box sx={alertContainerStyle}>
          <Alert severity="info">暂无数据</Alert>
        </Box>
      )
    }

    const { chartData } = tableData.data
    const dates = chartData.map((item) => item.date)
    const revenues = chartData.map((item) => item.revenue)
    const growths = chartData.map((item) => item.growthRate)

    const option = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: {
        data: ['每月營收', '營收增長率'],
        top: 10,
        left: 'center',
      },
      grid: {
        top: 60,
        left: 60,
        right: 60,
        bottom: 40,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { color: '#eee' } },
        axisLabel: {
          interval: (idx: number, value: string) => dayjs(value).month() === 0,
          formatter: (value: string) => dayjs(value).format('YYYY'),
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '收入 (千元)',
          position: 'left',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: true, lineStyle: { color: '#eee' } },
          axisLabel: { formatter: '{value}' },
        },
        {
          type: 'value',
          name: '增長率 (%)',
          position: 'right',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { formatter: '{value}%' },
        },
      ],
      series: [
        {
          name: '每月營收',
          type: 'bar',
          data: revenues,
          itemStyle: {
            color: 'rgba(251, 223, 155, 0.9)',
            borderColor: '#f1ab00',
            borderWidth: 1,
          },
        },
        {
          name: '營收增長率',
          type: 'line',
          yAxisIndex: 1,
          data: growths,
          smooth: true,
          symbol: 'none', 
          itemStyle: { color: '#dc3f45' },
        },
      ],
    }

    return (
      <Box sx={{ ...chartContainerStyle, alignItems: 'flex-start' }}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }} 
        />
      </Box>
    )
  }

  return renderContent()
}