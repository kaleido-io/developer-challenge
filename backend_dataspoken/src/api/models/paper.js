import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema(
    {
        onChainId: Number,
        author: String,
        title: String,
        organization: String,
        figures: mongoose.Schema.Types.Mixed
    }, {
        timestamps: true
    }
);

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;
