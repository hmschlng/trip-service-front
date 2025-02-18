// src/components/recommend/PlaceCard.tsx
import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlaceResponse } from '../../api/recommendApi';

interface PlaceCardProps {
  place: PlaceResponse;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/recommendations/${place.placeId}`)}>
        <CardMedia
          component="img"
          height="200"
          image={place.imageUrl || '/images/placeholder.jpg'}
          alt={place.name}
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" component="div">
              {place.name}
            </Typography>
            <Chip
              label={`${place.matchingRate}% 일치`}
              color="primary"
              size="small"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {place.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {place.activities.slice(0, 3).map((activity) => (
              <Chip
                key={activity}
                label={activity}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlaceCard;