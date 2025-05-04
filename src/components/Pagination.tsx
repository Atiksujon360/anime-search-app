import { Pagination as MuiPagination, Box, Typography } from "@mui/material";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <Box
      sx={{
        mt: { xs: 2, sm: 4, md: 6 },
        mb: { xs: 2, sm: 4, md: 6 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="body2">{`Page ${currentPage} of ${totalPages}`}</Typography>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
