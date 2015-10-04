# strava-plots

This should provide a simple server to display scatter plots of strava activity data.

## Running

In order to run the server locally, you need to register an application with the Strava API (see http://strava.github.io/api/).
Then you need to set the environment variables $STRAVA_CLIENT_ID and $STRAVA_CLIENT_SECRET
to your client id and secret. Afterwards, one can run the server by running

./gradlew run


## Running tests

Tests that test that access to the Strava API work correctly (StravaClientSpec) require that the environment variable $STRAVA_ACCESS_TOKEN is set. Otherwise, these are skipped.
