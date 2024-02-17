import { parentPort, workerData } from 'worker_threads';
import csvParser from 'csv-parser';
import XLSX from 'xlsx';
import fs from 'fs';

const { filePath, db } = workerData;

function processCSVData(collection, filePath) {
    const data = [];
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', row => {
            data.push(row);
        })
        .on('end', () => {
            collection.insertMany(data, (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    parentPort.postMessage('Error occurred while uploading data');
                } else {
                    parentPort.postMessage('Data uploaded successfully');
                }
            });
        });
}

function processXLSXData(collection, filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    collection.insertMany(data.slice(1), (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            parentPort.postMessage('Error occurred while uploading data');
        } else {
            parentPort.postMessage('Data uploaded successfully');
        }
    });
}

// Process CSV or XLSX file based on file extension
const collection = db.collection('your_collection');
if (filePath.endsWith('.csv')) {
    processCSVData(collection, filePath);
} else if (filePath.endsWith('.xlsx')) {
    processXLSXData(collection, filePath);
}
