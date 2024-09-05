// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
//   Divider,
//   Badge,
//   Tooltip,
//   useMediaQuery,
//   useTheme,
//   Box,
// } from '@mui/material';
// import { HiBell, HiUser, HiCog, HiLogout, HiOutlineBell } from 'react-icons/hi';

// const notifications = [
//   { id: 1, message: "Your report is ready to view", date: "2m ago" },
//   { id: 2, message: "Next Assessment", date: "5m ago" },
//   { id: 3, message: "Update available", date: "1h ago" },
//   { id: 4, message: "Server downtime scheduled", date: "3h ago" },
// ];

// const Topbar = () => {
//   const navigate = useNavigate();
//   const [anchorElNotifications, setAnchorElNotifications] = useState(null);
//   const [anchorElProfile, setAnchorElProfile] = useState(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleLogout = () => {
//     navigate('/');
//   };

//   return (
//     <AppBar position="static" color="transparent" elevation={3}>
//       <Toolbar
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           flexDirection: isMobile ? 'column' : 'row',
//         }}
//       >
//         <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary', maxWidth: '200px' , marginLeft:'40px' , fontWeight:'Bold' , fontSize:'25px' }}>
//           Dashboard
//         </Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             flexDirection: isMobile ? 'column' : 'row',
//           }}
//         >
//           <Tooltip title="Notifications">
//             <IconButton
//               size="large"
//               color="inherit"
//               onClick={(e) => setAnchorElNotifications(e.currentTarget)}
//             >
//               <Badge badgeContent={notifications.length} color="error">
//                 <HiBell size={24} />
//               </Badge>
//             </IconButton>
//           </Tooltip>

//           <Menu
//             anchorEl={anchorElNotifications}
//             open={Boolean(anchorElNotifications)}
//             onClose={() => setAnchorElNotifications(null)}
//             PaperProps={{ sx: { width: '300px' } }}
//           >
//             <Typography variant="h6" sx={{ p: 1, bgcolor: 'orange', color: 'white' }}>
//               Notifications
//             </Typography>
//             <Divider />
//             {notifications.map((notification) => (
//               <MenuItem key={notification.id} sx={{ py: 1 }}>
//                 <HiOutlineBell size={20} />
//                 <div style={{ marginLeft: 8 }}>
//                   <Typography variant="body2">{notification.message}</Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     {notification.date}
//                   </Typography>
//                 </div>
//               </MenuItem>
//             ))}
//           </Menu>

//           <Tooltip title="Profile">
//             <IconButton
//               size="large"
//               color="inherit"
//               onClick={(e) => setAnchorElProfile(e.currentTarget)}
//             >
//               <HiUser size={24} />
//             </IconButton>
//           </Tooltip>

//           <Menu
//             anchorEl={anchorElProfile}
//             open={Boolean(anchorElProfile)}
//             onClose={() => setAnchorElProfile(null)}
//             PaperProps={{ sx: { width: '200px' } }}
//           >
//             <Typography variant="h6" sx={{ p: 1, bgcolor: 'orange', color: 'white' }}>
//               Profile
//             </Typography>
//             <Divider />
//             <MenuItem>
//               <HiCog size={20} style={{ marginRight: 8 }} />
//               Settings
//             </MenuItem>
//             <MenuItem onClick={handleLogout}>
//               <HiLogout size={20} style={{ marginRight: 8 }} />
//               Sign Out
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Topbar;
