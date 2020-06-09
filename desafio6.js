db.movies.aggregate([
  {
    $limit: 10
  },
  {
    $group: {
      _id: "_id",
      "maior_rating": { $max: "$imdb.rating" },
      "menor_rating": { $min: "$imdb.rating" },
      "media_rating": { $avg: "$imdb.rating" },
      "desvio_padrao": { $stdDevSamp: "$imdb.rating" },
    }
  },
]);