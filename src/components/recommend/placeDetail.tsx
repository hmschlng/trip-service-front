// src/components/recommend/PlaceDetail.tsx
import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CalendarMonth,
  WbSunny,
  DirectionsWalk,
  Place
} from '@mui/icons-material';
import { PlaceDetailResponse } from '../../api/recommendApi';

interface PlaceDetailProps {
  place: PlaceDetailResponse;
}

const PlaceDetail: React.FC<PlaceDetailProps> = ({ place }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {place.name}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {place.activities.map((activity) => (
          <Chip key={activity} label={activity} />
        ))}
      </Box>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {place.description}
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText
              primary="추천 방문 시기"
              secondary={place.bestVisitSeason}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <WbSunny />
            </ListItemIcon>
            <ListItemText
              primary="현재 날씨"
              secondary={`${place.currentWeather.condition}, ${place.currentWeather.temperature}°C`}
            />
          </ListItem>
        </List>
      </Paper>

      <Typography variant="h6" gutterBottom>
        주변 추천 장소
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {place.nearbyPlaces.map((nearby, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemIcon>
                  <Place />
                </ListItemIcon>
                <ListItemText
                  primary={nearby.name}
                  secondary={`${nearby.distance}km | ${nearby.description}`}
                />
              </ListItem>
              {index < place.nearbyPlaces.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default PlaceDetail;