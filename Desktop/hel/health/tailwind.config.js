/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",      // blue
        success: "#16a34a",      // green
        warning: "#f59e0b",      // yellow
        destructive: "#dc2626",  // red
        muted: "#6b7280",
        card: "#ffffff",
        border: "#e5e7eb",
      },
    },
  },
  plugins: [],
}