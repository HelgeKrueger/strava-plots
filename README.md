# strava-plots

This should provide a simple server to display scatter plots of strava activity data.

## Running

In order to run the server locally, you need to register an application with the Strava API (see http://strava.github.io/api/).
Then you need to set the environment variables $STRAVA_CLIENT_ID and $STRAVA_CLIENT_SECRET
to your client id and secret. Afterwards, one can run the server by running

./gradlew run

By saving your access token into the global variable $STRAVA_ACCESS_TOKEN, you can
avoid the authentication requests when running the local instance.

## Running tests

Tests that test that access to the Strava API work correctly (StravaClientSpec) require
that the environment variable $STRAVA_ACCESS_TOKEN is set. Otherwise, these are skipped.

If one has set a global strava access token, tests accessing the Strava API can be skipped
when running tests by running

STRAVA_ACCESS_TOKEN="" ./gradlew test
