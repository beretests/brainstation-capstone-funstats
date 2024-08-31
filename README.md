# Project Title

FunStats

## Overview

FunStats is an app for kids who play soccer to add their stats and compare them to their friends, and also possibly set stat goals to earn rewards.

### Problem

Kids who play soccer (or any other sport for that matter) are typically competitive and often compare their stats with friends (or even siblings) who are players on their team, or other teams especially if they go to the same school. They usually have to rely on their memory (which can sometimes lead to conflict) as most sport teams use apps with features that are mainly focused on scheduling games and practices, as well as updating the whole team stats (games won and games lost). They do not have robust features for individual players to view and update their stats. The kids will not only be able to compare their stats with their friends, this will also help to boost their motivation to keep playing as they observe their skills progressively improve.

### User Profile

- Kid soccer players:
  - looking to be able to view and update their game season stats
  - looking to compare their stats with friends
  - looking to earn/give rewards as the stats improve

### Features

- As a player, I want to be able to create an account to manage my stats
- As a player, I want to be able to login to my account to manage my stats
- As a logged in player, I want to be able to view, update and/or add new stats after each game
- As a logged in player, a modal with a famous soccer player's image and stats is displayed each time I add a new stat giving the opportunity to earn points if I can guess his name correctly.
- As a logged in player, I want to be able to add other players as friends
- As a logged in player, I want to be able to compare my stats to a friend's

## Implementation

### Tech Stack

- React
- Javascript
- MySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
    react-bootstrap
- Server libraries:
  - knex
  - express
  - dotenv
  - bcrypt
  - jsonwebtoken

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Home page
- Profile + Friends page
- View + Compare Stats
- Register
- Login

### Mockups

#### Home Page
![image](https://github.com/user-attachments/assets/bd3621d4-935e-4c78-84bc-0b663e3b40b1)


#### Register Page
![image](https://github.com/user-attachments/assets/4daf1be7-0aae-40d7-9b1a-8c7c08f0c8e0)



#### Login Page
![image](https://github.com/user-attachments/assets/0e95d357-fd62-4618-95bb-2a3af13b41eb)



#### Profile Page
![image](https://github.com/user-attachments/assets/4b7a949c-46a5-48cc-8fe3-23e541c7d7c6)



#### Profile Page (friends list)

![image](https://github.com/user-attachments/assets/2d759246-5d68-4e28-9752-bd095729d42a)



#### View Stats Page (own stats only)
![image](https://github.com/user-attachments/assets/9d765a7f-293e-4890-a099-c71d99b50dde)



#### View Stats Page (compared state)

![image](https://github.com/user-attachments/assets/bc477955-249e-4704-b9ec-4620ffcc2a51)



#### Update Stats Page (coming soon)

![placeholder]()

### Data

![image](https://github.com/user-attachments/assets/6c9da142-8e90-46c3-8556-566011297d04)


![image](https://github.com/user-attachments/assets/fbcdce0d-1a18-4a18-8d36-656564797ad1)


### Endpoints

**GET /player/:id**
- Get player's profile information

Parameters:
- token: JWT token

Response:
```json
{
    "id": "3aa3a66a-bc1d-4f52-83fc-88d39e2a1cce",
    "name": "Elvis Omeje",
    "profile_pic": "https://funstats-images.beretesting.com/funstats-3.jpg",
    "DOB": 1347948000,
    "position": "Center Forward"
}
```

**GET /player/:id/friends**

- Get player's friends list

Parameters:
- id: player id as uuid
- token: JWT token

Response
```json
[
    {
        "id": "2ea69397-b3de-4d5b-be4d-d3d5fee25de1",
        "username": "roronoa_zoro",
        "name": "Eric Omeje",
        "profile_pic": "https://funstats-images.beretesting.com/funstats-5.jpg",
        "DOB": 1280556000,
        "position": "Center Back"
    },
    {
        "id": "bd9c78f3-4442-4876-8f9e-1a869afcf6da",
        "username": "goal_master",
        "name": "Maria Sanchez",
        "profile_pic": "https://funstats-images.beretesting.com/funstats-4.jpg",
        "DOB": 1435708800,
        "position": "Goalkeeper"
    },
    {
        "id": "c5b172ec-e1f5-4cde-ae7e-017e14509e15",
        "username": "winger_whiz",
        "name": "Noah Smith",
        "profile_pic": "https://funstats-images.beretesting.com/funstats-1.jpg",
        "DOB": 1405296000,
        "position": "Winger"
    }
]
```

**GET /player/:id/stats**

- Get player stats
  
Parameters:
- id: player id as uuid
- token: JWT token

Response:
```json
{
    "name": "Elvis Omeje",
    "profile_pic": "https://funstats-images.beretesting.com/funstats-3.jpg",
    "id": "3aa3a66a-bc1d-4f52-83fc-88d39e2a1cce",
    "goals_scored": "5",
    "assists": "12",
    "shots_on_target": "11",
    "tackles": "9",
    "interceptions": "10",
    "saves": "0",
    "yellow_cards": "1",
    "red_cards": "1",
    "fouls": "2",
    "headers_won": "2",
    "offsides": "6"
}
```

**POST /player/:id/stats**
- Logged in player can add new game stats

Parameters:
- id: Stats id
- token: JWT of the logged in player

Response:
```json
Successfully created stat
```

**POST /player/:id/friends**
- Logged in player can add new friend

Parameters:
- id: Stats id
- username: Friend's username
- token: JWT of the logged in player

Response:
```json
[
  {
    "id": "ea3cfa13-b5d2-4f68-b8a8-b3b6b8d2ff76",
    "username": "midfield_maestro",
    "name": "Sophia Williams",
    "password": "superSecret321",
    "profile_pic": "https://funstats-images.beretesting.com/funstats-2.jpg",
    "DOB": 1338508800,
    "position": "Midfielder",
    "updated_at": "2024-08-21T18:04:45.000Z"
  }
]
```

**GET /player/:id/stats/compare/:friendId**
- Logged in player can compare stats to friend's stats

Parameters:
- id: player id
- friendId: Friend's player id
- token: JWT of the logged in player

Response:
```json
[
    {
        "name": "Eric Omeje",
        "profile_pic": "https://funstats-images.beretesting.com/funstats-5.jpg",
        "id": "2ea69397-b3de-4d5b-be4d-d3d5fee25de1",
        "goals_scored": "0",
        "assists": "3",
        "shots_on_target": "1",
        "tackles": "12",
        "interceptions": "12",
        "saves": "7",
        "yellow_cards": "2",
        "red_cards": "0",
        "fouls": "4",
        "headers_won": "0",
        "offsides": "0"
    },
    {
        "name": "Elvis Omeje",
        "profile_pic": "https://funstats-images.beretesting.com/funstats-3.jpg",
        "id": "3aa3a66a-bc1d-4f52-83fc-88d39e2a1cce",
        "goals_scored": "5",
        "assists": "12",
        "shots_on_target": "11",
        "tackles": "9",
        "interceptions": "10",
        "saves": "0",
        "yellow_cards": "1",
        "red_cards": "1",
        "fouls": "2",
        "headers_won": "2",
        "offsides": "6"
    }
]
```

**POST /players/signup**

- Add a player account

Parameters:

- username: Player's username
- name: Player's full name
- password: Player's password
- DOB: Player's date of birth
- position: Player's usual position in games
- profile_pic: Player's profile picture URL

Response:

```json
Successfully created player
```

**POST /players/login**

- Login a player

Parameters:

- playername: Player's playername
- password: Player's password

Response:

```json
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I...",
    "id": "ea3cfa13-b5d2-4f68-b8a8-b3b6b8d2ff76"
}
```

## Roadmap

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create migrations

- Create seeds with sample player data

- Deploy client and server projects so all commits will be reflected in production

- Feature: View stats
  - Implement view stats page using logged in player id
  - Store player id in sessionStorage
  - Create GET /stats
- Feature: Update Stats

  - Add form input to enter stats to update
  - Create POST /stats/:id
  - State for update stats

- Feature: Compare player stats
  - Add form input to enter friend's playername on view stats page
  - Chain GET /players/:id and GET /stats to first get player id and the get the stats for the player
- Feature: Add friend

  - Implement Friends page
  - Create GET /player/:playername
  - States for add & remove friend

- Feature: Home page

- Feature: Create account

  - Implement player register page + form
  - Create POST /players/register endpoint

- Feature: Login
  - Implement login page + form
  - Create POST /players/login endpoint

## Nice-to-haves

- Forgot password functionality
- Ability to add player profile picture
- Ability to add game seasons and/or tournaments
- Kids can get rewards as their stats improve
- Ability to set stat goals
- Ability to send friend requests
- Ability to add media (pics or video clips) to stats
- Ability to view stat trends
- Expanded player information: team name, jersey number, preferred foot, years played, etc
- Integrate wearable devices to get even more stats (distance covered, shooting power, ball control, weak foot usage)
- Unit and Integration Tests
