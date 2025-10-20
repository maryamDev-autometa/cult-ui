import { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag, usePinch, useWheel } from '@use-gesture/react';
import Lightboard from './components/ui/lightboard';
import ExpandableCard from './components/ui/expandable-card';
import Timer from './components/ui/timer';
import GradientHeading from './components/ui/gradient-heading';
import Typewriter from './components/ui/typewriter';
import LogoCarousel from './components/ui/logo-carousel';

function App() {
  // Start with light mode (false) - initialize immediately
  const [darkMode, setDarkMode] = useState(() => {
    // Force remove dark class on initialization
    document.documentElement.classList.remove('dark');
    return false;
  });

  useEffect(() => {
    // Apply or remove dark class based on state
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Debug log to verify
    console.log('Dark mode:', darkMode, 'HTML classes:', root.className);
  }, [darkMode]);

  // Gesture state for hero image
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { mass: 1, tension: 210, friction: 20 }
  }));

  // Drag gesture
  const bindDrag = useDrag(
    ({ offset: [ox, oy] }) => {
      api.start({ x: ox, y: oy });
    },
    {
      from: () => [x.get(), y.get()],
      bounds: { left: -500, right: 500, top: -300, bottom: 300 }
    }
  );

  // Pinch gesture (for touch devices)
  const bindPinch = usePinch(
    ({ offset: [s] }) => {
      api.start({ scale: s });
    },
    {
      from: () => [scale.get(), 0],
      scaleBounds: { min: 0.5, max: 2 }
    }
  );

  // Wheel gesture (for zoom with mouse wheel)
  const bindWheel = useWheel(
    ({ offset: [, y] }) => {
      const newScale = 1 + y / 1000;
      api.start({ scale: Math.max(0.5, Math.min(2, newScale)) });
    }
  );

  // Double click to reset
  const handleDoubleClick = () => {
    api.start({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Magazine Header */}
      <header className="border-b border-black dark:border-white bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 text-xs font-sans tracking-wider text-black dark:text-white">
            <div className="font-medium">OCTOBER 2025</div>
            <div className="text-2xl font-display font-bold tracking-tight">FASHION BOOST</div>
            <div className="font-medium flex items-center gap-4">
              <span>ISSUE NO. 47</span>
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  // Sun icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  // Moon icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <nav className="flex items-center justify-center py-4">
            {/* Component Tags Navigation */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Buttons', 'Cards', 'Carousels', 'Timers', 'Forms',
                'Animations', 'Typography', 'Interactive Elements'
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white text-xs font-sans tracking-wide rounded-full border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Lightboard Marquee */}
      <Lightboard
        text="FASHION BOOST MAGAZINE • FALL/WINTER 2025 • THE NEW AVANT-GARDE • EXCLUSIVE COVERAGE • SUBSCRIBE NOW •"
        color="#ff0000"
        speed={2}
        dotSize={4}
        dotGap={6}
      />

      {/* Magazine Cover Hero */}
      <main className="relative">
        {/* Hero Image Container */}
        <div className="relative h-[85vh] overflow-hidden">
          {/* Background Hero Image with Gestures */}
          <div className="absolute inset-0 overflow-hidden">
            <animated.img
              {...bindDrag()}
              {...bindPinch()}
              {...bindWheel()}
              onDoubleClick={handleDoubleClick}
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=1200&fit=crop"
              alt="Fashion Model"
              className="w-full h-full object-cover cursor-grab active:cursor-grabbing select-none"
              style={{
                x,
                y,
                scale,
                touchAction: 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Overlay Content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="text-center space-y-8 px-4">
              <div className="inline-block px-6 py-2 bg-black text-white text-xs font-sans tracking-widest backdrop-blur-sm">
                EXCLUSIVE
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-7xl md:text-9xl leading-none tracking-tight text-white drop-shadow-2xl">
                <span className="block">THE NEW</span>
                <span className="block italic">AVANT-GARDE</span>
              </h1>

              <div className="font-sans text-lg md:text-xl tracking-wide max-w-2xl mx-auto text-white drop-shadow-lg">
                <Typewriter
                  text="Redefining Modern Elegance for the Bold Generation"
                  speed={50}
                  className="text-white"
                />
              </div>
            </div>
          </div>

          {/* Cover Stories Sidebar */}
          <div className="absolute left-8 top-1/4 space-y-6 hidden lg:block bg-white/95 backdrop-blur-sm p-6 rounded-sm shadow-2xl">
            <div className="flex items-start gap-4 max-w-xs">
              <span className="font-display text-2xl font-bold text-black">01</span>
              <div>
                <h3 className="font-sans font-bold text-sm tracking-wide mb-1 text-black">FALL/WINTER 2025</h3>
                <p className="font-sans text-xs leading-relaxed text-gray-700">The season's most daring looks</p>
              </div>
            </div>
            <div className="flex items-start gap-4 max-w-xs">
              <span className="font-display text-2xl font-bold text-black">02</span>
              <div>
                <h3 className="font-sans font-bold text-sm tracking-wide mb-1 text-black">CULTURE SHIFT</h3>
                <p className="font-sans text-xs leading-relaxed text-gray-700">Gen Z reshaping fashion</p>
              </div>
            </div>
            <div className="flex items-start gap-4 max-w-xs">
              <span className="font-display text-2xl font-bold text-black">03</span>
              <div>
                <h3 className="font-sans font-bold text-sm tracking-wide mb-1 text-black">SUSTAINABILITY NOW</h3>
                <p className="font-sans text-xs leading-relaxed text-gray-700">Eco-fashion revolution</p>
              </div>
            </div>
          </div>

          {/* Side Feature */}
          <div className="absolute right-8 top-1/4 hidden lg:block bg-white/95 backdrop-blur-sm p-6 rounded-sm shadow-2xl">
            <div className="space-y-3 max-w-xs">
              <div className="font-sans text-xs tracking-widest font-bold border-b border-black pb-2 text-black">
                ALSO IN THIS ISSUE
              </div>
              <ul className="space-y-2 font-sans text-xs text-gray-700">
                <li>Beauty Rituals from Tokyo</li>
                <li>The Return of Maximalism</li>
                <li>Street Style Chronicles</li>
                <li>Vintage Treasures Guide</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-sm shadow-lg">
              <div className="h-16 w-2 bg-black"></div>
              <div className="h-16 w-1 bg-black"></div>
              <div className="h-16 w-2 bg-black"></div>
              <div className="h-16 w-1 bg-black"></div>
              <div className="h-16 w-3 bg-black"></div>
              <span className="font-sans text-xs ml-2 text-black">9 771234 567890</span>
            </div>
            <div className="font-display text-xl font-bold bg-white/95 backdrop-blur-sm px-6 py-3 rounded-sm shadow-lg text-black">$12.99</div>
          </div>
        </div>
      </main>

      {/* Flash Sale Products Section */}
      <section className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          {/* Sale Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-sans tracking-widest mb-4">
              FLASH SALE
            </span>
            <h2 className="font-display text-5xl font-bold mb-4 text-black dark:text-white">
              Limited Time Offer
            </h2>
            <p className="font-sans text-lg text-gray-600 dark:text-gray-300 mb-8">
              Exclusive pieces at unbeatable prices. Sale ends in:
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center mb-12">
              <Timer
                endDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000)}
                onExpire={() => console.log('Sale ended!')}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop"
                  alt="Designer Handbag"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                  -40%
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-sans tracking-widest text-gray-500 dark:text-gray-400 uppercase">Accessories</span>
                <h3 className="font-display text-2xl font-bold mt-2 mb-3 text-black dark:text-white">Designer Handbag</h3>
                <p className="font-sans text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Luxury leather craftsmanship meets modern elegance
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-red-600">$599</span>
                  <span className="text-lg text-gray-400 line-through">$999</span>
                </div>
                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 font-sans text-sm tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop"
                  alt="Statement Coat"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                  -35%
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-sans tracking-widest text-gray-500 dark:text-gray-400 uppercase">Outerwear</span>
                <h3 className="font-display text-2xl font-bold mt-2 mb-3 text-black dark:text-white">Statement Coat</h3>
                <p className="font-sans text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Timeless silhouette with contemporary details
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-red-600">$449</span>
                  <span className="text-lg text-gray-400 line-through">$690</span>
                </div>
                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 font-sans text-sm tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=800&fit=crop"
                  alt="Premium Boots"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                  -50%
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-sans tracking-widest text-gray-500 dark:text-gray-400 uppercase">Footwear</span>
                <h3 className="font-display text-2xl font-bold mt-2 mb-3 text-black dark:text-white">Premium Boots</h3>
                <p className="font-sans text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Italian leather with signature heel design
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-red-600">$299</span>
                  <span className="text-lg text-gray-400 line-through">$598</span>
                </div>
                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 font-sans text-sm tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expandable Cards Section */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          <ExpandableCard
            title="Runway Revolution"
            category="Fashion Week"
            description="Inside the most talked-about collections of the season"
            image="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1200&fit=crop"
            expandedContent={
              <div className="space-y-4">
                <p>
                  The Fall/Winter 2025 fashion weeks have redefined what it means to push boundaries.
                  From Paris to Milan, designers are embracing bold silhouettes and unexpected materials.
                </p>
                <p>
                  Discover the key trends: oversized tailoring, sustainable luxury, and the return of
                  maximalist accessories. We break down every look that matters.
                </p>
              </div>
            }
          />

          <ExpandableCard
            title="Rising Stars"
            category="Interview"
            description="Conversations with the designers shaping tomorrow"
            image="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1200&fit=crop"
            expandedContent={
              <div className="space-y-4">
                <p>
                  Meet the emerging talents who are challenging the status quo and bringing fresh
                  perspectives to the fashion world.
                </p>
                <p>
                  In exclusive interviews, these designers share their inspirations, creative processes,
                  and visions for the future of fashion.
                </p>
              </div>
            }
          />

          <ExpandableCard
            title="Wardrobe Essentials"
            category="Style Guide"
            description="Timeless pieces every closet needs this season"
            image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=1200&fit=crop"
            expandedContent={
              <div className="space-y-4">
                <p>
                  Build a wardrobe that transcends trends with our curated selection of must-have pieces
                  for Fall/Winter 2025.
                </p>
                <p>
                  From the perfect trench coat to statement boots, learn how to invest in quality pieces
                  that will serve you season after season.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* Components Showcase Section */}
      <section className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            {/* <GradientHeading size="xl" className="mb-4">
              Cult UI Components Showcase
            </GradientHeading> */}
            {/* <Typewriter
              text="Discover the power of modern React components"
              speed={30}
              className="text-lg text-gray-600 dark:text-gray-300 font-sans mb-6"
            /> */}

            {/* Component Tags */}
            {/* <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                'Buttons', 'Cards', 'Carousels', 'Timers', 'Forms',
                'Animations', 'Typography', 'Interactive Elements'
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-sans tracking-wide rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div> */}
          </div>

          {/* Logo Carousel */}
          <div className="mt-16">
            <h3 className="text-2xl font-display font-bold text-center mb-8 text-black dark:text-white">
              Featured Brands
            </h3>
            <LogoCarousel
              logos={[
                'https://logo.clearbit.com/nike.com',
                'https://logo.clearbit.com/adidas.com',
                'https://logo.clearbit.com/puma.com',
                'https://logo.clearbit.com/zara.com',
                'https://logo.clearbit.com/hm.com',
                'https://logo.clearbit.com/gucci.com',
                'https://logo.clearbit.com/prada.com',
                'https://logo.clearbit.com/versace.com'
              ]}
              speed={25}
            />
          </div>

          {/* Additional Components Info */}
          {/* <div className="mt-16 text-center">
            <GradientHeading size="md" className="mb-6">
              40+ Premium Components
            </GradientHeading>
            <p className="text-gray-600 dark:text-gray-300 font-sans max-w-2xl mx-auto">
              From buttons and cards to complex interactions like Dynamic Island and MacOS Dock,
              Cult UI offers a comprehensive library of beautifully crafted React components built
              with Tailwind CSS and Framer Motion.
            </p>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-950 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-display text-2xl font-bold mb-4">FASHION BOOST</h4>
              <p className="font-sans text-sm text-gray-400 dark:text-gray-500">
                The premier destination for culture, fashion, and lifestyle
              </p>
            </div>
            <div>
              <h4 className="font-sans text-xs tracking-widest mb-4">FOLLOW US</h4>
              <div className="flex gap-4 font-sans text-sm">
                <a href="#" className="hover:opacity-60 transition-opacity">Instagram</a>
                <a href="#" className="hover:opacity-60 transition-opacity">Twitter</a>
                <a href="#" className="hover:opacity-60 transition-opacity">Pinterest</a>
                <a href="#" className="hover:opacity-60 transition-opacity">TikTok</a>
              </div>
            </div>
            <div>
              <h4 className="font-sans text-xs tracking-widest mb-4">SUBSCRIBE</h4>
              <p className="font-sans text-sm text-gray-400 dark:text-gray-500 mb-4">
                Get the latest issue delivered to your door
              </p>
              <button className="bg-white dark:bg-gray-200 text-black px-6 py-2 font-sans text-xs tracking-widest hover:bg-gray-200 dark:hover:bg-gray-300 transition-colors">
                SUBSCRIBE NOW
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 pt-8 text-center">
            <p className="font-sans text-xs text-gray-500 dark:text-gray-600">
              &copy; 2025 Fashion Boost Magazine. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
