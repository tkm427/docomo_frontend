import React from 'react';
import { Box, Button } from '@mui/material';

type ActionButtonProps = {
  zoomUrl: string;
};

export default function ActionButton({ zoomUrl }: ActionButtonProps) {
  const handleButtonClick = () => {
    window.location.href = zoomUrl; // ボタンがクリックされたときにzoomUrlに遷移
  };

  return (
    <Box sx={{ mt: 4, width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        variant="contained"
        fullWidth
        sx={{ backgroundColor: '#F00033', color: 'white', height: 50, mb: 2, fontSize: '18px' }}
        onClick={handleButtonClick} // ボタンクリックでURLに遷移
      >
        参加する
      </Button>
      <Button
        variant="outlined"
        fullWidth
        sx={{ color: '#F00033', borderColor: '#F00033', height: 50, fontSize: '18px' }}
      >
        アンケートへ
      </Button>
    </Box>
  );
}
