#!/bin/bash

while read -r line || [[ -n "$line" ]];
do
    # printf "%s\n" "$line"
    filename=$(basename "$line");
    curl -o ./img/$filename $line;
done < ./data/imgList.txt
