#!/bin/bash
set -euo pipefail

# Единые пороги занятости (в процентах) для всех метрик
WARN_PCT=75   # жёлтая зона
CRIT_PCT=90   # красная зона

# Цвета (раскрываются в реальные ANSI-байты сразу, благодаря $'...')
RED=$'\033[31m'
YEL=$'\033[33m'
GRN=$'\033[32m'
RST=$'\033[0m'

# DRY: одна функция статуса для всех метрик. Принимает занятый %, печатает слово.
status_for() {
  local pct=$1
  if   (( pct > CRIT_PCT )); then echo "ОПАСНО"
  elif (( pct > WARN_PCT )); then echo "ВНИМАНИЕ"
  else                            echo "ХОРОШО"
  fi
}

check_mem() {
  local total avail used_pct used_gb total_gb status
  total=$(awk '/MemTotal/     {print $2}' /proc/meminfo)
  avail=$(awk '/MemAvailable/ {print $2}' /proc/meminfo)
  used_pct=$(( (total - avail) * 100 / total ))   # ЗАНЯТО = (всего - доступно) / всего
  used_gb=$(( (total - avail) / 1048576 ))         # kB -> GB (1024*1024)
  total_gb=$(( total / 1048576 ))
  status=$(status_for "$used_pct")
  printf "Память|%s%%|%s|%sG из %sG\n" "$used_pct" "$status" "$used_gb" "$total_gb"
}

check_disk() {
  local used_pct used_gb total_gb status
  # -BG = размеры сразу в гигабайтах с суффиксом G (надёжнее -h, где единицы плавают M/G/T)
  used_pct=$(df -BG / | awk 'NR==2 {print $5}' | tr -d '%')
  used_gb=$(df -BG /  | awk 'NR==2 {print $3}' | tr -d 'G')
  total_gb=$(df -BG / | awk 'NR==2 {print $2}' | tr -d 'G')
  status=$(status_for "$used_pct")
  printf "Диск /|%s%%|%s|%sG из %sG\n" "$used_pct" "$status" "$used_gb" "$total_gb"
}

check_cpu() {
  local cores load used_pct status
  cores=$(nproc)                                   # сколько ядер
  load=$(awk '{print $1}' /proc/loadavg)           # средняя нагрузка за 1 мин (дробное!)
  # load дробный -> bash-арифметика не умеет, считаем в awk: load/ядра*100, %d округляет до целого
  used_pct=$(awk -v c="$cores" '{printf "%d", $1*100/c}' /proc/loadavg)
  status=$(status_for "$used_pct")
  printf "CPU|%s%%|%s|load %s на %s ядер\n" "$used_pct" "$status" "$load" "$cores"
}

# Собираем таблицу: сначала column выравнивает по ГОЛОМУ тексту,
# и только ПОТОМ sed подкрашивает слова-статусы -> цвет не ломает выравнивание.
{
  echo "МЕТРИКА|ЗАНЯТО|СТАТУС|ДЕТАЛИ"
  check_mem
  check_disk
  check_cpu
} | column -t -s '|' \
  | sed -e "s/ОПАСНО/${RED}ОПАСНО${RST}/" \
        -e "s/ВНИМАНИЕ/${YEL}ВНИМАНИЕ${RST}/" \
        -e "s/ХОРОШО/${GRN}ХОРОШО${RST}/"
