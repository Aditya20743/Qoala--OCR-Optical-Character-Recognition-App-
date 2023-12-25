const path = require('path');
const express = require('express');
const connectDB = require('./config/database')
const citizenRoutes = require('./routes/citizenRoutes')
const vision = require('@google-cloud/vision');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './config/.env' });


connectDB()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/citizen', citizenRoutes)


// Multer setup
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Images only!");
    }
  }
const upload = multer({ 
    storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
 });

const CONFIG = {
    credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpTMhol/cEgcpg\nZPIG24kd7wEdHYaRa5qoW/ub4L8bydU1RvxSUvux8ziaq/lMk8RYAtOb0LYx/du4\ntHWFw/Z21d4Nt6SdcPlN4AooRIYGOOHd+LNnvPZOzZjxeoyY6OOftULL88O9TNsD\njERiV01gzmbn+OEsmP00e192KoWpB4vvsoc1WDSFF9ROG8Bc0Oxx/L7CAMYwa2KH\nL3LXzg9TOfGaxV+5c6drFu1+1D2qHnebDOllx0vq+7PGDcdy6TGezjSe5a87mTZ0\ni0ANykNj0QeI6P84i3Xm5O5Kfy1xUEXUYHOwRy2RnUynuvtamQCB7qcz4oFdSH7D\n7SrqeW0DAgMBAAECggEAA8DlDJSZ8GqkPwDd8NL7NkOvRaL68cxt8F+hs3IHKqmN\n5ZF+VKDsXaSj06IOc+kuyDi/0kuNToxvS6gMlvuiQj45nxo8NxVjIZve/cePJSIr\nt80kxR8GYvbh9jCeX2GCcm8FXRo5c7/5dxmsBnYjDAtncqss6t01d+1oT2lf70Bn\nUCvV7eHlsXUMkgYzXZ0hGiSRgm/fXbNBkYnj7EvtT5xoeOr7wkRg48KqK7nHOp1C\nkbX6emyVJU9+BGB61rii5CEeb8f0Bavh6fjzbrjjKkxPYgCcRMmMWdlvk5rA8NTz\nNgyvEp4+4EEMsUEpyouU/Zs6STVz+MnwZB8lmVT1SQKBgQDjqFCDBCPPZ+M/qGCn\nTfF/K6YVbb/2zUOX6y77IfqWeV0P58lgMelAk5Ko4c6yJpvVQpJTLP2b43P8MGgO\njRAhlb5LCz0Kll0cVCl0lPfxKVNRsgx6DO3m3E75y1RfB4RqCwKFKPWFgSpbGdze\neUZvfEX2rSehL7dJEKf49eXnLwKBgQC+YI0qH0OfMYMnwDMDPlspCthlfv/U7KXk\n5b5Q6ohPLRKao2ZLxj00QG0zGh+g8HvoHvICJ1Wn8ZIN8HjuxpQ94qbOG/V+1NJ2\neWFe/4xlDD8LPCuUmtJj+0uHbgTUegZYWdviUYaaDrNC5imwZnRMzfIAnVPzVvym\n+lrqVspibQKBgHYN9VpLjkpipByBs0VvDNmWh/S6yf4w6WlhYyaFs03Ot6yk1O+W\nUk/Tdw0us6H8lXjcocaSIR1ysNXJQFyzV/cikOCXflr8KGKlXi3/hie/9135B7FO\n/RtniWjNwP3ahxb6iJ8G43MMzSsa2Udg+l6bwiguGMvkU5aHFaPr2AGvAoGAeiQ6\nDX9XhEhg7Fz8naUhGZjys1Oi0bouyUe5LfL7F0lEuWACXrVGSULYjMPC7R+9b3SD\nMmyIISL04OqavB89tuK2wF/hxsjGaup/VVLBgYc034FwOHyIZUsx7ybgBG5xqbel\nQnOp1yd9TXub3aguD6TGEizeUq5JlNvk/ppGaJUCgYEAi1zr0NeWlaMp8frjXhyF\nGzkt5nl3hnADoyRB1XPA2VrG6G3BnfbDR8XnH4WAkeqgboJiNACnUV9D9OqbU996\nWXm0/SC65S5mfSKJ+4GPjGSR8OUQK6+Kx/Jj5tZJnVOKHYz4Dkr7spX+eRNi7o03\nVgsiH7u1SwMoEcHhs0zysSg=\n-----END PRIVATE KEY-----\n",
        client_email: "quala-project@omega-buckeye-341405.iam.gserviceaccount.com",
    }
  }
  
const client = new vision.ImageAnnotatorClient(CONFIG);



console.log(CONFIG.credentials);



// Endpoint to perform text detection
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const fileName = 'uploads/' + req.file.filename
      console.log(fileName)
     // Performs text detection on the local file
      const [result] = await client.textDetection(fileName);
      console.log(result)
      const detections = result.textAnnotations;
      const textResults = await detections.map(text => text.description);
      // Join the array elements into a single string for easier processing
      const englishDateRegex = /\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\. \d{4}\b/g;
      // Function to extract English dates from text using the regex
      function extractEnglishDates(text) {
      return text.match(englishDateRegex) || [];
      }

      // Array to store all extracted English dates
      let allEnglishDates = [];

      // Loop through each text result and extract English dates
      textResults.forEach(result => {
      const englishDatesInResult = extractEnglishDates(result);
      allEnglishDates = allEnglishDates.concat(englishDatesInResult);
      });

      const joinedText = textResults.join(' ');

      // Regular expressions to extract information
      const idNumberRegex = /\b\d+ \d+ \d+ \d+ \d+\b/g;
      const firstNameRegex = /\bName\s+([\s\S]+?)\n/;
      const lastNameRegex = /\bLast\s+name\s+(\S+)/;

      // Extract information using regular expressions
      const idNumber = joinedText.match(idNumberRegex)[0];
      const firstName = joinedText.match(firstNameRegex)[1];
      const lastName = joinedText.match(lastNameRegex)[1];
      const dateOfBirth = allEnglishDates[0];
      const issueDate = allEnglishDates[1];
      const expiryDate = allEnglishDates[2];

      function formatDate(dateString) {
          const date = new Date(dateString);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
      }

      const responseObject = {
          idNumber: idNumber,
          name: firstName,
          last_name: lastName,
          "date_of_birth": formatDate(dateOfBirth),
          "date_of_issue": formatDate(issueDate),
          "date_of_expiry": formatDate(expiryDate)
      };
      
      // Sending the JSON response
      res.send(responseObject);
      console.log(responseObject)
      console.log("image recieved")
      // res.json({ textResults });
    } catch (error) {
        console.error('Error during text detection:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

