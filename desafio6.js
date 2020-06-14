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
  {
    $project: {
      "_id": 0,
      "maior_rating": "$maior_rating",
      "menor_rating": "$menor_rating",
      "media_rating": "$media_rating",
      "desvio_padrao": "$desvio_padrao"
    }
  }
]);
