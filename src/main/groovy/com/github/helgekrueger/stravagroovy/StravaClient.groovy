package com.github.helgekrueger.stravagroovy

import static groovyx.net.http.Method.GET
import groovyx.net.http.ContentType

import groovyx.net.http.HTTPBuilder

class StravaClient {
    
    def client = new HTTPBuilder('https://www.strava.com/')
    def accessToken

    def listActivities(params = [:]) {
        queryStrava {
            uri.path = '/api/v3/athlete/activities'
            uri.query = [per_page: 200] + params
        }
    }

    def listFriendsActivities(params = [:]) {
        queryStrava {
            uri.path = '/api/v3/activities/following'
            uri.query = [per_page: 200] + params
        }
    }

    def getAthlete() {
        queryStrava {
            uri.path = '/api/v3/athlete'
        }
    }

    def getStats(id) {
        if (!id) {
            id = getAthlete().id
        }

        queryStrava {
            uri.path = "/api/v3/athletes/$id/stats"
        }
    }

    private queryStrava(Closure query) {
        def answer
        client.request(GET, ContentType.JSON) {
            query.delegate = delegate
            query()

            headers.Accept = 'application/json'
            headers.Authorization = "Bearer $accessToken"
            requestContentType = ContentType.URLENC

            response.success = { resp, json ->
                answer = json
            }
        }

        return answer
    }
}
