import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Coins, Palette, Music, User, Check, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const shopItems = [
  { id: 1, name: "Tema Galáxia", description: "Tema escuro com estrelas e nebulosas", category: "theme", price: 200, icon: Palette, owned: false },
  { id: 2, name: "Avatar Lua Crescente", description: "Avatar exclusivo de lua crescente", category: "avatar", price: 150, icon: User, owned: false },
  { id: 3, name: "Sons de Chuva", description: "Sons relaxantes de chuva para dormir", category: "sound", price: 100, icon: Music, owned: true },
  { id: 4, name: "Tema Aurora", description: "Tema com cores da aurora boreal", category: "theme", price: 250, icon: Palette, owned: false },
  { id: 5, name: "Avatar Estrela", description: "Avatar brilhante de estrela", category: "avatar", price: 180, icon: User, owned: false },
  { id: 6, name: "Sons do Oceano", description: "Ondas do mar para relaxamento", category: "sound", price: 120, icon: Music, owned: false },
  { id: 7, name: "Tema Floresta", description: "Tema com tons verdes naturais", category: "theme", price: 200, icon: Palette, owned: false },
  { id: 8, name: "Avatar Sol", description: "Avatar radiante de sol", category: "avatar", price: 150, icon: User, owned: false },
];

const categories = [
  { id: "all", name: "Todos", icon: null },
  { id: "theme", name: "Temas", icon: Palette },
  { id: "avatar", name: "Avatares", icon: User },
  { id: "sound", name: "Sons", icon: Music },
];

const YELLOW = "#d79921";
const YELLOW_B = "#fabd2f";
const FG1 = "#ebdbb2";
const FG4 = "#a89984";
const GRAY = "#928374";
const TEAL = "#458588";

export function ShopScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userCoins, setUserCoins] = useState(1250);
  const [ownedItems, setOwnedItems] = useState([3]);

  const filteredItems = shopItems.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const handlePurchase = (item: (typeof shopItems)[0]) => {
    if (ownedItems.includes(item.id)) { toast.info("Você já possui este item!"); return; }
    if (userCoins >= item.price) {
      setUserCoins(userCoins - item.price);
      setOwnedItems([...ownedItems, item.id]);
      toast.success(`${item.name} adquirido com sucesso! 🎉`);
    } else {
      toast.error("Moedas insuficientes!");
    }
  };

  return (
    <div
      className="min-h-screen pb-6"
      style={{ background: "linear-gradient(135deg, #1d2021 0%, #282828 100%)" }}
    >
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/gamification")}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(60,56,54,0.6)", color: FG4 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(215,153,33,0.15)", border: "1px solid rgba(215,153,33,0.3)" }}
          >
            <Coins className="w-5 h-5" style={{ color: YELLOW_B }} />
            <span className="font-bold" style={{ color: FG1 }}>{userCoins}</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: FG1 }}>Loja Cronoplay</h1>
        <p style={{ color: FG4 }}>Troque suas moedas por recompensas incríveis</p>
      </div>

      {/* Categorias */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-semibold"
                style={
                  isActive
                    ? { background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`, color: "#1d2021" }
                    : { background: "rgba(60,56,54,0.5)", color: FG4 }
                }
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de itens */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            const isOwned = ownedItems.includes(item.id);
            const canAfford = userCoins >= item.price;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(60,56,54,0.45)",
                  border: isOwned
                    ? `1px solid rgba(69,133,136,0.45)`
                    : "1px solid rgba(80,73,69,0.6)",
                }}
              >
                <div className="relative mb-3">
                  <div
                    className="w-full aspect-square rounded-xl flex items-center justify-center"
                    style={
                      isOwned
                        ? { background: "rgba(69,133,136,0.2)" }
                        : { background: "rgba(60,56,54,0.6)" }
                    }
                  >
                    <Icon className="w-10 h-10" style={{ color: isOwned ? TEAL : GRAY }} />
                  </div>

                  {isOwned && (
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: TEAL }}
                    >
                      <Check className="w-5 h-5" style={{ color: "#1d2021" }} />
                    </div>
                  )}

                  {!isOwned && !canAfford && (
                    <div
                      className="absolute inset-0 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(29,32,33,0.6)" }}
                    >
                      <Lock className="w-8 h-8" style={{ color: GRAY }} />
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-sm mb-1" style={{ color: FG1 }}>{item.name}</h3>
                <p className="text-xs mb-3 line-clamp-2" style={{ color: FG4 }}>{item.description}</p>

                {isOwned ? (
                  <div
                    className="w-full py-2 rounded-lg text-center"
                    style={{ background: "rgba(69,133,136,0.2)" }}
                  >
                    <span className="text-sm font-semibold" style={{ color: TEAL }}>Adquirido</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handlePurchase(item)}
                    disabled={!canAfford}
                    className="w-full py-2 rounded-lg text-sm font-semibold"
                    style={
                      canAfford
                        ? { background: `linear-gradient(135deg, ${YELLOW} 0%, #b57614 100%)`, color: "#1d2021" }
                        : { background: "rgba(60,56,54,0.5)", color: "rgba(146,131,116,0.5)" }
                    }
                  >
                    <Coins className="w-4 h-4 mr-1" />
                    {item.price}
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
