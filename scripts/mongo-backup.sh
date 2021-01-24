#!/bin/bash

# sh scripts/mongo-backup.sh <dump_file_name>

docker exec -i mongo sh -c 'mongodump -d prefix --archive' > $1.dump