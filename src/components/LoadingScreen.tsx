import React from 'react';
import { Box, Typography, CircularProgress, LinearProgress } from '@mui/material';

type LoadingScreenProps = {
  step: number;
};

export default function LoadingScreen({ step }: LoadingScreenProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh', // 画面の中央に配置
      }}
    >
      {/* 真ん中の赤いローディングサークル */}
      <CircularProgress size={80} thickness={4} sx={{ color: '#F00033' }} />

      {/* マッチング中のテキスト */}
      <Typography variant="h6" sx={{ color: '#F00033', mt: 2 }}>
        マッチング中...
      </Typography>

      {/* 下部のプログレスバーとステータステキスト */}
      <Box sx={{ width: '40%', mt: 4 }}>
        <LinearProgress variant="determinate" value={(step / 5) * 100} sx={{ height: '10px', borderRadius: '5px' }} />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Typography variant="body1">{step} / 5</Typography>
        </Box>
      </Box>
    </Box>
  );
}
