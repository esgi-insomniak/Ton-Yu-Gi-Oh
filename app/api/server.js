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
        clientId: { $addToSet: "$clientId" }
      }
    },
    {
      $project: {
        _id: "$id",
        pageUrl: "$_id",
        clientIdCount: { $size: "$clientId" }
      }
    }
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
      { $match: { pageUrl: decodedUrl, "mousePosition.screenSize": screenSize } },
      { $project: { _id: 0 } }, // Exclude the _id field
    ]);

    res.json(mouseTrack);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/mouse-track", async (req, res) => {
  console.log(req.body.data);
  const { event, tag, timestamp, appId, clientId, mousePosition, pageUrl } =
    req.body.data;
  const mouseTrack = new MouseEventTrack({
    event,
    tag,
    timestamp,
    appId,
    clientId,
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
    { $match: { appId, event: "click", timestamp: { $gte: dateSevenDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0, // Exclude the default MongoDB _id field
        date: "$_id",
        count: 1
      }
    }
  ]);

  res.json(track);
});

app.get("/track/distinct/:appId", async (req, res) => {
  const appId = req.params.appId;
  const dateSevenDaysAgo = new Date();
  dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

  const track = await TrackEvent.aggregate([
    { $match: { appId, event: "click", timestamp: { $gte: dateSevenDaysAgo } } },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          clientId: "$clientId"
        },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: "$_id.date",
        users: { $addToSet: "$_id.clientId" },
        count: { $sum: "$count" }
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        users: 1,
        count: 1
      }
    }
  ]);

  res.json(track);
});



app.post("/track", async (req, res) => {
  console.log(req.body);
  const { event, tag, timestamp, appId, clientId } = req.body.data;
  const track = new TrackEvent({ event, tag, timestamp, appId, clientId });
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

// Load Swagger documentation
swagger(app);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
