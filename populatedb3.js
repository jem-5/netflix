#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Movie = require("./models/movie");
var Director = require("./models/director");
var Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var directors = [];
var categories = [];
var movies = [];

function directorCreate(name, cb) {
  var director = new Director({ name: name });

  director.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Director: " + director);
    directors.push(director);
    cb(null, director);
  });
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function movieCreate(
  title,
  director,
  summary,
  category,
  year,
  price,
  stock,
  cb
) {
  movieDetail = {
    title: title,
    director: director,
    summary: summary,
    category: category,
    year: year,
    price: price,
    stock: stock,
  };

  var movie = new Movie(movieDetail);
  movie.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Movie: " + movie);
    movies.push(movie);
    cb(null, movie);
  });
}

function createGenreDirectors(cb) {
  async.series(
    [
      function (callback) {
        directorCreate("Martin Scorsese", callback);
      },
      function (callback) {
        directorCreate("Steven Spielberg", callback);
      },
      function (callback) {
        directorCreate("Quentin Tarantino", callback);
      },
      function (callback) {
        directorCreate("Christopher Nolan", callback);
      },
      function (callback) {
        categoryCreate("Drama", callback);
      },
      function (callback) {
        categoryCreate("Thriller", callback);
      },
      function (callback) {
        categoryCreate("Comedy", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createMovies(cb) {
  async.parallel(
    [
      function (callback) {
        movieCreate(
          "Boxcar Bertha",
          directors[0],
          "Martin Scorsese's second feature loosely adapts the autobiography of Bertha Thompson, portraying the adventures of the Depression-era criminal.",
          [categories[0]],
          1972,
          14.99,
          10,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "Shutter Island",
          directors[0],
          "The implausible escape of a brilliant murderess brings U.S. Marshal Teddy Daniels (Leonardo DiCaprio) and his new partner (Mark Ruffalo) to Ashecliffe Hospital, a fortress-like insane asylum located on a remote, windswept island. The woman appears to have vanished from a locked room, and there are hints of terrible deeds committed within the hospital walls. ",
          [categories[1]],
          2010,
          19.99,
          2,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "Cape Fear",
          directors[0],
          "When attorney Sam Bowden (Nick Nolte) knowingly withholds evidence that would acquit violent sex offender Max Cady (Robert De Niro) of rape charges, Max spends 14 years in prison. But after Max's release, knowing about Sam's deceit, he devotes his life to stalking and destroying the Bowden family.",
          [categories[1]],
          1991,
          9.99,
          8,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "Bridge of Spies",
          directors[1],
          "During the Cold War, the Soviet Union captures U.S. pilot Francis Gary Powers after shooting down his U-2 spy plane. Sentenced to 10 years in prison, Powers' only hope is New York lawyer James Donovan (Tom Hanks), recruited by a CIA operative to negotiate his release. Donovan boards a plane to Berlin, hoping to win the young man's freedom through a prisoner exchange. If all goes well, the Russians would get Rudolf Abel (Mark Rylance), the convicted spy who Donovan defended in court.",
          [categories[1]],
          2015,
          14.99,
          6,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "War Horse",
          directors[1],
          "Albert (Jeremy Irvine) and his beloved horse, Joey, live on a farm in the British countryside. At the outbreak of World War I, Albert and Joey are forcibly parted when Albert's father sells the horse to the British cavalry. Against the backdrop of the Great War, Joey begins an odyssey full of danger, joy and sorrow, and he transforms everyone he meets along the way. Meanwhile Albert, unable to forget his equine friend, searches the battlefields of France to find Joey and bring him home.",
          [categories[2]],
          2011,
          5.99,
          14,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "Catch Me If You Can",
          directors[1],
          "Frank Abagnale, Jr. (Leonardo DiCaprio) worked as a doctor, a lawyer, and as a co-pilot for a major airline -- all before his 18th birthday. A master of deception, he was also a brilliant forger, whose skill gave him his first real claim to fame: At the age of 17, Frank Abagnale, Jr. became the most successful bank robber in the history of the U.S. FBI Agent Carl Hanratty (Tom Hanks) makes it his prime mission to capture Frank and bring him to justice, but Frank is always one step ahead of him.",
          [categories[1]],
          2002,
          7.99,
          4,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "Kill Bill",
          directors[2],
          "A former assassin, known simply as The Bride (Uma Thurman), wakes from a coma four years after her jealous ex-lover Bill (David Carradine) attempts to murder her on her wedding day. Fueled by an insatiable desire for revenge, she vows to get even with every person who contributed to the loss of her unborn child, her entire wedding party, and four years of her life. After devising a hit list, The Bride sets off on her quest, enduring unspeakable injury and unscrupulous enemies.",
          [categories[1]],
          2002,
          6.99,
          11,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "From Dusk Till Dawn",
          directors[2],
          "On the run from a bank robbery that left several police officers dead, Seth Gecko (George Clooney) and his paranoid, loose-cannon brother, Richard (Quentin Tarantino), hightail it to the Mexican border. Kidnapping preacher Jacob Fuller (Harvey Keitel) and his kids, the criminals sneak across the border in the family's RV and hole up in a topless bar. Unfortunately, the bar also happens to be home base for a gang of vampires, and the brothers and their hostages have to fight their way out.",
          [categories[2]],
          1996,
          2.99,
          19,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "Tenet",
          directors[3],
          "A secret agent is given a single word as his weapon and sent to prevent the onset of World War III. He must travel through time and bend the laws of nature in order to be successful in his mission.",
          [categories[0]],
          2003,
          1.99,
          9,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "Dunkirk",
          directors[3],
          "In May 1940, Germany advanced into France, trapping Allied troops on the beaches of Dunkirk. Under air and ground cover from British and French forces, troops were slowly and methodically evacuated from the beach using every serviceable naval and civilian vessel that could be found. At the end of this heroic mission, 330,000 French, British, Belgian and Dutch soldiers were safely evacuated.",
          [categories[0]],
          2017,
          9.99,
          11,
          callback
        );
      },
      function (callback) {
        movieCreate(
          "The Dark Knight",
          directors[3],
          "With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.",
          [categories[0]],
          2008,
          8.99,
          22,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createGenreDirectors, createMovies],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log(movies);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
