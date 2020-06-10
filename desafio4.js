use aggregations;

db.movies.aggregate([
  { $project: { _id: 0, movie_title: { $split: ["$title", " "] } } },
  { $match: { movie_title: { $size: 1 } } }
]);
