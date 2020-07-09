# Fruster Template Service

This is a template service that shows how to build a Fruster micro service in node.ts
following best practice and use latest and greatest toolings and libraries.

This service will handle **Foo's** and consume another fictional service to get **Bar's**.

## Directory structure and files

```
/app.ts                         # Main entry point, running "node app.ts" will start the service
/fruster-template-service.ts    # Connects to bus and mongo and wires up all handlers and repos
/config.ts                      # Configuration for the service
/lib/handlers/                  # Place handlers here
/lib/models/                    # Place models here
/lib/repos/                  	# Place repositories here
/lib/clients/                  	# Place clients here
/lib/errors.ts                  # Errors that the service may throw
/spec/                          # Where to keep your specs (a.k.a tests)
/spec/support/                  # Support files for specs, for example fixtures
```

## Lingo

### Handler

Is a class that _handles_ a bus request. It could either be a request from another internal service or HTTP request
coming from API Gateway.

A handler should have a method `handle(req)` and/or `handleHttp(req)` which is the entry point.
Whatever returned from these methods, either directly or using a promise, will be used as response.

### Models

Models use for filter fields in request and response. It will help to prepare the insert and update query bodies and result of retrieving queries.

### Repo

Repo is short for _repository_ which is a class that encapsulates database queries and exposes a API for other
classes to use (commonly a handler).

### Client

A client is used to interact with other peer services. The client encapsulates code for sending
requests and parsing response and exposes a nice, readable API.

Create one client per service, or use composition (client A has client B as instance variable) if necessary to
interact with multiple services.

## Code style

* Use double qoutes `"` instead of single quotes `'`.
* Use tabs instead of spaces for indentation.
* Comment using `jsdoc` standard.
* Use `fruster-log` for logging - do not use `console.log`.
* Name files that exports a class with capital camel case, such as `FooHandler.ts`.
* Name other files that does not export a class with kebab case, such as `fruster-template-service.ts`.
