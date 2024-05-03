import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';

interface SearchProps {
  onSearch: (searchTerm: string, type: string) => void;
}

const { Option } = Select;

const MovieSearch = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('movie'); // Default to "movie"

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm, type);
  };

  return (
    <div className="flex items-center mb-4 w-1/2">
      <Input
        placeholder="Search for movies or series..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-1/2"
      />
      <Select value={type} onChange={handleTypeChange} className="w-1/4 ml-2">
        <Option value="movie">Movie</Option>
        <Option value="series">Series</Option>
      </Select>
      <Button
        onClick={handleSearchSubmit}
        className="ml-2 bg-blue-500 text-white"
      >
        Search
      </Button>
    </div>
  );
};

export default MovieSearch;
