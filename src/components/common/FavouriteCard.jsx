import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Tooltip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DownloadIcon from '@mui/icons-material/Download';

const FavouriteCard = ({ photo, onRemove, onDownload }) => {
  return (
    <Card sx={{ minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        height="200"
        image={photo.src.medium}
        alt={photo.photographer}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6">
          {photo.photographer}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {photo.alt || 'No description available.'}
        </Typography>
      </CardContent>
      <Box sx={{ mt: 'auto' }}>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Tooltip title="Remove from favorites">
            <IconButton onClick={() => onRemove(photo)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View full size">
            <IconButton onClick={() => window.open(photo.src.original, '_blank')} color="primary">
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download image">
            <IconButton onClick={() => onDownload(photo.src.original)} color="success">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
    </Card>
  );
};

export default FavouriteCard;
