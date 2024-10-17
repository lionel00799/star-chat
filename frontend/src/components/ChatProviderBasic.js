import React from 'react';
import PropTypes from 'prop-types';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import ChatPageContent from './ChatPageContent';
import NAVIGATION from './Navigation';
import { fetchUserData } from '../services/userinfoService';
import { Button } from '@mui/material';
import { AddFriendButton } from './Button';
import FormDialog from './AddFriendDialog';
import BadgeAvatars from './FriendAvatar';

const chatTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function ChatProviderBasic(props) {
  const { window } = props;
  const [session, setSession] = React.useState({
    user: {
      name: '',
      email: '',
    },
  });

  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [navigation, setNavigation] = React.useState(NAVIGATION);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = (username) => {
    setDialogOpen(false);
  
    if (username) {
      // Update the navigation with the username
      const newSegment = `page-${navigation.length}`; // Create a new segment based on existing pages
      const newTitle = username; // Set title to username

      setNavigation((prevNav) => [
        ...prevNav,
        { segment: newSegment, title: newTitle, icon: <BadgeAvatars isOnline={false} username={username} /> },
      ]);
    }
  };

  React.useEffect(() => {
    async function getUserData() {
      try {
        const userData = await fetchUserData();
        setSession({ user: userData });
      } catch (error) {
        // Handle error
      }
    }

    getUserData();
  }, []);

  const authentication = React.useMemo(() => {
    return {
      signIn: async () => {
        try {
          const userData = await fetchUserData();
          setSession({ user: userData });
        } catch (error) {
          console.log('Failed to fetch user data during sign-in:', error);
        }
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const [pathname, setPathname] = React.useState('/page');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={navigation} // Use the updated navigation state
      router={router}
      theme={chatTheme}
      window={demoWindow}
      branding={{ title: 'Star Chat' }}
    >
      <Button
        sx={{
          position: 'absolute',
          top: 3,
          right: 105,
          zIndex: 5000,
        }}
        color="inherit"
      >
        <AddFriendButton onClick={handleClickOpen} />
      </Button>
      <DashboardLayout>
        <ChatPageContent pathname={pathname} />
      </DashboardLayout>
      <FormDialog open={isDialogOpen} onClose={handleClose} />
    </AppProvider>
  );
}

ChatProviderBasic.propTypes = {
  window: PropTypes.func,
};

export default ChatProviderBasic;