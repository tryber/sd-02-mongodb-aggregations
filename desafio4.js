use aggregations;

db.movies.aggregate([
  {
    $project: {
      "title": { $split: [ "$title", " " ] }
    }
  },
  {
    $match: {
      "title": { $size: 1 }
    }
  }
]);
