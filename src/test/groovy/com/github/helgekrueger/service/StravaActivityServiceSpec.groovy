package com.github.helgekrueger.service

import com.github.helgekrueger.stravagroovy.StravaClient
import spock.lang.Specification

class StravaActivityServiceSpec extends Specification {

    def service = new StravaActivityService(stravaClient: Mock(StravaClient))

    def 'retrieveData - empty dataset returns empty'() {
        when:
        def result = service.retrieveData()

        then:
        1 * service.stravaClient.getStats(_) >> [ all_ride_totals: [ count: 42, ], all_run_totals: [ count: 58, ] ]
        1 * service.stravaClient.listActivities(_) >> []

        result.rides == []
        result.runs == []
    }

    def 'adds correct fields to ride'() {
        setup:
        def movingTime = 12
        def distance = 13
        def id = 17
        def name = 'this is a pipe'
        def averageHeartrate = 60
        def averageSpeed = 30
        def polyline = 'this is a line'

        when:
        def result = service.retrieveData()


        then:
        1 * service.stravaClient.getStats(_) >> [ all_ride_totals: [ count: 42, ], all_run_totals: [ count: 58, ] ]
        1 * service.stravaClient.listActivities(_) >> [
            [
                moving_time: movingTime,
                distance: distance,
                id: id,
                type: 'Ride',
                name: name,
                average_heartrate: averageHeartrate,
                average_speed: averageSpeed,
                map: [
                    summary_polyline: polyline,
                ],
            ]
        ]

        result.runs == []
        result.rides.size() == 1
        result.rides[0].movingTime == movingTime
        result.rides[0].distance == distance
        result.rides[0].id == id
        result.rides[0].name == name
        result.rides[0].averageHeartrate == averageHeartrate
        result.rides[0].averageSpeed == averageSpeed
        result.rides[0].polyline == polyline
    }

    def 'getTotalActivityCount'() {
        when:
        def count = service.getTotalActivityCount()

        then:
        1 * service.stravaClient.getStats(_) >> [ all_ride_totals: [ count: 42, ], all_run_totals: [ count: 58, ] ]

        count == 100
    }
}
