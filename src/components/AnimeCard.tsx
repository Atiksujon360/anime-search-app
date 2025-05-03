import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
};

const AnimeCard = ({ anime }: { anime: Anime }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setLoading(true); // Show the Backdrop
    setTimeout(() => {
      navigate(`/details/${anime.mal_id}`);
      setLoading(false); // Hide the Backdrop after navigation
    }, 500); // Simulate a delay for navigation
  };

  return (
    <>
      {/* Backdrop for loading */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Card
        onClick={handleCardClick}
        sx={{
          cursor: "pointer",
          width: "225px",
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          height="325"
          image={anime.images.jpg.image_url}
          alt={anime.title}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {anime.title}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default AnimeCard;