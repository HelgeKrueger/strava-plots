package com.github.helgekrueger.stravagroovy

import static groovyx.net.http.Method.GET
import groovyx.net.http.ContentType

import groovyx.net.http.HTTPBuilder

class StravaClient {
    
    def client = new HTTPBuilder('https://www.strava.com/')
    def accessToken

    def listActivities() {
        def answer
        client.request(GET, ContentType.JSON) {
            uri.path = '/api/v3/athlete/activities'
            uri.query = [per_page: 200]
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
