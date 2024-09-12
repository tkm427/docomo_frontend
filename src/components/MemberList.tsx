import React from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

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
                border: '1px solid #ddd',  // 境界線を追加
                borderRadius: '8px',       // 角を丸める
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 影をつける
                mb: 2,                     // 下に少しマージン
            }}
            >
            <ListItemAvatar>
                <PersonIcon />
            </ListItemAvatar>
            <ListItemText primary={name} />
            </ListItem>
        ))}
        </List>
  );
}
