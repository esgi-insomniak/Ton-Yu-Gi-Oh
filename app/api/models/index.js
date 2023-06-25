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

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

const mouseEventTrackSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    appId: {
        type: String,
        required: true,
    },
    mousePosition: {
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        timestamp: {
            type: Number,
            required: true,
        },
        screenSize: {
            type: String,
            required: true,
        },
    }
})

const MouseEventTrack = mongoose.model('MouseEventTrack', mouseEventTrackSchema);

const trackEventSchema = new mongoose.Schema({
    event: {
        type: String,
        enum: ["click", "hover", "scroll", "time"],
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    appId: {
        type: String,
        required: true,
    },
})

const TrackEvent = mongoose.model('TrackEvent', trackEventSchema);
    

module.exports = { Tunnel, Tag, Stat, AppId, User, MouseEventTrack, TrackEvent };
