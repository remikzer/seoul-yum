import React, { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const videos = [
    "/videos/bg1.mp4",
    "/videos/bg2.mp4",
    "/videos/bg3.mp4",
    "/videos/bg4.mp4",
    "/videos/bg5.mp4",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const carte = {
    entrees: [
      {
        nom: "Mandu (만두)",
        desc: "Raviolis coréens vapeur ou grillés",
        prix: "6,90€",
      },
      {
        nom: "Kimchi jeon (김치전)",
        desc: "Crêpe au kimchi épicé",
        prix: "5,50€",
      },
      {
        nom: "Tteokbokki (떡볶이)",
        desc: "Gâteaux de riz épicés sucrés",
        prix: "7,00€",
      },
    ],
    plats: [
      {
        nom: "Bibimbap (비빔밥)",
        desc: "Riz mélangé, légumes, œuf & gochujang",
        prix: "11,90€",
      },
      {
        nom: "Bulgogi (불고기)",
        desc: "Bœuf mariné à la coréenne",
        prix: "13,50€",
      },
      {
        nom: "Dakgangjeong (닭강정)",
        desc: "Poulet croustillant sauce sucrée-épicée",
        prix: "12,50€",
      },
    ],
    desserts: [
      {
        nom: "Hotteok (호떡)",
        desc: "Pancake farci au sucre brun et noix",
        prix: "4,50€",
      },
      {
        nom: "Bingsu (빙수)",
        desc: "Glace pilée, lait concentré & fruits",
        prix: "6,90€",
      },
      {
        nom: "Mochi glacé",
        desc: "Boulettes de riz sucrées et glacées",
        prix: "5,00€",
      },
    ],
    boissons: [
      { nom: "Thé glacé au yuzu", prix: "3,00€" },
      { nom: "Boisson au riz (식혜)", prix: "2,80€" },
      { nom: "Soda coréen (Milkis / Chilsung)", prix: "2,50€" },
      { nom: "Bouteille d’eau", prix: "1,80€" },
    ],
    formules: [
      {
        titre: "Menu K-Delight",
        contenu: "Entrée + Plat + Dessert",
        prix: "18,90€",
      },
      {
        titre: "Formule Midi",
        contenu: "Plat + Boisson (semaine uniquement)",
        prix: "13,90€",
      },
      {
        titre: "Menu Mignon",
        contenu: "Plat enfant + Jus + Dessert",
        prix: "10,90€",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-fuchsia-100 text-fuchsia-900 font-sans relative">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-20 flex justify-between items-center px-4 py-3 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Seoul Yum Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-extrabold tracking-wide">
            Seoul Yum!
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl md:hidden"
        >
          ☰
        </button>
        <ul className="hidden md:flex gap-6 text-sm font-semibold">
          <li className="hover:text-pink-600 cursor-pointer">Accueil</li>
          <li className="hover:text-pink-600 cursor-pointer">Carte</li>
          <li className="hover:text-pink-600 cursor-pointer">Réserver</li>
          <li className="hover:text-pink-600 cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-pink-200/90 z-30 flex flex-col justify-center items-center text-xl gap-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-6 text-3xl"
          >
            ✕
          </button>
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="hover:text-fuchsia-600"
          >
            Accueil
          </a>
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="hover:text-fuchsia-600"
          >
            Carte
          </a>
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="hover:text-fuchsia-600"
          >
            Réserver
          </a>
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="hover:text-fuchsia-600"
          >
            Contact
          </a>
        </div>
      )}

      {/* HEADER ÉPOUSTOUFLANT */}
      <header className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
        {videos.map((src, i) => (
          <video
            key={src}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover brightness-75 transition-opacity duration-1000 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        <div className="relative z-20 px-4">
          <h1 className="text-7xl font-extrabold text-white drop-shadow-md tracking-wider animate-fade-in">
            Seoul Yum!
          </h1>
          <p className="text-xl text-pink-200 italic mt-2 animate-fade-in delay-200">
            Savoure la Corée avec style ✨
          </p>
        </div>
      </header>

      {/* CARTE */}
      <section className="px-4 py-16 bg-white/70 opacity-0 transition-opacity duration-3000 transform translate-y-6">
        <h2 className="text-3xl font-extrabold text-center mb-8">
          🍱 Notre Carte Kawaii
        </h2>
        <div className="max-w-6xl mx-auto space-y-12">
          {Object.entries(carte).map(([categorie, items]) => (
            <div key={categorie}>
              <h3 className="text-xl font-bold text-pink-600 uppercase mb-6">
                {categorie === "entrees" && "🥟 Entrées"}
                {categorie === "plats" && "🍜 Plats"}
                {categorie === "desserts" && "🍡 Desserts"}
                {categorie === "boissons" && "🧃 Boissons"}
                {categorie === "formules" && "🎀 Formules"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-pink-50/80 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-base font-semibold">
                        {item.nom || item.titre}
                      </h4>
                      <span className="text-pink-500 font-bold ml-4">
                        {item.prix}
                      </span>
                    </div>
                    {(item.desc || item.contenu) && (
                      <p className="text-sm italic text-fuchsia-600 mt-1">
                        {item.desc || item.contenu}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* SECTION RÉSERVATION + COMMANDE */}
      <section className="px-4 py-16 bg-pink-50/60 opacity-0 transition-opacity duration-1000 transform translate-y-6">
        <h2 className="text-3xl font-extrabold text-center mb-12">
          📅 Réservez une table ou Commandez en ligne
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Réservation */}
          <form className="space-y-4 text-fuchsia-900">
            <input
              type="text"
              placeholder="Nom complet"
              className="w-full px-4 py-2 rounded-lg shadow focus:outline-none border border-fuchsia-200"
            />
            <input
              type="email"
              placeholder="Adresse e-mail"
              className="w-full px-4 py-2 rounded-lg shadow focus:outline-none border border-fuchsia-200"
            />
            <input
              type="date"
              className="w-full px-4 py-2 rounded-lg shadow focus:outline-none border border-fuchsia-200"
            />
            <input
              type="time"
              className="w-full px-4 py-2 rounded-lg shadow focus:outline-none border border-fuchsia-200"
            />
            <input
              type="number"
              min="1"
              placeholder="Nombre de personnes"
              className="w-full px-4 py-2 rounded-lg shadow focus:outline-none border border-fuchsia-200"
            />
            <button
              type="submit"
              className="w-full py-3 bg-fuchsia-500 text-white rounded-lg shadow hover:bg-fuchsia-600 transition-all"
            >
              🎀 Réserver maintenant
            </button>
          </form>

          {/* Commander en ligne */}
          <div className="flex flex-col justify-center items-center text-center space-y-6">
            <h3 className="text-2xl font-bold text-pink-600">
              🛍️ Commander en ligne
            </h3>
            <p className="text-sm text-fuchsia-800 max-w-xs">
              Préparez-vous à savourer votre plat préféré directement depuis
              chez vous ! Livraison ou à emporter, vivez l'expérience Seoul Yum
              à la maison.
            </p>
            <a
              href="#"
              className="inline-block bg-fuchsia-500 text-white px-6 py-3 rounded-lg shadow hover:bg-fuchsia-600 transition"
            >
              🍜 Voir le menu & Commander
            </a>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-fuchsia-100 px-6 py-10 text-center text-fuchsia-800">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-bold mb-2 uppercase">Adresse</h4>
            <p>📍 123 Rue des Kimbaps, 75010 Paris</p>
            <p>📞 01 23 45 67 89</p>
            <p>✉️ contact@seoulyum.fr</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 uppercase">Horaires</h4>
            <p>Lun - Ven : 12h - 14h / 19h - 22h</p>
            <p>Samedi : 12h - 22h</p>
            <p>Dimanche : Fermé</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 uppercase">Suivez-nous</h4>
            <div className="flex justify-center gap-4 mt-2 text-2xl">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-500"
              >
                📷
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                📘
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-black">
                🎵
              </a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-fuchsia-500">
          © {new Date().getFullYear()} Seoul Yum! — Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
