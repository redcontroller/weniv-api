#!/bin/bash

while read -r line || [[ -n "$line" ]];
do
    # printf "%s\n" "$line"
    if [ -n "$line" ]; then
        filename=$(basename "$line")
        curl -o "./img/$filename" "$line"
        wait
        sleep 3

        if [ -f "./img/$filename" ]; then
            echo "$filename 다운로드가 성공적으로 완료되었습니다."
        else
            echo "다운로드 실패!"
        fi
    fi
done < ./data/profile_imgList.txt
