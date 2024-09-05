import { Typography, Box } from '@mui/material';
import React from 'react';
import DemoVideo from '../../assets/activity1.mp4';
import '../Services Cards/style.css'
const Demo = () => {
  return (
    <Box sx={{ backgroundColor: '#202040', padding: '2rem' }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component="div"
          sx={{ fontWeight: 'bold', opacity: 1, y: 0, transition: 'opacity 1s ease-out, y 1s ease-out', color: '#fff' }}
        >
          OUR PROJECT{" "}
          <span style={{ color: '#00b0ff' }}>DEMO</span>
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #00b0ff',
          padding: '20px',
          maxWidth: '60%',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '15px',
          overflow: 'hidden',
          animation: 'borderAnimation 5s infinite linear', // Animation effect
        }}
      >
        <video
          width="100%"
          height="auto"
          controls
          poster="https://i.pinimg.com/originals/8b/e9/4d/8be94d1867adf1869690cb2cb9dd74ed.png" // Thumbnail image
        >
          <source src={DemoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Box>
  );
};

export default Demo;
