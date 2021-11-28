This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Deployed to [https://champdev.in/disecto](https://champdev.in/disecto)

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Description

### Pages
  1. `/disecto`============> For Login/Signup
  2. `/disecto/admin-panel` ==> For Admin users
  3. `/disecto/user-panel`  ===> For Admin & Normal users
  4. `/disecto/404`==========> For 404
### APIs
  1. `/disecto/api/auth/login` =====> For Login
  2. `/disecto/api/auth/signup` ===> For Signup
  3. `/disecto/api/auth/logout` ===> For Logout

### Usage
 * We can create two types of accounts, Admin and User with username and password.
 * We can login using the same credentials.
 * Admin after login or signup get redirected to Admin Panel.
 * User after login or signup get redirected to User Panel.
 * Admin can access the Admin Panel as well as User Panel.
 * User can access only the User Panel.
 * If user tries to access Admin Panel, he will get Unauthorized access.
 * Both Admin Panel and User Panel have a Logout button and are protected routes.
 * If anyone tries to access any of the protected routes without login, he will get 404 page.
 * The AccessToken is stored in cookies and are valid for 2 hours.
