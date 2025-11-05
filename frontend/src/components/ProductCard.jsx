import { Link } from 'react-router-dom';
import { useState } from 'react';

function ProductCard({ product }) {
  const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

  // Rasmlar ro'yxati
  const images = [product.image, product.image_2, product.image_3].filter(Boolean);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // O'ngga swipe - keyingi rasm
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      // Chapga swipe - oldingi rasm
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Chegirma badge rang va ko'rinishni aniqlash
  const getDiscountBadgeClass = () => {
    if (product.discount_percentage >= 15) {
      return 'bg-red-500 text-white'; // 15%+ qizil
    } else if (product.discount_percentage >= 5) {
      return 'bg-yellow-400 text-gray-900'; // 5-15% sariq
    }
    return null; // 5% dan kam - ko'rinmasin
  };

  const discountBadgeClass = getDiscountBadgeClass();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Rasm - swipe bilan aylanadi */}
      <div
        className="relative overflow-hidden aspect-[3/4]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide transitions bilan carousel */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} - ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Rasm indicator dots - faqat ko'p rasm bo'lsa */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-3'
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges Container */}
        {/* Chegirma Badge - yuqori chap */}
        {discountBadgeClass && (
          <span className={`absolute top-1.5 left-1.5 sm:top-2 sm:left-2 ${discountBadgeClass} text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg font-bold shadow-lg backdrop-blur-sm`}>
            -{product.discount_percentage}%
          </span>
        )}

        {/* TOP Badge - yuqori o'ng */}
        {product.is_featured && (
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg font-semibold shadow-lg backdrop-blur-sm flex items-center gap-0.5 sm:gap-1">
            <span>⭐</span>
            <span>TOP</span>
          </span>
        )}
      </div>

      <div className="p-2.5 sm:p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-0 hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Tavsif - 2 qator */}
        {product.description && (
          <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 mb-1.5 sm:mb-2 mt-0.5 font-normal leading-snug">
            {product.description}
          </p>
        )}

        {/* Narx */}
        {product.discount_percentage >= 5 ? (
          <div className="mb-2 sm:mb-3">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <p className="text-base sm:text-xl font-bold text-red-600">
                {formatPrice(product.price * (1 - product.discount_percentage / 100))} so'm
              </p>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 line-through">
              {formatPrice(product.price)} so'm
            </p>
          </div>
        ) : (
          <div className="mb-2 sm:mb-3">
            <p className="text-base sm:text-xl font-bold text-gray-800">
              {formatPrice(product.price)} so'm
            </p>
          </div>
        )}

        {/* Tugmalar - kichik ekranlarda ham yaxshi ko'rinadi */}
        <div className="space-y-1 sm:space-y-1.5">
          {/* Uzum va Yandex tugmalari */}
          <div className="flex gap-1 sm:gap-1.5">
            <a
              href={product.uzum_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${product.yandex_market_link ? 'flex-1' : 'w-full'} bg-purple-600 hover:bg-purple-700 text-white py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-md sm:rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-0.5 sm:gap-1 font-medium text-[10px] sm:text-xs`}
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="whitespace-nowrap">Uzum</span>
            </a>

            {product.yandex_market_link && (
              <a
                href={product.yandex_market_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-md sm:rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-0.5 sm:gap-1 font-medium text-[10px] sm:text-xs"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="whitespace-nowrap">Yandex</span>
              </a>
            )}
          </div>

          {/* Ism yozdirish tugmasi - Telegram */}
          <a
            href="https://t.me/moongift_uz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-md sm:rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-0.5 sm:gap-1 font-medium text-[10px] sm:text-xs"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
            </svg>
            <span className="whitespace-nowrap">Ism yozdirish</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
