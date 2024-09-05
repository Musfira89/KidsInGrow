import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import the icon

const ProfileCard = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const childResponse = await fetch(`http://localhost:8080/api/${childId}`);
        if (!childResponse.ok) throw new Error(`Failed to fetch child data: ${childResponse.statusText}`);
        const childData = await childResponse.json();
        setChildData(childData);

        const picResponse = await fetch(`http://localhost:8080/api/profile-pic/${childId}`);
        if (!picResponse.ok) throw new Error(`Failed to fetch profile picture: ${picResponse.statusText}`);
        const picData = await picResponse.json();
        setProfilePic(picData.profilePicUrl);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [childId]);

  const handleViewMore = () => {
    navigate(`/dashboard/profilepage/profilepage/${childId}`);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Formats the date to "MM/DD/YYYY" by default
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!childData) {
    return <div>No child data found.</div>;
  }

  const imageUrl = profilePic
    ? `${profilePic}?${new Date().getTime()}`
    : 'https://www.thegeniusofplay.org/App_Themes/tgop/images/expertadvice/articles/childs-play810x456.jpg';

  return (
    <Box
      sx={{
        width: 280,  // Slightly reduce the width
        backgroundColor: "#fff",
        borderRadius: 6,
        border: '7px solid',
        borderColor: '#131842', // Subtle border color
        padding: 3, // Adjusted padding for better spacing
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        ml: 2
      }}
    >
      {/* Profile Avatar */}
      {profilePic ? (
        <img
          src={imageUrl}
          alt={`${childData.babyName}'s Profile`}
          style={{
            width: '150px', // Slightly smaller size
            height: '150px',
            objectFit: 'cover',
            borderRadius: '50%',
            marginBottom: '12px' // Adjusted margin for spacing
          }}
        />
      ) : (
        <Box
          sx={{
            width: 100,  // Smaller size for initials box
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5F5F5',
            color: '#333',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            borderRadius: '50%',
            marginBottom: 2,
          }}
        >
          {childData.babyName.charAt(0)}
        </Box>
      )}

      <Typography variant="h6" color="textprimary" sx={{ fontWeight: "bold" }}>
        {childData.babyName} {childData.babyLastName}
      </Typography>

      {/* Middle Name (conditionally displayed) */}
      {childData.middleName && (
        <Typography variant="body2" color="black" sx={{ marginBottom: 2 }}>
          {childData.middleName}
        </Typography>
      )}

      {/* Divider */}
      <Divider sx={{ width: "100%", my: 2 }} />

      {/* Profile Information */}
      <List sx={{ width: "100%" }}>
        <ListItem>
          <ListItemIcon>
            <Box
              sx={{
                backgroundColor: "#FF9100",
                borderRadius: "4px",
                padding: "7px",
              }}
            >
              <CalendarTodayIcon fontSize="small" sx={{ color: "black" }} />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={`Date of Birth: ${formatDate(childData.dob)}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Box
              sx={{
                backgroundColor: "#FF9100",
                borderRadius: "5px",
                padding: "7px",
              }}
            >
              <SchoolIcon fontSize="small" sx={{ color: "black" }} />
            </Box>
          </ListItemIcon>
          <ListItemText primary={`Gender: ${childData.gender}`} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Box
              sx={{
                backgroundColor: "#FF9100",
                borderRadius: "5px",
                padding: "6px",
              }}
            >
              <PersonIcon fontSize="small" sx={{ color: "black" }} />
            </Box>
          </ListItemIcon>
          <ListItemText primary={`User Name: ${childData.parentName}`} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Box
              sx={{
                backgroundColor: "#FF9100",
                borderRadius: "5px",
                padding: "6px",
              }}
            >
              <PeopleIcon fontSize="small" sx={{ color: "black" }} />
            </Box>
          </ListItemIcon>
          <ListItemText primary={`Relationship: ${childData.relationship}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Box
              sx={{
                backgroundColor: "#FF9100",
                borderRadius: "5px",
                padding: "6px",
              }}
            >
              <PeopleIcon fontSize="small" sx={{ color: "black" }} />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={`Assisting People: ${childData.assistingPeople}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Box
              sx={{
                backgroundColor: "#FF9100",
                borderRadius: "5px",
                padding: "6px",
              }}
            >
              <LocationCityIcon fontSize="small" sx={{ color: "black" }} />
            </Box>
          </ListItemIcon>
          <ListItemText primary={`City: ${childData.city}`} />
        </ListItem>
      </List>

      {/* Divider */}
      <Divider color="white" sx={{ width: "100%", marginY: 2 }} />


      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 4,
          mt: 2,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle button shadow
        }}
        onClick={handleViewMore}
      >
        View More
      </Button>
    </Box>
  );
};

export default ProfileCard;
