#!/bin/bash

# sh scripts/mongo-export.sh <collection name> <output file>

docker exec -i mongo mongoexport -h localhost:27017 -d prefix -c $1 > $2
