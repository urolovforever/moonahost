import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../api/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await getFeaturedProducts();
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Xatolik:', error);
      setError('Backend bilan bog\'lanishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero section with background image */}
      <section className="relative bg-primary py-20 md:py-32" style={{
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
              MoonGift
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-5">
              Lazer texnologiyasi bilan yaratilgan noyob mahsulotlar
            </p>
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Yog'och va boshqa materiallarga yuqori aniqlikdagi lazer ishlov berish orqali
              sizning orzuyingizdagi mahsulotlarni hayotga keltiramiz
            </p>
            <Link to="/products" className="inline-block bg-gold text-white px-8 py-3 rounded-button text-base font-semibold hover:bg-gold-700 transition-colors shadow-soft-lg">
              Mahsulotlarni ko'rish
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            <div className="text-center p-2">
              <div className="bg-accent-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-soft">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-text-primary mb-1 md:mb-2">Yuqori Sifat</h3>
              <p className="text-xs md:text-sm text-text-secondary hidden md:block">Har bir mahsulot diqqat bilan ishlab chiqiladi</p>
            </div>
            <div className="text-center p-2">
              <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-soft">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-text-primary mb-1 md:mb-2">Tez Yetkazib Berish</h3>
              <p className="text-xs md:text-sm text-text-secondary hidden md:block">Uzum Market orqali tez va xavfsiz</p>
            </div>
            <div className="text-center p-2">
              <div className="bg-gold-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-soft">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-text-primary mb-1 md:mb-2">Noyob Dizayn</h3>
              <p className="text-xs md:text-sm text-text-secondary hidden md:block">Maxsus buyurtma va individual dizayn</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">Mashhur Mahsulotlar</h2>
            <p className="text-lg text-text-secondary">Eng ko'p sotilgan va sevimli mahsulotlarimiz</p>
          </div>

          {error && (
            <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-button mb-6">
              {error}. Backend serverni ishga tushiring: <code>python manage.py runserver</code>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-primary"></div>
              <p className="mt-4 text-base text-text-secondary">Yuklanmoqda...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12 bg-surface-white rounded-card shadow-soft-md">
              <p className="text-xl text-text-primary font-semibold mb-2">Mashhur mahsulotlar hali yo'q</p>
              <p className="text-base text-text-secondary">Admin paneldan mahsulot qo'shing va "Is Featured" belgilang</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="inline-block bg-primary text-white px-8 py-3 rounded-button font-semibold text-base hover:bg-primary-700 transition-colors shadow-soft-md">
              Barcha mahsulotlar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
