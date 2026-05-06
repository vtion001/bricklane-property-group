#!/bin/bash
# BPG Server Startup Script
# Start BPG CI4 server and public tunnel

BPG_DIR="/Users/archerterminez/Desktop/REPOSITORY/bricklane-property-group"
PORT=8081
TUNNEL_SUBDOMAIN="bpg-bricklane"

# Kill existing servers on these ports
lsof -ti :$PORT | xargs kill 2>/dev/null
pkill -f "localtunnel.*$PORT" 2>/dev/null

# Start CI4 server
cd "$BPG_DIR/server"
CI_ENVIRONMENT=production /opt/homebrew/bin/php -d opcache.enable=0 \
    -S 0.0.0.0:$PORT -t public \
    > "$BPG_DIR/bpg-server.log" 2>&1 &

echo "BPG server PID: $!"
sleep 3

# Start localtunnel
npx localtunnel --port $PORT --subdomain $TUNNEL_SUBDOMAIN \
    > "$BPG_DIR/bpg-tunnel.log" 2>&1 &

echo "Localtunnel PID: $!"
sleep 3

# Symlink Vue dist assets so CI4 can serve them
rm -f "$BPG_DIR/server/public/assets"
ln -sfn "$BPG_DIR/client/dist/assets" "$BPG_DIR/server/public/assets"

echo "Vue assets symlinked from client/dist/assets → server/public/assets"

sleep 2
cat "$BPG_DIR/bpg-tunnel.log"
