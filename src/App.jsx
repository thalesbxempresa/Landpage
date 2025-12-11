import React, { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <header>
        <div className="container nav-flex">
          <div className="logo">Macaé<span>Digital</span></div>

          {/* Desktop Nav */}
          <nav className="nav-links">
            <a href="#solutions">Soluções</a>
            <a href="#cases">Projetos</a>
            <a href="#plans">Planos</a>
          </nav>

          <a href="https://wa.me/5522998994412" className="btn-cta text-cta">Falar com Especialista</a>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <a href="#solutions" onClick={toggleMenu}>Soluções</a>
          <a href="#cases" onClick={toggleMenu}>Projetos</a>
          <a href="#plans" onClick={toggleMenu}>Planos</a>
          <a href="https://wa.me/5522998994412" className="btn-cta mobile-cta" onClick={toggleMenu}>Falar com Especialista</a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="container hero-grid">
          <div className="hero-text">
            <h1>Liderança Digital <br />para o seu Negócio.</h1>
            <p className="lead">
              Estratégias de anúncios, design e vendas para empresas que querem dominar o mercado de Macaé.
            </p>
            <div style={{ marginTop: '40px' }} className="hero-buttons">
              <a href="https://wa.me/5522998994412" className="btn-cta">Começar Agora</a>
              <a href="#solutions" className="btn-outline">Ver Soluções</a>
            </div>
          </div>

          <div className="visual-container">
            {/* Phone Mockup Frame */}
            <div className="phone-mockup-3d">
              <div className="phone-bezel">
                <div className="phone-screen">
                  {/* Social Content Placeholder (Video/Image) */}
                  <div className="social-media-content" style={{ backgroundImage: 'url(/assets/images/social-bg-placeholder.jpg)' }}>
                    <div className="video-overlay"></div>

                    {/* UI Overlay */}
                    <div className="social-ui-top">
                      <div className="story-bars">
                        <div className="bar active"></div>
                        <div className="bar"></div>
                      </div>
                      <div className="user-profile">
                        <div className="avatar-circle"></div>
                        <span className="username">macaedigital</span>
                        <span className="time">2h</span>
                      </div>
                    </div>

                    <div className="social-ui-right">
                      <div className="action-icon">
                        <i className="fas fa-heart" style={{ color: '#ff3b30' }}></i>
                        <span>15.4K</span>
                      </div>
                      <div className="action-icon">
                        <i className="fas fa-comment"></i>
                        <span>242</span>
                      </div>
                      <div className="action-icon">
                        <i className="fas fa-share"></i>
                        <span>Enviar</span>
                      </div>
                    </div>

                    <div className="social-ui-bottom">
                      <p className="caption">Como escalar sua empresa usando tráfego pago em 2025? 🚀 <span className="hashtag">#marketing</span></p>
                      <div className="audio-tag">
                        <i className="fas fa-music"></i> <span>Áudio em Alta • Original</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Engagement Notifications */}
              <div className="engagement-bubble bubble-1">
                <i className="fas fa-heart"></i>
              </div>
              <div className="engagement-bubble bubble-2">
                <i className="fas fa-heart"></i>
              </div>
              <div className="engagement-bubble bubble-3">
                <i className="fas fa-heart"></i>
              </div>

              <div className="stat-card-floating">
                <div className="stat-icon-small"><i className="fas fa-eye"></i></div>
                <div className="live-views">
                  <span className="views-count">15,482</span>
                  <span className="views-label">Visualizações</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="solutions" className="section-padding">
        <div className="container">
          <div className="section-head">
            <h2>Soluções Práticas</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Tecnologia e criatividade focadas em vender mais.</p>
          </div>

          <div className="card-grid">
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-bullseye"></i></div>
              <h3>Anúncios Online</h3>
              <p style={{ color: '#888' }}>Colocamos sua empresa no topo do Google e Instagram para atrair clientes reais.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-layer-group"></i></div>
              <h3>Sites Profissionais</h3>
              <p style={{ color: '#888' }}>Páginas rápidas e modernas que transformam visitantes em compradores.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-brain"></i></div>
              <h3>Atendimento Automático</h3>
              <p style={{ color: '#888' }}>Sistemas que respondem clientes no WhatsApp instantaneamente, 24h por dia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Strip */}
      <section id="cases" className="section-padding" style={{ background: '#050505' }}>
        <div className="container">
          <div className="section-head text-left" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div>
              <h2>Nossos Clientes</h2>
              <p className="lead">Resultados reais em Macaé.</p>
            </div>
          </div>

          <div className="portfolio-scroll">
            <div className="portfolio-card">
              <img src="/assets/images/real_estate.png" alt="Real Estate" />
              <div className="portfolio-info">
                <h3>Imóveis</h3>
                <p>Lançamento de Vendas</p>
              </div>
            </div>

            {/* NEW: Fashion */}
            <div className="portfolio-card">
              <img src="C:/Users/thale/.gemini/antigravity/brain/9f57e23c-30b0-48e3-9e2c-75677a545a9f/fashion_store_social.png" alt="Fashion" />
              <div className="portfolio-info">
                <h3>Moda & Varejo</h3>
                <p>E-commerce Escalável</p>
              </div>
            </div>

            <div className="portfolio-card">
              <img src="/assets/images/burger.png" alt="Food" />
              <div className="portfolio-info">
                <h3>Gastronomia</h3>
                <p>Gestão de Redes</p>
              </div>
            </div>

            {/* NEW: Law */}
            <div className="portfolio-card">
              <img src="C:/Users/thale/.gemini/antigravity/brain/9f57e23c-30b0-48e3-9e2c-75677a545a9f/lawyer_office_social.png" alt="Law" />
              <div className="portfolio-info">
                <h3>Advocacia</h3>
                <p>Autoridade Digital</p>
              </div>
            </div>

            <div className="portfolio-card">
              <img src="/assets/images/dentist.png" alt="Health" />
              <div className="portfolio-info">
                <h3>Saúde</h3>
                <p>Novos Pacientes</p>
              </div>
            </div>

            {/* NEW: Barber */}
            <div className="portfolio-card">
              <img src="C:/Users/thale/.gemini/antigravity/brain/9f57e23c-30b0-48e3-9e2c-75677a545a9f/barber_shop_social.png" alt="Barber" />
              <div className="portfolio-info">
                <h3>Barbearia</h3>
                <p>Agenda Lotada</p>
              </div>
            </div>

            <div className="portfolio-card">
              <img src="/assets/images/gym.png" alt="Fitness" />
              <div className="portfolio-info">
                <h3>Fitness</h3>
                <p>Campanha de Matrículas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="section-padding">
        <div className="container">
          <div className="section-head">
            <h2>Investimento</h2>
          </div>

          <div className="card-grid">
            <div className="pricing-card">
              <h3>Essencial</h3>
              <div className="price-tag">900 <span>/mês</span></div>
              <ul className="price-features">
                <li>Gestão de 1 Canal (Insta ou Google)</li>
                <li>Relatório Mensal</li>
                <li>Suporte WhatsApp</li>
              </ul>
              <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#333', color: '#fff' }}>Começar</a>
            </div>

            <div className="pricing-card premium">
              <span style={{ color: '#0072FF', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Recomendado</span>
              <h3 style={{ marginTop: '10px' }}>Aceleração</h3>
              <div className="price-tag">1.500 <span>/mês</span></div>
              <ul className="price-features">
                <li>Gestão Google + Instagram</li>
                <li>Página de Vendas Inclusa</li>
                <li>Textos que Vendem (Copy)</li>
                <li>Suporte Prioritário</li>
              </ul>
              <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#0072FF', color: '#fff' }}>Começar Agora</a>
            </div>

            <div className="pricing-card">
              <h3>Personalizado</h3>
              <div className="price-tag">A Combinar</div>
              <ul className="price-features">
                <li>Equipe Dedicada</li>
                <li>Painel em Tempo Real</li>
                <li>Consultoria de Estratégia</li>
              </ul>
              <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#333', color: '#fff' }}>Cotar</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '50px 0', borderTop: '1px solid #111', textAlign: 'center' }}>
        <p style={{ color: '#444' }}>© 2025 Macaé Digital. Design Excellence.</p>
      </footer>
    </div>
  );
}

export default App;
