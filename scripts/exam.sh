#!/bin/bash
set -euo pipefail

while true; do
  read -p "Сколько у тебя баллов?? " SCORE

  if [[ ! "$SCORE" =~ ^[0-9]+$ ]]; then
	echo "Не число, давай ещё раз"
	continue
  fi

  SCORE=$((10#$SCORE))

  if [ "$SCORE" -gt 100 ]; then
	echo "Балл не может быть больше 100, давай ещё раз"
	continue
  fi
  break
done

if [ "$SCORE" -ge 50 ]; then
	echo "Сдал" 
else echo "Пересдача"; fi;

SCORE1=$SCORE

grade(){
if [ "$1" -lt 50 ];then
	echo "2"
elif [ "$1" -lt 70 ]; then 
	echo "3"
elif [ "$1" -lt 90 ]; then
	echo "4"
else echo "5"
fi
}

RESULT=$(grade "$SCORE")
echo "Твоя оценка: $RESULT"

case "$RESULT" in
5) echo "Красавчик" ;;
4) echo "Можно лучше" ;;
3) echo "Дебил" ;;
*) echo "Долбоеб" ;;
esac

while [ "$SCORE" -gt 0 ]
do
	echo -n "#"
	SCORE=$((SCORE-2))
done

echo

if [ "$RESULT" -lt 3 ]; then
	echo "До тройки не хватило $((50-$SCORE1)) балла(ов)"
  elif [ "$RESULT" -lt 4 ]; then
	echo "До четверки не хватило $((70-$SCORE1)) балла(ов)"
  elif [ "$RESULT" -lt 5 ]; then
	echo "До пятерки не хватило $((90-$SCORE1)) балла(ов)"
  elif [ "$SCORE1" -lt 100 ]; then
	echo "Всего $((100-$SCORE1)) балла(ов) не хватило до 100%"
else echo "Добро пожаловать в БигТех"
fi
