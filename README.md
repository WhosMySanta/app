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

![whosmysanta architecture](https://lh4.googleusercontent.com/AfDbiOZNzK4E190pS21FR6DTTMg2WoaSiLy-CjpjglNb90JGBX3eRwlQs7eaKKchaojTeZMH=w2880-h1446-rw)
