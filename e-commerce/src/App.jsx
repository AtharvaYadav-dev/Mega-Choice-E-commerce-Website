import "./index.css";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import CartDrawer from "./Components/CartDrawer.jsx";
import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
const Shop = lazy(() => import("./pages/Shop.jsx"));
import Cart from "./pages/Cart/Cart.jsx";
import WishlistDrawer from "./Components/WishlistDrawer.jsx";
import WishlistPage from "./pages/Wishlist.jsx";
import { useToast } from "./hooks/useToast.js";
import Search from "./pages/Search.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Payments from "./pages/Payments.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import StaticPage from "./pages/StaticPage.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import AboutLayout from "./pages/about/AboutLayout.jsx";
import HelpLayout from "./pages/help/HelpLayout.jsx";
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));

function App() {
  const { addToast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // {id, title, price, image, qty}
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]); // {id, title, price, image}
  const [user, setUser] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        addToast("Added one more to cart", "success");
        return copy;
      }
      addToast("Added to cart", "success");
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveOne = (id) => {
    setCartItems((prev) => {
      const item = prev.find((p) => p.id === id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter((p) => p.id !== id);
      const next = prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty - 1 } : p,
      );
      addToast("Removed one from cart", "info");
      return next;
    });
  };

  const handleIncreaseOne = (id) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)),
    );
  };

  const handleRemoveAll = (id) => {
    setCartItems((prev) => {
      addToast("Removed item from cart", "info");
      return prev.filter((p) => p.id !== id);
    });
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // Load persisted cart, wishlist, and user
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart_items") || "[]");
      if (Array.isArray(savedCart)) setCartItems(savedCart);
    } catch (error) {
      console.warn("Failed to load cart items:", error);
    }
    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem("wishlist_items") || "[]",
      );
      if (Array.isArray(savedWishlist)) setWishlist(savedWishlist);
    } catch (error) {
      console.warn("Failed to load wishlist items:", error);
    }
    try {
      const token = localStorage.getItem("token");
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (token && savedUser) setUser(savedUser);
    } catch (error) {
      console.warn("Failed to load user data:", error);
    }
  }, []);

  // Refresh user state if any page updates localStorage and dispatches 'user_updated'
  useEffect(() => {
    const handler = () => {
      try {
        const token = localStorage.getItem("token");
        const savedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (token && savedUser) setUser(savedUser);
        else setUser(null);
      } catch {}
    };
    window.addEventListener("user_updated", handler);
    return () => window.removeEventListener("user_updated", handler);
  }, []);

  // Persist cart and wishlist
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    // optional server sync if enabled
    try {
      if (localStorage.getItem("enable_server_sync") === "1") {
        fetch("/api/sync/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems }),
        }).catch(() => {});
      }
    } catch (error) {
      console.warn("Failed to sync cart:", error);
    }
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("wishlist_items", JSON.stringify(wishlist));
    // optional server sync if enabled
    try {
      if (localStorage.getItem("enable_server_sync") === "1") {
        fetch("/api/sync/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: wishlist }),
        }).catch(() => {});
      }
    } catch (error) {
      console.warn("Failed to sync wishlist:", error);
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        addToast("Removed from wishlist", "info");
        return prev.filter((p) => p.id !== product.id);
      }
      addToast("Added to wishlist", "success");
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
      ];
    });
  };

  const handleMoveToWishlist = (product) => {
    const wishlistItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    };
    toggleWishlist(wishlistItem);
  };

  return (
    <>
      <NavBar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        user={user}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
      />

      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{Array.from({length:9}).map((_,i)=>(<div key={i} className="rounded-xl border p-4 animate-pulse"><div className="bg-gray-200 aspect-4/5 rounded"/><div className="mt-3 h-4 bg-gray-200 rounded w-2/3"/><div className="mt-2 h-4 bg-gray-200 rounded w-1/3"/><div className="mt-3 h-9 bg-gray-200 rounded"/></div>))}</div></div>}>
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route
          path="/shop"
          element={
            <Shop
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onOpenWishlist={() => setWishlistOpen(true)}
            />
          }
        />
        {/* Best Sellers uses Shop view too */}
        <Route
          path="/bestsellers"
          element={
            <Shop
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onOpenWishlist={() => setWishlistOpen(true)}
            />
          }
        />
        <Route
          path="/bestsellers/trending"
          element={
            <Shop
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onOpenWishlist={() => setWishlistOpen(true)}
            />
          }
        />
        {/* Themed collections that reuse Shop */}
        <Route
          path="/new"
          element={
            <Shop
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onOpenWishlist={() => setWishlistOpen(true)}
            />
          }
        />
        <Route
          path="/sale"
          element={
            <Shop
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onOpenWishlist={() => setWishlistOpen(true)}
            />
          }
        />
        <Route
          path="/premium"
          element={
            <Shop
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onOpenWishlist={() => setWishlistOpen(true)}
            />
          }
        />
        <Route
          path="/gift-cards"
          element={
            <Shop
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onOpenWishlist={() => setWishlistOpen(true)}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/about/our-story"
          element={
            <AboutLayout
              title="Our Story"
              subtitle="From a small studio to a global community of fashion lovers."
              sections={[
                { heading: "Humble Beginnings", body: "MegaChoice started with a simple belief: great style should be accessible, sustainable, and joyful." },
                { heading: "Milestones", points: ["2018: Launched with 100 curated products","2020: Crossed 1M customers","2023: Introduced planet-first packaging"] },
                { heading: "What Drives Us", body: "Design, durability, and delight. We obsess over details so you can focus on expression." },
                { heading: "Customer Promises", points: ["Fast, reliable delivery across India","No-questions-asked 7‑day returns","Secure payments with leading providers","Always-on quality checks before dispatch"] },
                { heading: "Community", body: "Over 10M customers and creators inspire our collections. We host seasonal challenges and feature independent designers." }
              ]}
              cta={<div className="p-4 bg-gray-50 rounded-xl border space-y-2"><div className="text-sm text-gray-600">Explore more</div><a href="/about/mission" className="inline-flex items-center px-3 py-2 rounded-md bg-gray-900 text-white hover:bg-black w-full text-center">Our Mission</a><a href="/sustainability" className="inline-flex items-center px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 w-full text-center">Our Sustainability</a></div>}
            />
          }
        />
        <Route
          path="/about/mission"
          element={
            <AboutLayout
              title="Our Mission"
              subtitle="Style for everyone, made responsibly."
              sections={[
                { heading: "Purpose", body: "We exist to help people express themselves through fashion without compromising the planet or their wallet." },
                { heading: "Principles", points: ["Customer delight over everything","Planet-first sourcing and packaging","Transparency and continuous improvement"] },
                { heading: "Focus Areas", points: ["Inclusive catalog across sizes and budgets","Ethical supplier audits twice a year","Investments in circular fashion initiatives","Open APIs for partner innovation"] }
              ]}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              items={cartItems}
              onRemoveOne={handleRemoveOne}
              onIncreaseOne={handleIncreaseOne}
              onRemoveAll={handleRemoveAll}
              onAddToCart={handleAddToCart}
              onMoveToWishlist={handleMoveToWishlist}
              user={user}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              items={wishlist}
              onRemove={(id) =>
                setWishlist((prev) => prev.filter((p) => p.id !== id))
              }
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route
          path="/product/:id"
          element={<ProductDetail onAddToCart={handleAddToCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} />}
        />

        {/* Customer Care: rich pages with secondary routes */}
        <Route
          path="/contact"
          element={<HelpLayout title="Contact Us" subtitle="We’re here to help 7 days a week." sections={[{heading:"Quick Contacts", points:["Email: support@megachoice.com","Toll-free: 1800-123-4567 (9am–9pm IST)","WhatsApp: +91-90000-00000"]},{heading:"Response Times", body:"Most queries are answered within 24 hours. Priority support for orders in transit."},{heading:"Escalations", body:"If your issue isn’t resolved, reply to the same thread with the word ESCALATE."}]} sidebar={<div className="p-4 bg-gray-50 rounded-xl border space-y-2"><a href="/contact/help-center" className="block w-full text-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black">Help Center</a><a href="/faq" className="block w-full text-center px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">FAQ</a></div>} />}
        />
        <Route
          path="/contact/help-center"
          element={<HelpLayout title="Help Center" subtitle="Browse guides and get instant answers." sections={[{heading:"Popular Topics", points:["Order status","Return a product","Payment issues","Apply coupons"]},{heading:"Contact Channels", points:["Email, Chat, Phone, WhatsApp"]}]} />}
        />
        <Route
          path="/size-guide"
          element={<HelpLayout title="Size Guide" subtitle="Find your perfect fit across brands." sections={[{heading:"Tops", points:["Measure chest at fullest point","If between sizes, size up for relaxed fit"]},{heading:"Bottoms", points:["Measure waist at natural line","Inseam from crotch to ankle"]},{heading:"Footwear", points:["Trace foot length on paper and measure cm","Consider width if shoes feel snug"]}]} sidebar={<a href="/size-guide/printable" className="block w-full text-center px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">Printable Guide (PDF)</a>} />}
        />
        <Route
          path="/size-guide/printable"
          element={<HelpLayout title="Printable Size Guide" sections={[{heading:"Instructions", points:["Print at 100% scale","Use a ruler to verify scale box","Follow foot outline for shoe size"]}]} />}
        />
        <Route
          path="/shipping"
          element={<HelpLayout title="Shipping Information" subtitle="Fast delivery across India." sections={[{heading:"Speeds", points:["Standard: 3–6 business days","Express: 1–3 business days","Same-city: next day on select PINs"]},{heading:"Charges", body:"Shipping is free above ₹999. Express fee calculated at checkout."},{heading:"Tracking", body:"A tracking link is sent via email/SMS once shipped."}]} sidebar={<a href="/shipping/policy" className="block w-full text-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black">View Full Policy</a>} />}
        />
        <Route
          path="/shipping/policy"
          element={<HelpLayout title="Shipping Policy" sections={[{heading:"Cut-off Times", body:"Orders placed before 2pm ship same day on business days."},{heading:"Undeliverable", body:"We’ll contact you and attempt redelivery or cancel with refund."}]} />}
        />
        <Route
          path="/returns"
          element={<HelpLayout title="Returns & Exchanges" subtitle="Hassle-free returns within 7 days." sections={[{heading:"Eligibility", points:["Unworn, tags intact","Include original packaging","Non-returnable: innerwear, gift cards"]},{heading:"Methods", points:["Pick-up from your address","Drop-off at partner center"]},{heading:"Refunds", body:"Processed to original payment method within 5–7 business days after QC."}]} sidebar={<a href="/returns/start" className="block w-full text-center px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">Start a Return</a>} />}
        />
        <Route
          path="/returns/start"
          element={<HelpLayout title="Start a Return" sections={[{heading:"Steps", points:["Enter order ID and email","Choose items to return","Select pickup or drop-off","Confirm"]},{heading:"Need Help?", body:"Chat with us and we’ll create the request for you."}]} />}
        />
        <Route
          path="/track"
          element={<HelpLayout title="Track Your Order" subtitle="Real-time tracking with SMS/email updates." sections={[{heading:"Track Now", body:"Open your order details page or enter the AWB on the courier site."},{heading:"No Updates?", body:"If tracking hasn’t moved in 48 hours, contact support for a priority check."}]} sidebar={<a href="/track/locate-order" className="block w-full text-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black">Find My Order</a>} />}
        />
        <Route
          path="/track/locate-order"
          element={<HelpLayout title="Find My Order" sections={[{heading:"Tips", points:["Search inbox for ‘MegaChoice order’","Check spam folder","Verify mobile number on account"]}]} />}
        />
        <Route
          path="/faq"
          element={<HelpLayout title="FAQ" subtitle="Answers to common questions." sections={[{heading:"Orders", points:["How do I cancel?","Can I change address after order?","Why was my order cancelled?"]},{heading:"Payments", points:["What payments are accepted?","EMI support?","Refund timelines"]},{heading:"Products", points:["Are sizes standard across brands?","How accurate are colors?"]}]} sidebar={<a href="/contact" className="block w-full text-center px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">Still need help?</a>} />}
        />
        <Route
          path="/chat"
          element={<HelpLayout title="Live Chat" subtitle="Connect with an agent within minutes." sections={[{heading:"Availability", body:"Daily 9am–9pm IST. Off-hours messages receive next-day responses."},{heading:"Before You Start", points:["Have your order ID ready","Tell us your preferred resolution","Share screenshots if possible"]}]} sidebar={<a href="mailto:support@megachoice.com" className="block w-full text-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black">Email Support</a>} />}
        />

        <Route
          path="/careers"
          element={
            <AboutLayout
              title="Careers"
              subtitle="Build the future of fashion commerce with us."
              sections={[
                { heading: "Why MegaChoice", points: ["Remote-first culture","Fast growth & ownership","Health benefits and learning stipend"] },
                { heading: "Teams", points: ["Design & Brand","Engineering","Merchandising","Ops & Support"] },
                { heading: "Benefits", points: ["Flexible hours","Annual retreat","Parental leave","Equipment budget"] }
              ]}
              cta={<a href="/careers/open-roles" className="block w-full text-center px-4 py-3 rounded-md bg-gray-900 text-white hover:bg-black">View Open Roles</a>}
            />
          }
        />
        <Route
          path="/careers/open-roles"
          element={
            <AboutLayout
              title="Open Roles"
              sections={[
                { heading: "Featured", body: "We’re hiring across design, engineering, and operations." },
                { heading: "Current Openings", points: ["Senior React Engineer","Product Designer (E‑commerce)","Operations Manager","Brand Partnerships Lead"] },
                { heading: "How to Apply", points: ["Send your portfolio/resume","Tell us why MegaChoice","Share preferred location","Include links to shipped work"] }
              ]}
              cta={<a href="mailto:careers@megachoice.com" className="block w-full text-center px-4 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700">Email careers@megachoice.com</a>}
            />
          }
        />
        <Route
          path="/press"
          element={<AboutLayout title="Press" subtitle="Brand assets and media enquiries." sections={[{heading:"Press Kit", body:"Download logos, product shots, and brand guidelines."},{heading:"Coverage", points:["Featured in Vogue India","Top 10 D2C brands to watch — ET","Most-loved fashion app — Community Awards"]},{heading:"Contact", body:"Email press@megachoice.com for interviews and statements."}]} cta={<a href="/press/releases" className="block w-full text-center px-4 py-3 rounded-md bg-gray-900 text-white hover:bg-black">Recent Releases</a>} />}
        />
        <Route
          path="/press/releases"
          element={<AboutLayout title="Press Releases" sections={[{heading:"2024 Holiday Campaign", body:"Introducing limited collections with sustainable fabrics."},{heading:"Series A Funding", body:"MegaChoice raises funding to accelerate growth and sustainability."},{heading:"New Flagship Partnerships", body:"Collaborations with leading retail chains across metro cities."}]} />}
        />
        <Route
          path="/sustainability"
          element={<AboutLayout title="Sustainability" subtitle="Planet-first materials, packaging, and partners." sections={[{heading:"Materials", points:["Organic cotton","Recycled polyester","Low-impact dyes","Waterless denim finishes"]},{heading:"Packaging", body:"We ship with recyclable, minimal packaging to reduce waste."},{heading:"Suppliers", body:"We work with audited factories and publish traceability reports."}]} cta={<a href="/sustainability/report" className="block w-full text-center px-4 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700">Read Impact Report</a>} />}
        />
        <Route
          path="/sustainability/report"
          element={<AboutLayout title="Impact Report" sections={[{heading:"2024 Highlights", points:["30% reduction in packaging weight","60% of catalog with sustainable materials","Carbon-neutral shipping on 70% orders","Vendor scorecards expanded to 100% suppliers"]},{heading:"Emissions", body:"We measure Scope 1–3 and offset unavoidable emissions with certified projects."},{heading:"Roadmap", points:["All packaging compostable by 2026","Net-zero operations by 2030","100% renewable energy in offices by 2027"]}]} />}
        />
        <Route
          path="/investors"
          element={<AboutLayout title="Investor Relations" sections={[{heading:"Overview", body:"Key metrics, leadership, and vision."},{heading:"Unit Economics", points:["Healthy contribution margins","Low customer acquisition cost via organic channels","High repeat purchase rate"]},{heading:"Governance", body:"We maintain transparent reporting and responsible growth."}]} cta={<a href="/investors/financials" className="block w-full text-center px-4 py-3 rounded-md bg-gray-900 text-white hover:bg-black">Financials</a>} />}
        />
        <Route
          path="/investors/financials"
          element={<AboutLayout title="Financials" sections={[{heading:"Quarterly Results", body:"Unaudited highlights and growth drivers."},{heading:"KPIs", points:["GMV growth","AOV trends","Churn & retention","Inventory turns"]},{heading:"Downloads", points:["Q1 Presentation","Q2 Presentation","ESG Summary","Corporate Factsheet"]}]} />}
        />
        <Route
          path="/affiliate"
          element={<AboutLayout title="Affiliate Program" sections={[{heading:"Why Partner", points:["Competitive commissions","30-day cookie window","Curated product feeds","Dedicated partner support"]},{heading:"How It Works", body:"Apply, get your links, and start earning on sales you drive."},{heading:"Tools", points:["Deep links","Custom promo codes","Weekly top-sellers feed"]}]} cta={<a href="/affiliate/faq" className="block w-full text-center px-4 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700">Affiliate FAQ</a>} />}
        />
        <Route
          path="/affiliate/faq"
          element={<AboutLayout title="Affiliate FAQ" sections={[{heading:"Payouts", body:"Monthly via bank transfer once threshold is met."},{heading:"Approval", body:"We review sites for quality and brand fit within 5 business days."},{heading:"Policies", points:["No bidding on trademarked terms","Coupon sites allowed when exclusive","Honest disclosures required"]}]} />}
        />
        <Route
          path="/stores"
          element={<AboutLayout title="Store Locator" subtitle="Find partner stores near you." sections={[{heading:"Metro Cities", points:["Mumbai","Delhi","Bengaluru","Hyderabad"]},{heading:"Services", points:["Click & collect","Alterations","Easy returns"]},{heading:"Coming Soon", points:["Pune","Chennai","Kolkata"]}]} cta={<a href="/stores/partners" className="block w-full text-center px-4 py-3 rounded-md bg-gray-900 text-white hover:bg-black">Retail Partners</a>} />}
        />
        <Route
          path="/stores/partners"
          element={<AboutLayout title="Retail Partners" sections={[{heading:"Featured Partners", points:["Lifestyle","Shoppers Stop","Central","Reliance Trends"]},{heading:"Partner Benefits", points:["Fast sell-through","Joint marketing","Omnichannel pickups"]},{heading:"Become a Partner", body:"Email partners@megachoice.com"}]} />}
        />

        <Route path="/privacy" element={<LegalPage title="Privacy Policy" sections={[
          { heading: "Your Privacy", body: "We respect your privacy and explain how we collect, use, and share your information when you use MegaChoice." },
          { heading: "Data We Collect", points: ["Account details (name, email, phone)", "Order and payment information", "Wishlist and cart activity", "Device and usage analytics (IP, pages viewed)"] },
          { heading: "How We Use Data", points: ["Processing and delivering your orders", "Improving site performance and features", "Fraud prevention and security", "Marketing communications with your consent"] },
          { heading: "Your Choices", points: ["Update or delete your account information", "Opt out of marketing emails", "Control cookies in your browser settings"] },
          { heading: "Contact", body: "Questions? Email privacy@megachoice.com" }
        ]} />} />
        <Route path="/terms" element={<LegalPage title="Terms of Service" sections={[
          { heading: "Acceptance of Terms", body: "By accessing or using MegaChoice, you agree to these Terms." },
          { heading: "Use of Service", points: ["You must be 13+ years old", "Do not misuse or attempt to disrupt our services", "Prices and availability may change without notice"] },
          { heading: "Orders & Payments", points: ["We reserve the right to refuse or cancel orders", "Taxes and shipping fees are calculated at checkout", "Refunds follow our Returns policy"] },
          { heading: "Intellectual Property", body: "All content on MegaChoice is owned by or licensed to us." },
          { heading: "Contact", body: "For any issues, contact support@megachoice.com" }
        ]} />} />
        <Route path="/cookies" element={<LegalPage title="Cookie Policy" sections={[
          { heading: "What Are Cookies", body: "Small text files used to remember preferences and improve your experience." },
          { heading: "Types We Use", points: ["Strictly necessary (login, cart)", "Performance (analytics)", "Functional (preferences)", "Advertising (personalization)"] },
          { heading: "Managing Cookies", body: "You can disable cookies in your browser. Some features may not work without them." }
        ]} />} />
        <Route path="/security" element={<LegalPage title="Security" sections={[
          { heading: "Protection", body: "We use HTTPS, encryption, and security best practices to protect your data." },
          { heading: "Your Responsibility", points: ["Use a strong, unique password", "Keep your device secure", "Contact us immediately if you suspect unauthorized access"] }
        ]} />} />
        <Route path="/accessibility" element={<LegalPage title="Accessibility" sections={[
          { heading: "Commitment", body: "We aim to provide an accessible, inclusive experience for all users." },
          { heading: "Measures", points: ["Semantic HTML and ARIA where appropriate", "Keyboard and screen-reader support", "Contrast and scalable typography"] },
          { heading: "Feedback", body: "Encounter an issue? Email accessibility@megachoice.com" }
        ]} />} />
        <Route path="/ca-privacy" element={<LegalPage title="CA Privacy Rights" sections={[
          { heading: "CCPA Rights", points: ["Right to know the data collected", "Right to delete personal information", "Right to opt-out of sale/sharing of data"] },
          { heading: "Exercising Rights", body: "Submit requests to privacy@megachoice.com. We will verify and respond as required by law." }
        ]} />} />
      </Routes>
      </Suspense>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveOne={handleRemoveOne}
        onIncreaseOne={handleIncreaseOne}
        onRemoveAll={handleRemoveAll}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlist}
        onRemove={(id) =>
          setWishlist((prev) => prev.filter((p) => p.id !== id))
        }
        onAddToCart={(p) => handleAddToCart(p)}
      />
    </>
  );
}

export default App;
