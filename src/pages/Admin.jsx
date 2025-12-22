import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component
function SortableItem({ id, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}

// Portfolio Card Helper Component
function PortfolioCard({ item, editingId, editValue, setEditValue, saveTitle, cancelEditing, startEditing, removeItem }) {
    return (
        <div className="admin-item-card" style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
            cursor: 'default'
        }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: '#000', position: 'relative' }}>
                <img
                    src={item.type === 'video' ? item.thumbnail : item.url}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7' }}
                />

                {item.isPending && (
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'rgba(255, 165, 0, 0.9)',
                        color: '#000',
                        padding: '6px 15px',
                        borderRadius: '20px',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        border: '2px dashed rgba(255, 255, 255, 0.5)'
                    }}>
                        <i className="fas fa-clock"></i> Não Publicado
                    </div>
                )}

                {item.type === 'video' && (
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        background: 'rgba(0, 210, 255, 0.9)',
                        color: '#000',
                        padding: '6px 15px',
                        borderRadius: '20px',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        <i className="fas fa-play" style={{ marginRight: '5px' }}></i> Motion Video
                    </div>
                )}
            </div>

            <div style={{ padding: '25px' }}>
                {editingId === item.id ? (
                    <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            autoFocus
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(0,210,255,0.3)',
                                borderRadius: '8px',
                                color: '#fff',
                                padding: '8px 12px',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && saveTitle(item.id)}
                        />
                        <button
                            onClick={() => saveTitle(item.id)}
                            style={{ background: '#00d2ff', border: 'none', borderRadius: '8px', color: '#000', padding: '0 15px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            OK
                        </button>
                        <button
                            onClick={cancelEditing}
                            style={{ background: 'transparent', border: '1px solid #444', borderRadius: '8px', color: '#888', padding: '0 10px', cursor: 'pointer' }}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                ) : (
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {item.title}
                        <i
                            className="fas fa-pencil-alt"
                            style={{ fontSize: '0.8rem', opacity: 0.3, cursor: 'pointer' }}
                            onClick={() => startEditing(item)}
                            title="Editar nome"
                        ></i>
                    </h4>
                )}
                <p style={{ color: '#444', fontSize: '0.8rem', margin: 0 }}>ID do Sistema: {item.id}</p>
                <div style={{ marginTop: '15px', height: '1px', background: 'rgba(255,255,255,0.03)', width: '100%' }}></div>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#333' }}>
                            {new Date(item.created_at || Date.now()).toLocaleDateString('pt-BR')}
                        </span>
                        <button
                            onClick={() => removeItem(item.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'rgba(255, 59, 48, 0.5)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                padding: '5px',
                                transition: 'color 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.color = '#ff3b30'}
                            onMouseOut={(e) => e.target.style.color = 'rgba(255, 59, 48, 0.5)'}
                            title="Excluir Permanente"
                        >
                            <i className="fas fa-trash-alt"></i> Excluir
                        </button>
                    </div>
                    <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#00d2ff', fontSize: '0.8rem', textDecoration: 'none', opacity: 0.6 }}>
                        Ver Original <i className="fas fa-external-link-alt" style={{ fontSize: '0.6rem' }}></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

function Admin() {
    const navigate = useNavigate();
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [pendingItems, setPendingItems] = useState([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [dbError, setDbError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        setDbError(null);
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .order('display_order', { ascending: true, nullsFirst: false })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro ao carregar portfólio:', error);
            setDbError(error.message);
        } else {
            setPortfolioItems(data || []);
        }
    };

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        if (auth !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const removeItem = async (id) => {
        if (!confirm('Deseja realmente excluir este item?')) return;
        const { error } = await supabase
            .from('portfolio')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Erro ao remover item: ' + error.message);
        } else {
            fetchPortfolio();
        }
    };

    const startEditing = (item) => {
        setEditingId(item.id);
        setEditValue(item.title);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditValue('');
    };

    const saveTitle = async (id) => {
        if (!editValue.trim()) {
            alert('O título não pode estar vazio.');
            return;
        }

        const { error } = await supabase
            .from('portfolio')
            .update({ title: editValue })
            .eq('id', id);

        if (error) {
            alert('Erro ao atualizar título: ' + error.message);
        } else {
            setEditingId(null);
            fetchPortfolio();
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const allItems = [...portfolioItems, ...pendingItems];
            const oldIndex = allItems.findIndex((item) => item.id === active.id);
            const newIndex = allItems.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(allItems, oldIndex, newIndex);

            // Separate published and pending items
            const published = newItems.filter(item => !item.isPending);
            const pending = newItems.filter(item => item.isPending);

            setPortfolioItems(published);
            setPendingItems(pending);
            setHasUnsavedChanges(true);
        }
    };

    const saveChanges = async () => {
        try {
            // Insert pending items into database
            if (pendingItems.length > 0) {
                const itemsToInsert = pendingItems.map(({ id, isPending, ...item }) => item);

                const { error: insertError } = await supabase
                    .from('portfolio')
                    .insert(itemsToInsert);

                if (insertError) {
                    alert('Erro ao salvar itens: ' + insertError.message);
                    return;
                }
            }

            // Update display_order for all items
            const allItems = [...portfolioItems, ...pendingItems];
            const updates = allItems.map((item, index) => ({
                url: item.url, // Use URL as identifier for pending items
                display_order: index + 1
            }));

            for (const update of updates) {
                await supabase
                    .from('portfolio')
                    .update({ display_order: update.display_order })
                    .eq('url', update.url);
            }

            // Clear pending items and refresh
            setPendingItems([]);
            setHasUnsavedChanges(false);
            await fetchPortfolio();
            alert('✅ Alterações publicadas com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar alterações.');
        }
    };

    const openCloudinaryWidget = () => {
        if (!window.cloudinary) {
            alert('Carregando Cloudinary... tente novamente em instantes.');
            return;
        }

        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dkfd2vpvr',
                uploadPreset: 'n8noqi1w',
                sources: ['local', 'url'],
                showAdvancedOptions: false,
                cropping: false,
                multiple: true,
                defaultSource: 'local',
                styles: {
                    palette: {
                        window: '#050505',
                        windowBorder: '#111',
                        tabIcon: '#0072FF',
                        menuIcons: '#5A616A',
                        textDark: '#000000',
                        textLight: '#FFFFFF',
                        link: '#0072FF',
                        action: '#FF620C',
                        inactiveTabIcon: '#111',
                        error: '#ff3b30',
                        inProgress: '#0078FF',
                        complete: '#20B832',
                        sourceBg: '#050505'
                    }
                }
            },
            async (error, result) => {
                if (error) {
                    console.error('Erro no widget Cloudinary:', error);
                    alert('ERRO NO CLOUDINARY: "Unknown API key"\n\nIsso geralmente significa que:\n1. O "Cloud Name" (dkfd2vpvr) está errado.\n2. O "Upload Preset" (n8noqi1w) NÃO está definido como "Unsigned" nas configurações do Cloudinary.\n\nPor favor, verifique essas duas informações no seu painel do Cloudinary.');
                }

                if (result && result.event === 'success') {
                    console.log('Upload Cloudinary com sucesso:', result.info);

                    const newItem = {
                        id: `temp-${Date.now()}-${Math.random()}`, // Temporary ID
                        title: result.info.original_filename || 'Nova Mídia',
                        type: result.info.resource_type,
                        url: result.info.secure_url,
                        thumbnail: result.info.resource_type === 'video'
                            ? result.info.secure_url.replace(/\.[^/.]+$/, '.jpg')
                            : result.info.secure_url,
                        subtitle: 'Adicionado via Admin',
                        isPending: true
                    };

                    setPendingItems(prev => [...prev, newItem]);
                    setHasUnsavedChanges(true);
                    console.log('Item adicionado como pendente:', newItem);
                }
            }
        );

        widget.open();
    };

    return (
        <div className="admin-page" style={{
            background: '#02050a',
            minHeight: '100vh',
            color: '#fff',
            fontFamily: "'Outfit', sans-serif",
            display: 'flex'
        }}>
            {/* Sidebar futurista */}
            <aside style={{
                width: '280px',
                background: 'rgba(5, 10, 16, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(0, 210, 255, 0.1)',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                position: 'sticky',
                top: 0
            }}>
                <div className="logo" style={{ fontSize: '1.5rem', marginBottom: '50px', fontWeight: '700' }}>
                    Macaé<span style={{ color: '#00d2ff' }}>Digital</span>
                    <div style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '2px', marginTop: '5px' }}>COMMAND CENTER</div>
                </div>

                <nav style={{ flex: 1 }}>
                    <div style={{
                        padding: '15px 20px',
                        background: 'rgba(0, 210, 255, 0.1)',
                        borderRadius: '10px',
                        color: '#00d2ff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '20px',
                        border: '1px solid rgba(0, 210, 255, 0.2)'
                    }}>
                        <i className="fas fa-th-large"></i> Portfólio
                    </div>

                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            padding: '15px 20px',
                            color: '#fff',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            borderRadius: '10px',
                            transition: 'background 0.3s',
                            border: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(255,255,255,0.02)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    >
                        <i className="fas fa-external-link-alt"></i> Ver Landing Page
                    </a>
                </nav>

                <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: dbError ? '#ff3b30' : '#00ff88', boxShadow: dbError ? '0 0 10px #ff3b30' : '0 0 10px #00ff88' }}></div>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>{dbError ? 'Offline' : 'Database Link Active'}</span>
                    </div>
                    <button onClick={handleLogout} style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#888',
                        padding: '12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}>Sair do Sistema</button>
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <main style={{
                flex: 1,
                padding: '60px',
                background: 'radial-gradient(circle at top right, rgba(0, 210, 255, 0.05), transparent 40%)',
                minWidth: 0 // Prevent flex shrink issues
            }}>
                <div className="admin-dashboard-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '60px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '2.5rem',
                            margin: 0,
                            background: 'linear-gradient(to right, #fff, #00d2ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-1px'
                        }}>Portfólio Dinâmico</h1>
                        <p style={{ color: '#555', marginTop: '10px' }}>Gerencie a vitrine digital da Macaé Digital</p>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <button
                            onClick={saveChanges}
                            disabled={!hasUnsavedChanges}
                            style={{
                                padding: '15px 35px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                background: hasUnsavedChanges ? 'linear-gradient(135deg, #00d2ff, #0072FF)' : '#333',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: hasUnsavedChanges ? 'pointer' : 'not-allowed',
                                opacity: hasUnsavedChanges ? 1 : 0.5,
                                boxShadow: hasUnsavedChanges ? '0 10px 30px rgba(0, 210, 255, 0.4)' : 'none',
                                transition: 'all 0.3s ease',
                                fontWeight: '600'
                            }}
                        >
                            <i className="fas fa-save"></i>
                            Salvar Alterações
                            {(pendingItems.length > 0 || hasUnsavedChanges) && (
                                <span style={{
                                    background: '#fff',
                                    color: '#0072FF',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                }}>
                                    {pendingItems.length + (hasUnsavedChanges ? 1 : 0)}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={openCloudinaryWidget}
                            className="btn-cta"
                            style={{
                                padding: '15px 35px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '0 10px 30px rgba(0, 210, 255, 0.3)'
                            }}
                        >
                            <i className="fas fa-plus"></i> Upload Cloudinary
                        </button>
                    </div>
                </div>

                {dbError && (
                    <div style={{
                        background: 'rgba(255, 59, 48, 0.05)',
                        border: '1px dashed #ff3b30',
                        padding: '30px',
                        borderRadius: '15px',
                        marginBottom: '40px',
                        color: '#ff3b30',
                        textAlign: 'center'
                    }}>
                        <i className="fas fa-exclamation-triangle" style={{ fontSize: '2rem', marginBottom: '15px' }}></i>
                        <h3 style={{ margin: '0 0 10px 0' }}>Sincronização Pendente</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>A tabela <code>portfolio</code> não foi detectada no seu Supabase.</p>
                        <div style={{
                            marginTop: '20px',
                            background: 'rgba(255,255,255,0.03)',
                            padding: '10px',
                            borderRadius: '5px',
                            fontSize: '0.8rem',
                            color: '#666'
                        }}>
                            Execute o SQL enviado para ativar este dashboard.
                        </div>
                    </div>
                )}

                {portfolioItems.length === 0 && pendingItems.length === 0 && !dbError && (
                    <div style={{
                        textAlign: 'center',
                        padding: '120px 0',
                        color: '#222',
                        border: '2px dashed rgba(255,255,255,0.02)',
                        borderRadius: '20px'
                    }}>
                        <i className="fas fa-cloud-upload-alt" style={{ fontSize: '4rem', marginBottom: '25px', color: '#111' }}></i>
                        <h3 style={{ color: '#444' }}>O sistema está pronto</h3>
                        <p>Seus uploads aparecerão aqui instantaneamente.</p>
                    </div>
                )}

                {/* Videos Section */}
                {([...portfolioItems, ...pendingItems].filter(item => item.type === 'video').length > 0) && (
                    <div style={{ marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', color: '#00d2ff' }}>
                            <i className="fas fa-play-circle"></i> Vídeos (Motion)
                        </h2>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={[...portfolioItems, ...pendingItems].filter(item => item.type === 'video').map(item => item.id)} strategy={rectSortingStrategy}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                                    {[...portfolioItems, ...pendingItems].filter(item => item.type === 'video').map(item => (
                                        <SortableItem key={item.id} id={item.id}>
                                            <PortfolioCard item={item} editingId={editingId} editValue={editValue} setEditValue={setEditValue} saveTitle={saveTitle} cancelEditing={cancelEditing} startEditing={startEditing} removeItem={removeItem} />
                                        </SortableItem>
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>
                )}

                {/* Images Section */}
                {([...portfolioItems, ...pendingItems].filter(item => item.type !== 'video').length > 0) && (
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', color: '#00d2ff' }}>
                            <i className="fas fa-images"></i> Imagens (Artes IA)
                        </h2>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video').map(item => item.id)} strategy={rectSortingStrategy}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                                    {[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video').map(item => (
                                        <SortableItem key={item.id} id={item.id}>
                                            <PortfolioCard item={item} editingId={editingId} editValue={editValue} setEditValue={setEditValue} saveTitle={saveTitle} cancelEditing={cancelEditing} startEditing={startEditing} removeItem={removeItem} />
                                        </SortableItem>
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Admin;
