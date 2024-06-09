import React from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, Box, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const PhotoCard = ({ photo, isFavorite, toggleFavorite }) => {

  return (
    <Card sx={{ minHeight: 250 }}>
      <CardMedia
        component="img"
        height="200"
        image={photo.src.medium}
        alt={photo.photographer}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {photo.photographer}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ minHeight: '50px' }}>
          {photo.alt || 'No description available.'}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent:'center'}}>
        <Tooltip title="Add to favorites">
          <IconButton
            aria-label="add to favorites"
            onClick={() => toggleFavorite(photo)}
            color={isFavorite ? 'error' : 'default'}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View full size">
          <IconButton 
            aria-label="view full size"
            onClick={() => window.open(photo.src.original, '_blank')}

          >
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default PhotoCard;
