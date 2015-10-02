package com.github.helgekrueger.stravagroovy

import spock.lang.Specification

class AuthProviderSpec extends Specification {

    def 'computes correct url'() {
        setup:
        def clientId = 12
        def redirectUrl = 'localhost'
        def provider = new AuthProvider(clientId: clientId, redirectUrl: redirectUrl)

        def expectedUrl = "https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}"

        expect:
        provider.getAuthUrl() == expectedUrl

    }

}
