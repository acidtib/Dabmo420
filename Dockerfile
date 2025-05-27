FROM denoland/deno:latest

# Create working directory
WORKDIR /app

# Copy source
COPY . .

# Compile the main app
RUN deno cache src/main.ts

# Run the app
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "src/main.ts"]
