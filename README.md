# CHATBOT-APP
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview
This is a chatbot app that interfaces with OpenAI. From the homepage, the user will have to first sign in via Google Auth Provider. On successful sign-in, the user can then interact with the chatbot by entering an input message.

***

## Project Structure

``` 
chatbot-app/
├── public/
├── src/
│ ├── app/
│ ├── components/
│ ├── utils/
│ ├── lib/
```
The `public` folder contains static files, like images, while the `src` folder contains the source code.

***

## GenAI service
OpenAI's API is being used for this project. The connection is done via an API key, which is stored as an environment variable.

***

## Architectural Details
### Client and Server Layers
In this project, we have both server and client components. Server components are used to fetch data (i.e. call OpenAI's api), and save data (i.e. save chat history to database). Client components are used to interact with the user on the front-end, such as message inputs and buttons to sign in and out.

### Database Layer
For Chat History Logging, Vercel's Postgres Database is being used for storage. A table named `chats` stores all the chat history between a user and the chatbot. This table contains the following columns:

`id`: primary key

`sender`: value is user email address if it's a user message, value is `bot` if it's a bot message

`message`: a string containing the contents of the message

`timestamp`: timestamp of when the message is sent

***

## Authentication
In this project, the `NextAuth.js` library is used to set up authentication, leveraging Google's Authentication Provider. To get session data and user details, there are two hooks available: `useSession`, to be used on client side, and `getServerSession`, to be used on server side. 

***

## Deployment
This app is hosted on Vercel: https://chatbot-app-swart.vercel.app

***

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
