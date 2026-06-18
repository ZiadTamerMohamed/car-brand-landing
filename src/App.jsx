import { useState } from 'react';
import { ShoppingCart, Flame, ShieldCheck, Truck } from 'lucide-react';

import photo1 from './image/photo_1_2026-06-17_22-21-18.jpg';
import photo2 from './image/photo_2_2026-06-17_22-21-18.jpg';
import photo3 from './image/photo_3_2026-06-17_22-21-18.jpg';
import photo5 from './image/photo_5_2026-06-17_22-21-18.jpg';
import photo10 from './image/photo_10_2026-06-17_22-21-18.jpg';

const products = [
  {
    id: 1,
    name: "T-Shirt Mitsubishi EVO Edition",
    price: 380,
    oldPrice: 500,
    image: photo1,
  },
  {
    id: 2,
    name: "T-Shirt Honda Civic VTEC Skull",
    price: 380,
    oldPrice: 500,
    image: photo3,
  },
  {
    id: 3,
    name: " T-Shirt Honda Civic JDM Art",
    price: 380,
    oldPrice: 500,
    image: photo5,
  },
  {
    id: 4,
    name: "T-Shirt Volkswagen JETTA Edition",
    price: 380,
    oldPrice: 500,
    image: photo10,
  },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(products[0].name);
  const [size, setSize] = useState('L');

  const scrollToOrder = (productName) => {
    if (productName) setSelectedProduct(productName);
    document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased selection:bg-red-600 selection:text-white" dir="rtl">
      
      {/* Navbar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl tracking-wider text-red-500 italic">
            <Flame className="w-6 h-6 animate-pulse" /> RPM WEAR
          </div>
          <button 
            onClick={() => scrollToOrder()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md transition text-sm flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" /> اطلب الآن
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-center lg:text-right z-10">
            <span className="bg-red-950/50 text-red-500 border border-red-900 px-3 py-1 rounded-full text-xs font-bold tracking-wide inline-block">
              مجموعة صيف 2026 الحصرية 🏎️
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              اظهر بشغفك.. تيشيرتات مخصصة <span className="text-red-500 italic block mt-2">لعشاق وحوش الأسفلت</span>
            </h1>
            <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 font-light">
              تصميمات حصرية مستوحاة من ثقافة الـ JDM وتعديل السيارات (Evo, Civic, Jetta). قطن مصري 100% وطباعة ديجيتال عالية الجودة ضد الغسيل.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button 
                onClick={() => scrollToOrder(products[0].name)}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg shadow-red-900/30 transition transform hover:-translate-y-0.5"
              >
                اطلب قطعتك الآن بسعر العرض
              </button>
            </div>
          </div>

          <div className="relative mx-auto lg:ml-0 max-w-md lg:max-w-none w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent rounded-3xl blur-2xl"></div>
              <img 
              src={photo2}
              alt="Mitsubishi Evo T-shirt" 
              className="rounded-2xl border border-zinc-800 shadow-2xl bg-zinc-900 transform hover:scale-[1.02] transition duration-300"
            />
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-zinc-900/30 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/60">
            <div className="w-12 h-12 bg-red-950/40 text-red-500 rounded-xl flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">قطن مصري 100% premium</h3>
              <p className="text-zinc-400 text-sm">خامة تقيلة ومريحة جداً في اللبس وبتستحمل المشاوير الطويلة والحر.</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/60">
            <div className="w-12 h-12 bg-red-950/40 text-red-500 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">طباعة ثابته ديجيتال</h3>
              <p className="text-zinc-400 text-sm">أعلى تقنيات الطباعة اللي مستحيل تروح أو تقشر مع الغسيل المتكرر.</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/60">
            <div className="w-12 h-12 bg-red-950/40 text-red-500 rounded-xl flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">معاينة قبل الاستلام</h3>
              <p className="text-zinc-400 text-sm">حقك تفتح الشحنة وتتأكد من المقاس والخامة مع المندوب قبل ما تدفع قرش واحد.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">اختر وحشك المفضّل 🏁</h2>
          <p className="text-zinc-400">جميع التصميمات متوفرة بمقاسات مختلفة بألوان حاسمة (أبيض / أسود).</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex flex-col group">
              <div className="overflow-hidden bg-zinc-950 relative aspect-[4/3] sm:aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-red-600 text-white font-black text-xs px-2 py-1 rounded-md italic">
                  خصم لفترة محدودة
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-zinc-200 line-clamp-2">{product.name}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-red-500">{product.price} ج.م</span>
                    <span className="text-sm text-zinc-500 line-through">{product.oldPrice} ج.م</span>
                  </div>
                  <button 
                    onClick={() => scrollToOrder(product.name)}
                    className="w-full bg-zinc-800 hover:bg-red-600 hover:text-white text-zinc-300 font-bold py-2.5 rounded-xl transition text-sm"
                  >
                    شراء الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="py-20 bg-zinc-900/40 border-t border-zinc-900">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl space-y-6">
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black">أكّد طلبك الآن 📦</h2>
              <p className="text-zinc-400 text-sm">املأ البيانات وهيتم التواصل معاك وتجهيز الشحن فوراً دليفري للمنزل.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">الاسم بالكامل</label>
                <input type="text" placeholder="الاسم" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-600 transition" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">رقم الموبايل (مهم جداً)</label>
                <input type="tel" placeholder=" XXXXXXXX" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-600 transition" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">العنوان بالتفصيل (المحافظة / المنطقة)</label>
                <input type="text" placeholder=" القاهرة، مصر الجديدة، شارع..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-600 transition" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">الموديل المطلوب</label>
                  <select 
                    value={selectedProduct} 
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-3 text-zinc-100 focus:outline-none focus:border-red-600 transition"
                  >
                    {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">المقاس</label>
                  <div className="flex gap-2">
                    {['M', 'L', 'XL', 'XXL'].map((m) => (
                      <button 
                        key={m}
                        type="button"
                        onClick={() => setSize(m)}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl border transition ${size === m ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-lg py-4 rounded-xl transition transform hover:scale-[1.01] shadow-lg shadow-red-900/20 mt-4 flex items-center justify-center gap-2"
              >
                تأكيد الطلب والدفع عند الاستلام 🏎️
              </button>
            </form>

          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        <p>© {new Date().getFullYear()} RPM Wear. جميع الحقوق محفوظة.</p>
      </footer>

    </div>
  );
}