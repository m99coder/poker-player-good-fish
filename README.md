# Poker Player implementation with TypeScript

TypeScript client skeleton for Lean Poker For more information visit: <http://leanpoker.org>

## How to get started

```shell
npm install
npm start
```

```shell
curl -X POST -H --silent \
  --data-urlencode "action=bet_request" \
  --data-urlencode "game_state=$(cat state.json)" \
  http://localhost:1337/
```
