export const getImageUrl = (posterPath) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500'; // Use the appropriate size
    return `${baseUrl}${posterPath}`;
  };
  