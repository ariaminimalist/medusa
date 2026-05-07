#!/usr/bin/env bash
# Build the storefront-open-next for Cloudflare Workers deployment.
#
# Runs in a Debian-based Docker container (glibc required for workerd binary)
# connected to the medusa Docker network so that generateStaticParams() can
# reach the local Medusa backend at http://medusa:9000 during the build.
#
# Output: apps/storefront-open-next/.open-next/
# Deploy:  cd apps/storefront-open-next && npx wrangler deploy
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

docker run --rm \
  --network my-medusa-store_medusa_network \
  --mount type=bind,source="$SCRIPT_DIR",target=/server \
  --mount type=volume,source=my-medusa-store_storefront_node_modules,target=/server/node_modules \
  -w /server/apps/storefront-open-next \
  -e NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_0999290dc35c5e92bfaafa6e57e0643711e7778a1927580f8955ba8f65eb2d75 \
  -e NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.ortholabcenter.com \
  -e MEDUSA_BACKEND_URL=http://medusa:9000 \
  -e NEXT_PUBLIC_DEFAULT_REGION=dk \
  -e NEXT_PUBLIC_BASE_URL=https://ortholabcenter.com \
  -e NEXT_PUBLIC_STRIPE_KEY=pk_test_51TGQhHH6j9eRg113Mmsyolhx0Jhibad044ZlMc8LYabHqgIgU2l3yhBqqq5iHO88R7uirZLNbMSkw8lmjS0VZoQv00QF3cublW \
  -e NEXT_PUBLIC_PAYPAL_CLIENT_ID=AVwdGyYaqL6QPx2-SqRV6zI2-SbYsXqPvvLsJpuf06rHXtRVCUwTbdDwMwJIXJllJCIrnJiqEzApfo3j \
  -e NODE_ENV=production \
  node:20-bookworm-slim \
  sh -c "node_modules/.bin/opennextjs-cloudflare build 2>&1"

echo ""
echo "Build complete. To deploy:"
echo "  cd apps/storefront-open-next"
echo "  npx wrangler deploy"
