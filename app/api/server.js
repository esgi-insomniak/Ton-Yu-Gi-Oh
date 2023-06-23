const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const swagger = require('./swagger');
const bcrypt = require('bcrypt');

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
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Models
const { Tunnel, Tag, Stat, User } = require('./models');

// Routes
app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const terms = req.body.terms;
    if (terms === "on") {
        if (password === confirmPassword) {
            bcrypt.hash(password, 10, function (err, hash) {
                const user = new User({
                    email: email,
                    password: hash
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

app.post('/login', (req, res) => {
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

app.get('/tunnels', async (req, res) => {
    const tunnels = await Tunnel.find();
    res.json(tunnels);
});

app.post('/tunnels', async (req, res) => {
    const { name } = req.body;
    const tunnel = new Tunnel({ name });
    await tunnel.save();
    res.json(tunnel);
});

app.put('/tunnels/:id', async (req, res) => {
    const { name } = req.body;
    const tunnel = await Tunnel.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(tunnel);
});

app.delete('/tunnels/:id', async (req, res) => {
    await Tunnel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tunnel deleted successfully' });
});

app.get('/tags', async (req, res) => {
    const tags = await Tag.find();
    res.json(tags);
});

app.post('/tags', async (req, res) => {
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.json(tag);
});

app.put('/tags/:id', async (req, res) => {
    const { name } = req.body;
    const tag = await Tag.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(tag);
});

app.delete('/tags/:id', async (req, res) => {
    await Tag.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tag deleted successfully' });
});

app.get('/stats', async (req, res) => {
    const stats = await Stat.find();
    res.json(stats);
});

app.post('/stats', async (req, res) => {
    const { appId, tunnelId, tags } = req.body;
    const stat = new Stat({ appId, tunnelId, tags });
    await stat.save();
    res.json(stat);
});

app.put('/stats/:id', async (req, res) => {
    const { tags } = req.body;
    const stat = await Stat.findByIdAndUpdate(req.params.id, { tags }, { new: true });
    res.json(stat);
});

app.delete('/stats/:id', async (req, res) => {
    await Stat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stat deleted successfully' });
});

app.post('/createAppId', async (req, res) => {
    const { name } = req.body;
    const appId = new AppId({ name });
    await appId.save();
    res.json(appId);
});


// Load Swagger documentation
swagger(app);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

