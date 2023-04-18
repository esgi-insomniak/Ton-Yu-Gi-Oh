const mongoose = require('mongoose');

const tunnelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Tunnel = mongoose.model('Tunnel', tunnelSchema);

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Tag = mongoose.model('Tag', tagSchema);

const statSchema = new mongoose.Schema({
    appId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AppId',
        required: true,
    },
    tunnelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tunnel',
        required: true,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
});

const Stat = mongoose.model('Stat', statSchema);

const appIdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const AppId = mongoose.model('AppId', appIdSchema);

module.exports = { Tunnel, Tag, Stat, AppId };
