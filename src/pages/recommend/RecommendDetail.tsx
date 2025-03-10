// src/pages/recommend/RecommendDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  Today as TodayIcon,
  WbSunny as WeatherIcon,
  LocalActivity as ActivityIcon,
  Place as PlaceIcon
} from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { recommendApi } from '../../api';
import { PlaceDetailResponse } from '../../api/recommendApi';
import { useSnackbar } from 'notistack';

const RecommendDetail: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [place, setPlace] = useState<PlaceDetailResponse | null>(null);

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      if (!placeId) return;
      
      try {
        setIsLoading(true);
        const response = await recommendApi.getPlaceDetail(placeId);
        setPlace(response.data.data);
      } catch (error) {
        console.error('Error fetching place details:', error);
        setError('여행지 정보를 불러오는데 실패했습니다.');
        enqueueSnackbar('여행지 정보를 불러오는데 실패했습니다.', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceDetail();
  }, [placeId, enqueueSnackbar]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!place) return <ErrorMessage message="여행지 정보가 없습니다." />;

  // 날씨 정보 표시 준비
  const weather = place.weatherInfo;

  return (
    <PageContainer>
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={place.imageUrl || '/images/placeholder.jpg'}
          alt={place.name}
        />
      </Card>

      <Typography variant="h5" gutterBottom>
        {place.name}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {place.activities && place.activities.map((activity, index) => (
          <Chip key={index} label={activity} size="small" />
        ))}
      </Box>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {place.description}
      </Typography>

      {weather && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <WeatherIcon />
              </ListItemIcon>
              <ListItemText
                primary="현재 날씨"
                secondary={`${weather.description}, ${weather.temperature}°C`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText
                primary="추천 방문 시기"
                secondary={place.details?.bestSeason || "정보 없음"}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <ActivityIcon />
              </ListItemIcon>
              <ListItemText
                primary="추천 활동"
                secondary={place.activities?.join(', ') || "정보 없음"}
              />
            </ListItem>
          </List>
        </Paper>
      )}

      <Typography variant="h6" gutterBottom>
        주변 관광 포인트
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {place.details?.nearbyPlaces ? (
            place.details.nearbyPlaces.split(',').map((nearby, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <PlaceIcon />
                  </ListItemIcon>
                  <ListItemText primary={nearby.trim()} />
                </ListItem>
                {index < place.details.nearbyPlaces.split(',').length - 1 && (
                  <Divider component="li" />
                )}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="주변 관광 정보가 없습니다." />
            </ListItem>
          )}
        </List>
      </Paper>
    </PageContainer>
  );
};

export default RecommendDetail;