#!bin/bash

RUNNING_EXIT_CODE=1

while [[ $RUNNING_EXIT_CODE -ne 0 ]]
do
  echo 'Checking Neo4j Running'
  wget monster-hunter-data:7474
  RUNNING_EXIT_CODE=$?
  echo $RUNNING_EXIT_CODE
done

echo 'Confirmed Running!'

cypher-shell -a neo4j://monster-hunter-data:7687 -f ./import/import.cypher
