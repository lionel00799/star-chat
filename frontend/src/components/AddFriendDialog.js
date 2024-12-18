import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { searchFriendname } from '../services/userinfoService';
import { useNotifications } from "@toolpad/core/useNotifications";

export default function FormDialog({ open, onClose }) {
  const [friendname, setFriendname] = React.useState('');

  const notifications = useNotifications();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const userId = localStorage.getItem('userId');
      const success = await searchFriendname(friendname, userId);
      if (success) {
        onClose(friendname);
        setFriendname(''); // Reset the username field    
      }
    } catch (error) {
      console.error('Error searching for username:', error);
      onClose(null);
      notifications.show("User not found!", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(null)} // Pass null when dialog is closed
      fullWidth
      maxWidth="sm"
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit, // Optional: handle form submission on enter
      }}
      sx={{
        '& .MuiDialog-paper': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          height: 'fit-content',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <DialogTitle sx={{ color: 'black', fontWeight: 'bold' }}>Add Friend</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#32383e' }}>
          Enter your friend's username
        </DialogContentText>
        <TextField
          required
          margin="dense"
          id="name"
          name="username" // Change to "username" to reflect what it represents
          type="text"
          fullWidth
          variant="standard"
          value={friendname}
          onChange={(event) => setFriendname(event.target.value)} // Correct the handler
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        <Button type="submit" color="primary">Add</Button> {/* Change to type="submit" for better form handling */}
      </DialogActions>
    </Dialog>
  );
}