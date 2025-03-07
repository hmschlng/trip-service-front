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
  LocalActivity as ActivityIcon
} from '@mui/icons-material';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import recommendApi, { PlaceDetailResponse } from '../../api/recommendApi';

const RecommendDetail: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [place, setPlace] = useState<PlaceDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (!placeId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await recommendApi.getPlaceDetail(placeId);
        setPlace(response);
      } catch (error: any) {
        console.error('Error fetching place details:', error);
        setError(error.response?.data?.message || '여행지 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!place) return <ErrorMessage message="여행지 정보를 찾을 수 없습니다." />;

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
        {place.activities.slice(0, 3).map((activity, index) => (
          <Chip key={index} label={activity} size="small" />
        ))}
      </Box>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {place.description}
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <List>
          {place.details?.bestVisitSeason && (
            <>
              <ListItem>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText
                  primary="추천 방문 시기"
                  secondary={place.details.bestVisitSeason}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          )}
          
          {place.weatherInfo && (
            <ListItem>
              <ListItemIcon>
                <WeatherIcon />
              </ListItemIcon>
              <ListItemText
                primary="현재 날씨"
                secondary={`${place.weatherInfo.description}, ${place.weatherInfo.temperature}°C`}
              />
            </ListItem>
          )}
          
          {place.activities.length > 0 && (
            <>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <ActivityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="추천 활동"
                  secondary={place.activities.join(', ')}
                />
              </ListItem>
            </>
          )}
        </List>
      </Paper>

      {Object.entries(place.details || {}).length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            상세 정보
          </Typography>
          <Paper sx={{ p: 2, mb: 3 }}>
            <List>
              {Object.entries(place.details)
                .filter(([key]) => key !== 'bestVisitSeason')
                .map(([key, value], index, array) => (
                  <React.Fragment key={key}>
                    <ListItem>
                      <ListItemText
                        primary={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        secondary={value}
                      />
                    </ListItem>
                    {index < array.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
            </List>
          </Paper>
        </>
      )}
    </PageContainer>
  );
};

export default RecommendDetail;