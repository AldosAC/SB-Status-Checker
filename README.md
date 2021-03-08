# SB-Status-Checker
Quick utility which monitors the Shadowbane servers and sends a notification when the server status changes

This repo houses the basic sb-status-checker functionality.

At it's core, this app monitors the login server status for Shadowbane and sends out an email notification when that status changes.  It accomplishes this by regularly pinging the server and monitoring the response.  Because there's no real information on an API to interact with the server I've taken a pretty primitive approach to monitoring server status.  I monitored responses while the server was online and while it was offline and designed the logic so that if app's ping times out, then it considers the server offline.  However, any other sort of response is treated as an indicator that the server is online.

For the time being, there's no API for interacting with sb-status-checker.  The next step is going to be deploying the app, which will include a simple webpage for checking server status and adding or removing yourself from the email notification list.  I'll update the readme as development continues.
