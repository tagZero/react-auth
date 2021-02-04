# ReactAuth

[![License][license-src]][license-href]

Customizable AuthProvider/AuthService and UI components for your react projects.

This project is still in development.

There are 3 components with light/dark themes. You can see `Login` component below. HTML5 validations are included (email, required, max length, strong password). Notifications are provided by React-Toastify
- Login
- Register (Fields are `firstName, lastName, birthDate, email and password`. It will allow customization in the future.)
- Reset Password

![ss-light] ![ss-dark]

## Install

```bash
npm install @tag0/react-auth
# OR
yarn add @tag0/react-auth
```

## Development

Clone project. Start [example project] with the command below and browse on http://localhost:5000

```bash
yarn start
# OR
yarn watch
```

[license-src]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-href]: LICENSE.md
[ss-light]: https://imagemarker.s3.eu-central-1.amazonaws.com/auth/light.png
[ss-dark]: https://imagemarker.s3.eu-central-1.amazonaws.com/auth/dark.png
[example project]: src/examples/Example.tsx
