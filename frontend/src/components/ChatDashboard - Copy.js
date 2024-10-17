// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import TimelineIcon from '@mui/icons-material/Timeline';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
// import { IconButton } from '@mui/material';
// import { fetchUserData } from '../services/userinfoService';

// const NAVIGATION = [
//   {
//     kind: 'header',
//     title: 'Main items',
//   },
//   {
//     segment: 'page',
//     title: 'Page',
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: 'page-2',
//     title: 'Page 2',
//     icon: <TimelineIcon />,
//   },
// ];

// const chatTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function ChatPageContent({ pathname }) {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Typography>Dashboard content for {pathname}</Typography>
//     </Box>
//   );
// }

// ChatPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// function ChatProviderBasic(props) {
//   const { window } = props;

//   const [session, setSession] = React.useState({
//     user: {
//       name: '',
//       email: '',
//     },
//   });

//   React.useEffect(() => {
//     async function getUserData() {
//       try {
//         const userData = await fetchUserData(); // Call the modularized function
//         setSession({ user: userData });
//       } catch (error) {
//         // Error is already logged in the service, so you can add any specific handling here
//       }
//     }

//     getUserData();
//   }, []);

//   const authentication = React.useMemo(() => {
//     return {
//       signIn: async () => {
//         try {
//           const userData = await fetchUserData(); // Fetch user data when signing in
//           setSession({ user: userData });
//         } catch (error) {
//           console.log('Failed to fetch user data during sign-in:', error);
//         }
//       },
//       signOut: () => {
//         setSession(null);
//       },
//     };
//   }, []);

//   const [pathname, setPathname] = React.useState('/page');

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <AppProvider
//       session={session}
//       authentication={authentication}
//       navigation={NAVIGATION}
//       router={router}
//       theme={chatTheme}
//       window={demoWindow}
//       branding={{ title: 'Star Chat' }}
//     >
//       {/* <IconButton
//         sx={{
//           position: 'absolute',
//           top: 11,
//           right: 105,
//           zIndex: 5000,
//         }}
//         color="inherit"
//       >
//         <SettingsSuggestOutlinedIcon />
//       </IconButton> */}

//       <DashboardLayout>
//         <ChatPageContent pathname={pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// ChatProviderBasic.propTypes = {
//   window: PropTypes.func,
// };

// export default ChatProviderBasic;