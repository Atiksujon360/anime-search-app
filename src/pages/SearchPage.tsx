import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Grid, Backdrop, CircularProgress, Container, Typography } from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import AnimeSearch from "../components/AnimeSearch";
import { fetchAnimeData } from "../constants/api";
import { Anime } from "../types/Anime";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    if (debouncedQuery) fetchAnime(debouncedQuery, page);
  }, [debouncedQuery, page]);

  const fetchAnime = async (searchQuery: string, page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, totalPages } = await fetchAnimeData(searchQuery, page);
      setResults(data);
      setTotalPages(totalPages);
    } catch (err) {
      setError("Failed to fetch anime. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ maxWidth: "85%", mt: { xs: 2, sm: 4, md: 6 } }}>
      <AnimeSearch query={query} onQueryChange={setQuery} onSearchClick={() => fetchAnime(query, page)} />
      
      {/* Backdrop for loading */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {!loading && !error && results.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {results.map((anime) => (
            //@ts-ignore
            <Grid item xs={12} sm={6} md={2.4} key={anime.mal_id}>
              <AnimeCard anime={anime}  />
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && !error && results.length === 0 && (
        <Typography sx={{ mt: 2 }}>No results found.</Typography>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </Container>
  );
};

export default SearchPage;
