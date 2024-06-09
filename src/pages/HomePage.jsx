import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../store/photoSlice';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import PhotoCard from '../components/common/PhotoCard';
import   Loading  from '../components/common/Loading';

const PhotoGrid = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);
  const photoStatus = useSelector((state) => state.photos.status);
  const error = useSelector((state) => state.photos.error);
  const [favorites, setFavorites] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (photoStatus === 'idle') {
      dispatch(fetchPhotos());
    }
  }, [photoStatus, dispatch]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        } else {
          await setDoc(userDocRef, { favorites: [] });
          setFavorites([]);
        }
      }
    };

    fetchUserFavorites();
  }, [user]);

  const toggleFavorite = async (photo) => {
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    let updatedFavorites;

    // Check if the photo is already in favorites
    const isFavorite = favorites.some(fav => fav.id === photo.id);

    // Update the favorites array
    try {
      if (isFavorite) {
        updatedFavorites = favorites.filter(fav => fav.id !== photo.id);
        await updateDoc(userDocRef, {
          favorites: arrayRemove(photo)
        });
      } else {
        // Add to favorites
        updatedFavorites = [...favorites, photo];
        await updateDoc(userDocRef, {
          favorites: arrayUnion(photo)
        });
      }

      setFavorites(updatedFavorites);
    } catch (error) {
      // If the document doesn't exist, we need to create it and then update
      if (error.code === 'not-found') {
        await setDoc(userDocRef, {
          favorites: isFavorite ? [] : [photo]
        });
        setFavorites(isFavorite ? [] : [photo]);
      } else {
        console.error('Error updating favorites: ', error);
      }
    }
  };

  if (photoStatus === 'loading') {
    return (
      <Loading />
    );
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Grid container spacing={3}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <PhotoCard 
              photo={photo} 
              isFavorite={favorites.some(fav => fav.id === photo.id)} 
              toggleFavorite={toggleFavorite} 
            />
          </Grid>
        ))}
      </Grid>
      {photoStatus === 'failed' && <div>{error}</div>}
    </Box>
  );
};

export default PhotoGrid;
