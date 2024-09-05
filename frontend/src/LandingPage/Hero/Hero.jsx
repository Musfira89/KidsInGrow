import React from 'react';
import { motion } from 'framer-motion';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import Navbar from '../Navigation/Navbar';
import Choose from "../../assets/Profile.png";
import './HeroSection.css';

const HeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        height: '87vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={15} alignItems="center">
          {/* Text Content */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                  fontWeight: 'bold',
                  mb: 2,
                  lineHeight: '1.1',
                  fontFamily: 'Roboto, sans-serif',
                  color: 'text.primary',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Box component="span" sx={{ color: '#202040'}} >Welcome to </Box>
                <Box component="span" sx={{ background: 'linear-gradient(45deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  KIDSINGROW
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'text.secondary',
                  mt: 2,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Take the next step in understanding and nurturing your child's development with Kids InGrow. Our interactive assessments, designed for parents, provide valuable insights into your child's growth journey.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mt: 4,
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderColor: 'orange.600',
                    color: 'orange.600',
                    py: 1.5,
                    px: 4,
                    borderRadius: '8px',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  GET STARTED
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(to right, #f97316, #fbbf24)',
                    color: '#fff',
                    py: 1.5,
                    px: 4,
                    borderRadius: '8px',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  VIEW DEMO
                </Button>
              </Box>
            </motion.div>
          </Grid>

          {/* Image Content */}
          <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
            <motion.img
              src={Choose}
              alt="Right Image"
              style={{
                maxWidth: '200%',
                height: 'auto',
                objectFit: 'cover',
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
