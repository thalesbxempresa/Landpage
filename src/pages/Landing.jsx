import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar portfólio:', error);
    } else {
      setPortfolioItems(data);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openMedia = (url, type = 'image') => {
    setSelectedMedia({ url, type });
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeMedia = () => {
    setSelectedMedia(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
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
            <h1>O novo padrão de <br />marketing para Macaé</h1>
            <p className="lead">
              A maioria das marcas locais faz "o básico". Nós criamos o <strong>extraordinário</strong>. <br />
              Visuais de nível internacional e Inteligência Artificial para destacar sua empresa na cidade.
            </p>
            <div style={{ marginTop: '40px' }} className="hero-buttons">
              <a href="https://wa.me/5522998994412" className="btn-cta">Falar no WhatsApp</a>
            </div>
          </div>

          <div className="visual-container">
            {/* AI Core Animation - Replacing Phone */}
            <div className="ai-orb-container">
              <div className="orb-ring ring-1"></div>
              <div className="orb-ring ring-2"></div>
              <div className="orb-ring ring-3"></div>
              <div className="ai-core">
                <div className="core-glow"></div>
                <div className="core-interface">
                  <i className="fas fa-brain"></i>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="float-card card-1 glass">
                <i className="fas fa-video" style={{ color: '#00d2ff' }}></i>
                <span>Vídeo</span>
              </div>
              <div className="float-card card-2 glass">
                <i className="fas fa-image" style={{ color: '#c471ed' }}></i>
                <span>Imagem</span>
              </div>
              <div className="float-card card-3 glass">
                <i className="fas fa-code" style={{ color: '#f64f59' }}></i>
                <span>Web</span>
              </div>
            </div>
          </div>
          <div className="engagement-bubble bubble-3">
            <i className="fas fa-heart"></i>
          </div>

        </div>
      </section>

      {/* Services */}
      <section id="solutions" className="section-padding">
        <div className="container">
          <div className="section-head">
            <h2>Serviços</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Soluções inteligentes com tecnologia de ponta para o seu negócio.</p>
          </div>

          <div className="card-grid">
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-image"></i></div>
              <h3>Pacotes de Imagens com IA</h3>
              <p style={{ color: '#888' }}>Imagens realistas e criativas, geradas por IA, ideais para elevar a presença da sua marca em redes sociais e anúncios.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-video"></i></div>
              <h3>Pacotes de Vídeos com IA</h3>
              <p style={{ color: '#888' }}>Vídeos curtos e realistas com IA para redes sociais, anúncios e apresentações.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-file-code"></i></div>
              <h3>Landing Pages</h3>
              <p style={{ color: '#888' }}>Desenvolvimento de páginas de alta performance, otimizadas para converter visitantes em clientes.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fas fa-cogs"></i></div>
              <h3>Sistemas com Automação</h3>
              <p style={{ color: '#888' }}>Desenvolvimento de sistemas completos com automação, integração e fluxos inteligentes.</p>
            </div>
          </div>
        </div>
      </section >

      {/* Portfolio Sections */}
      < section id="cases" className="section-padding" style={{ background: '#050505' }
      }>
        <div className="container">
          <div className="section-head text-left" style={{ textAlign: 'left', marginBottom: '40px' }}>
            <h2>Nossos Trabalhos</h2>
            <p className="lead">Resultados reais potencializados pela inteligência artificial.</p>
          </div>

          {/* Videos Section - Modelo 1 */}
          <div style={{ marginBottom: '80px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <i className="fas fa-play-circle" style={{ color: '#00d2ff' }}></i> Vídeos longos personalizados
            </h3>

            {/* Price Card Model 1 (Now with Model 2 prices) */}
            {/* Price Card Model 1 */}
            <div className="pricing-card glass pricing-grid-responsive">
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.1rem' }}>1 Vídeo <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(até 30 seg)</span></div>
                <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>R$ 80,00</div>
              </div>
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.1rem' }}>Até 1 Minuto</div>
                <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>R$ 150,00</div>
              </div>
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.1rem' }}>Até 2 Minutos</div>
                <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>R$ 250,00</div>
              </div>
            </div>
            <div className="portfolio-scroll">
              {portfolioItems.filter(item => item.type === 'video' && (item.section === 'Modelo 1' || !item.section)).length > 0 ? (
                portfolioItems.filter(item => item.type === 'video' && (item.section === 'Modelo 1' || !item.section)).map((item) => {
                  const optimizedUrl = item.url.replace('/upload/', '/upload/f_auto,q_auto/');
                  const optimizedThumbnail = (item.thumbnail || item.url).replace('/upload/', '/upload/f_auto,q_auto,w_600/');

                  return (
                    <div key={item.id} className="portfolio-card" onClick={() => openMedia(optimizedUrl, item.type)}>
                      <div className="video-thumbnail-wrapper">
                        <img src={optimizedThumbnail} alt={item.title} />
                        <div className="play-icon-overlay"><i className="fas fa-play"></i></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: '#444' }}>Em breve, novos vídeos aqui.</p>
              )}
            </div>
          </div>

          {/* Videos Section - Modelo 2 */}
          <div style={{ marginBottom: '80px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <i className="fas fa-play-circle" style={{ color: '#00d2ff' }}></i> Vídeos curtos personalizados
            </h3>

            {/* Price Card Model 2 (Now with Model 1 prices) */}
            {/* Price Card Model 2 */}
            <div className="pricing-card glass pricing-grid-responsive">
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.2rem' }}>1 Vídeo</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>R$ 50,00</div>
              </div>
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.2rem' }}>3 Vídeos</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>R$ 100,00</div>
              </div>
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.2rem' }}>5 Vídeos</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>R$ 150,00</div>
              </div>
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.2rem' }}>10 Vídeos</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>R$ 200,00</div>
              </div>
            </div>
            <div className="portfolio-scroll">
              {portfolioItems.filter(item => item.type === 'video' && item.section === 'Modelo 2').length > 0 ? (
                portfolioItems.filter(item => item.type === 'video' && item.section === 'Modelo 2').map((item) => {
                  const optimizedUrl = item.url.replace('/upload/', '/upload/f_auto,q_auto/');
                  const optimizedThumbnail = (item.thumbnail || item.url).replace('/upload/', '/upload/f_auto,q_auto,w_600/');

                  return (
                    <div key={item.id} className="portfolio-card" onClick={() => openMedia(optimizedUrl, item.type)}>
                      <div className="video-thumbnail-wrapper">
                        <img src={optimizedThumbnail} alt={item.title} />
                        <div className="play-icon-overlay"><i className="fas fa-play"></i></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: '#444' }}>Em breve, novos vídeos aqui.</p>
              )}
            </div>
          </div>

          {/* AI Arts Section (Geral) */}
          <div style={{ marginBottom: '80px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <i className="fas fa-magic" style={{ color: '#00d2ff' }}></i> Imagens totalmente personalizadas com sua identidade
            </h3>

            {/* Price Card Images */}
            {/* Price Card Images */}
            <div className="pricing-card glass pricing-grid-responsive">
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.2rem' }}>5 Imagens</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>R$ 50,00</div>
              </div>
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.2rem' }}>10 Imagens</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>R$ 80,00</div>
              </div>
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.2rem' }}>20 Imagens</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>R$ 200,00</div>
              </div>
              <div>
                <div style={{ color: '#00d2ff', fontWeight: '700', fontSize: '1.2rem' }}>Personalizado</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>A Combinar</div>
              </div>
            </div>
            <div className="portfolio-scroll">
              {portfolioItems.filter(item => item.type !== 'video' && (!item.section || item.section === 'Modelo 1' || item.section === 'Geral')).length > 0 ? (
                portfolioItems.filter(item => item.type !== 'video' && (!item.section || item.section === 'Modelo 1' || item.section === 'Geral')).map((item) => {
                  const optimizedUrl = item.url.replace('/upload/', '/upload/f_auto,q_auto,w_600/');
                  const fullResUrl = item.url.replace('/upload/', '/upload/f_auto,q_auto/');
                  return (
                    <div key={item.id} className="portfolio-card" onClick={() => openMedia(fullResUrl, item.type)}>
                      <img src={optimizedUrl} alt={item.title} />
                    </div>
                  );
                })
              ) : (
                <p style={{ color: '#444' }}>Em breve, novas artes aqui.</p>
              )}
            </div>
          </div>

          {/* Sites Section */}
          <div style={{ marginBottom: '80px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <i className="fas fa-desktop" style={{ color: '#00d2ff' }}></i> Criação de site profissional
            </h3>
            <p style={{ color: '#ccc', marginBottom: '20px', fontSize: '1rem' }}>Totalmente personalizado</p>
            <div className="portfolio-scroll">
              {portfolioItems.filter(item => item.type !== 'video' && item.section === 'Sites').length > 0 ? (
                portfolioItems.filter(item => item.type !== 'video' && item.section === 'Sites').map((item) => {
                  const optimizedUrl = item.url.replace('/upload/', '/upload/f_auto,q_auto,w_600/');
                  const fullResUrl = item.url.replace('/upload/', '/upload/f_auto,q_auto/');
                  return (
                    <div key={item.id} className="portfolio-card vertical screenshot-img" onClick={() => openMedia(fullResUrl, item.type)}>
                      <img src={optimizedUrl} alt={item.title} />
                    </div>
                  );
                })
              ) : (
                <p style={{ color: '#444' }}>Novos sites em desenvolvimento.</p>
              )}
            </div>
          </div>

          {/* Apps Section */}
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <i className="fas fa-mobile-alt" style={{ color: '#00d2ff' }}></i> Criação de aplicativo profissional
            </h3>
            <p style={{ color: '#ccc', marginBottom: '20px', fontSize: '1rem' }}>Totalmente personalizado</p>
            <div className="portfolio-scroll">
              {portfolioItems.filter(item => item.type !== 'video' && item.section === 'Aplicativos').length > 0 ? (
                portfolioItems.filter(item => item.type !== 'video' && item.section === 'Aplicativos').map((item) => {
                  const optimizedUrl = item.url.replace('/upload/', '/upload/f_auto,q_auto,w_600/');
                  const fullResUrl = item.url.replace('/upload/', '/upload/f_auto,q_auto/');
                  return (
                    <div key={item.id} className="portfolio-card vertical screenshot-img" onClick={() => openMedia(fullResUrl, item.type)}>
                      <img src={optimizedUrl} alt={item.title} />
                    </div>
                  );
                })
              ) : (
                <p style={{ color: '#444' }}>Novos aplicativos em criação.</p>
              )}
            </div>
          </div>
        </div>
      </section >

      {/* Pricing */}
      < section id="plans" className="section-padding" >
        <div className="container">
          {/* Guarantees & Payment Terms */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.05) 0%, rgba(5, 10, 16, 0.8) 100%)',
            padding: '60px 40px',
            borderRadius: '30px',
            border: '1px solid rgba(0, 210, 255, 0.2)',
            marginBottom: '80px'
          }}>
            <h2 style={{
              textAlign: 'center',
              marginBottom: '50px',
              background: 'linear-gradient(to right, #00d2ff, #fff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.5rem'
            }}>
              Garantias e Condições de Pagamento
            </h2>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              {/* Guarantee 1 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(0, 210, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  border: '2px solid rgba(0, 210, 255, 0.3)'
                }}>
                  <i className="fas fa-shield-alt" style={{ fontSize: '2rem', color: '#00d2ff' }}></i>
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#fff' }}>Após Conclusão</h3>
                <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                  Para projetos de imagens e vídeos, você só paga após a entrega completa e aprovação do trabalho. Sem riscos.
                </p>
              </div>

              {/* Guarantee 2 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(0, 210, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  border: '2px solid rgba(0, 210, 255, 0.3)'
                }}>
                  <i className="fas fa-server" style={{ fontSize: '2rem', color: '#00d2ff' }}></i>
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#fff' }}>Custos de Infraestrutura</h3>
                <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                  Em projetos maiores (sites, apps, sistemas), cobramos apenas os custos necessários: domínios, hospedagem e plataformas obrigatórias.
                </p>
              </div>

              {/* Guarantee 3 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(0, 210, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  border: '2px solid rgba(0, 210, 255, 0.3)'
                }}>
                  <i className="fas fa-sync-alt" style={{ fontSize: '2rem', color: '#00d2ff' }}></i>
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#fff' }}>Revisões Incluídas</h3>
                <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                  Todos os projetos incluem revisões para garantir que o resultado final atenda exatamente às suas expectativas.
                </p>
              </div>
            </div>
          </div>


          {/* Serviços Digitais */}
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>Desenvolvimento Digital</h3>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {/* Card 1: Landing Page */}
              <div className="pricing-card">
                <h3>Landing Pages</h3>
                <div className="price-tag" style={{ fontSize: '1.8rem' }}>
                  <span style={{ fontSize: '0.9rem', display: 'block', marginBottom: '5px', opacity: 0.8, fontWeight: '400' }}>A partir de</span>
                  R$ 497,00
                </div>
                <ul className="price-features">
                  <li><i className="fas fa-check" style={{ color: '#00d2ff', marginRight: '8px' }}></i>Design focado em conversão</li>
                  <li><i className="fas fa-check" style={{ color: '#00d2ff', marginRight: '8px' }}></i>Carregamento ultra-rápido</li>
                  <li><i className="fas fa-check" style={{ color: '#00d2ff', marginRight: '8px' }}></i>Totalmente responsivo (Mobile)</li>
                  <li><i className="fas fa-check" style={{ color: '#00d2ff', marginRight: '8px' }}></i>Botão de WhatsApp flutuante</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>Solicitar Orçamento</a>
              </div>

              {/* Card 2: Sistemas e Apps */}
              <div className="pricing-card premium">
                <span style={{ color: '#0072FF', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>Solução Completa</span>
                <h3 style={{ marginTop: '0' }}>Sistemas & Apps Web</h3>
                <div className="price-tag" style={{ fontSize: '1.8rem' }}>
                  <span style={{ fontSize: '0.9rem', display: 'block', marginBottom: '5px', opacity: 0.8, fontWeight: '400' }}>A partir de</span>
                  R$ 1.497,00
                </div>
                <ul className="price-features">
                  <li><i className="fas fa-check" style={{ color: '#0072FF', marginRight: '8px' }}></i>Painéis Administrativos</li>
                  <li><i className="fas fa-check" style={{ color: '#0072FF', marginRight: '8px' }}></i>Automação de Processos</li>
                  <li><i className="fas fa-check" style={{ color: '#0072FF', marginRight: '8px' }}></i>Gestão de Clientes/Dados</li>
                  <li><i className="fas fa-check" style={{ color: '#0072FF', marginRight: '8px' }}></i>Integração com APIs</li>
                  <li><i className="fas fa-check" style={{ color: '#0072FF', marginRight: '8px' }}></i>Sistemas SaaS e Dashboards</li>
                </ul>
                <a href="https://wa.me/5522998994412" className="btn-cta" style={{ marginTop: '30px', background: '#0072FF', color: '#fff' }}>Falar com Especialista</a>
              </div>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center', opacity: 0.8, fontSize: '0.9rem', maxWidth: '800px', margin: '40px auto 0', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#ccc', marginBottom: '8px' }}>
                <i className="fas fa-info-circle" style={{ color: '#00d2ff' }}></i>
                <span style={{ fontWeight: '500' }}>Nota de Transparência:</span> Valores referência para projetos iniciais (Start).
              </p>
              <p style={{ color: '#888', lineHeight: '1.5' }}>
                Projetos que exigem integrações complexas, regras de negócio avançadas ou automações de alta escala são orçados sob medida. Nosso compromisso é entregar a solução exata para o seu nível de jogo, sem custos ocultos.
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* Final CTA */}
      < section className="section-padding" style={{ background: '#050505', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '20px' }}>Pronto para transformar sua presença digital?</h2>
          <p className="lead" style={{ margin: '0 auto 40px', maxWidth: '600px' }}>Entre em contato e vamos construir algo extraordinário juntos.</p>
          <a href="https://wa.me/5522998994412" className="btn-cta" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>Iniciar Projeto</a>
        </div>
      </section >

      <footer style={{ padding: '50px 0', borderTop: '1px solid #111', textAlign: 'center' }}>
        <p style={{ color: '#444' }}>© 2025 Macaé Digital - Criação com inteligência artificial.</p>
      </footer>

      {/* Media Preview Modal */}
      {
        selectedMedia && (
          <div className="image-modal-overlay" onClick={closeMedia}>
            <button className="close-modal" onClick={closeMedia}>&times;</button>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px' }}
                />
              ) : (
                <img src={selectedMedia.url} alt="Visualização" />
              )}
            </div>
          </div>
        )
      }
    </div >
  );
}

export default Landing;
