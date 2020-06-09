use aggregations;

db.movies.aggregate(
  [
    {
      $match: {
        "languages": "English"
      }
    },
    {
      $unwind: "$cast"
    },
    {
      $group: {
        _id: "$cast",
        numeroFilmes: {
          $sum: 1
        },
        mediaIMDB: {
          $avg: "$imdb.rating"
        }
      }
    }
  ]
);
