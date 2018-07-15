# Pollen-Tracker

Pollen Tracker is a Fitbit App that gives users Real Time Information about Allergens in the air

How it works:
1. Accesses the User's latitude and longitude coordinates from the fitbit. 
2. Makes a call to the `geonames` API in order to retrieve the ZIP code the user is in
3. Uses the `nasacort` to get the current allergens in the air, along with the pollen forecast for the next 3 days. 
4. Presents this information to the user

