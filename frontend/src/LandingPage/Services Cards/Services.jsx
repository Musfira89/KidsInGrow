import React from "react";
import serviceData from "./constant";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
  useTheme,
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const services = serviceData;
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        py: 8,
        mb: 12,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            component={motion.div}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            sx={{ fontWeight: "bold", color: "#1f2937 " }} // Change heading color
          >
            OUR <span style={{ color: "#1e3a8a"  }}>SERVICES</span>
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            sx={{ mt: 2 }}
          >
            Do you need some help with something or do you have questions on
            some features?
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <ServiceCard service={service} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const ServiceCard = ({ service, index }) => {
  const { icon: Icon, title, description } = service; // Destructure icon as Icon component

  // Define animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Trigger animation when the card comes into view
  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, delay: index * 0.2, duration: 2 }, // Add delay for bubble-like effect
      });
    }
  }, [controls, inView, index]);

  let borderColor = "";
  if (index === 0 || index === 2 || index === 5) {
    borderColor = "#1e3a8a"; // Blue color
  } else {
    borderColor = "#ffa726"; // Orange color
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -100 }} // Cards start above their position
      animate={controls}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderLeft: `4px solid ${borderColor}`,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", // Box shadow for 3D effect
          borderRadius: "16px", // Rounded corners for a modern look
          backgroundColor: "#fff",
          transform: "translateZ(0)", // Ensure 3D effect looks smooth
        }}
      >
        <CardMedia
          component={motion.div}
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 300 }}
          sx={{
            mt: 2,
            mb: 2,
            mx: "auto",
            width: 60,
            height: 60,
            color: borderColor,
          }}
        >
          <Icon sx={{ width: 55, height: 55 }} /> {/* Render icon component */}
        </CardMedia>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            sx={{ color: "#1e3a8a", fontWeight: "bold" }} // Change card title color
          >
            {title}
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Services;
