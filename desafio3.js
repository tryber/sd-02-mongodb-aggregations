db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      "genres": {
        $not: {
          $in: ["Crime", "Horror"]
        },
      },
      "rated": { $in: ["PG", "G"]},
      "languages": {
        $all: ["English", "Spanish"]
      }
    },
  },
  {
    $sort: { "title": 1, "imdb.rating": -1, "year": -1 }
  },
  {
    $project: {
      "_id": 0,
      "titulo": "$title",
      "avaliado": "$rated",
      "notaIMDB": "$imdb.rating",
      "votosIMDB": "$imdb.votes",
      "ano": "$year"
  } },
]);
