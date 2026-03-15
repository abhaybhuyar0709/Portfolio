# ──────────────────────────────────────────────────────────────────────────────
# Portfolio + ResumeAI — Static site served by nginx
#
# Build & run:
#   docker build -t portfolio .
#   docker run -p 3000:80 portfolio
#
# Or with docker compose:
#   docker compose up
# ──────────────────────────────────────────────────────────────────────────────
FROM nginx:alpine

# Remove the nginx default page
RUN rm -rf /usr/share/nginx/html/*

# Copy all static site files into the nginx document root
COPY . /usr/share/nginx/html/

# Expose port 80 inside the container (docker compose maps it to host port 3000)
EXPOSE 80

# nginx starts automatically — no CMD needed
