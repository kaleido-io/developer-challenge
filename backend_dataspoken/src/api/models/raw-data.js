import mongoose from 'mongoose';

const rawDataSchema = new mongoose.Schema(
    {
        onChainId: Number,
        createdBy: String,
        dataType: String,
        dataHash: String,
        description: String,
    }, {
        timestamps: true
    }
);

const RawData = mongoose.model('RawData', rawDataSchema);

export default RawData;
