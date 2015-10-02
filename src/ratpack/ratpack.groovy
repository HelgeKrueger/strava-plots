import static ratpack.groovy.Groovy.ratpack

import com.github.helgekrueger.stravagroovy.AuthProvider
import com.github.helgekrueger.service.StravaActivityService
import groovy.json.JsonOutput
import ratpack.session.Session
import ratpack.session.SessionModule

def config = new ConfigSlurper().parse(new File('config.groovy').toURL())
def authProvider = new AuthProvider(
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUrl: config.host + 'withCode'
)


ratpack {
    bindings {
        module SessionModule
    }

    handlers {
        files {
            it.dir('public')
        }

        get { Session session ->
            session.require('strava_access_token').onError{
                redirect 'auth'
            }.then{ accessToken ->
                redirect 'plot.html'
            }        
        }

        get('auth') {
            redirect authProvider.getAuthUrl()
        }

        get('withCode') { Session session ->
            def authResponse = authProvider.requestAccessToken(request.queryParams.code)
            def accessToken = authResponse.data.access_token as String
            session.set('strava_access_token', accessToken).then{
                redirect 'plot.html'
            }
        }

        get('data') { Session session ->
            session.require('strava_access_token').onError{
                redirect 'auth'
            }.then{ accessToken ->
                def service = new StravaActivityService(accessToken: accessToken)
                render JsonOutput.toJson(service.retrieveData())
            }
        }
    }
}
