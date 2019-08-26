# Getting started

The stack in this project is Rails + React.

We have `api` and `client`.

<hr/>

To setup the api:

First use `bundle` to install all the gems for the rails project

    bundle install

Then you should setup the database with

    rails db:setup

And finally, you should run it, and by default it starts on the port `3000`

    rails s

To run tests, I have used rspec, you should run with this command

    rspec

<hr/>

To setup the client:

First use `yarn` to install all the package dependencies for the react project

    yarn install

And finally, you should run it, and by default it starts on the port `4000`

    yarn start

To run tests, you should run with this command

    yarn test

---
