This app helps plan a hiking trip.
To simplify the use case, it assumes the following:
1) Start: San Franscico
2) Destination: Yosemite National Park
3) It provides a list of easy, fairly easy, intermediate and difficult trails to choose from. These are taken from the REI national parks app.
4) It assumes that you will do 1 trail a day.
5) It gives trails list based on criteria such as age, duration. Version 2 plans to include sentiment analysis using Einstein API.


Libraries used are:
1) NodeJS
2) ExpressJS
3) AngularJS
4) Angular-Route
5) Angular-Toastr
6) Mobile-Angular-UI


Work Flow is as follows:
1) Input age, duration in days, how you want your trip to be.
2) Swipe left
3) A list of trails will come up.
4) Choose 1 trail for each day.
5) Swipe left.
6) Itinerary for each day will come up. Easy trails will be reserved for 1st and last day.


To Run the App on local machine:
Go to root directory and run 'npm run start'


The App could be extended in several ways to include more features:
1) Start and Destination could vary.
2) Depending on start, options for travel and time could be taken into account while planning the trip
3) Options for hotels and restaurants could be provided based on trail locations to save time.
4) Seasonal variations for the different trails could be taken into account.
5) Options for summer and winter activities/ or family friendly trails could be provided based on intent.
