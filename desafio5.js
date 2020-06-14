db.movies.aggregate([
  { 
    $match: {
      "countries": { $all: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      "cast": { $exists: true }
    }
  },
  {
    $addFields: {
      "actors": ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]
    }
  },
  {
    $addFields: {
      "num_favs": {
        $size: {
          $setIntersection: [ "$cast", "$actors"]
        }
      }
    }
  },
  {
    $match: {
      "num_favs": { $gte: 1 },
    }
  },
  {
    $sort: {
      "num_favs": -1,
      "tomatoes.viewer.rating": -1,
      "title": -1
    }
  },
  {
    $skip: 24
  },
  {
    $limit: 1
  },
  {
    $project: {
      "_id": 0,
      "title": 1
    }
  }
]);
