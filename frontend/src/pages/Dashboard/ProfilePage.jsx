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

  const fetchChildData = async () => {
    try {
      const childResponse = await fetch(`http://localhost:8082/api/${childId}`);
      if (!childResponse.ok) throw new Error(`Failed to fetch child data: ${childResponse.statusText}`);
      const childData = await childResponse.json();
      setChildData(childData);
    } catch (error) {
      console.error('Error fetching child data:', error);
      setError('Failed to load child data.');
    }
  };

  const fetchProfilePic = async () => {
    try {
      const picResponse = await fetch(`http://localhost:8082/api/profile-pic/${childId}`);
      if (!picResponse.ok) throw new Error(`Failed to fetch profile picture: ${picResponse.statusText}`);
      const picData = await picResponse.json();
      setProfilePic(picData.profilePicUrl || 'https://via.placeholder.com/200'); // Set a placeholder if no picture
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      // Optional: Set a default image if fetching fails
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchChildData(), fetchProfilePic()]); // Fetch both in parallel
      setLoading(false);
    };
    loadData();
  }, [childId]);

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    return nameParts[0].charAt(0).toUpperCase() + (nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : '');
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
      const uploadResponse = await fetch(`http://localhost:8082/api/upload-profile-pic/${childId}`, {
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

  const handleProfilePicDelete = async () => {
    try {
      const deleteResponse = await fetch(`http://localhost:8082/api/delete-profile-pic/${childId}`, {
        method: 'DELETE',
      });
      if (!deleteResponse.ok) throw new Error( `Failed to delete file: ${deleteResponse.statusText}`);
      setProfilePic(null); // Set to null or default image if deleted successfully
      setSuccessMessage('Profile picture deleted successfully.');
    } catch (error) {
      console.error('Error deleting file:', error);
      setError('Failed to delete file. Please try again.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!childData) return <Typography>No child data found.</Typography>;

  const imageUrl = profilePic || 'https://via.placeholder.com/200'; // Use a placeholder if no profile picture

  return (
    <Box sx={{ p: 3, maxWidth: 1100, margin: '0 auto', backgroundColor: "#fff" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>Child Profile</Typography>
      <Grid container spacing={2}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 3, border: "1px solid", borderColor: "lightgrey", backgroundColor: "#fff" }}>
            <Box sx={{ position: 'relative', height: '200px', width: '200px', mx: 'auto', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'lightgrey' }}>
              <img
                src={imageUrl}
                alt={`${childData.babyName}'s Profile`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>{childData.babyName} {childData.middleName || ''}</Typography>
            <Typography color="textSecondary">{childData.city}, {childData.state}</Typography>
            <Divider sx={{ my: 2, borderColor: "lightgrey" }} />
            <input type="file" onChange={handleFileChange} style={{ display: 'block', margin: 'auto', marginBottom: '16px' }} />
            <Button
              onClick={handleFileUpload}
              variant="outlined"
              sx={{ mt: 2 }}
              disabled={uploading || !selectedFile} // Disable if no file selected
            >
              {uploading ? 'Uploading...' : 'Upload Picture'}
            </Button>
            <Button
              onClick={handleProfilePicDelete}
              variant="outlined"
              sx={{ mt: 2, ml: 1 }}
              color="error"
            >
              Delete Picture
            </Button>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {successMessage && <Typography color="success" sx={{ mt: 2 }}>{successMessage}</Typography>}
          </Paper>
        </Grid>

        {/* Child Profile Data Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid", borderColor: "lightgrey", backgroundColor: "#fff" }}>
            <Typography variant="h6" gutterBottom>Profile</Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>The information cannot be edited</Typography>
            <Grid container spacing={2}>
              {Object.entries(childData).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the first letter
                    value={value}
                    fullWidth
                    disabled
                    InputLabelProps={{ style: { color: "#ff4500" } }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;