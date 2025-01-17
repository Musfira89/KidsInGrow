import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ childId, userId , parentId  }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch username from backend using userId
    axios
      .get(`/api/auth/userInfo/${userId}`)
      .then((response) => {
        setUsername(response.data.username || "User Name");
      })
      .catch((error) => {
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
            justifyContent: "center",
          }}
        >
          Kids InGrow
        </Typography>
      </Box>

      {/* Menu Items */}
      <List component="nav">
      <ListItem button component={Link} to={`/dashboard/${parentId}/${childId}`}>
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <DashboardIcon
              sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              color: "white",
              sx: { display: { xs: "none", sm: "block" } }, // Hide text on extra small screens
            }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={`/dashboard/${parentId}/${childId}/activity`}

        >
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
        <ListItem
          button
          component={Link}
          to={`/dashboard/${parentId}/${childId}/progress-tracking`}

        >
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
        <ListItem
          button
          component={Link}
          to={`/dashboard/${parentId}/${childId}/profilepage`}
          >
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <ReceiptIcon
              sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }}
            />
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
        <Divider sx={{ my: 2, backgroundColor: "white" }} />{" "}
        {/* Divider line */}
        <Typography
          variant="caption"
          color="white"
          sx={{
            marginLeft: 2,
            marginTop: 2,
            display: { xs: "none", sm: "block" },
          }}
        >
          More Items
        </Typography>

        <ListItem
          button
          component={Link}
          to={`/dashboard/${parentId}/${childId}/help`}
        >
          <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 } }}>
            <HelpOutlineIcon
              sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }}
            />
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
      <div className="mt-auto flex justify-center">
        <button
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-[10px] px-4 rounded-lg text-sm sm:text-base w-1/2 sm:w-3/4"
          onClick={handleLogout}
        >
          <span className="mr-2">
            <ExitToAppIcon className="text-white" style={{ fontSize: 20 }} />
          </span>
          Log Out
        </button>
      </div>
    </Box>
  );
};

export default Sidebar;
