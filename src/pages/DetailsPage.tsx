import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";
import { fetchAnimeDetails } from "../constants/api";
import SelectActionCard from "../components/SelectActionCard";

interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  rank: number;
  popularity: number;
  members: number;
}

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const animeDetails = await fetchAnimeDetails(id!);
        setAnime(animeDetails);
      } catch (err) {
        console.error("Error fetching anime details:", err);
        setError("Failed to fetch anime details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </Container>
    );
  }

  if (!anime) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" align="center">
          No details available.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ maxWidth: "1200px", mt: { xs: 2, sm: 4, md: 6 } }}>
      <Typography variant="h4" gutterBottom>
        {anime.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* Anime Image */}
        <Box
          component="img"
          src={anime.images.jpg.image_url}
          alt={anime.title}
          sx={{
            width: "100%",
            maxWidth: "300px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        {/* Anime Details */}
        <Box>
          <Typography paragraph>
            {anime.synopsis || "No synopsis available."}
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <SelectActionCard
              cards={[
                {
                  id: anime.mal_id,
                  title: "Users",
                  description: anime.popularity?.toString() ?? "",
                  score: anime.score?.toString() ?? "",
                },
                {
                  id: anime.mal_id + 1,
                  title: "Ranked",
                  description: `#${anime.rank?.toString() ?? ""}`,
                  score: "",
                },
                {
                  id: anime.mal_id + 2,
                  title: "Popularity",
                  description: `#${anime.popularity?.toString() ?? ""}`,
                  score: "",
                },
                {
                  id: anime.mal_id + 3,
                  title: "Members",
                  description: anime.members?.toString() ?? "",
                  score: "",
                },
              ]}
              cardBackgroundColors={[
                "#d8f9f8",
                "#faeffa",
                "#fabbcc",
                "#dbf3e8",
              ]}
              cardTitleColors={["#59b2c4", "#7c757c", "#b86278", "#816f81"]}
              cardDescriptColors={[
                "#75d3e5",
                "#fa9dfa",
                "#f87195",
                "#816f81",
              ]}
            />
          </Box>
        </Box>
      </Box>

      {/* Back Button */}
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{ mt: 2, mb: 2 }}
      >
        Back
      </Button>
    </Container>
  );
};

export default DetailsPage;