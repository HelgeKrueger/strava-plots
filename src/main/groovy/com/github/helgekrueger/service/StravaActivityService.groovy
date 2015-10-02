package com.github.helgekrueger.service

import com.github.helgekrueger.stravagroovy.StravaClient

class StravaActivityService {

    def accessToken

    def retrieveData() {
        def client = new StravaClient(accessToken: accessToken)
        def activities = client.listActivities().collect{ [
            movingTime: it.moving_time,
            distance: it.distance,
            type: it.type,
            id: it.id,
            name: it.name,
        ]}
        def rides = activities.findAll{ it.type == 'Ride' }
        def runs = activities.findAll{ it.type == 'Run' }

        [
            rides: rides,
            runs: runs,
        ]
    }
}
