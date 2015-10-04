package com.github.helgekrueger.service

import com.github.helgekrueger.stravagroovy.StravaClient
import spock.lang.Specification

class StravaActivityServiceSpec extends Specification {

    def service = new StravaActivityService()

    def 'retrieveData - empty dataset returns empty'() {
        setup:
        service.stravaClient = Mock(StravaClient)

        when:
        def result = service.retrieveData()

        then:
        1 * service.stravaClient.listActivities() >> []

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

        service.stravaClient = Mock(StravaClient)

        when:
        def result = service.retrieveData()

        then:
        1 * service.stravaClient.listActivities() >> [
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
}