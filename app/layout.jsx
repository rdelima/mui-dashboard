export const metadata = {
  title: 'MUI Component Bug Analysis',
  description: 'Dashboard analyzing bugs in Material UI components',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
