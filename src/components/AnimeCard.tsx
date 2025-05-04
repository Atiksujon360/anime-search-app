import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setLoading(true);
    navigate(`/details/${anime.mal_id}`);
    setLoading(false);
  };

  return (
    <>
      {/* Backdrop for loading */}
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Anime Card */}
      <Card
        onClick={handleCardClick}
        sx={{
          cursor: "pointer",
          width: 225,
          margin: "auto",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
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
