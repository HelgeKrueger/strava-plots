package com.github.helgekrueger.stravagroovy

import groovyx.net.http.ContentType
import groovyx.net.http.RESTClient
import groovyx.net.http.URIBuilder

class AuthProvider {

    def clientId
    def clientSecret
    def redirectUrl

    def getAuthUrl() {
        new URIBuilder('https://www.strava.com/oauth/authorize')
            .addQueryParam('client_id', clientId)
            .addQueryParam('response_type', 'code')
            .addQueryParam('redirect_uri', redirectUrl)
            .toString()
    }

    def requestAccessToken(code) {
        def oauthUrl = 'https://www.strava.com/oauth/token'

        def client = new RESTClient(oauthUrl)
        def response = client.post(body: [
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
        ], requestContentType: ContentType.URLENC )

        return response
    }
}
