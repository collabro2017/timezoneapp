# timezoneapp
React Native application that shows time in different timezones

User must be able to create an account and log in.
When logged in, a user can see, edit and delete timezones he entered.
Implemented at least three roles with different permission levels: a regular user would only be able to CRUD on their owned records, a user manager would be able to CRUD users, and an admin would be able to CRUD all records and users.
When a timezone is entered, each entry has a Name, Name of the city in timezone, the difference to GMT time.
When displayed, each entry also has current time.
Can Filter by names.
All actions need to be done client side using AJAX, refreshing the page is not acceptable.
