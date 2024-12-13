import React from "react";
import TrailerViewer from "./TrailerViewer";

const MoviePage = ({movieId}) => {
 

  return (
    <div>
      <h1>Movie Trailer</h1>
      <TrailerViewer movieId={movieId} />
    </div>
  );
};

export default MoviePage;
