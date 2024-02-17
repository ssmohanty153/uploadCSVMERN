
// import { asyncHandler } from '../utils/asyncHandler.js';
// import { User } from '../models/user.model.js'
// import { Agent } from '../models/agent.models.js'
// import { UserAccount } from '../models/account.models.js'
// import { PolicyCatagory } from '../models/policyCatagory.models.js'
// import { Carrier } from '../models/carrier.models.js'
// import { PolicyInfo } from '../models/policyInfo.model.js'
// import csv from 'csvtojson'
// import { ApiResponse } from "../utils/ApiResponse.js";

// const uploadcsv = asyncHandler(async (req, res) => {
//     try {
//         csv()
//             .fromFile(req.file.path)
//             .then(async (jsonObj) => {
//                 let userData = [];
//                 const transformedDataForUser = jsonObj.map(record => ({
//                     firstName: record.firstname,
//                     dob: new Date(record.dob),
//                     address: record.address,
//                     phone: record.phone,
//                     state: record.state,
//                     zipCode: record.zip,
//                     email: record.email,
//                     gender: record.gender || 'Unknown',
//                     userType: record.userType,
//                     policyNumber: record.policy_number,
//                 }));
//                 const transformedDataForAgent = jsonObj.map(record => ({
//                     agentName: record.agent,
//                     policyNumber: record.policy_number,
//                 }));
//                 const transformedDataForAccount = jsonObj.map(record => ({
//                     policyNumber: record.policy_number,
//                 }));

//                 const transformedDataForCarrier = jsonObj.map(record => ({
//                     companyName: record.company_name,
//                     policyNumber: record.policy_number,
//                 }));
//                 const transformedDataForPolicyCatagory = jsonObj.map(record => ({
//                     categoryName: record.category_name,
//                     policyNumber: record.policy_number,
//                 }));
//                 const transformedDataForPolicyPolicyInfo = jsonObj.map(record => ({
//                     policyNumber: record.policy_number,
//                     policyStartDate: new Date(record.policy_start_date),
//                     policyEndDate: new Date(record.policy_end_date),
//                     policyCategory: new Date(record.policy_type),
//                     premiumAmount: record.premium_amount
//                 }));
//                 await User.insertMany(transformedDataForUser);
//                 await Agent.insertMany(transformedDataForAgent);
//                 await Carrier.insertMany(transformedDataForCarrier);
//                 await UserAccount.insertMany(transformedDataForAccount);
//                 await PolicyCatagory.insertMany(transformedDataForPolicyCatagory);
//                 await PolicyInfo.insertMany(transformedDataForPolicyPolicyInfo);
//                 console.log(transformedDataForUser);
//                 return res.status(201).json(
//                     new ApiResponse(200, "successful", "User registered Successfully")
//                 )
//             })

//     } catch (error) {
//         // Handle errors
//         console.error("Error in uploadcsv:", error);
//         res.status(500).send('An error occurred during file processing.');
//     }
// });

// export default uploadcsv;


import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { Agent } from '../models/agent.models.js';
import { UserAccount } from '../models/account.models.js';
import { PolicyCatagory } from '../models/policyCatagory.models.js';
import { Carrier } from '../models/carrier.models.js';
import { PolicyInfo } from '../models/policyInfo.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { Worker } from 'worker_threads';
import { ApiError } from "../utils/ApiError.js";

const uploadcsv = asyncHandler(async (req, res) => {
    try {
        const worker = new Worker('./src/utils/worker.js');

        worker.on('message', async (data) => {
            if (data.success) {
                await User.insertMany(data.data.users);
                await Agent.insertMany(data.data.agents);
                await Carrier.insertMany(data.data.carriers);
                await UserAccount.insertMany(data.data.accounts);
                await PolicyCatagory.insertMany(data.data.policyCategories);
                await PolicyInfo.insertMany(data.data.policyInfos);
                return res.status(201).json(
                    new ApiResponse(200, "updated successfully", "Data updated in DB")
                );
            } else {
                console.error("Error in uploadcsv:", data.error);
                throw new ApiError(500, 'An error occurred during file processing.');
            }
        });

        worker.on('error', (error) => {
            console.error("Error in uploadcsv:", error);
            throw new ApiError(500, 'An error occurred during file processing.');
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
                throw new ApiError(500, 'An error occurred during file processing.');
            }
        });

        worker.postMessage(req.file.path);
    } catch (error) {
        console.error("Error in uploadcsv:", error);
        throw new ApiError(500, 'An error occurred during file processing.');
    }
});

const finduser = asyncHandler(async (req, res) => {
    try {
        let usernameWithColon = req.params.username;
        let username = usernameWithColon.substring(1);
        // console.log(username,"jhjhjh")
        const user = await User.findOne({ firstName: username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const policyInfo = await PolicyInfo.find({ policyNumber: user.policyNumber });


        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    policyInfo,
                    "Policy details got successful"
                )
            )
    } catch (error) {
        console.error("Error in finding policy info:", error);
        throw new ApiError(500, 'An error occurred during the operation.');
    }
});

const aggregateduser = asyncHandler(async (req, res) => {
    try {
        const aggregatedPolicyInfo = await PolicyInfo.aggregate([
            {
                $group: {
                    _id: "$policyNumber",
                    totalPremium: { $sum: "$premiumAmount" },
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "policyNumber",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    _id: 0,
                    firstName: "$userDetails.firstName",
                    dob: "$userDetails.dob",
                    address: "$userDetails.address",
                    phone: "$userDetails.phone",
                    state: "$userDetails.state",
                    zipCode: "$userDetails.zipCode",
                    email: "$userDetails.email",
                    gender: "$userDetails.gender",
                    userType: "$userDetails.userType",
                    policyNumber: "$_id",
                    policyStartDate: "$policyStartDate",
                    policyEndDate: "$policyEndDate",
                    policyCategory: "$policyCategory",
                    premiumAmount: "$totalPremium"
                }
            }
        ]);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    aggregatedPolicyInfo,
                    "geting all the policy details"
                )
            )

    } catch (error) {
        console.error("Error in finding policy info:", error);
        res.status(500).send('An error occurred during the operation.');
    }
});


export { uploadcsv, finduser, aggregateduser };
