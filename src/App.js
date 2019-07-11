
export const thetweetUser = (atweet) => {
    let tweet_user = atweet.substring(0, atweet.indexOf('> ')).replace(/\s+/g, '');
    //console.log(tweet_user);
    return tweet_user;
}
export const theTweet = (atweet) => {
    let tweet = atweet.split("> ")[1];
    //console.log(tweet);
    return tweet;
}

//FILTER OUT TWEETS FOR SPECIFIC USER
export const getTweetForUser = (user, tweets) => {
    //console.log(JSON.stringify(tweets));
    const TweetsForUser = tweets.filter(function (el) {
        return (el.user === user);
    });
    //console.log(user,"tweets is: ", TweetsForUser);
    return TweetsForUser;

}

//FETCH ALL THE TWEETS
let ft = require("fs");
let tweetsText = ft.readFileSync("input/tweet.txt", "utf-8");
let tweets = tweetsText.split(/[\r\n]+/);

//CONSTRUCT AM OBJECT OF TWEETS
export const getTweets = (tweets) => {
    let tweetArray = [];
    let orderKey = 0;
    tweets.forEach(tweet => {
        orderKey++;
        let valueToPush = {};
        valueToPush['order'] = orderKey;
        valueToPush['user'] = thetweetUser(tweet);
        valueToPush['tweet'] = theTweet(tweet);
        tweetArray.push(valueToPush);
    })
    tweetArray.sort((a, b) => (a.order > b.order) ? 1 : -1);
    //console.table(tweetArray)
    //console.log(JSON.stringify(tweetArray));
    return tweetArray;
}
const theTweets = getTweets(tweets);


//FETCH THE USER DATA
let fs = require("fs");
let text = fs.readFileSync("input/user.txt", "utf-8");
let linesFromUsertext = text.split(/[\r\n]+/);

//OUTPUT THE TWEETS
export const outputTweets = (userObj, theTweets) => {
    let tweetFeed = [];
    userObj.map(user => {
        let userFeed = [];

        user.following.forEach(user => {
            let followingsTweets =  getTweetForUser(user, theTweets);
            Array.prototype.push.apply(userFeed, followingsTweets)
        })
        let ownTweets = getTweetForUser(user.name, theTweets);
        Array.prototype.push.apply(userFeed,ownTweets);
        userFeed.sort((a, b) => (a.order > b.order) ? 1 : -1);

        /*console.log(user.name);
        userFeed.forEach(atweet => {
            console.log("       @"+atweet.user+":"+atweet.tweet+"");
        })*/
        tweetFeed.push(userFeed);
        return userFeed;
    })
    return tweetFeed;

}

//COMPILE A LIST OF USERS AND THEIR FOLLOWERS
export const compileUsers = ( userList, linesFromUsertext) => {
    let userObj = userList;
    linesFromUsertext.forEach(line => {
        let follower = line.substring(0, line.indexOf(' follows'));
        let following = line.split("follows ")[1].replace(/\s+/g, '');
        let splitFollowing = following.split(',');
        splitFollowing.forEach(follow => {
            //console.log("adding ",follow ,"to:",follower);
            let userExists = userObj.filter(x => x.name == follower);
            if(userExists.length){
                let foundIndex = userObj.findIndex(x => x.name == follower);
                //console.log("found index:",foundIndex);
                let followingArray = JSON.stringify(userObj[foundIndex].following);

                if(!followingArray.includes(follow)){
                    userObj[foundIndex].following.push(follow);
                }
            } else {
                //console.log("user does not exist");
            }

        })
    })
    userObj.sort((a, b) => a.name.localeCompare(b.name));
    outputTweets(userObj, theTweets)
    return userObj;
}

//GET UNIQUE LIST OF USERS
export const getUsers = (users) => {
    let userList = [];
    users.forEach(user => {
        let userLine = user.replace(' follows', ',').replace(/\s+/g, '');
        let splitUsersInLine = userLine.split(',');

        splitUsersInLine.forEach(uName => {
            let userExists = userList.filter(x => x.name == uName);
            if(!userExists.length){
                let userOjb =  { name: uName, following: [] };
                userList.push(userOjb);
            }
        })
    })
    //console.log("Unique User List:" ,JSON.stringify(userList));
    compileUsers(userList, linesFromUsertext);
    return userList;

}
let allUsers = getUsers(linesFromUsertext);







