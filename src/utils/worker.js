import csv from 'csvtojson'
import { parentPort } from 'worker_threads'

parentPort.on('message', async (filePath) => {
    try {
        const jsonObj = await csv().fromFile(filePath);
        const transformedData = {
            users: jsonObj.map(record => ({
                firstName: record.firstname,
                dob: new Date(record.dob),
                address: record.address,
                phone: record.phone,
                state: record.state,
                zipCode: record.zip,
                email: record.email,
                gender: record.gender || 'Unknown',
                userType: record.userType,
                policyNumber: record.policy_number,
            })),
            agents: jsonObj.map(record => ({
                agentName: record.agent,
                policyNumber: record.policy_number,
            })),
            accounts: jsonObj.map(record => ({
                policyNumber: record.policy_number,
            })),
            carriers: jsonObj.map(record => ({
                companyName: record.company_name,
                policyNumber: record.policy_number,
            })),
            policyCategories: jsonObj.map(record => ({
                categoryName: record.category_name,
                policyNumber: record.policy_number,
            })),
            policyInfos: jsonObj.map(record => ({
                policyNumber: record.policy_number,
                policyStartDate: new Date(record.policy_start_date),
                policyEndDate: new Date(record.policy_end_date),
                policyCategory: record.policy_type,
                premiumAmount: record.premium_amount,
            }))
        };
        parentPort.postMessage({ success: true, data: transformedData });
    } catch (error) {
        parentPort.postMessage({ success: false, error: error.message });
    }
});
