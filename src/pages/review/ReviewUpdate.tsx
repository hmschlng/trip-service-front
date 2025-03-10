// src/pages/review/ReviewUpdate.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  AddPhotoAlternate,
  Delete as DeleteIcon,
  LocationOn
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import { useAuth } from '../../hooks/useAuth';
import reviewApi, { ReviewCreateRequest, ReviewResponse } from '../../api/reviewApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { extractResponseData, extractErrorMessage } from '../../utils/apiUtils';

interface ReviewFormData {
  title: string;
  content: string;
  location: string;
}

const ReviewUpdate: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<ReviewFormData>();

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (!reviewId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await reviewApi.getReview(reviewId);
        const reviewData = extractResponseData(response);
        
        setReview(reviewData);
        
        // 기존 데이터 폼에 설정
        setValue('title', reviewData.title);
        setValue('content', reviewData.content);
        
        // 위치 정보 처리
        if (reviewData.locationInfo && reviewData.locationInfo.name) {
          setValue('location', reviewData.locationInfo.name);
        }
        
        // 이미지 정보 처리
        setExistingImages(reviewData.imageUrls || reviewData.images || []);
      } catch (error: any) {
        console.error('Error fetching review details:', error);
        setError(extractErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewDetail();
  }, [reviewId, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setNewImages(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadNewImages = async (): Promise<string[]> => {
    if (newImages.length === 0) return [];
    
    try {
      const formData = new FormData();
      newImages.forEach(file => {
        formData.append('files', file);
      });
      
      return await reviewApi.uploadMultipleImages(formData);
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('이미지 업로드에 실패했습니다.');
    }
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (!reviewId || !review || !auth.userId) return;
    
    try {
      setIsSaving(true);
      
      // 새 이미지 업로드
      let allImageUrls = [...existingImages];
      
      if (newImages.length > 0) {
        const newImageUrls = await uploadNewImages();
        allImageUrls = [...allImageUrls, ...newImageUrls];
      }
      
      // 위치 정보 객체 생성
      const locationInfo: Record<string, string> = {
        name: data.location
      };
      
      // 업데이트 요청 데이터 구성
      const updateData: ReviewCreateRequest = {
        planId: review.planId,
        userId: auth.userId,
        title: data.title,
        content: data.content,
        imageUrls: allImageUrls,
        locationInfo
      };
      
      await reviewApi.updateReview(reviewId, updateData);
      
      navigate(`/reviews/${reviewId}`);
    } catch (error: any) {
      console.error('Update error:', error);
      setError(error.message || '여행 후기 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!review) return <ErrorMessage message="여행 후기 정보가 없습니다." />;

  return (
    <PageContainer>
      <Typography variant="h5" gutterBottom>여행 후기 수정</Typography>
      
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: '제목을 입력해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="제목"
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            사진 추가
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            style={{ display: 'none' }}
          />
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddPhotoAlternate />}
              onClick={() => fileInputRef.current?.click()}
            >
              사진 선택
            </Button>
          </Box>
          
          {/* 기존 이미지 */}
          {existingImages.length > 0 && (
            <>
              <Typography variant="subtitle2" gutterBottom>기존 이미지</Typography>
              <ImageList cols={3} gap={8} sx={{ mb: 2 }}>
                {existingImages.map((imageUrl, index) => (
                  <ImageListItem key={`existing-${index}`}>
                    <img
                      src={imageUrl}
                      alt={`기존 이미지 ${index + 1}`}
                      loading="lazy"
                      style={{ borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                      }}
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      <DeleteIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}
          
          {/* 새 이미지 */}
          {newImages.length > 0 && (
            <>
              <Typography variant="subtitle2" gutterBottom>새 이미지</Typography>
              <ImageList cols={3} gap={8}>
                {newImages.map((image, index) => (
                  <ImageListItem key={`new-${index}`}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`업로드 이미지 ${index + 1}`}
                      loading="lazy"
                      style={{ borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                      }}
                      onClick={() => handleRemoveNewImage(index)}
                    >
                      <DeleteIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}
        </Paper>

        <Controller
          name="location"
          control={control}
          rules={{ required: '방문 장소를 입력해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="주요 방문 장소"
              InputProps={{
                startAdornment: <LocationOn color="action" sx={{ mr: 1 }} />
              }}
              error={!!errors.location}
              helperText={errors.location?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          name="content"
          control={control}
          rules={{ required: '내용을 입력해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={6}
              label="여행 후기"
              error={!!errors.content}
              helperText={errors.content?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/reviews/${reviewId}`)}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSaving}
          >
            {isSaving ? <CircularProgress size={24} /> : '수정하기'}
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ReviewUpdate;