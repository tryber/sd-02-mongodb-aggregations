use aggregations;
db.movies.aggregate([
  {
    $project:
    {
      movie_title: { $split: ["$title", " "] }
    }
  },
  {
    $match: { movie_title: { $size: 1 } },
  },
]);

//contagem:
db.movies.aggregate([
  {
    $project:
    {
      movie_title: { $split: ["$title", " "] }
    }
  },
  {
    $match: { movie_title: { $size: 1 } },
  },
  {
    $group: {
      _id: null,
      count: { $sum: 1 }
    }
  }
]);
