import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import schedule from 'node-schedule';
import { ApiError } from "../utils/ApiError.js";
import { Collection1 } from '../models/collection1.model.js';
import { Collection2 } from '../models/collection2.model .js';

const postService = asyncHandler(async (req, res) => {
    try {
        const { message, day, time } = req.body;

        if (!message || !day || !time) {
            throw new ApiError(400, 'Missing required fields: message, day, time');
        }

        await Collection1.create({ message });

        const scheduleTime = new Date(day + ' ' + time);

        if (isNaN(scheduleTime.getTime())) {
            throw new ApiError(400, 'Invalid date format for day and time');
        }

        console.log('Scheduling job at:', scheduleTime);

        const job = schedule.scheduleJob(scheduleTime, async () => {
            console.log("Job executed at:", new Date());
            const data = await Collection1.findOneAndDelete({ message });
            if (data) {
                await Collection2.create({ message: data.message });
                console.log('Message transferred to Collection2:', data.message);
            }
        });
  
        return res.status(200).json(new ApiResponse(
            200,
            { message: 'Message inserted and job scheduled successfully' },
            "Message inserted and job scheduled successfully"
        ));

    } catch (error) {
        console.error("Error in postService:", error);
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(500, 'An error occurred during file processing.');
        }
    }
});

export { postService };
