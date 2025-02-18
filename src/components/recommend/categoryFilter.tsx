// src/components/recommend/CategoryFilter.tsx
import React from 'react';
import {
  Box,
  Chip,
  Typography,
  Drawer,
  Button,
  IconButton
} from '@mui/material';
import { FilterList, Close } from '@mui/icons-material';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onSelectCategory: (categoryId: string) => void;
}

const CATEGORIES: Category[] = [
  { id: 'nature', name: '자연' },
  { id: 'culture', name: '문화' },
  { id: 'food', name: '음식' },
  { id: 'activity', name: '액티비티' },
  { id: 'healing', name: '힐링' },
  { id: 'history', name: '역사' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onSelectCategory
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ flex: 1 }}>
          카테고리 필터
        </Typography>
        <IconButton onClick={() => setOpen(true)}>
          <FilterList />
        </IconButton>
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedCategories.map((categoryId) => {
          const category = CATEGORIES.find(c => c.id === categoryId);
          return category && (
            <Chip
              key={categoryId}
              label={category.name}
              onDelete={() => onSelectCategory(categoryId)}
              color="primary"
            />
          );
        })}
      </Box>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ flex: 1 }}>
              카테고리 선택
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {CATEGORIES.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onClick={() => onSelectCategory(category.id)}
                color={selectedCategories.includes(category.id) ? 'primary' : 'default'}
                variant={selectedCategories.includes(category.id) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpen(false)}
          >
            확인
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default CategoryFilter;