import { Typography, Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import DemoVideo from '../../assets/DemoVideo.mp4';
import DemoImg from '../../assets/Thumbnail.png';
import '../Services Cards/style.css';
import { FaPlay } from 'react-icons/fa'; // Play icon import

const Demo = () => {
  const videoRef = useRef(null); // Reference for the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to handle play icon and hover

  // Function to play the video when clicking on the play icon
  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Start the video
      setIsPlaying(true); // Set state to hide the play icon and black hover
    }
  };

  return (
    <Box sx={{ backgroundColor: '#202040', padding: '2rem' }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 'bold',
            opacity: 1,
            y: 0,
            transition: 'opacity 1s ease-out, y 1s ease-out',
            color: '#fff',
          }}
        >
          OUR PROJECT <span style={{ color: '#00b0ff' }}>DEMO</span>
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #00b0ff',
          padding: '20px',
          maxWidth: '80%',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '15px',
          overflow: 'hidden',
          minHeight: '600px', // Increased height for video section
          animation: 'borderAnimation 5s infinite linear',
        }}
      >
        {/* Play icon and black hover only show when video is not playing */}
        {!isPlaying && (
          <Box
            onClick={handlePlayVideo} // Click handler to play the video
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              cursor: 'pointer', // Make the icon clickable
            }}
          >
            <Box
              sx={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Light black circle
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaPlay
                style={{
                  color: 'white',
                  fontSize: '2.5rem',
                }}
              />
            </Box>
          </Box>
        )}

        <video
          ref={videoRef} // Referencing the video element
          width="100%"
          height="100%"
          controls
          poster={DemoImg} // Thumbnail image
          style={{
            objectFit: 'cover',
            zIndex: 1,
          }}
        >
          <source src={DemoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Box>
  );
};

export default Demo;
