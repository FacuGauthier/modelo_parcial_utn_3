export const metadata = {
  title: 'API de recetas',
  description: 'API para practicar Angular con un recetario personal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: '#fffdf9', color: '#28231f' }}>{children}</body>
    </html>
  );
}
