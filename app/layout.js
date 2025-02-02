import "./globals.css";

export const metadata = {
  title: "Safeguard",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased fill-background">{children}</body>
    </html>
  );
}
