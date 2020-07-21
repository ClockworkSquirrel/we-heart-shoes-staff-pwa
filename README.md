￼

we ❤ shoes

A sample app for my portfolio using live data from Shoe Zone's website.

View the live app at: https://clockworksquirrel.github.io/we-heart-shoes-staff-pwa

Please note that the PWA source is not vastly documented, unlike the server. I intend on rectifying this in an upcoming release which will include a refactor of code and updated design for better ease of use and functionality. Hopefully, the redesign should also see an increase in server response time, should everything go to plan.

About

we ❤ shoes is a web application designed as a demo for my personal portfolio. It is designed to enabled Shoe Zone staff to perform instant stock enquiries without the use of the till.

we ❤ shoes is built using React on the client side (with customised core components provided by Material-UI ), and Express on the server (hosted on Glitch ). The client app uses the current device's geolocation in order to locate the user's nearest store. This then allows the app to check the store's stock levels.

Draft Designs

First Draft
￼￼￼

Final Draft
￼￼￼

Additional Resources

REST API

The REST API is hosted on Glitch and performs core functionality for the client, such as locating the user's nearest store, retrieving product details, and checking a store's stock levels.

The source code for the server can be found here: https://github.com/ClockworkSquirrel/we-heart-shoes-api

The public API is hosted at: https://whs-endpoints.glitch.me

Due to limitations with Shoe Zone's APIs, some data retrieval is slow, as the webpage itself must be downloaded and scraped before returning the required information. This currently includes product information. Other data, such as the store locator and store stock level APIs are already available in a somewhat ready-to-use JSON format, in addition to being cached on the server, and so these methods return much faster.

Frameworks
• React - https://github.com/facebook/react/
• Express - https://github.com/expressjs/express
• Glitch - https://glitch.com
• Material-UI - https://github.com/mui-org/material-ui

