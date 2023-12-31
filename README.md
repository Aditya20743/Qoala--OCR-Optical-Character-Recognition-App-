Error Occured during Deploy due to Need of Premium for Uploading Images on Backend hosting provider - Onrender or we could use Cloudinary 

Demo Working Video-

https://github.com/Aditya20743/Qoala--OCR-Optical-Character-Recognition-App-/assets/79308024/15598f31-cbdc-4eb4-8426-a44a0f65e446




**FEATURE:**

OCR Processing: Integrates with Google Vision API for accurate text extraction from Thai ID card images.
Data Extraction: Parses OCR results to extract key information.
User Interface: Provides a simple UI to upload ID card images, displays JSON output, lists successful and failed OCR operations, and offers filtering options for query history.
Database Integration: Uses a chosen database to store and manage OCR data. Implements CRUD API endpoints:
Create a New OCR Record
Retrieve and Display OCR Data with filtering options
Delete OCR Records


**GETTING STARTED**

Please ensure you have the following dependencies installed on your system:

- ℹ️ NodeJS > v18.16

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd Frontend
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)

```

In the second terminal

- cd Backend and Set environment variables in .env
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  --- .env  ---

NODE_ENV = development
PORT =5000
URI =http://localhost:3000
MONGO_URI =
client_email =
private_key =
```

**- Install the modules**

npm install


**Running the temporary server**

cd Backend

node server.js

the backend will run on http://localhost:5000/

**run the Frontend **

cd Frontend

npm start

the backend will run on http://localhost:3000/





**Acknowledgments**

I would like to express my gratitude to Qoala for providing me with this amazing opportunity. Through this assignment, I have had the chance to learn a great deal. I am eagerly looking forward to working at Qoala and tackling similar problems that can have a real impact on the world.
