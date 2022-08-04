# Poker Player implementation with TypeScript

TypeScript client skeleton for Lean Poker For more information visit: <http://leanpoker.org>

## How to get started

```shell
# install dependencies
npm install

# start server from build folder
npm start

# start server with live reload
npm run dev

# run tests
npm test

# start test runner with live reload
npm run test:watch
```

```shell
curl -X POST -H --silent \
  --data-urlencode "action=bet_request" \
  --data-urlencode "game_state=$(cat state.json)" \
  http://localhost:1337/
```
