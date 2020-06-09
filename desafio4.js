db.movies.aggregate([
  { 
    $addFields: {
      "titleSplited": {
        $split: ["$title", " "]
      }
    }
  },
  {
    $match: {
      "titleSplited": {
        $size: 1
      }
    }
  }
]);
