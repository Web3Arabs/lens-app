// app/layout.tsx
"use client";
import "./globals.css";
import { polygonMumbai, polygon } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { LensProvider, LensConfig, production } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

// Polygon تهيئة الشبكة التي ستقوم المحفظة بالإتصال بها وهي شبكة
const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygon],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ],
});

// إعداد البروتوكول في المشروع
const lensConfig: LensConfig = {
  // يقوم بتوفير الربط والتوقيع مع الحساب
  bindings: wagmiBindings(),
  // تحديد البيئة التي سيتعامل معها المشروع
  // production وإذا كان حساب اساسي اجعلها development إذا كان على حساب تجريبي قم بإستخدام
  environment: production,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <LensProvider config={lensConfig}>
          <body>{children}</body>
        </LensProvider>
      </WagmiConfig>
    </html>
  );
}
