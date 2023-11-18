# News Aggregator API

1. This API is used to fetch news, perform CRUD on newsDb and have some authentication with users.
2. This project also fetches news by category from NewsAPI.
3. Added Helmet and Express Validators with custom input validatotrs for Input Validation and Sanitization.
4. Added Unit test cases , End-to-End , Integration testing for better bug free code and smooth running.
5. Added Performance Optimization , Rate Limiting , Email Verification , Request Logging for better logs and App.


## User APIs

### POST : Register
- To register user
  ENDPOINT : 
  ``` /api/users/register ```
  Request Body : 
  ```
  {
    "user_name":"Rahul",
    "user_email":"something@outlook.com",
    "password" : "password"
  }
  ```

### POST : login
- To login and get jwt
  ENDPOINT :
   ``` /api/users/login ```

   Request Body : 
  ```
  {
    "user_name":"Mishra",
    "user_email":"something@gmail.com",
    "password" : "password"
  }
  ```
  

### GET : User News Preferences
- Get all the newspreferences by userId
  ENDPOINT : ``` /api/users/preferences/:id ```

### PUT : User News Preference
- API responsible for Adding the news preferences
  ENDPOINT : ``` /api/users/preferences/:id ```

## News APIs
- All APIs under /api/news are authenticated except for '/'
### GET : All
- Get all news, No need to login 
  Endpoint : 
``` /api/news/ ```

### GET : Preferences
 News by user preferences
  Endpoint : 
``` /api/news?userId ```

### GET : Search
 News by search preferences
  Endpoint : 
``` /api/news/search/keyword to search```

### GET : Category
It fetches the news by category
Categories are 
 - [] business
 - [] entertainment
 - [] general
 - [] health
 - [] science
 - [] sports
 - [] technology
ENDPOINT : ``` /api/news/category/categoryName ```

### GET : List Categories
 lists all news categories
  Endpoint : 
``` /api/news/categories```

### GET : Read
 Get read news by userid
  Endpoint : 
``` /api/news/read/userId```

### GET : Favorites
 Get Favorite news by userid
  Endpoint : 
``` /api/news/favorite/userId```


### POST : Mark Read
  Mark news as read
- Req body : 
```
{"user_id": "a30b778f-6952-4fb2-8747-3ffbc045860a"}
```
  Endpoint : 
``` /api/news/:newsId/read ```


### POST : Mark Favorite
  Mark news as favorite
- Req body : 
```
{"user_id": "a30b778f-6952-4fb2-8747-3ffbc045860a"}
```
  Endpoint : 
``` /api/news/:newsId/favorite ```


# FilterData types

| Key | Operations |
| --- | --- |
| 1 | Get user by id |
| 2 | All users except id |
| 3 | News by id |
| 4 | User by email |
| 5 | News by category |