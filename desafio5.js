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
      "nums_fav": {
        $size: {
          $setIntersection: [ "$cast", "$actors"]
        }
      }
    }
  },
  {
    $match: {
      "nums_fav": { $gte: 1 },
    }
  },
  {
    $sort: {
      "nums_fav": -1,
      "tomatoes.viewer.rating": -1,
      "title": -1
    }
  },
  {
    $skip: 24
  },
  {
    $project: {
      "title": 1
    }
  }
]);
