# whosmysanta app

## Routes

```
/                  Home
/create            Create a group
/:groupId          User enters a name and their wish
/:groupId/status   Answer status of group participants
```

## Selection process

Selection is done either:

1. When every invitee has answered...

2. ...or when the organizer decides that enough participants have answered. The invitees who didn't answer will not be included in the selection.

## Results

Results are sent via notifications (email).
