import React from "react";
import { motion } from "framer-motion";
import { Box, Button, Container, Typography, Grid } from "@mui/material";
import Choose from "../../assets/Profile.png";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Demo from "../../assets/activity1.mp4";

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo] = useState(Demo);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box
      component="section"
      sx={{
        height: "87vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={15} alignItems="center">
          {/* Text Content */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                  fontWeight: "bold",
                  mb: 2,
                  lineHeight: "1.1",
                  fontFamily: "Roboto, sans-serif",
                  color: "text.primary",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Box component="span" sx={{ color: "#172554  " }}>
                  Welcome to{" "}
                </Box>
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(45deg, #f97316, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  KIDSINGROW
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: "text.secondary",
                  mt: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Take the next step in understanding and nurturing your child's
                development with Kids InGrow. Our interactive assessments,
                designed for parents, provide valuable insights into your
                child's growth journey.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  mt: 4,
                  gap: 2,
                }}
              >
                <Link to="/signup">
                  <button className="border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out hover:bg-[#1E3A8A] hover:text-white">
                    GET STARTED
                  </button>
                </Link>

                <button
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out ml-1"
                  onClick={openModal}
                >
                  VIEW DEMO
                </button>

                {/* Video Modal */}
                {isOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-lg shadow-xl w-[80%] sm:w-[50%] p-6">
                      <button
                        className="absolute top-2 right-2 text-gray-600 text-3xl font-bold"
                        onClick={closeModal}
                      >
                        &times;
                      </button>
                      <video
                        src={currentVideo}
                        controls
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </Box>
            </motion.div>
          </Grid>

          {/* Image Content */}
          <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
            <motion.img
              src={Choose}
              alt="Right Image"
              style={{
                maxWidth: "200%",
                height: "auto",
                objectFit: "cover",
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
