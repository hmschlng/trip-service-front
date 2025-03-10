// src/components/recommend/KeywordSearch.tsx
import React, { useEffect, useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box
} from '@mui/material';
import { Search, History } from '@mui/icons-material';
import recommendApi from '../../api/recommendApi';

interface KeywordSearchProps {
  onSearch: (keyword: string) => void;
}

const KeywordSearch: React.FC<KeywordSearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [popularKeywords, setPopularKeywords] = useState<string[]>([]);
  const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await recommendApi.getKeywords();
        setPopularKeywords(response.data.data.popularKeywords);
        setRecommendedKeywords(response.data.data.recommendedKeywords);
      } catch (error) {
        console.error('Failed to fetch keywords:', error);
      }
    };

    fetchKeywords();
  }, []);

  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch(keyword);
      saveRecentSearch(keyword);
    }
  };

  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(item => item !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <TextField
        fullWidth
        placeholder="여행지 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      {/* 인기 키워드 및 추천 키워드 표시 */}
      {(popularKeywords.length > 0 || recommendedKeywords.length > 0) && (
        <Paper sx={{ mt: 2, p: 2 }}>
          {popularKeywords.length > 0 && (
            <>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              인기 키워드
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {popularKeywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    onClick={() => {
                      setKeyword(keyword);
                      onSearch(keyword);
                      saveRecentSearch(keyword);
                    }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </>
          )}
          
          {recommendedKeywords.length > 0 && (
            <>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                추천 키워드
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {recommendedKeywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    onClick={() => {
                      setKeyword(keyword);
                      onSearch(keyword);
                      saveRecentSearch(keyword);
                    }}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </>
          )}
        </Paper>
      )}
      
      {recentSearches.length > 0 && (
        <Paper sx={{ mt: 2 }}>
          <List>
            <ListItem>
              <Typography variant="subtitle2" color="text.secondary">
                최근 검색어
              </Typography>
            </ListItem>
            {recentSearches.map((term, index) => (
              <ListItem
                key={index}
                button
                onClick={() => {
                  setKeyword(term);
                  onSearch(term);
                }}
              >
                <History sx={{ mr: 1, color: 'text.secondary' }} />
                <ListItemText primary={term} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default KeywordSearch;