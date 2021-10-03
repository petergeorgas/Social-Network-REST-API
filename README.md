# Social Network REST API

A simple REST API that takes care of user authentication as well as posts to the database.

## Endpoints

* `/api/auth/register` 
   * `POST`: Responds with JWT if all fields are correct
* `/api/auth/login` 
   * `POST`: Responds with JWT if password is correct for email
* `/api/posts`
   * `POST`: Requires JWT in header, adds a social media post to the database
   * `GET`: Requires JWT in header, returns a list of ALL social media posts within the database.  
