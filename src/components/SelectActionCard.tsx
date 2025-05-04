import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SelectActionCardProps } from "../types/CardData";

const SelectActionCard: React.FC<SelectActionCardProps> = ({
  cards,
  cardBackgroundColors,
  cardTitleColors,
  cardDescriptColors,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          sx={{
            backgroundColor: cardBackgroundColors[index] || "#9020e8",
            color: "white",
          }}
        >
          <CardContent sx={{ height: "100%" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: cardTitleColors[index] || "white",
                fontWeight: "bold",
              }}
            >
              {card.title === "users" ? card.score : card.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: cardDescriptColors[index] || "white",
              }}
            >
              {card.title === "users"
                ? `${card.description} Users`
                : card.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SelectActionCard;