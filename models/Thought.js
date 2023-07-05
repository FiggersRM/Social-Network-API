const { Schema, model } = require("mongoose");
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true
        }
    }
);

function formatDate(date) {
    return dayjs(date).format('M/D/YYYY');
}