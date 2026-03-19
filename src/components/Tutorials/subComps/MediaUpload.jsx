import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Chip,
  Grid
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { uploadTutorialMedia, removeTutorialMedia } from "../../../store/actions";

const ACCEPT_TYPES = {
  image: "image/*",
  video: "video/*",
  document: ".pdf,.doc,.docx"
};

const MediaUpload = ({ owner, tutorial_id, mediaFiles = [] }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(null);

  const uploading = useSelector(
    state => state?.tutorials?.images?.uploading
  );

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    uploadTutorialMedia(owner, tutorial_id, files)(firebase, firestore, dispatch);
    e.target.value = "";
    setActiveType(null);
  };

  const handleDelete = (name, url, type) => {
    removeTutorialMedia(owner, tutorial_id, name, url, type)(
      firebase,
      firestore,
      dispatch
    );
  };

  const triggerUpload = (type) => {
    setActiveType(type);
    document.getElementById(`media-upload-${type}`).click();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Attach Media
      </Typography>

      {/* Hidden file inputs */}
      {Object.entries(ACCEPT_TYPES).map(([type, accept]) => (
        <input
          key={type}
          id={`media-upload-${type}`}
          type="file"
          accept={accept}
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, type)}
        />
      ))}

      {/* Upload buttons */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <IconButton
          onClick={() => triggerUpload("image")}
          title="Upload Image"
          color="primary"
          disabled={uploading || !owner || !tutorial_id}
        >
          <ImageIcon />
        </IconButton>
        <IconButton
          onClick={() => triggerUpload("video")}
          title="Upload Video"
          color="primary"
          disabled={uploading || !owner || !tutorial_id}
        >
          <MovieIcon />
        </IconButton>
        <IconButton
          onClick={() => triggerUpload("document")}
          title="Upload Document"
          color="primary"
          disabled={uploading || !owner || !tutorial_id}
        >
          <DescriptionIcon />
        </IconButton>
        {uploading && <CircularProgress size={24} sx={{ ml: 1 }} />}
      </Box>

      {/* Uploaded media list */}
      {mediaFiles.length > 0 && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            Uploaded Media:
          </Typography>
          <Grid container spacing={1} sx={{ mt: 0.5 }}>
            {mediaFiles.map((file, i) => (
              <Grid item key={i}>
                <Chip
                  icon={
                    file.type === "image" ? <ImageIcon /> :
                    file.type === "video" ? <MovieIcon /> :
                    <DescriptionIcon />
                  }
                  label={file.name}
                  onDelete={() => handleDelete(file.name, file.url, file.type)}
                  deleteIcon={<DeleteIcon />}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MediaUpload;