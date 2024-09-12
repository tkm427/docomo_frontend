// src/components/MatchingResultPage.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import ZoomURLText from './ZoomURLText';
import ActionButton from './ActionButton';
import MemberList from './MemberList';

export default function MatchingResultPage() {
  const members = ['山崎匠真', '山崎匠真', '山崎匠真', '山崎匠真'];
  const zoomUrl = 'https://zoom.us/j/1234567890';
  return (
    <div>
      {/* コンテンツエリア */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        {/* マッチングしましたテキスト */}
        <Typography variant="h3" sx={{ color: '#F00033', mb: 4, fontWeight: 'bold' }}>
          マッチングしました！
        </Typography>

        {/* メンバーリスト */}
        <MemberList members={members} />

        {/* Zoom URL */}
        <ZoomURLText zoomUrl={zoomUrl} />

        {/* ボタンエリア */}
        <ActionButton zoomUrl={zoomUrl} />
      </Box>
    </div>
  );
}
