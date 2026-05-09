import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import Container from "../components/common/Container";
import { useCart } from "../context/CartContext";

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function Shop({ navigate }) {
  const [cat, setCat]     = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort]   = useState("default");
  const { addToCart }     = useCart();
  const [sizes, setSizes] = useState({});
  const [added, setAdded] = useState({});

  const filtered = useMemo(() => {
    let list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q));
    }
    if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name")       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [cat, search, sort]);

  const getSize = (p) => sizes[p.id] || p.sizes?.[1] || p.sizes?.[0] || "1kg";

  const handleAdd = (e, p) => {
    e.stopPropagation();
    addToCart(p, getSize(p));
    setAdded((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [p.id]: false })), 1800);
  };

  return (
    <>
      <style>{`
        .shop { padding-top: 72px; }
        .shop__hero {
          background: var(--green); padding: clamp(40px,5vw,72px) clamp(20px,6vw,80px);
          position: relative; overflow: hidden;
        }
        .shop__hero-circle {
          position: absolute; right: -60px; bottom: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          background: rgba(255,255,255,0.04); pointer-events: none;
        }
        .shop__hero-label { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 10px; }
        .shop__hero-title { font-family: var(--serif); font-size: clamp(36px,4.5vw,64px); font-weight: 300; color: var(--white); line-height: 1.1; }
        .shop__hero-title em { font-style: italic; color: rgba(255,255,255,0.62); }
        .shop__hero-count { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 10px; font-weight: 300; }
        .shop__bar {
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep); padding: 18px clamp(20px,6vw,80px);
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
          border-bottom: 1px solid var(--beige-dark);
          position: sticky; top: 72px; z-index: 50;
        }
        .shop__search {
          flex: 1; min-width: 180px; padding: 10px 16px;
          border: 1px solid var(--beige-dark); background: var(--white);
          font-family: var(--sans); font-size: 13px; color: var(--charcoal); outline: none;
          transition: border-color 0.2s;
        }
        .shop__search:focus { border-color: var(--green); }
        .shop__sort {
          padding: 10px 14px; border: 1px solid var(--beige-dark); background: var(--white);
          font-family: var(--sans); font-size: 12px; color: var(--charcoal); outline: none; cursor: pointer;
        }
        .shop__count { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-left: auto; }
        .shop__body  { display: grid; grid-template-columns: 220px 1fr; min-height: 70vh; }
        .shop__side  {
          background: var(--white); padding: 32px 24px;
          border-right: 1px solid var(--beige-deep);
          position: sticky; top: 125px; align-self: start;
          max-height: calc(100vh - 125px); overflow-y: auto;
        }
        .shop__side-head { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-bottom: 18px; }
        .shop__cat-list  { display: flex; flex-direction: column; gap: 2px; }
        .shop__cat {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; background: none; border: none; cursor: pointer;
          font-family: var(--sans); font-size: 13px; color: var(--charcoal);
          text-align: left; transition: background 0.15s; border-radius: 2px;
        }
        .shop__cat:hover { background: transparent;
background-size: cover;
background-attachment: fixed;-deep); }
        .shop__cat.active { background: rgba(30,75,50,0.08); color: var(--green); font-weight: 500; }
        .shop__cat-badge { font-size: 10px; color: var(--muted); background: transparent;
background-size: cover;
background-attachment: fixed;-deep); padding: 2px 7px; border-radius: 10px; }
        .shop__cat.active .shop__cat-badge { background: rgba(30,75,50,0.14); color: var(--green); }
        .shop__main   { padding: 32px clamp(16px,3vw,40px) 72px; }
        .shop__grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .shop__empty  {
          grid-column: 1 / -1; padding: 80px 0; display: flex;
          flex-direction: column; align-items: center; gap: 12px; text-align: center;
        }
        .shop__empty-emoji { font-size: 48px; opacity: 0.3; }
        .shop__empty-text  { font-family: var(--serif); font-size: 22px; color: var(--muted); }
        .shop__empty-sub   { font-size: 13px; color: var(--muted); }
        .shop__empty-btn {
          margin-top: 8px; background: var(--green); color: var(--white); border: none;
          padding: 12px 28px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          font-family: var(--sans); cursor: pointer;
        }
        .spc {
          background: var(--white); cursor: pointer; overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
          animation: fadeUp 0.55s var(--ease-out) both;
        }
        .spc:hover { box-shadow: 0 10px 40px rgba(0,0,0,0.09); transform: translateY(-3px); }
        .spc__img {
          width: 100%; aspect-ratio: 1; background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
        }
        .spc__emoji { font-size: 56px; transition: transform 0.4s var(--ease-out); }
        .spc:hover .spc__emoji { transform: scale(1.12); }
        .spc__badge {
          position: absolute; top: 10px; left: 10px; background: var(--green); color: var(--white);
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 9px;
        }
        .spc__badge.new     { background: var(--charcoal); }
        .spc__badge.popular { background: #b5540a; }
        .spc__body  { padding: 16px 18px 20px; }
        .spc__cat   { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
        .spc__name  { font-family: var(--serif); font-size: 18px; font-weight: 400; margin-bottom: 11px; line-height: 1.2; }
        .spc__sizes { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 12px; }
        .spc__sz {
          font-size: 10px; padding: 3px 9px; border: 1px solid var(--beige-dark);
          background: none; cursor: pointer; color: var(--muted); transition: all 0.15s; font-family: var(--sans);
        }
        .spc__sz.active { border-color: var(--green); color: var(--green); background: rgba(30,75,50,0.06); }
        .spc__foot  { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
        .spc__price { font-size: 16px; font-weight: 500; color: var(--green); }
        .spc__old   { font-size: 11px; color: var(--muted); text-decoration: line-through; margin-left: 5px; }
        .spc__add {
          background: var(--green); color: var(--white); border: none;
          padding: 8px 14px; font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          font-family: var(--sans); cursor: pointer; transition: background 0.2s; flex-shrink: 0;
        }
        .spc__add:hover { background: var(--green-mid); }
        .spc__add.done  { background: #2d7a50; }
        @media (max-width: 900px) {
          .shop__body { grid-template-columns: 1fr; }
          .shop__side { display: none; }
          .shop__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .shop__grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
      `}</style>

      <div className="shop">
        <div className="shop__hero">
          <div className="shop__hero-circle" />
          <p className="shop__hero-label">Premium African Ingredients</p>
          <h1 className="shop__hero-title">The <em>LAREJI</em><br />STORE</h1>
          <p className="shop__hero-count">{PRODUCTS.length} Products Available</p>
        </div>

        <div className="shop__bar">
          <input
            className="shop__search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="shop__sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name: A–Z</option>
          </select>
          <span className="shop__count">{filtered.length} Results</span>
        </div>

        <div className="shop__body">
          <aside className="shop__side">
            <p className="shop__side-head">Categories</p>
            <div className="shop__cat-list">
              <button className={`shop__cat${cat === "all" ? " active" : ""}`} onClick={() => setCat("all")}>
                All Products <span className="shop__cat-badge">{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map((c) => (
                <button key={c.id} className={`shop__cat${cat === c.id ? " active" : ""}`} onClick={() => setCat(c.id)}>
                  {c.emoji} {c.label} <span className="shop__cat-badge">{c.count}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="shop__main">
            <div className="shop__grid">
              {filtered.length === 0 ? (
                <div className="shop__empty">
                  <div className="shop__empty-emoji">🔍</div>
                  <p className="shop__empty-text">No products found</p>
                  <p className="shop__empty-sub">Try a different search or category</p>
                  <button className="shop__empty-btn" onClick={() => { setSearch(""); setCat("all"); }}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                filtered.map((p, i) => (
                  <div
                    key={p.id}
                    className="spc"
                    style={{ animationDelay: `${i * 0.04}s` }}
                    onClick={() => navigate("product", p)}
                  >
                    <div className="spc__img">
                      <span className="spc__emoji">{p.emoji}</span>
                      {p.badge && <span className={`spc__badge ${p.badge.toLowerCase()}`}>{p.badge}</span>}
                    </div>
                    <div className="spc__body">
                      <p className="spc__cat">{p.categoryLabel}</p>
                      <h3 className="spc__name">{p.name}</h3>
                      <div className="spc__sizes" onClick={(e) => e.stopPropagation()}>
                        {p.sizes?.map((s) => (
                          <button
                            key={s}
                            className={`spc__sz${getSize(p) === s ? " active" : ""}`}
                            onClick={() => setSizes((prev) => ({ ...prev, [p.id]: s }))}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <div className="spc__foot">
                        <span>
                          <span className="spc__price">{fmt(p.price)}</span>
                          {p.oldPrice && <span className="spc__old">{fmt(p.oldPrice)}</span>}
                        </span>
                        <button
                          className={`spc__add${added[p.id] ? " done" : ""}`}
                          onClick={(e) => handleAdd(e, p)}
                        >
                          {added[p.id] ? "✓" : "+ Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}