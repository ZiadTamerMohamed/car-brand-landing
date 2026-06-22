import { useState } from 'react';
import { ShoppingCart, Flame, ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';

import photo1 from './image/photo_1_2026-06-17_22-21-18.jpg';
import photo2 from './image/photo_2_2026-06-17_22-21-18.jpg';
import photo3 from './image/photo_3_2026-06-17_22-21-18.jpg';
import photo5 from './image/photo_5_2026-06-17_22-21-18.jpg';
import photo10 from './image/photo_10_2026-06-17_22-21-18.jpg';

const products = [
  { id: 1, name: "T-Shirt Mitsubishi EVO Edition", price: 380, oldPrice: 500, image: photo1 },
  { id: 2, name: "T-Shirt Honda Civic VTEC Skull", price: 380, oldPrice: 500, image: photo3 },
  { id: 3, name: "T-Shirt Honda Civic JDM Art", price: 380, oldPrice: 500, image: photo5 },
  { id: 4, name: "T-Shirt Volkswagen JETTA Edition", price: 380, oldPrice: 500, image: photo10 },
];

export default function App() {
  // سلة المشتريات (تبدأ فارغة)
  const [cart, setCart] = useState([]);
  
  // الخيارات الحالية للقطعة المفتوحة (التي يختارها المستخدم قبل الإضافة للسلة)
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [size, setSize] = useState('L');
  const [color, setColor] = useState('black');
  const [quantity, setQuantity] = useState(1);

  const [formStep, setFormStep] = useState(1); // 1: البيانات والسلة، 2: الدفع، 3: النجاح
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // التمرير السريع إلى قسم الشراء
  const scrollToOrder = (product = null) => {
    if (product) {
      setSelectedProduct(product);
    }
    document.getElementById('order-section').scrollIntoView({ behavior: 'smooth' });
  };

  // دالة إضافة المنتج الحالي إلى السلة
  const addToCart = () => {
    // كود تعريفي فريد يجمع بين (Id المنتج + المقاس + اللون) لتجنب التكرار
    const cartItemId = `${selectedProduct.id}-${size}-${color}`;

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);

      if (existingItemIndex > -1) {
        // لو القطعة بنفس اللون والمقاس موجودة مسبقاً، نزود كميتها بس
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // لو جديدة تماماً، نضيفها كعنصر منفصل في السلة
        return [...prevCart, {
          cartItemId,
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
          size,
          color: color === 'black' ? 'أسود' : 'أبيض',
          quantity
        }];
      }
    });

    // إعادة تصغير الكمية لـ 1 بعد الإضافة بنجاح
    setQuantity(1);
    
    // التمرير تلقائياً لملخص السلة وفورم البيانات المباشر
    document.getElementById('checkout-form').scrollIntoView({ behavior: 'smooth' });
  };

  // التحكم في كميات السلة
  const updateCartQuantity = (cartItemId, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  // حذف قطعة من السلة
  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  // حساب إجمالي السعر لكل محتويات السلة
  const calculateTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

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
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md transition duration-300 text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-red-600/20 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" /> السلة ({cart.reduce((a, b) => a + b.quantity, 0)})
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-right z-10">
            <span className="bg-red-950/50 text-red-500 border border-red-900 px-3 py-1 rounded-full text-xs font-bold tracking-wide inline-block">مجموعة صيف 2026 الحصرية 🏎️</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">اظهر بشغفك.. تيشيرتات مخصصة <span className="text-red-500 italic block mt-2">لعشاق وحوش الأسفلت</span></h1>
            <p className="text-zinc-400 text-lg sm:text-xl font-light">قطن مصري 100% وطباعة ديجيتال عالية الجودة ضد الغسيل. اختر أكتر من موديل ولون براحتك وضفهم للسلة!</p>
            <button onClick={() => scrollToOrder(products[0])} className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg px-8 py-4 rounded-xl transition duration-300 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-0.5 active:scale-95">اطلب وتصفح الموديلات</button>
          </div>
          <div className="relative mx-auto max-w-md lg:max-w-none w-full">
            <img src={photo2} alt="Hero" className="rounded-2xl border border-zinc-800 shadow-2xl bg-zinc-900 transition duration-500 hover:shadow-red-950/50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-zinc-900/30 border-b border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="flex gap-4 p-5 bg-zinc-900/50 rounded-2xl border border-zinc-800/60 transition duration-300 hover:shadow-md hover:shadow-zinc-900/80 hover:-translate-y-0.5">
          <Flame className="w-6 h-6 text-red-500" />
          <div><h3 className="font-bold text-sm mb-0.5">قطن مصري 100% premium</h3><p className="text-zinc-400 text-xs">خامة ثقيلة ومريحة جداً وتتحمل الغسيل المتكرر.</p></div>
        </div>
        <div className="flex gap-4 p-5 bg-zinc-900/50 rounded-2xl border border-zinc-800/60 transition duration-300 hover:shadow-md hover:shadow-zinc-900/80 hover:-translate-y-0.5">
          <ShieldCheck className="w-6 h-6 text-red-500" />
          <div><h3 className="font-bold text-sm mb-0.5">طباعة ثابتة ديجيتال</h3><p className="text-zinc-400 text-xs">أعلى تقنيات الطباعة ومستحيل تروح أو تقشر.</p></div>
        </div>
        <div className="flex gap-4 p-5 bg-zinc-900/50 rounded-2xl border border-zinc-800/60 transition duration-300 hover:shadow-md hover:shadow-zinc-900/80 hover:-translate-y-0.5">
          <Truck className="w-6 h-6 text-red-500" />
          <div><h3 className="font-bold text-sm mb-0.5">معاينة قبل الاستلام</h3><p className="text-zinc-400 text-xs">حقك تفتح وتتأكد من المقاس والخامة مع المندوب قبل الدفع.</p></div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12"><h2 className="text-3xl font-black">اختر وحشك المفضّل 🏁</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex flex-col justify-between p-4 space-y-4 transition duration-350 hover:shadow-xl hover:shadow-black/50 hover:border-zinc-700 hover:-translate-y-1">
              <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-xl" />
              <div>
                <h3 className="font-bold text-sm text-zinc-200">{product.name}</h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-black text-red-500">{product.price} ج.م</span>
                  <span className="text-xs text-zinc-500 line-through">{product.oldPrice} ج.م</span>
                </div>
              </div>
              <button onClick={() => scrollToOrder(product)} className="w-full bg-zinc-800 hover:bg-red-600 text-white font-bold py-2 rounded-xl transition duration-300 text-xs hover:shadow-md hover:shadow-red-600/10 active:scale-95">تخصيص اللون والمقاس</button>
            </div>
          ))}
        </div>
      </section>

      {/* Customizer & Checkout Section */}
      <section id="order-section" className="py-12 bg-zinc-900/20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* اليمين: مخصّص المنتج المختار حالياً */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4 shadow-lg shadow-black/30">
            <h3 className="font-black text-lg text-red-500">تخصيص القطعة الحالية:</h3>
            <div className="flex gap-4 items-center bg-zinc-950 p-3 rounded-xl border border-zinc-850">
              <img src={selectedProduct.image} alt="" className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <h4 className="font-bold text-sm">{selectedProduct.name}</h4>
                <p className="text-red-500 font-bold text-sm">{selectedProduct.price} ج.م</p>
              </div>
            </div>

            {/* تخصيص اللون والمقاس */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">المقاس</label>
                <div className="flex gap-1">
                  {['M', 'L', 'XL', 'XXL'].map(m => (
                    <button key={m} onClick={() => setSize(m)} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition duration-200 ${size === m ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/20' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}>{m}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">اللون</label>
                <div className="flex gap-1">
                  {[{id:'black', n:'أسود'}, {id:'white', n:'أبيض'}].map(c => (
                    <button key={c.id} onClick={() => setColor(c.id)} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition duration-200 ${color === c.id ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/20' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}>{c.n}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* تحديد كمية القطعة الحالية */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">الكمية من هالمواصفات</label>
              <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 rounded-lg p-1 max-w-[140px]">
                <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center transition hover:bg-zinc-800"><Minus className="w-3 h-3" /></button>
                <span className="flex-1 text-center font-bold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center transition hover:bg-zinc-800"><Plus className="w-3 h-3" /></button>
              </div>
            </div>

            <button onClick={addToCart} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition duration-300 text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-600/20 active:scale-95">
              <ShoppingCart className="w-4 h-4" /> إضافة هذي التشكيلة للسلة
            </button>
          </div>

          {/* اليسار: السلة + فورم تأكيد الشحن والطلب */}
          <div id="checkout-form" className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6 shadow-lg shadow-black/30">
            
            {formStep === 1 && (
              <>
                <h3 className="font-black text-xl text-white">سلة المشتريات والبيانات 📦</h3>
                
                {/* عرض محتويات السلة المرنة */}
                {cart.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-sm">السلة فارغة حالياً. اختر تيشيرت وضفه من اليمين!</div>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.cartItemId} className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-850 text-xs transition hover:border-zinc-700">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt="" className="w-10 h-10 object-cover rounded" />
                          <div>
                            <h5 className="font-bold text-zinc-200 line-clamp-1">{item.name}</h5>
                            <p className="text-zinc-500 mt-0.5">مقاس: {item.size} | لون: {item.color}</p>
                            <p className="text-red-500 font-bold mt-0.5">{item.price * item.quantity} ج.م</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-zinc-900 rounded p-0.5 border border-zinc-800">
                            <button onClick={() => updateCartQuantity(item.cartItemId, -1)} className="w-5 h-5 text-zinc-400 flex items-center justify-center hover:bg-zinc-800 rounded"><Minus className="w-3 h-3" /></button>
                            <span className="px-2 font-bold text-white">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.cartItemId, 1)} className="w-5 h-5 text-zinc-400 flex items-center justify-center hover:bg-zinc-800 rounded"><Plus className="w-3 h-3" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.cartItemId)} className="text-zinc-600 hover:text-red-500 p-1 transition"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                    <div className="text-left font-black text-sm text-red-500 pt-2 border-t border-zinc-800">إجمالي المنتجات: {calculateTotal()} ج.م</div>
                  </div>
                )}

                {/* فورم بيانات العميل */}
                <form className="space-y-3 pt-2" onSubmit={(e) => { e.preventDefault(); if(cart.length > 0) setFormStep(2); }}>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">الاسم بالكامل</label>
                    <input type="text" placeholder="الاسم" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:shadow-md focus:shadow-red-600/5 transition" required />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">رقم الموبايل</label>
                    <input type="tel" placeholder="رقم الهاتف" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:shadow-md focus:shadow-red-600/5 transition" required />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">العنوان بالتفصيل</label>
                    <input type="text" placeholder="المحافظة / المدينة / اسم الشارع" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:shadow-md focus:shadow-red-600/5 transition" required />
                  </div>

                  <button 
                    type="submit" 
                    disabled={cart.length === 0}
                    className={`w-full font-black text-base py-3.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 mt-4 ${cart.length === 0 ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:shadow-red-600/20 active:scale-95'}`}
                  >
                    الانتقال للدفع وتأكيد الطلب <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </form>
              </>
            )}

            {/* الخطوة 2: الدفع وسحب الإجمالي الشامل */}
            {formStep === 2 && (
              <div className="space-y-4">
                <button onClick={() => setFormStep(1)} className="text-zinc-500 text-xs flex items-center gap-1 hover:text-zinc-300 transition"><ArrowRight className="w-4 h-4" /> العودة لتعديل السلة</button>
                <h3 className="font-black text-lg text-white">طريقة الدفع المناسبة 💳</h3>
                
                <div className="space-y-2">
                  <div onClick={() => setPaymentMethod('cash')} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition duration-200 ${paymentMethod === 'cash' ? 'border-red-600 bg-red-950/10 shadow-md shadow-red-600/5' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'}`}>
                    <div className="flex items-center gap-3"><Banknote className="w-5 h-5 text-red-500" /><div><h4 className="font-bold text-sm">كاش عند الاستلام</h4><p className="text-zinc-500 text-xs">الدفع للمندوب بعد المعاينة.</p></div></div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition duration-200 ${paymentMethod === 'cash' ? 'border-red-600' : 'border-zinc-700'}`}>{paymentMethod === 'cash' && <div className="w-2 h-2 rounded-full bg-red-600"></div>}</div>
                  </div>

                  <div onClick={() => setPaymentMethod('card')} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition duration-200 ${paymentMethod === 'card' ? 'border-red-600 bg-red-950/10 shadow-md shadow-red-600/5' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'}`}>
                    <div className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-red-500" /><div><h4 className="font-bold text-sm">بالفيزا مع المندوب</h4><p className="text-zinc-500 text-xs">المندوب يمتلك ماكينة دفع POS.</p></div></div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition duration-200 ${paymentMethod === 'card' ? 'border-red-600' : 'border-zinc-700'}`}>{paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-red-600"></div>}</div>
                  </div>
                </div>

                <button onClick={() => setFormStep(3)} className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-base py-3.5 rounded-xl transition duration-300 mt-4 hover:shadow-lg hover:shadow-red-600/20 active:scale-95">
                  تأكيد الطلب النهائي بمبلغ {calculateTotal()} ج.م 🏎️
                </button>
              </div>
            )}

            {/* الخطوة 3: شاشة النجاح والملخص المتكامل */}
            {formStep === 3 && (
              <div className="text-center space-y-4 py-4">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto animate-bounce" />
                <h3 className="font-black text-xl">تم استلام طلبك بنجاح! 🔥</h3>
                <p className="text-zinc-400 text-xs max-w-xs mx-auto">سيتم التواصل معك هاتفياً أو واتساب خلال 24 ساعة لتأكيد الشحن فوراً.</p>
                
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 text-xs text-zinc-400 space-y-2 text-right shadow-inner">
                  <div className="font-bold text-white border-b border-zinc-800 pb-1 mb-1">القطع المطلوبة:</div>
                  {cart.map(item => (
                    <div key={item.cartItemId} className="flex justify-between">
                      <span>{item.name} ({item.quantity} قطع) - {item.size}/{item.color}</span>
                      <span className="text-zinc-300">{item.price * item.quantity} ج.م</span>
                    </div>
                  ))}
                  <div className="border-t border-zinc-800 pt-2 text-sm flex justify-between font-black">
                    <span className="text-white">الحساب الإجمالي:</span>
                    <span className="text-green-500">{calculateTotal()} ج.م</span>
                  </div>
                </div>

                <button onClick={() => { setFormStep(1); setCart([]); }} className="text-zinc-500 hover:text-red-500 font-medium text-xs transition underline decoration-dotted">عمل طلب جديد</button>
              </div>
            )}

          </div>

        </div>
      </section>

      <footer className="py-8 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        <p>© {new Date().getFullYear()} RPM Wear. جميع الحقوق محفوظة.</p>
      </footer>

    </div>
  );
}