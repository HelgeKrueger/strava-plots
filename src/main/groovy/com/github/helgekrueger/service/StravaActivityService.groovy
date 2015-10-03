package com.github.helgekrueger.service

import com.github.helgekrueger.stravagroovy.StravaClient

class StravaActivityService {

    def stravaClient

    def retrieveData() {
        def activities = stravaClient.listActivities().collect{ [
            id: it.id,
            name: it.name,
            type: it.type,
            movingTime: it.moving_time,
            distance: it.distance,
            averageHeartrate: it.average_heartrate,
            averageSpeed: it.average_speed,
        ]}
        def rides = activities.findAll{ it.type == 'Ride' }
        def runs = activities.findAll{ it.type == 'Run' }

        [
            rides: rides,
            runs: runs,
        ]
    }
}
