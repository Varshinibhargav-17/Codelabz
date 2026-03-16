import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HtmlTextRenderer from "../../Tutorials/subComps/HtmlTextRenderer";
import DescriptionIcon from "@mui/icons-material/Description";

const useStyles = makeStyles(() => ({
  container: {
    padding: "5px 24px",
    margin: "24px 0"
  },
  mediaContainer: {
    marginTop: "16px",
    marginBottom: "8px"
  },
  video: {
    width: "100%",
    maxHeight: "400px",
    borderRadius: "8px"
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "8px"
  }
}));

const MediaRenderer = ({ file, classes }) => {
  if (file.type === "image") {
    return (
      <Box className={classes.mediaContainer}>
        <img src={file.url} alt={file.name} className={classes.image} />
        <Typography variant="caption" color="text.secondary">
          {file.name}
        </Typography>
      </Box>
    );
  }

  if (file.type === "video") {
    return (
      <Box className={classes.mediaContainer}>
        <video controls className={classes.video}>
          <source src={file.url} />
          Your browser does not support the video tag.
        </video>
        <Typography variant="caption" color="text.secondary">
          {file.name}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.mediaContainer}>
      <Box
        component="a"
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#03AAFA",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" }
        }}
      >
        <DescriptionIcon fontSize="small" />
        <Typography variant="body2">{file.name}</Typography>
      </Box>
    </Box>
  );
};

const Tutorial = ({ steps, mediaFiles = [] }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.container}>
        {mediaFiles.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Attached Media
            </Typography>
            {mediaFiles.map((file, i) => (
              <MediaRenderer key={i} file={file} classes={classes} />
            ))}
          </Box>
        )}
        {steps?.map((step, i) => (
          <Box id={step.id} key={step.id} data-testId="tutorialpageSteps">
            <Typography sx={{ fontWeight: "600" }}>
              {i + 1 + ". " + step.title}
            </Typography>
            <Typography className="content">
              <HtmlTextRenderer html={step.content} />
            </Typography>
          </Box>
        ))}
      </Card>
    </>
  );
};

export default Tutorial;
