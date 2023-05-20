const { user, thought } = require("../models");
const connection = require("../config/connection");

connection.once("open", async () => {
  try {
    await user.deleteMany();
    await thought.deleteMany();

    const createdUsers = await user.insertMany([
      {
        username: "noah_hill",
        email: "noah_hill@example.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "toto",
        email: "toto.drummer@example.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "louie_swain",
        email: "louie_swain@example.com",
        thoughts: [],
        friends: [],
      },
    ]);

    const createdThoughts = await thought.insertMany([
      {
        thoughtText: "On my way to work!",
        username: "noah_hill",
        reactions: [],
      },
      {
        thoughtText: "Learning a new song rn!",
        username: "toto",
        reactions: [],
      },
      {
        thoughtText: "Waking up early in the morning is the worst TT",
        username: "louie_swain",
        reactions: [],
      },
    ]);

    for (let i = 0; i < createdThoughts.length; i++) {
      const thought = createdThoughts[i];
      const user = createdUsers.find((u) => u.username === thought.username);
      user.thoughts.push(thought);
      await user.save();
    }

    console.log("Database seeded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
