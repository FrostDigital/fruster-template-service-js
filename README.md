# Fruster Template Service

This is a template service that shows how to build a Fruster micro service in node.js 
following best practise and use latest and greatest toolings and libraries.

This service will handle **Foo's** and consume another fictional service to get **Bar's**.

## Directory structure and files

```
/app.js                         # Main entry point, running "node app.js" will start the service
/fruster-template-service.js    # Connects to bus and mongo and wires up all handlers and repos
/config.js                      # Configuration for the service
/lib/handlers/                  # Place handlers here
/lib/repos/                  	# Place repositories here
/lib/clients/                  	# Place clients here
/lib/errors.js                  # Errors that the service may throw
/spec/                          # Where to keep your specs (a.k.a tests)
/spec/support/                  # Support files for specs, for example fixtures
```

## Lingo

### Handler

Is a class that _handles_ a bus request. It could either be a request from another internal service or HTTP request
coming from API Gateway.

A handler should have a method `handle(req)` and/or `handleHttp(req)` which is the entry point.
Whatever returned from these methods, either directly or using a promise, will be used as response.

## Repo 

Repo is short for _repository_ which is a class that encapsulates database queries and exposes a API for other
classes to use (commonly a handler).

## Client

A client is used to interact with other peer services. The client encapsulates code for sending
requests and parsing response and exposes a nice, readable API.

Create one client per service, or use composition (client A has client B as instance variable) if necesseray to 
interact with multiple services.



