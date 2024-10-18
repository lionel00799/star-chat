import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

// Create a styled badge that changes color based on the status
const StyledBadge = styled(Badge)(({ theme, status }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: status === 'online' ? '#44b700' : '#f44336', // Green for online, red for offline
    color: status === 'online' ? '#44b700' : '#f44336',
    boxShadow: `0 0 0 2px black`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));

export default function BadgeAvatars({ isOnline, username }) {
  // Determine status based on isOnline prop
  const status = isOnline ? 'online' : 'offline';

  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        status={status}  // Pass the status to StyledBadge
      >
        <Avatar 
        alt={username}
        src="/static/images/avatar/1.jpg"
        sx={{ fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} />  {/* Dynamically set alt */}
      </StyledBadge>
    </Stack>
  );
}