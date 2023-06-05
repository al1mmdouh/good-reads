# Good-Reads Backend Repository

## Project Description:

The Good-Reads Backend repository is a simple pure backend application built using NodeJS, ExpressJS, and Mongoose ODM. The purpose of this project is to provide a backend infrastructure for a website that caters to two types of users: readers and admins. The website primarily focuses on managing authors, books, categories, and shelves for readers.

## Project Features:

As a team, we have implemented the following features in this project:

1- Request Logging: We have incorporated the use of Morgan to log all incoming requests, ensuring comprehensive request tracking.

2- Validation: We have implemented thorough validation mechanisms for all HTTP requests, including POST, GET, PUT, and DELETE methods.

3- Express Validator: To ensure data integrity, we have utilized Express Validator to validate request bodies, parameters, and queries.

4- RESTful APIs: We have designed our APIs to adhere to RESTful standards, enabling efficient and standardized communication.

5- Reader Registration: Readers can register on the website, and we have implemented an email check to prevent duplicate registrations.

6- JWT Authentication: We have integrated JWT authentication, allowing readers to securely log in to their accounts.

7-Reader Actions: Readers have the ability to view books, add books to their shelves, and rate books based on their preferences.

8- Authorization: To maintain data integrity, we have implemented authorization mechanisms to restrict reader access to editing books, categories, and authors. Only admins have the privileges to perform these actions.

9- File Uploads: We have incorporated Multer to handle photo uploads for books and authors, enhancing the visual experience for users.

10 Error Handling: We have implemented error middlewares to effectively handle any errors that may occur during the application's execution, ensuring a seamless user experience.

By combining these features, the Good-Reads Backend repository provides a robust and professional backend solution for managing books, authors, categories, and shelves, catering to the needs of both readers and admins.

![Alt Text](url)
