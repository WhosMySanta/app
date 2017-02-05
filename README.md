# whosmysanta app

## Routes

```
/                           Home
/create                     Create a group
/join/:groupId/:friendHash  User enters a name and their wish
/group/:groupId             Answer status of group participants, results
```

## Selection process

Selection is done either:

1. When every invitee has answered...

2. ...or when the organizer decides that enough participants have answered. The invitees who didn't answer will not be included in the selection.

## Results

Results are sent via notifications (email).

## Useful queries

Useful queries can be seen in [usefulQueries.graphql](https://github.com/WhosMySanta/app/blob/master/usefulQueries.graphql).

## Architecture

[![whosmysanta architecture](https://cloud.githubusercontent.com/assets/1935696/22625504/290ac2b0-eb99-11e6-96a3-aef524e38735.png)](https://drive.google.com/file/d/0Bz5sSk6lSOuOMU9iVHdqQU96bWc/view?ts=5883480e)
