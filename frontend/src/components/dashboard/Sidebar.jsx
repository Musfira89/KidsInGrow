import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Button, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ childId, userId }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch username from backend using userId
    axios.get(`/api/auth/userInfo/${userId}`)
      .then(response => {
        setUsername(response.data.username || "User Name"); 
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
      });
  }, [userId]);

  const handleLogout = () => {
    toast.success("Logout successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000); // Adjust time to match your toast duration or logic
  };

  return (
    <Box
      sx={{
        width: { xs: 80, sm: 200, md: 300 }, // Responsive width
        height: "100vh",
        backgroundColor: "#202040", // Sidebar background color
        display: "flex",
        flexDirection: "column",
        padding: 2,
        position: "fixed", // Keep sidebar fixed on the left
        transition: "width 0.3s", // Smooth width transition
        zIndex: 1200, // Ensure it appears above content
      }}
    >
      {/* Logo and Text */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center items horizontally
          marginBottom: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <img
          src={Logo} // Replace with your logo image path
          alt="Kids InGrow Logo"
          style={{
            width: 40, // Adjust logo width
            height: 40, // Adjust logo height
            marginRight: 8, // Space between logo and text
          }}
        />
        <Typography
          variant="h6"
          color="white"
          sx={{
            display: { xs: "none", sm: "block" }, // Hide on extra small screens
            fontSize: { sm: 18, md: 24 },
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          Kids InGrow
        </Typography>
      </Box>

      {/* Menu Items */}
      <List component="nav">
        <ListItem button component={Link} to={`/dashboard/${childId}`}>
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <DashboardIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              color: "white",
              sx: { display: { xs: "none", sm: "block" } }, // Hide text on extra small screens
            }}
          />
        </ListItem>
        <ListItem button component={Link} to={`/dashboard/activity/activity/${childId}`}>
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <SchoolIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
          </ListItemIcon>
          <ListItemText
            primary="Activities"
            primaryTypographyProps={{
              color: "white",
              sx: { display: { xs: "none", sm: "block" } }, // Hide text on extra small screens
            }}
          />
        </ListItem>
        <ListItem button component={Link} to={`/dashboard/progress-tracking/progress-tracking/${childId}`}>
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <BookIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
          </ListItemIcon>
          <ListItemText
            primary="Progress tracking"
            primaryTypographyProps={{
              color: "white",
              sx: { display: { xs: "none", sm: "block" } }, // Hide text on extra small screens
            }}
          />
        </ListItem>
        <ListItem button component={Link} to={`/dashboard/profilepage/profilepage/${childId}`}>
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <ReceiptIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
          </ListItemIcon>
          <ListItemText
            primary="Child-Profile"
            primaryTypographyProps={{
              color: "white",
              sx: { display: { xs: "none", sm: "block" } }, // Hide text on extra small screens
            }}
          />
        </ListItem>

        {/* Preferences Section */}
        <Divider sx={{ my: 2, backgroundColor: "white" }} /> {/* Divider line */}
        <Typography
          variant="caption"
          color="white"
          sx={{ marginLeft: 2, marginTop: 2, display: { xs: "none", sm: "block" } }}
        >
          More Items
        </Typography>
        <ListItem button component={Link} to={`/dashboard/settings/settings/${childId}`}>
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <SettingsIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{
              color: "white",
              sx: { display: { xs: "none", sm: "block" } }, // Hide text on extra small screens
            }}
          />
        </ListItem>
        <ListItem button component={Link} to={`/dashboard/help/help/${childId}`}>
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <HelpOutlineIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
          </ListItemIcon>
          <ListItemText
            primary="Help"
            primaryTypographyProps={{
              color: "white",
              sx: { display: { xs: "none", sm: "block" } }, // Hide text on extra small screens
            }}
          />
        </ListItem>
      </List>

      {/* Logout Button */}
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToAppIcon sx={{ fontSize: 20 }} />}
          sx={{
            backgroundColor: "#FF9100",
            padding: { xs: 0.8, sm: 1.4 },
            borderRadius: 4,
            color: "white",
            width: { xs: "50%", sm: "70%" },
            textTransform: "none",
            fontSize: { xs: 12, sm: 16 },
          }}
          onClick={handleLogout} // Add click handler
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
