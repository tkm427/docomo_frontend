import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, TextField, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
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
        <Typography variant="h5" sx={{ color: '#F00033', mb: 4 }}>
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
