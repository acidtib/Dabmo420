# Build Stage
FROM denoland/deno:latest AS builder
WORKDIR /app
COPY . .
RUN deno compile --allow-net --allow-env --allow-read --output /app/bot src/main.ts

# Runtime Stage
FROM denoland/deno:latest
WORKDIR /app
COPY --from=builder /app/bot /app/bot

CMD ["/app/bot"]
