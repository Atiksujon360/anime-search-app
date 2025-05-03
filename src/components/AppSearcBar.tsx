import React from 'react';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';

const AppSearchBar: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#9020e8' }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Anime Search App
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppSearchBar;
