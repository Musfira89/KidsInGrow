import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Badge,
  Tooltip,
  useMediaQuery,
  useTheme,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { HiBell, HiUser, HiCog, HiLogout, HiOutlineBell } from "react-icons/hi";

const Topbar = () => {
  const { childId } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/notifications/${childId}`
      );

      if (response.data.error) {
        setNotifications([
          { message: response.data.error, date: new Date().toLocaleString() },
        ]);
      } else {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Optional: Poll for new notifications every 10 seconds
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" color="transparent" elevation={3}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "text.primary",
            maxWidth: "200px",
            marginLeft: "40px",
            fontWeight: "Bold",
            fontSize: "25px",
          }}
        >
          {" "}
          Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Tooltip title="Notifications">
            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => setAnchorElNotifications(e.currentTarget)}
            >
              <Badge badgeContent={notifications.length} color="error">
                <HiBell size={24} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElNotifications}
            open={Boolean(anchorElNotifications)}
            onClose={() => setAnchorElNotifications(null)}
            PaperProps={{
              sx: {
                width: "350px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                bgcolor: "orange",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              Notifications
            </Typography>
            <Divider />
            {!isLoading && notifications.length === 0 ? (
              <MenuItem disabled sx={{ py: 3, justifyContent: "center" }}>
                <Typography variant="body1" color="textSecondary">
                  No report status updates
                </Typography>
              </MenuItem>
            ) : isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 3,
                }}
              >
                <CircularProgress size={24} />
              </Box>
            ) : (
              notifications.map((notification) => (
                <MenuItem key={notification.id} sx={{ py: 1.5 }}>
                  <HiOutlineBell size={20} />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {notification.date}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>
          <Tooltip title="Profile">
            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => setAnchorElProfile(e.currentTarget)}
            >
              <HiUser size={24} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={() => setAnchorElProfile(null)}
            PaperProps={{
              sx: {
                width: "220px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                bgcolor: "orange",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              Profile
            </Typography>
            <Divider />
            <MenuItem>
              <HiCog size={20} style={{ marginRight: 8 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <HiLogout size={20} style={{ marginRight: 8 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
