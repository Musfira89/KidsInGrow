import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Grid,
  Paper,
  Divider,
  Button,
} from '@mui/material';

const ProfilePage = () => {
  const { childId } = useParams();
  const [childData, setChildData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const childResponse = await fetch(`http://localhost:8080/api/${childId}`);
        if (!childResponse.ok) throw new Error(`Failed to fetch child data: ${childResponse.statusText}`);
        const childData = await childResponse.json();
        setChildData(childData);
      } catch (error) {
        console.error('Error fetching child data:', error);
        setError('Failed to load child data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchProfilePic = async () => {
      try {
        const picResponse = await fetch(`http://localhost:8080/api/profile-pic/${childId}`);
        if (!picResponse.ok) throw new Error(`Failed to fetch profile picture: ${picResponse.statusText}`);
        const picData = await picResponse.json();
        setProfilePic(picData.profilePicUrl);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
        // No need to set an error here since this is optional
      }
    };

    fetchChildData();
    fetchProfilePic();
  }, [childId]);

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts[0]?.charAt(0).toUpperCase() + (nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : '');
    return initials;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('profilePic', selectedFile);

    try {
      const uploadResponse = await fetch(`http://localhost:8080/api/upload-profile-pic/${childId}`, {
        method: 'POST',
        body: formData,
      });
      if (!uploadResponse.ok) throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
      const uploadData = await uploadResponse.json();
      if (uploadData.profilePicUrl) {
        setProfilePic(uploadData.profilePicUrl);
        setSuccessMessage('Profile picture uploaded successfully.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleProfilePicUpdate = async () => {
    if (!selectedFile) return; // Ensure a file is selected
  
    setUploading(true); // Set uploading state to true
    const formData = new FormData();
    formData.append('profilePic', selectedFile); // Append the file to form data
  
    try {
      // Perform the update request
      const updateResponse = await fetch(`http://localhost:8080/api/update-profile-pic/${childId}`, {
        method: 'POST',
        body: formData,
      });
  
      // Check if response is OK
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text(); // Capture server-side error message
        throw new Error(`Failed to update file: ${updateResponse.statusText}. ${errorText}`);
      }
  
      // Parse response JSON
      const updateData = await updateResponse.json();
      if (updateData.profilePicUrl) {
        // Update profile picture URL in state
        setProfilePic(updateData.profilePicUrl);
        setSuccessMessage('Profile picture updated successfully.');
      } else {
        throw new Error('Profile picture URL not returned.');
      }
    } catch (error) {
      // Handle errors
      console.error('Error updating file:', error);
      setError('Failed to update file. Please try again.');
    } finally {
      // Set uploading state to false regardless of success or failure
      setUploading(false);
    }
  };
  

  const handleProfilePicDelete = async () => {
    try {
      const deleteResponse = await fetch(`http://localhost:8080/api/delete-profile-pic/${childId}`, {
        method: 'DELETE',
      });
  
      if (!deleteResponse.ok) {
        const errorText = await deleteResponse.text();
        throw new Error(`Failed to delete file: ${deleteResponse.statusText}. ${errorText}`);
      }
  
      // Optionally, confirm the response content
      const responseData = await deleteResponse.json();
      console.log('Server response:', responseData);
  
      // Clear the profile picture and show success message
      setProfilePic(null);
      setSuccessMessage('Profile picture deleted successfully.');
    } catch (error) {
      console.error('Error deleting file:', error);
      setError('Failed to delete file. Please try again.');
    }
  };
  
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!childData) {
    return <Typography>No child data found.</Typography>;
  }

  const imageUrl = profilePic
    ? `${profilePic}?${new Date().getTime()}`
    : 'https://www.thegeniusofplay.org/App_Themes/tgop/images/expertadvice/articles/childs-play810x456.jpg';

  return (
    <Box sx={{ p: 3, maxWidth: 1100, margin: '0 auto', backgroundColor: "#fff" ,  }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Child Profile
      </Typography>
      <Grid container spacing={2}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "lightgrey",
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{ position: 'relative', height: '200px', width: '200px', mx: 'auto', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'lightgrey' }}>
              {profilePic ? (
                <img
                  src={imageUrl}
                  alt={`${childData.babyName}'s Profile`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'blue',
                    color: 'white',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                  }}
                >
                  {getInitials(childData.babyName)}
                </Box>
              )}
              
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {childData.babyName} {childData.middleName || ''}
            </Typography>
            <Typography color="textSecondary">
              {childData.city} , {childData.state}
            </Typography>
            <Divider sx={{ my: 2, borderColor: "lightgrey" }} />
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'block', margin: 'auto', marginBottom: '16px' }}
            />
            <Button
              onClick={handleFileUpload}
              variant="outlined"
              sx={{ mt: 2 }}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Picture'}
            </Button>
            <Button
              onClick={handleProfilePicUpdate}
              variant="contained"
              sx={{ mt: 2, ml: 2 }}
              disabled={uploading}
            >
              {uploading ? 'Updating...' : 'Update Picture'}
            </Button>
            <Button
              onClick={handleProfilePicDelete}
              variant="outlined"
              color="error"
              sx={{ mt: 2, ml: 2 }}
            >
              Delete Picture
            </Button>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {successMessage && <Typography color="success" sx={{ mt: 2 }}>{successMessage}</Typography>}
          </Paper>
        </Grid>
        {/* Child Profile Data Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "lightgrey",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Profile
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              The information cannot be edited
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={childData.babyName}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Middle Name"
                  value={childData.middleName}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={childData.babyLastName}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  value={childData.dob}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender"
                  value={childData.gender}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Parent Name"
                  value={childData.parentName}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Relationship"
                  value={childData.relationship}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Other Relationship"
                  value={childData.otherRelationship}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  value={childData.city}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  value={childData.state}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ZIP Code"
                  value={childData.zip}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  value={childData.country}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Home Telephone"
                  value={childData.homeTelephone}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Other Telephone"
                  value={childData.otherTelephone}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  value={childData.email}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Assisting People"
                  value={childData.assistingPeople}
                  fullWidth
                  disabled
                  InputLabelProps={{ style: { color: "#ff4500" } }} // Light blue label color
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid> 
      </Grid>
    </Box>
  );
};

export default ProfilePage;
