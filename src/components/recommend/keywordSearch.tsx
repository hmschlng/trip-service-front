// src/components/recommend/KeywordSearch.tsx
import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { Search, History } from '@mui/icons-material';

interface KeywordSearchProps {
  onSearch: (keyword: string) => void;
}

const KeywordSearch: React.FC<KeywordSearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

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