
cd `dirname $0`
subl -a .

echo '-- start watching'

livescript -o page/ -w src/*ls &
stylus -o page/ -w src/*styl &
jade -O page/ -wP src/*jade &
doodle page/ &

read

pkill -f livescript
pkill -f stylus
pkill -f jade
pkill -f doodle

echo '-- stop watching'