# World-Radio

![radio-3](https://github.com/chucksn/World-Radio/assets/104119055/dfe6756c-44ef-46ce-94db-f96fa374ff2c)
![Screenshot 2023-06-05 075820](https://github.com/chucksn/World-Radio/assets/104119055/8374ad86-6bc9-4fe6-a7d3-0ff249c42765)


## About this app

World radio is a full-stack A web-based application that allows users to listen to radio stations from around the world. Streams over 20,000 internet radio station in real time.

## App Link

### Frontend

[Click To Go Live](https://world-radio.vercel.app/)

### Backend

[Backend Repo](https://github.com/chucksn/world-radio-api)

## Features

1. **Authentication Login/Sign-up Feature**

- Create an account with the sign-up form by entering name, email and password.
- Login to your created account by entering email and password.

![Screenshot 2023-06-05 075851](https://github.com/chucksn/World-Radio/assets/104119055/93e6c05b-1f55-4cbc-b71e-ac94ccc92442)

2. **Authorization on email and password login**

- Authorization required to access favorites feature.
- Authorization powered by json web token (JWT).
- Authorization validity on login is 3 days.

3. **Search/Select Country Feature**

- This is a search or select feature that enable's you search or select a country in other to load available internet radio station's in the selected country.
  

4. **Customized animated audio player**
  

5. **Favorite Feature**
   

6. **Responsiveness on other device sizes**


- This app uses CRUD operations on the backend to implement the auth and favorite feature.

## Tech Stack

### Frontend

- JavaScript
- React.js
- Redux-Toolkit
- Tailwind
- Framer-motion
- REST-API
- Vite.

### Backend

- Node.js
- Express.js
- Mongodb
- Mongoose
