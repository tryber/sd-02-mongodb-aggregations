use aggregations;

db.movies.aggregate([
  {
    $addFields: {
      substrArr: { $split: ["$title", ' '] }
    }
  },
  {
    $match: {
      substrArr: { $size: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      title: 1
    }
  }
]);
