import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon panier vert",
  description: "Boutique de fruits et légumes en ligne",
};

export default function RootLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
