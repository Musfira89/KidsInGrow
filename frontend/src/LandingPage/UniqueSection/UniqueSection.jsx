import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import Project from "../../assets/kidsbg.jpg";

const SectionContainer = styled(Box)({
  backgroundColor: "#202040",
  padding: "30px 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  position: "relative",
  overflow: "hidden",
});

const ContentContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  maxWidth: "1200px",
  gap: "100px",
});

const ImageBox = styled(Box)({
  border: "2px solid #00b0ff",
  borderRadius: "15px",
  padding: "2px",
});

const UniqueSection = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <SectionContainer>
      <ContentContainer>
        <Box sx={{ maxWidth: "50%" }}>
          <Typography variant="h3" gutterBottom>
            What makes us unique?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#d3d3d3", marginBottom: "20px" }}
          >
            {showMore
              ? `In Pakistan, there is currently no dedicated application that allows parents to track their child’s development through structured assessments. To address this gap, we are developing a web application designed to help parents monitor their child's progress by completing monthly questionnaires based on the Ages and Stages Questionnaires, Third Edition (ASQ-3) manual.`
              : `In Pakistan, there is currently no dedicated application that allows parents to track their child’s development through structured assessments...`}
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2, padding: "10px 50px", color: "#fff" , borderColor: "#00b0ff",
            backgroundColor: "transparent",}}
            onClick={handleShowMore}
          >
            {showMore ? "Show less" : "Show more"}
          </Button>
        </Box>
        <ImageBox sx={{ maxWidth: "37%" }}>
          <img
            src={Project}
            alt="Project"
            style={{ borderRadius: "15px", maxWidth: "100%"  }}
          />
        </ImageBox>
      </ContentContainer>
    </SectionContainer>
  );
};

export default UniqueSection;
