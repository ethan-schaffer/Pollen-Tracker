# Pollen-Tracker

Pollen Tracker is a Fitbit App that gives users Real Time Information about Allergens in the air

###How it works:
1. Accesses the User's latitude and longitude coordinates from the fitbit. 
2. Makes a call to the `geonames` web API in order to retrieve the ZIP code the user is in
3. Uses the `nasacort` web API to get the current allergens in the air, along with the pollen forecast for the next 3 days. 
4. Presents this information to the user

###Screenshot:
<img width="876" alt="screen shot 2018-07-15 at 11 39 07 am" src="https://user-images.githubusercontent.com/9043348/42736017-f7e4f952-8823-11e8-825f-ea8cf1bc1f1c.png">
