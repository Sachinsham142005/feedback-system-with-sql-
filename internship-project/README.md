Project README – Feedback Management System



**Project Overview**

This is a simple full-stack feedback management application.

Users can submit feedback through a public form, and an authenticated admin can view and manage submissions through a protected dashboard.







**The application is built using:**

Node.js

Express.js

MySQL

EJS templates

Bootstrap for UI





**Folder Structure**

internship-project

│

├── views

│   ├── index.ejs

│   ├── result.ejs

│   ├── dashboard.ejs

│   ├── login.ejs

│   ├── signup.ejs

│

├── server.js

├── package.json

└── package-lock.json







**File Descriptions**



**1. server.js**



Main backend file of the application.



Responsibilities:



Starts the Express server



Connects to the MySQL database



Handles all routes:



Feedback submission



User signup and login



Dashboard display



Delete functionality



Manages sessions for authentication



Controls access to the dashboard



2**. views/index.ejs**



Public feedback form.



Responsibilities:



Displays the form for users



Collects:



Name



Email



Message



Sends form data to the server for storage



**3. views/result.ejs**



Feedback submission confirmation page.



Responsibilities:



Displays the submitted:



Name



Email



Message



Confirms successful submission



**4. views/dashboard.ejs**



Admin dashboard page.



Responsibilities:



Displays all feedback from the database



Shows submissions in a table format



Allows deletion of entries with admin password



Provides logout option



Access:



Only available to logged-in users



**5. views/login.ejs**



Admin login page.



Responsibilities:



Allows existing users to log in



Sends credentials to the server



Redirects to dashboard on success



**6. views/signup.ejs**



Admin account creation page.



Responsibilities:



Allows creation of new admin users



Stores credentials securely in the database



Redirects to login after signup



**7. package.json**



Project configuration file.



Responsibilities:



Lists project dependencies



Defines project metadata



Used by npm to install required packages



**8. package-lock.json**



Auto-generated dependency lock file.



Responsibilities:



Stores exact versions of installed packages



Ensures consistent installations across systems



Database Tables

feedback



Stores user feedback.



Columns:



id (Primary Key)



name



email



message



users



Stores admin login credentials.



Columns:



id (Primary Key)



username



password (hashed)



Main Features



Public feedback submission form



MySQL database storage



Admin authentication (signup/login)



Protected dashboard



Password-protected delete action



How to Run the Project







**Install dependencies:**



npm install





Start the server:



node server.js





Open in browser:



http://localhost:3000

