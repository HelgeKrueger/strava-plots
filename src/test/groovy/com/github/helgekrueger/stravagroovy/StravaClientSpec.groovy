package com.github.helgekrueger.stravagroovy

import spock.lang.Specification

class StravaClientSpec extends Specification {

    def 'list activities'() {
        setup:
        def client = new StravaClient(
            accessToken: 'ac7fa303d8175f19525c6c5b1fef5efd186c42c7'
        )

        expect:
        client.listActivities()
    }
}
