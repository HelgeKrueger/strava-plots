package com.github.helgekrueger.stravagroovy

import spock.lang.Ignore
import spock.lang.Specification

class StravaClientSpec extends Specification {

    @Ignore
    def 'list activities'() {
        setup:
        def client = new StravaClient()

        expect:
        client.listActivities()
    }
}
