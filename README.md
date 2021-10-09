# Social Network REST API

A simple REST API that takes care of user authentication as well as posts to the database.

## Endpoints

* `/api/auth/register` 
   * `POST`: Adds a new user account to the database. Responds with JWT if all fields are correct
* `/api/auth/login` 
   * `POST`: Authenticates a user from the database, ensuring the password is correct. Responds with JWT if password is correct for email
* `/api/posts`
   * `POST`: Requires JWT in header, adds a social media post to the database
   * `GET`: `[NOT YET IMPLEMENTED]` Requires JWT in header, returns a list of ALL social media posts within the database.  
