use aggregations;
db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      "rated": { $in: ["PG", "G"] },
      "languages": { $all: ["English", "Spanish"] },
      "genres": { $nin: ["Crime", "Horror"] }
    }
  },
]).pretty();
