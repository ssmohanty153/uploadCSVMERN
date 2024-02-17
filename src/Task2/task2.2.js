import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import schedule from 'node-schedule';

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const Collection1 = mongoose.model('Collection1', new mongoose.Schema({ message: String }));
const Collection2 = mongoose.model('Collection2', new mongoose.Schema({ message: String }));

app.post('/post-service', async (req, res) => {
    const { message, day, time } = req.body;

    await Collection1.create({ message });

    const scheduleTime = new Date(day + ' ' + time);
    schedule.scheduleJob(scheduleTime, async () => {
        const data = await Collection1.findOneAndDelete({ message });
        if (data) {
            await Collection2.create({ message: data.message });
            console.log('Message transferred to Collection2:', data.message);
        }
    });

    res.status(200).json({ message: 'Message inserted and job scheduled successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
