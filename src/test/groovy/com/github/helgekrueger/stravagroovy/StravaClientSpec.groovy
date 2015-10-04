package com.github.helgekrueger.stravagroovy

import spock.lang.IgnoreIf
import spock.lang.Specification

@IgnoreIf({ ! System.getenv('STRAVA_ACCESS_TOKEN') })
class StravaClientSpec extends Specification {

    def accessToken = System.getenv('STRAVA_ACCESS_TOKEN')

    def 'list activities'() {
        setup:
        def client = new StravaClient(accessToken: accessToken)

        expect:
        client.listActivities().size() > 0
    }

    def 'get athlete'() {
        setup:
        def client = new StravaClient(accessToken: accessToken)

        when:
        def athlete = client.getAthlete()

        then:
        athlete.id
        athlete.sex in ['M', 'F']
    }

    def 'get stats'() {
        setup:
        def client = new StravaClient(accessToken: accessToken)

        when:
        def stats = client.getStats()

        then:
        stats.biggest_ride_distance
        stats.all_ride_totals.count + stats.all_run_totals.count > 1
    }
}
