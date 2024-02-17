# User Controller

## Overview

This user controller handles user-related functionalities such as registration, login, logout, token generation, and profile updates.

## File Structure

- **policy.controller.js**: Main file containing user-related controller functions.
- **utils/ApiError.js**: Utility class for creating custom API errors.
- **utils/ApiResponse.js**: Utility class for creating standardized API responses.
- **utils/asyncHandler.js**: Utility function for handling asynchronous functions.
- **models/user.model.js**: User model definition.

## Controller Functions


## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables.
4. Run the application using `npm start`.


## Project Structure

- **src/controllers**: Contains controllers handling various aspects of the application.
- **src/models**: Defines MongoDB models for data storage.
- **src/utils**: Includes utility functions for common tasks.
- **src/server.js**: Entry point for the server.
- **.env**: Configuration file for environment variables.


##  To run task 2 use npm run task

Upload CSV File

Description: This controller function uploads a CSV file, parses its contents, and saves the data into the MongoDB database.

Functionality:

Read the uploaded CSV file.
Parse the CSV data into JSON format.
Transform the JSON data according to the schema of different MongoDB collections.
Insert the transformed data into the respective MongoDB collections.
Respond with a success message if the data insertion is successful.
Endpoint: POST /upload-csv

Request Body:

javascript
Copy code
{
  "file": <CSV file to upload>
}
Response:

css
Copy code
Status Code: 201 (Created)
Body: { "message": "Data uploaded successfully" }
Find User by Username

Description: This controller function retrieves policy information for a user based on their username.

Functionality:

Extract the username from the request parameters.
Find the user in the MongoDB database based on the username.
Retrieve policy information associated with the user.
Respond with the policy information if the user is found.
Endpoint: GET /users/:username

Request Parameters:

username: Username of the user to search for
Response:

less
Copy code
Status Code: 200 (OK)
Body: Policy information associated with the user
Aggregate Policy Information by User

Description: This controller function aggregates policy information by each user and returns the aggregated data.

Functionality:

Aggregate policy information by policy number.
Perform a lookup to fetch user details associated with each policy number.
Project the aggregated data along with user details.
Respond with the aggregated policy information.
Endpoint: GET /aggregated-policy-info

Response:

less
Copy code
Status Code: 200 (OK)
Body: Aggregated policy information by user

## Question

1) Agent - Agent Name

2) User - first name, DOB, address, phone number, state, zip code, email, gender, userType

3) User's Account - Account Name

4) Policy Category(LOB) - category_name

5) Policy Carrier - company_name

6) Policy Info -  policy number, policy start date, policy end date, policy category, collection id, company collection id, and user id.

 

You have to perform the following tasks based above information:

 

Task 1:

1) Create API to upload the attached XLSX/CSV data into MongoDB. (Please accomplish this using worker threads)

2) Search API to find policy info with the help of the username.

3) API to provide aggregated policy by each user.

4) Consider each info as a different collection in MongoDB (Agent, User, User's Account, LOB, Carrier, Policy).

 

Task 2:

1) Track real-time CPU utilization of the node server and on 70% usage restart the server.

2) Create a post-service that takes the message, day, and time in body parameters and it inserts that message into DB at that particular day and time.

 

INSTRUCTION TO PERFORM TASK 2 (ii) PART

Task 2 => 2 ) This task is independent of the above task. You can have two collections, collection and collection 2. On post request, a message and timestamp will get saved into the collection and a job will be scheduled on the timestamp which transfers the message from collection 1 to collection 2