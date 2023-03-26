import "./globals.css";

import FlowbiteContext from "./FlowbiteContext";
import Navigation from "./Navigation";

export const metadata = {
  title: "Reliability",
  description: "by Senior Software Vlogger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body>
        <FlowbiteContext>
          <div className="container mx-auto pt-6">
            <Navigation />
            {children}
          </div>
        </FlowbiteContext>
      </body>
    </html>
  );
}
