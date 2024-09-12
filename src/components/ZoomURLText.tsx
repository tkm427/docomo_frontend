import React from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type ZoomURLTextProps = {
  zoomUrl: string; // 引数で受け取るZoom URLの型
};

export default function ZoomURLText({ zoomUrl }: ZoomURLTextProps) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(zoomUrl)
      .then(() => {
        alert("Zoom URLをコピーしました!");
      })
      .catch((err) => {
        console.error("コピーに失敗しました", err);
      });
  };

  return (
    <Box sx={{ width: '60%', mt: 4 }}>
      <Typography variant="caption" sx={{ color: '#F00033' }}>
        Zoom URL
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={zoomUrl}
        InputProps={{
          readOnly: true,
          endAdornment: (  // 右端にアイコンを配置
            <InputAdornment position="end">
              <IconButton onClick={handleCopyClick}>
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          mt: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#F00033',
            },
          },
        }}
      />
    </Box>
  );
}
