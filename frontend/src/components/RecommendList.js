// import React from 'react';
// import SmallestBlock from './SmallestBlock';

// const RecommendList = ({ movies }) => {
//   const chunkMovies = (movies, size) => {
//     const chunks = [];
//     for (let i = 0; i < movies.length; i += size) {
//       chunks.push(movies.slice(i, i + size));
//     }
//     return chunks;
//   };

//   const movieChunks = chunkMovies(movies, 4);

//   return (
//     <div className="flex flex-wrap justify-center gap-4 p-4">
//       {movieChunks.map((chunk, index) => (
//         <div key={index} className="flex flex-wrap justify-center gap-4">
//           {chunk.map((movie, index) => (
//             <SmallestBlock
//               key={index}
//               title={movie.title}
//               description={movie.overview}
//               posterPath={movie.poster_path}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecommendList;
import React from 'react';
import SmallestBlock from './SmallestBlock';

const RecommendList = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {movies && movies.length > 0 ? (
        movies.map((movie, index) => (
          <SmallestBlock
            key={index}
            title={movie.title}
            description={movie.overview}
            posterPath={movie.poster_path || null} // Handle missing poster_path
          />
        ))
      ) : (
        <p className="text-white">No movie recommendations available.</p>
      )}
    </div>
  );
};

export default RecommendList;
