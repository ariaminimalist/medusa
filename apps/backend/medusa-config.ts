import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
    modules: [
        {
            resolve: "@medusajs/medusa/payment",
            options: {
                providers: [
                    {
                        resolve: "@medusajs/payment-stripe",
                        id: "stripe",
                        options: {
                            apiKey: process.env.STRIPE_API_KEY,
                        },
                    },
                    // PayPal activates automatically once PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET are filled in .env
                    ...(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET ? [{
                        resolve: "@rsc-labs/medusa-paypal-payment/providers/paypal-payment",
                        id: "paypal-payment",
                        options: {
                            oAuthClientId: process.env.PAYPAL_CLIENT_ID,
                            oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
                            environment: process.env.PAYPAL_ENVIRONMENT || "sandbox",
                        },
                    }] : []),
                ],
            },
        },
        {
            resolve: "@medusajs/medusa/notification",
            options: {
                providers: [
                    {
                        resolve: "./src/modules/resend",
                        id: "resend",
                        options: {
                            channels: ["email"],
                            api_key: process.env.RESEND_API_KEY,
                            from: process.env.RESEND_FROM_EMAIL,
                        },
                    },
                ],
            },
        },
    ],
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        redisUrl: process.env.REDIS_URL,
        http: {
            storeCors: process.env.STORE_CORS!,
            adminCors: process.env.ADMIN_CORS!,
            authCors: process.env.AUTH_CORS!,
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
        },
        databaseDriverOptions: {
            ssl: false,
            sslmode: "disable",
        },
    },
    admin: {
        vite: (config) => {
            return {
                server: {
                    host: "0.0.0.0",
                    // Allow all hosts when running in Docker (development mode)          
                    // In production, this should be more restrictive          
                    allowedHosts: [
                        "localhost",
                        ".localhost",
                        "127.0.0.1",
                    ],
                    hmr: {
                        // HMR websocket port inside container
                        port: 5173,
                        // Port browser connects to (exposed in docker-compose.yml)
                        clientPort: 5173,
                    },
                    origin: process.env.ADMIN_VITE_ORIGIN || "http://localhost:9000",
                },
            }
        },
    }
})