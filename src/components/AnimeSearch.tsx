import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AnimeSearchProps } from '../types/Anime';
 
const AnimeSearch: React.FC<AnimeSearchProps> = ({ query, onQueryChange, onSearchClick }) => {
  return (
    <Box sx={{width:'100%', mt: { xs: 1, sm: 3, md: 4 } }}> {/* Add responsive margin */}
      <TextField
        label="Search Anime"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={{ marginBottom: '20px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearchClick} aria-label="search"> {/* Make the icon clickable */}
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