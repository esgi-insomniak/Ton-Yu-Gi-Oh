const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const swagger = require("./swagger");
const bcrypt = require("bcrypt");

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

let corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

// MongoDB configuration
console.log(process.env.MONGO_CON_STRING);
mongoose
  .connect(process.env.MONGO_CON_STRING, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Models
const {
  Tunnel,
  Tag,
  Stat,
  User,
  MouseEventTrack,
  TrackEvent,
  AppData,
} = require("./models");

// Routes
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const terms = req.body.terms;
  if (terms === "on") {
    if (password === confirmPassword) {
      bcrypt.hash(password, 10, function (err, hash) {
        const user = new User({
          email: email,
          password: hash,
        });
        user.save().then((user) => {
          res.json(user);
        });
      });
    } else {
      res.json({ message: "Passwords do not match" });
    }
  } else {
    res.json({ message: "You must accept the terms and conditions" });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = User.findOne({ email: email }).then((user) => {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        res.json({ message: "Login successful", user: user });
      } else {
        res.json({ message: "Login failed" });
      }
    });
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id).then((user) => {
    res.json(user);
  });
});

app.get("/tunnels", async (req, res) => {
  const tunnels = await Tunnel.find();
  res.json(tunnels);
});

app.get("/tunnels/:appId", async (req, res) => {
  const tunnels = await Tunnel.find({ appData: req.params.appId });
  res.json(tunnels);
});

app.post("/tunnels", async (req, res) => {
  const { name, tags, appData } = req.body;
  const tunnel = new Tunnel({ name, tags, appData });
  await tunnel.save();
  res.json(tunnel);
});

app.put("/tunnels/:id", async (req, res) => {
  const { name } = req.body;
  const tunnel = await Tunnel.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json(tunnel);
});

app.delete("/tunnels/:id", async (req, res) => {
  await Tunnel.findByIdAndDelete(req.params.id);
  res.json({ message: "Tunnel deleted successfully" });
});

app.get("/tags", async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
});

app.get("/tags/:appId", async (req, res) => {
  const tags = await Tag.find({ appData: req.params.appId });
  res.json(tags);
});

app.post("/tags", async (req, res) => {
  const { name, appData } = req.body;
  const tag = new Tag({ name, appData: appData });
  await tag.save();
  res.json(tag);
});

app.put("/tags/:id", async (req, res) => {
  const { name } = req.body;
  const tag = await Tag.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json(tag);
});

app.delete("/tags/:id", async (req, res) => {
  await Tag.findByIdAndDelete(req.params.id);
  res.json({ message: "Tag deleted successfully" });
});

app.get("/stats", async (req, res) => {
  const stats = await Stat.find();
  res.json(stats);
});

app.post("/stats", async (req, res) => {
  const { appId, tunnelId, tags } = req.body;
  const stat = new Stat({ appId, tunnelId, tags });
  await stat.save();
  res.json(stat);
});

app.put("/stats/:id", async (req, res) => {
  const { tags } = req.body;
  const stat = await Stat.findByIdAndUpdate(
    req.params.id,
    { tags },
    { new: true }
  );
  res.json(stat);
});

app.delete("/stats/:id", async (req, res) => {
  await Stat.findByIdAndDelete(req.params.id);
  res.json({ message: "Stat deleted successfully" });
});

app.get("/mouse-track", async (req, res) => {
  const mouseTrack = await MouseEventTrack.find();
  res.json(mouseTrack);
});

app.get("/mouse-track/distinct/:appId", async (req, res) => {
  const appId = req.params.appId;
  const mouseTrack = await MouseEventTrack.aggregate([
    { $match: { appId } },
    {
      $group: {
        _id: "$pageUrl",
        id: { $first: "$_id" },
        clientId: { $addToSet: "$clientId" },
      },
    },
    {
      $project: {
        _id: "$id",
        pageUrl: "$_id",
        clientIdCount: { $size: "$clientId" },
      },
    },
    { $sort: { clientIdCount: -1 } }, // Sort by clientIdCount in descending order
  ]);

  res.json(mouseTrack);
});

app.get("/mouse-track/:id", async (req, res) => {
  const mouseTrack = await MouseEventTrack.find({ _id: req.params.id });
  res.json(mouseTrack);
});

app.get("/mouse-track/all/:appId", async (req, res) => {
  const mouseTrack = await MouseEventTrack.find({ appId: req.params.appId });
  res.json(mouseTrack);
});

app.get("/mouse-track/distinct/:id/:size", async (req, res) => {
  try {
    const decodedUrl = decodeURIComponent(req.params.id);
    const screenSize = req.params.size;

    const mouseTrack = await MouseEventTrack.aggregate([
      {
        $match: { pageUrl: decodedUrl, "mousePosition.screenSize": screenSize },
      },
      { $project: { _id: 0 } }, // Exclude the _id field
    ]);

    res.json(mouseTrack);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/mouse-track", async (req, res) => {
  console.log(JSON.parse(req.body.payload));
  const { event, timestamp, appId, visitorId, mousePosition, pageUrl } =
    JSON.parse(req.body.payload);
  const mouseTrack = new MouseEventTrack({
    event,
    timestamp,
    appId,
    clientId: visitorId,
    mousePosition,
    pageUrl,
  });
  await mouseTrack.save();
  res.json(mouseTrack);
});

app.get("/track", async (req, res) => {
  const track = await TrackEvent.find();
  res.json(track);
});

app.get("/track/:appId", async (req, res) => {
  const appId = req.params.appId;
  const dateSevenDaysAgo = new Date();
  dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

  const track = await TrackEvent.aggregate([
    {
      $match: { appId, event: "click", timestamp: { $gte: dateSevenDaysAgo } },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1,
      },
    },
  ]);

  res.json(track);
});

app.get("/track/distinct/:appId", async (req, res) => {
  const appId = req.params.appId;
  const dateSevenDaysAgo = new Date();
  dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

  const track = await TrackEvent.aggregate([
    {
      $match: { appId, event: "click", timestamp: { $gte: dateSevenDaysAgo } },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          clientId: "$clientId",
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.date",
        users: { $addToSet: "$_id.clientId" },
        count: { $sum: "$count" },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        users: 1,
        count: 1,
      },
    },
  ]);

  res.json(track);
});

app.get("/session/:appId", async (req, res) => {
  const appId = req.params.appId;
  const dateSevenDaysAgo = new Date();
  dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

  const track = await MouseEventTrack.aggregate([
    {
      $match: { appId, timestamp: { $gte: dateSevenDaysAgo } },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          clientId: "$clientId",
        },
      },
    },
    {
      $group: {
        _id: "$_id.date",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1,
      },
    },
  ]);

  res.json(track);
});

app.post("/track", async (req, res) => {
  const { event, tag, timestamp, appId, visitorId } = req.body;
  const track = new TrackEvent({
    event,
    tag,
    timestamp,
    appId,
    clientId: visitorId,
  });
  await track.save();
  res.json(track);
});

app.post("/createAppId", async (req, res) => {
  const { clientId, name, description } = req.body;
  const appId = new AppData({ clientId, name, description });
  await appId.save();
  const user = await User.findByIdAndUpdate(
    clientId,
    { $push: { appData: appId } },
    { new: true }
  );
  res.json(appId);
});

app.get("/analytics/users", async (req, res) => {
  const dateSevenDaysAgo = new Date();
  dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

  const track = await TrackEvent.aggregate([
    { $match: { event: "click", timestamp: { $gte: dateSevenDaysAgo } } },
    {
      $group: {
        _id: "$clientId",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        clientId: "$_id",
        count: 1,
      },
    },
  ]);

  // Find all distinct clientId and pageUrl in the MouseEventTrack collection
  const mouseTrack = await MouseEventTrack.aggregate([
    { $match: { event: "click", timestamp: { $gte: dateSevenDaysAgo } } },
    {
      $group: {
        _id: "$clientId",
        count: { $sum: 1 },
        pageUrl: { $addToSet: "$pageUrl" },
      },
    },
    {
      $project: {
        _id: 0,
        clientId: "$_id",
        count: 1,
        pageUrl: 1,
      },
    },
  ]);

  // Merge the TrackEvent and MouseEventTrack data
  const users = [...track, ...mouseTrack];

  // Calculate the bounce rate for each user
  const usersWithBounceRate = users.map((user) => {
    const { clientId, count, pageUrl } = user;
    const bounceRate = pageUrl.length === 1 ? 100 : 0; // Assume bounce rate is 100% if there is only one pageUrl, otherwise 0%
    return { clientId, count, bounceRate };
  });

  res.json(usersWithBounceRate);
});

app.get("/user-page-urls/:appId", async (req, res) => {
  const appId = req.params.appId;
  const dateSevenDaysAgo = new Date();
  dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

  const users = await MouseEventTrack.aggregate([
    {
      $match: { appId, timestamp: { $gte: dateSevenDaysAgo } },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          clientId: "$clientId",
        },
        pageUrls: { $addToSet: "$pageUrl" },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id.date",
        clientId: "$_id.clientId",
        pageUrls: 1,
      },
    },
    {
      $group: {
        _id: "$clientId",
        sessions: {
          $push: {
            date: "$date",
            pageUrls: "$pageUrls",
          },
        },
        uniquePageUrls: { $sum: { $size: "$pageUrls" } },
      },
    },
    {
      $project: {
        _id: 0,
        clientId: "$_id",
        sessions: 1,
        uniquePageUrls: 1,
        pageUrls: "$sessions.pageUrls",
      },
    },
  ]);

  res.json(users);
});

app.get("/analytics/average-session-time", async (req, res) => {
  const dateSevenDaysAgo = new Date();
  dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

  const mouseEventData = await MouseEventTrack.find({
    timestamp: { $gte: dateSevenDaysAgo },
  });

  const distinctDates = Array.from(new Set(mouseEventData.map((data) => data.timestamp.toISOString().split("T")[0])));

  const averageSessionTimes = distinctDates.map((date) => {
    const sessions = mouseEventData.filter((data) => data.timestamp.toISOString().split("T")[0] === date);
    const distinctClientIds = Array.from(new Set(sessions.map((data) => data.clientId)));

    const sessionStarts = sessions.map((session) => new Date(session.timestamp).getTime());
    const sessionEnds = sessions.map((session) => new Date(session.timestamp).getTime() + session.mousePosition.timestamp);

    const totalSessionTime = sessionEnds.reduce((acc, end, index) => {
      const start = sessionStarts[index];
      return acc + (end - start);
    }, 0);

    const averageSessionTime = sessions.length > 0 ? totalSessionTime / sessions.length : 0;

    return {
      date: date,
      clients: distinctClientIds.length,
      averageSessionTime: averageSessionTime,
    };
  });

  res.json(averageSessionTimes);
});


// Load Swagger documentation
swagger(app);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
