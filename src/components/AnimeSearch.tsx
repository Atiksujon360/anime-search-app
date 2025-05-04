import React from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AnimeSearchProps } from "../types/Anime";

const AnimeSearch: React.FC<AnimeSearchProps> = ({ query, onQueryChange, onSearchClick }) => {
  return (
    <Box sx={{ width: "100%", mt: { xs: 1, sm: 3, md: 4 } }}>
      <TextField
        label="Search Anime"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        sx={{ mb: 2 }} // Replaced inline style with sx
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearchClick} aria-label="search anime">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AnimeSearch;