// src/components/MemberList.tsx
import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

type MemberListProps = {
  members: string[];
};

export default function MemberList({ members }: MemberListProps) {
  return (
    <List sx={{ width: '50%', bgcolor: 'background.paper' }}>
      {members.map((name, index) => (
        <ListItem
          key={index}
          sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',      
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            mb: 2,                   
          }}
        >
          {/* アイコンを削除し、名前のみ表示 */}
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
}
