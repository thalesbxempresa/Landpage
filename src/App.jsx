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
            <a href="#solutions">Serviços</a>
            <a href="#cases">Projetos</a>
            <a href="#plans">Pacotes</a>
          </nav>

          <a href="https://wa.me/5522998994412" className="btn-cta text-cta">Falar no WhatsApp</a>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <a href="#solutions" onClick={toggleMenu}>Serviços</a>
          <a href="#cases" onClick={toggleMenu}>Projetos</a>
          <a href="#plans" onClick={toggleMenu}>Pacotes</a>
          <a href="https://wa.me/5522998994412" className="btn-cta mobile-cta" onClick={toggleMenu}>Falar no WhatsApp</a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="container hero-grid">
          <div className="hero-text">
            <h1>Imagens e vídeos com IA <br />para destacar sua marca</h1>
            <p className="lead">
              Criação de imagens realistas, vídeos curtos e estruturas digitais usando inteligência artificial para negócios e projetos digitais.
            </p>
            <div style={{ marginTop: '40px' }} className="hero-buttons">
              <a href="#plans" className="btn-cta">Ver Pacotes</a>
              <a href="https://wa.me/5522998994412" className="btn-outline">Falar no WhatsApp</a>
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
            <h2>Serviços</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Criação com inteligência artificial e desenvolvimento digital.</p>
          </div>

          <div className="card-grid">
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-image"></i></div>
              <h3>Pacotes de Imagens com IA</h3>
              <p style={{ color: '#888' }}>Criação de imagens realistas e criativas com inteligência artificial para redes sociais, anúncios e projetos digitais.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-video"></i></div>
              <h3>Pacotes de Vídeos com IA</h3>
              <p style={{ color: '#888' }}>Vídeos curtos e realistas com IA para redes sociais, anúncios e apresentações.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-file-code"></i></div>
              <h3>Landing Pages</h3>
              <p style={{ color: '#888' }}>Criação de landing pages modernas, rápidas e focadas em conversão.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-cogs"></i></div>
              <h3>Sistemas com Automação</h3>
              <p style={{ color: '#888' }}>Desenvolvimento de sistemas completos com automação, integração e fluxos inteligentes.</p>
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
              <p className="lead">Resultados reais para negócios locais de Macaé.</p>
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
              <img src="/assets/images/fashion.png" alt="Fashion" />
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
              <img src="/assets/images/lawyer.png" alt="Law" />
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
              <img src="/assets/images/barber.png" alt="Barber" />
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
            <h2>Pacotes e Investimento</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Escolha o pacote ideal para o seu projeto.</p>
          </div>

          {/* Pacotes de Imagens */}
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>Pacotes de Imagens com IA</h3>
            <div className="card-grid">
              <div className="pricing-card">
                <h3>10 Imagens</h3>
                <div className="price-tag">R$ 150<span></span></div>
                <ul className="price-features">
                  <li>10 imagens realistas com IA</li>
                  <li>Alta qualidade</li>
                  <li>Entrega rápida</li>
                  <li>Revisões incluídas</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#333', color: '#fff' }}>Contratar</a>
              </div>

              <div className="pricing-card premium">
                <span style={{ color: '#0072FF', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Melhor Custo-Benefício</span>
                <h3 style={{ marginTop: '10px' }}>20 Imagens</h3>
                <div className="price-tag">R$ 200<span></span></div>
                <ul className="price-features">
                  <li>20 imagens realistas com IA</li>
                  <li>Alta qualidade</li>
                  <li>Entrega rápida</li>
                  <li>Revisões incluídas</li>
                  <li>Economia de R$ 100</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#0072FF', color: '#fff' }}>Contratar Agora</a>
              </div>

              <div className="pricing-card">
                <h3>Plano Mensal</h3>
                <div className="price-tag">A Combinar</div>
                <ul className="price-features">
                  <li>Volume personalizado</li>
                  <li>Melhor custo-benefício</li>
                  <li>Prioridade na entrega</li>
                  <li>Suporte dedicado</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#333', color: '#fff' }}>Consultar</a>
              </div>
            </div>
          </div>

          {/* Pacotes de Vídeos */}
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>Pacotes de Vídeos com IA (até 15s)</h3>
            <div className="card-grid">
              <div className="pricing-card">
                <h3>5 Vídeos</h3>
                <div className="price-tag">R$ 200<span></span></div>
                <ul className="price-features">
                  <li>5 vídeos realistas até 15s</li>
                  <li>Alta qualidade</li>
                  <li>Formato para redes sociais</li>
                  <li>Revisões incluídas</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#333', color: '#fff' }}>Contratar</a>
              </div>

              <div className="pricing-card premium">
                <span style={{ color: '#0072FF', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Recomendado</span>
                <h3 style={{ marginTop: '10px' }}>10 Vídeos</h3>
                <div className="price-tag">R$ 300<span></span></div>
                <ul className="price-features">
                  <li>10 vídeos realistas até 15s</li>
                  <li>Alta qualidade</li>
                  <li>Formato para redes sociais</li>
                  <li>Revisões incluídas</li>
                  <li>Economia de R$ 100</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#0072FF', color: '#fff' }}>Contratar Agora</a>
              </div>

              <div className="pricing-card">
                <h3>Vídeos Longos</h3>
                <div className="price-tag">A Combinar</div>
                <ul className="price-features">
                  <li>Vídeos acima de 15s</li>
                  <li>Formatos personalizados</li>
                  <li>Projeto sob medida</li>
                  <li>Consultoria incluída</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#333', color: '#fff' }}>Consultar</a>
              </div>
            </div>
          </div>

          {/* Serviços Digitais */}
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>Desenvolvimento Digital</h3>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <div className="pricing-card">
                <h3>Landing Page</h3>
                <div className="price-tag">R$ 1.400<span></span></div>
                <ul className="price-features">
                  <li>Design moderno e responsivo</li>
                  <li>Otimizada para conversão</li>
                  <li>Integração com ferramentas</li>
                  <li>SEO básico incluído</li>
                  <li>Suporte pós-entrega</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#333', color: '#fff' }}>Contratar</a>
              </div>

              <div className="pricing-card premium">
                <span style={{ color: '#0072FF', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Projeto Completo</span>
                <h3 style={{ marginTop: '10px' }}>Sistema com Automação</h3>
                <div className="price-tag">R$ 4.500<span></span></div>
                <ul className="price-features">
                  <li>Sistema completo personalizado</li>
                  <li>Automações inteligentes</li>
                  <li>Integrações avançadas</li>
                  <li>Fluxos automatizados</li>
                  <li>Suporte e manutenção</li>
                  <li>Consultoria estratégica</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#0072FF', color: '#fff' }}>Solicitar Proposta</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding" style={{ background: '#050505', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '20px' }}>Quer imagens, vídeos ou um projeto digital sob medida?</h2>
          <p className="lead" style={{ margin: '0 auto 40px', maxWidth: '600px' }}>Entre em contato e vamos criar algo incrível juntos.</p>
          <a href="https://wa.me/5522998994412" className="btn-cta" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>Falar no WhatsApp</a>
        </div>
      </section>

      <footer style={{ padding: '50px 0', borderTop: '1px solid #111', textAlign: 'center' }}>
        <p style={{ color: '#444' }}>© 2025 Macaé Digital - Criação com inteligência artificial.</p>
      </footer>
    </div>
  );
}

export default App;
