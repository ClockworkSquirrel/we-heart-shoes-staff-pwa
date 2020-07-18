<p align="center">
    <a href="https://clockworksquirrel.github.io/we-heart-shoes-staff-pwa">
        <img
            src="./images/icon.png"
            alt="we:heart:shoes logo"
            width="128"
            style="margin-top: 3rem; border-radius: 100% 100% 2rem"
        />
    </a>
</p>

# we:heart:shoes
A sample app for my portfolio using live data from [Shoe Zone's](https://shoezone.com) website.

View the live app at: https://clockworksquirrel.github.io/we-heart-shoes-staff-pwa

## About
**we:heart:shoes** is a web application designed as a demo for my personal portfolio. It is designed to enabled Shoe Zone staff to perform instant stock enquiries without the use of the till.

we:heart:shoes is built using [React](https://github.com/facebook/react/) on the client side (with customised core components provided by [Material-UI](https://github.com/mui-org/material-ui)), and [Express](https://github.com/expressjs/express) on the server (hosted on [Glitch](https://glitch.com)). The client app uses the current device's geolocation in order to locate the user's nearest store. This then allows the app to check the store's stock levels.

## Draft Designs
### First Draft
| Home                                   |
|----------------------------------------|
| ![Home](./images/figma-home-first.png) |

### Final Draft
| Home                             |                        Product Details |
|----------------------------------|----------------------------------------|
| ![Home](./images/figma-home.png) | ![Details](./images/figma-details.png) |

## Additional Resources
### REST API
The REST API is hosted on Glitch and performs core functionality for the client, such as locating the user's nearest store, retrieving product details, and checking a store's stock levels.

**The source code for the server can be found here:**
https://github.com/ClockworkSquirrel/we-heart-shoes-api

**The public API is hosted at:**
https://whs-endpoints.glitch.me

Due to limitations with Shoe Zone's APIs, some data retrieval is slow, as the webpage itself must be downloaded and scraped
before returning the required information. This currently includes product information. Other data, such as the store
locator and store stock level APIs are already available in a somewhat ready-to-use JSON format, in addition to being
cached on the server, and so these methods return much faster.

### Frameworks
* React - https://github.com/facebook/react/
* Express - https://github.com/expressjs/express
* Glitch - https://glitch.com
* Material-UI - https://github.com/mui-org/material-ui
