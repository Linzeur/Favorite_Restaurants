## Process Solution

At the beginning, I had doubts about the requirements because I had a wrong idea about the meaning of "location". Then I understood that it referenced to the location of a user and not to the location of a restaurant. Afterwards, I read all requirements, bonus point and bonus bonus point with the purpose of having a more global concept to develop a solution.

I considered an application which support many users and have a map view, also I had the idea of showing two list according to the requirements, one for your locations and other for your favorite restaurants, so I decided to have a panel which allow you to show both list with a tab to switch between them.

Regarding to the authentication, I decided to use credentials by cookies because it uses a token for each user which change its value among request, and also because you don't need store it with a variable or storage in the client, but the browser itself manage it. Accordingly, I didn't have to think about how to pass the logged user id when they make a request in the client, I only had to focus on developing correctly the API to manage the security, the authentication and authorization. From this side, Rails help me a lots because its framework already consider this aspect in its environment.

Regarding to the Google API places, it was my first time using this library, so I created my key through its platform and I started to test most of methods of the gem until I found what I needed.

While I was developing the UI to list locations and favorite, I realized that the user change the position in the map when they select any option in the lists. Accordingly, I added a button to return to the actual position which facilitate the navegation for the user. Also, I included a search input to search by name any option either location o favorite restaurant, because I thought it could improve the user experience since the list can become many options. Finally, I added the edit and delete buttons for each option in the list. The user can click over any of them to do the action corresponding without selecting the option itself, so it won't change the position in the map.

## Problems During The Development

About Google APIs

- After I created a key, it can't work if you don't specify which api is associated to this key
- If you don't add your billing information, you could have a small limit to use the api in the day, for instance, you can only use the api places one request by day

About Rails project:

- How to serialize the result of an api without using the gem "active_model_serializers". I realized that I can use a Class (and their methods) to serialize the incomming results of an API request. Due to lack of time, I didn't implement it
- I found an error in the gem "google_places" when I test the method to bring the details of a specific spot. I indicate which fields I want to bring, but the api return all fields. I checked out the documentation and pull requests of the gem in github to have more information, but I didn't find anything. I think I find the error when I check the source code out, but I haven't had time to download the project and test it.

About React project:

- The way how React works generated many renders in the map each time a state changed. For instance, I showed the map while I fetched the data of the nearest restaurants, so the map generated more than one render, the first one is the map with the current location, the second is the map with the current location and the markers of restaurants. I overcame it using a spinner visual which would be shown while the request to consume the api don't finish, thus I only generate a render in the map with all points which I need.
- I didn't know how to mock the fetchs, so I searched some library to help me to do this task. I found jest-fetch-mock.
- Due to the usage of credentials by cookie, you can have problems to do more than 1 request at the same time, so I created a context to order and indicate how to update the information which I needed in others components, and also I can specify when I have to execute a fetch in the components.

## Things Learnt

About Google APIs

- Create a key to use the apis of Google
- Manage the key which enable or disabled according to the specific api of the google platform.
- Manage the billing associated with the api to use

About Rails project:

- I learnt how to manage much better credentials by cookies
- Test the methods of a gem correctly, because I found an little error with the gem "google_places" which can't allow you specific the fields that you want the api to bring
- Understanding much more about serializer gem, because I can't apply this gem to the result of google api places, since it is not a model of the project.

About React project:

- Do mocks to fetch data, because the environment where are run cases test don't have actions which a browser does.
- Do mock to the geolocation, because the test environment don't have this capability.
- Work with a map with components, since you have to give a fixed values as width and height to show in the browser, also any change in any component which have a relation by a parent with the map component, it can generate unnecessary render
- Reduce the number of renderings for the map, because each rendering have a price when you consume apis of google, for this case could be the number of calls to use in a day
- Use the web apis for geolocation in the browser, for instance, to use the method getCurrentPosition I had to pass a specific option to run it.
- Use contexts to manage request either you can indicate if you need information to fetch, or to specify which request have to executed after another.

## Time Development

It took me about a little more of 35 hours to develop all this solution, including the tests. I started a full time from Thursday in the afternoon. The only missing requirement could take me about 3 hours more with its corresponding tests. Regarding to the API, the missing one wouldn't be complicated because I only have to add 1 or 2 actions to the favorite restaurant controller to bring the list. However, the UI to show this new list would be the environment which I could take the most part of time that I said before, since I have to consider a properly interface.
