package com.github.helgekrueger.service

import com.github.helgekrueger.stravagroovy.StravaClient

class StravaActivityService {

    def stravaClient

    def retrieveData() {
        def activities = getAllActivities().collect{ [
            id: it.id,
            name: it.name,
            type: it.type ?: '-',
            movingTime: it.moving_time ?: '-',
            distance: it.distance ?: '-',
            averageHeartrate: it.average_heartrate ?: '-',
            averageSpeed: it.average_speed ?: '-',
            elevation: it.total_elevation_gain ?: '-',
            polyline: it.map.summary_polyline,
        ]}
        def rides = activities.findAll{ it.type == 'Ride' }
        def runs = activities.findAll{ it.type == 'Run' }

        [
            rides: rides,
            runs: runs,
        ]
    }

    private getAllActivities() {
        def page_count = Math.floor(getTotalActivityCount() / 200) + 1
        (1..page_count).collect{ stravaClient.listActivities(page: it) }.flatten()
    }

    def getTotalActivityCount() {
        def stats = stravaClient.getStats()
        stats.all_ride_totals.count + stats.all_run_totals.count
    }
}
