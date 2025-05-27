// next-frontend/pages/index.js

import axios from 'axios';

function HomePage({ user }) {
  return <div>Hello, {user.name}!</div>;
}
