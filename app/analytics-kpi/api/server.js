const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const swagger = require('./swagger');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
app.use(cors());

// MongoDB configuration
mongoose
    .connect('mongodb://localhost:27017/web-analytics', { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Load Swagger documentation
swagger(app);

// Models
const { Tunnel, Tag, Stat } = require('./models');

// Routes
app.post('/register', (req, res) => {
    // TODO: Implement register logic
});

app.post('/login', (req, res) => {
    // TODO: Implement login logic
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

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
