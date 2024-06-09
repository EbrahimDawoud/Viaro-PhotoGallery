import React, { useEffect, useState } from 'react';
import { Grid, Typography, Alert, AlertTitle } from '@mui/material';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import Loading from '../components/common/Loading';
import axios from 'axios';
import FavouriteCard from '../components/common/FavouriteCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  // Fetch favorites from Firestore
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        }
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  // Remove a photo from favorites
  const removeFromFavorites = async (photo) => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(photo)
      });
      setFavorites(favorites.filter(fav => fav.id !== photo.id));
    }
  };
  
  // Download an image
  const downloadImage = async (url) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.data.type });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'favorite_image';
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading the image: ', error);
    }
  };

  if (loading) {
    return (
        <Loading />
    );
  }

  return (
   <>
     <Alert  severity="info" icon={<FavoriteIcon fontSize="inherit" />} sx={{ mb: 4, justifyContent:'center' }}>
        <AlertTitle>Your Favorites</AlertTitle>
        Explore and manage your favorite images below.
      </Alert>

      <Grid container spacing={2}>
        {favorites.length > 0 ? (
          favorites.map((photo) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={photo.id}>
              <FavouriteCard
                photo={photo}
                onRemove={removeFromFavorites}
                onDownload={downloadImage}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6"  minHeight={'60vh'} margin={'20px auto'}>No favorite images found.</Typography>
        )}
      </Grid>
      </>
  );
};

export default Favorites;
