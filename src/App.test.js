import {getUsers, thetweetUser, compileUsers, theTweet, getTweets, outputTweets} from "./App";

let fs = require("fs");
let text = fs.readFileSync("input/user-test.txt", "utf-8");
let users = text.split(/[\r\n]+/);

//FETCH ALL THE TWEETS
let ft = require("fs");
let tweetsText = ft.readFileSync("input/tweet-test.txt", "utf-8");
let tweets = tweetsText.split(/[\r\n]+/);

//CHECK THE USER.TXT HAS USERS
describe('Check user txt', () => {
    let fs = require("fs");
    let text = fs.readFileSync("input/user.txt", "utf-8");
    let users = text.split(/[\r\n]+/);
    users.forEach(user => {
        it('user.txt should contain users', function () {
            expect(user).toContain('follows ');
        });
    })
})

//CHECK THE TWEET.TXT HAS TWEETS
describe('Check tweet txt', () => {
    let fs = require("fs");
    let text = fs.readFileSync("input/tweet.txt", "utf-8");
    let tweets = text.split(/[\r\n]+/);
    tweets.forEach(tweet => {
        it('tweet.txt should contain tweets', function () {
            expect(tweet).toContain('> ');
        });
    })
})

//GET ALL UNIQUE USERS
describe('get unique users', () => {
    const testUserObj = [{"following": ["Martin"], "name": "Alan"}, {"following": [], "name": "Martin"}, {"following": ["Martin", "Alan"], "name": "Ward"}]
    it('should return unique users', function () {
        expect(getUsers(users)).toMatchObject(testUserObj);
    });
})


//MAKE SURE THE USERS ARE CONSTRUCTED CORRECTLY
describe('Construct the users', () => {
    const users = [{"name":"Ward","following":[]},{"name":"Alan","following":[]},{"name":"Martin","following":[]}];
    const follow = ["Ward follows Alan","Alan follows Martin","Ward follows Martin, Alan"];
    const correctUsers =  [{"following": ["Martin"], "name": "Alan"}, {"following": [], "name": "Martin"}, {"following": ["Alan", "Martin"], "name": "Ward"}];
    it('should return an object of users and who they follow', function () {
        expect(compileUsers(users, follow)).toMatchObject(correctUsers);
    });
})


//MAKE SURE THE TWEETS ARE CONSTRUCTED CORRECTLY
describe('Get Tweets', () => {
    const testTweetsObj = [{"order":1,"user":"Alan","tweet":"If you have a procedure with 10 parameters, you probably missed some."},{"order":2,"user":"Ward","tweet":"There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors."},{"order":3,"user":"Alan","tweet":"Random numbers should not be generated with a method chosen at random."}]
    it('should return the tweets', function () {
        expect(getTweets(tweets)).toMatchObject(testTweetsObj);
    });
})

//GET THE TWEET'S USER
describe('Tweet User', () => {
    const tweetLine = "Alan> If you have a procedure with 10 parameters, you probably missed some.";
    it('return the user of a tweet ', function () {
        expect(thetweetUser(tweetLine)).toBe("Alan");
    });
})

//GET THE TWEET
describe('A Tweet', () => {
    const tweetLine = "Alan> If you have a procedure with 10 parameters, you probably missed some.";
    it('return the tweet for a line from the tweet txt', function () {
        expect(theTweet(tweetLine)).toBe("If you have a procedure with 10 parameters, you probably missed some.");
    });
})

//TEST FINAL OUTPUT
describe('Final user Twitter feeds', () => {
    const userObj = [{"name":"Alan","following":["Martin"]},{"name":"Martin","following":[]},{"name":"Ward","following":["Martin","Alan"]}];
    const tweets = [{"order":1,"user":"Alan","tweet":"If you have a procedure with 10 parameters, you probably missed some."},{"order":2,"user":"Ward","tweet":"There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors."},{"order":3,"user":"Alan","tweet":"Random numbers should not be generated with a method chosen at random."}];
    const fullFeed = [[{"order":1,"user":"Alan","tweet":"If you have a procedure with 10 parameters, you probably missed some."},{"order":3,"user":"Alan","tweet":"Random numbers should not be generated with a method chosen at random."}],[],[{"order":1,"user":"Alan","tweet":"If you have a procedure with 10 parameters, you probably missed some."},{"order":2,"user":"Ward","tweet":"There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors."},{"order":3,"user":"Alan","tweet":"Random numbers should not be generated with a method chosen at random."}]];
    it('returned data should exist', function () {
        expect(outputTweets(userObj,tweets)).toBeDefined();
    });
    it('should return the full feed object', function () {
        expect(outputTweets(userObj,tweets)).toMatchObject(fullFeed);
    });
})
