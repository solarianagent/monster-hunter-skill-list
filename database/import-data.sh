#!bin/bash

RUNNING_EXIT_CODE=1
RETRY_TIMES=0

while [[ $RUNNING_EXIT_CODE -ne 0 ]]
do
  if [[ $RETRY_TIMES -ne 0 ]]
  then
    echo "Checking for Neo4j, retry number ${RETRY_TIMES}"
  else
    echo 'Checking for Neo4j for the First Time'
  fi

  wget monster-hunter-data:7474
  RUNNING_EXIT_CODE=$?
  sleep 5
  RETRY_TIMES=$((RETRY_TIMES + 1))
done

echo 'Importing Part 1'
cypher-shell -a neo4j://monster-hunter-data:7687 -f ./import/import-part-1.cypher

echo 'Importing Part 2'
cypher-shell -a neo4j://monster-hunter-data:7687 -f ./import/import-part-2.cypher

echo 'Done Importing'