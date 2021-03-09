# SB-Status-Checker
Quick utility which monitors the Shadowbane servers and sends a notification when the server status changes

Hop on over to [sbstatus.joelcarpenter.net](https://sbstatus.joelcarpenter.net) to give it a try!

The feature list is a little light at the moment, but the site features real-time server status monitoring (no need to hit that refresh button folks) and allows you to register to receive email updates as the server status changes.  You'll only receive emails when there's a change to report, so your inbox shouldn't blow up on you.  Status updates should be sent out within seconds of server availability changing, so you don't need to worry about being late to the party.

Register for those updates and let the app worry about when the server is going to come back up.  Go out and get some fresh air.  Make a sandwich.  Reclaim a little more of your life.

At it's core, this app monitors the login server status for Shadowbane and sends out an email notification when that status changes.  It accomplishes this by regularly pinging the server and monitoring the response.  Because there's no real information on an API to interact with the server I've taken a pretty primitive approach to monitoring server status.  I monitored responses while the server was online and while it was offline and designed the logic so that if app's ping times out, then it considers the server offline.  However, any other sort of response is treated as an indicator that the server is online.

For the time being, there's no API for interacting with sb-status-checker.  The next step is going to be deploying the app, which will include a simple webpage for checking server status and adding or removing yourself from the email notification list.  I'll update the readme as development continues.
