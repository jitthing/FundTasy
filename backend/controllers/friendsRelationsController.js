const FriendsRelations = require("../models/friendsRelationsModel");
const Users = require("../models/userModel");
const { getUserFromToken, checkIfUserExists } = require("./userController");

// TODO: 
// - Add a check to see if the user is already friends with the friend they are trying to add
// - Add a check to see if the user is trying to add themselves as a friend: DONE
// - Add a check to see if the friend request already exists: DONE
// - Add a check to see if the friend requested exists: DONE
// - Add a check to see if the friend requested has also requested the user

// Create a friend request
const newFriendRequest = async (req, res) => {
    const user = await Users.findOne({ username: req.body.username });
    // Check if the friend requested exists
    const friendExists = await checkIfUserExists(req.body.friendName);
    if (!friendExists) {
        return res.status(400).json({ message: "User does not exist!" });
    }

    // Check if friend relation already exists
    const friendRelationExists = await FriendsRelations.findOne({
        user1: user.username, user2: req.body.friendName });
    
    if (req.body.username === req.body.friendName) {
        return res.status(400).json({ message: "You cannot send a friend request to yourself!" });
    }
    if (friendRelationExists) {
        return res.status(400).json({ message: "Friend request already exists!" });
    }

    // Create a new friend relation as a request
    try {
        const createFriendsRelation = await FriendsRelations.create({
            user1: user.username,
            user2: req.body.friendName,
            pending: true,
            date_requested: new Date()
        })
        return res.status(200).json({ message: "Friend request sent!", friendsRelation: createFriendsRelation });
    } catch (error) {
        console.error("Unable to send friend request: " + error);
    }
}

// Get friend requests for a specific user
const fetchFriendRequests = async (req, res) => {
    const { user } = await getUserFromToken(req);
    try {
        const friendRequests = await FriendsRelations.find({ user2: user.username, pending: true });
        return res.status(200).json({ message: "Friend requests fetched!", friendRequests });
    } catch (error) {
        console.error("Unable to fetch friend requests: " + error);
    }
}

// Accept a friend request
const acceptFriendRequest = async (req, res) => {
    const { user } = await getUserFromToken(req);
    const { friendData } = req.body;
    try {
        const acceptFriendRequest = await FriendsRelations.findOneAndUpdate(
                { user1: friendData.friendName, user2: user.username, pending: true },
                { pending: false, date_accepted: new Date() });
        return res.status(200).json({ message: "Friend request accepted!", acceptFriendRequest });
    } catch (error) {
        console.error("Unable to accept friend request: " + error);
    }
}

// Fetch friends for a specific user
const fetchFriends = async (req, res) => {
    const { user } = await getUserFromToken(req);
    try {
        const friends = await FriendsRelations.find({ $or: [{ user1: user.username }, { user2: user.username }], pending: false });
        const usernames = [];
        friends.forEach((friend) => {
            if (friend.user1 === user.username && !usernames.includes(friend.user2)) {
                usernames.push(friend.user2);
            } else if (friend.user2 === user.username && !usernames.includes(friend.user1)) {
                usernames.push(friend.user1);
            }
        })
        // console.log(usernames);
        // const allFriends = Users.find({ username: {$in: usernames} }).sort({bankBalance: -1});
        return res.status(200).json({ message: "Friends fetched!", friends });
    } catch (error) {
        console.error("Unable to fetch friends: " + error);
    }
}

// Delete friend request
const deleteFriendRequest = async(req, res) => {
    const { user } = await getUserFromToken(req);
    const { friendData } = req.body;
    try {
        const deleteFriendRequest = await FriendsRelations.findOneAndDelete({ user1: friendData.friendName, user2: user.username, pending: true });
        return res.status(200).json({ message: "Friend request rejected!", deleteFriendRequest });
    } catch (error) {
        console.error("Unable to delete friend request: " + error);
    }
}

module.exports = { newFriendRequest, fetchFriendRequests, acceptFriendRequest, fetchFriends, deleteFriendRequest };