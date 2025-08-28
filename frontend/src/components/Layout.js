import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        {children}
      </main>
      <Footer />
    </>
  );
}