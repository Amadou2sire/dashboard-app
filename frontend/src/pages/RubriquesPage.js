import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderDashboard from "../component/HeaderDashboard";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import { AuthContext } from "../context/AuthContext";
import { iframeUrls } from "../data/iframeUrls";

export default function RubriquePage() {
  const { rubriqueSlug } = useParams();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirige vers login après déconnexion
  };

  // Récupère l'URL de l'iframe correspondant à la rubrique, sinon URL par défaut
  const srcIframe = iframeUrls[rubriqueSlug] || iframeUrls.dashboard;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header avec bouton déconnexion */}
      <HeaderDashboard onLogout={handleLogout} />

      <div className="d-flex flex-grow-1" style={{ position: "relative" }}>
        {/* Sidebar fixe */}
        <aside
          className="bg-light border-end"
          style={{
            width: "250px",
            minHeight: "calc(100vh - 56px - 56px)",
            zIndex: 10,
          }}
        >
          <Sidebar />
        </aside>

        {/* Contenu principal avec iframe */}
        <main
          className="flex-grow-1"
          style={{
            position: "relative",
            height: "calc(100vh - 56px - 56px)", // hauteur écran - header - footer
            overflow: "hidden",
          }}
        >
          <iframe
            title={`Dashboard ${rubriqueSlug}`}
            src={srcIframe}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              zIndex: 1,
            }}
            allowFullScreen
          />
        </main>
      </div>

      <Footer />
    </div>
  );
}
