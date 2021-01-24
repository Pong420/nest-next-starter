#!/bin/bash

docker exec -i mongo mongo prefix --eval "db.dropDatabase();"
