set -ex
docker build -t ghcr.io/rndd/telegram-tradingview-chart .
#docker push ghcr.io/rndd/telegram-tradingview-chart


# docker run -v ./.env:/app/.env ghcr.io/rndd/telegram-tradingview-chart