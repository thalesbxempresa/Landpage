import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
    DndContext,
    closestCenter,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
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

// Droppable Container Component
function DroppableSection({ id, children }) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef} style={{ minHeight: '100px' }}>
            {children}
        </div>
    );
}

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
function PortfolioCard({ item, editingId, editValue, setEditValue, saveTitle, cancelEditing, startEditing, removeItem, aspectRatio = '4/5' }) {
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
            <div style={{ aspectRatio, overflow: 'hidden', background: '#000', position: 'relative' }}>
                <img
                    src={(item.type === 'video' ? item.thumbnail : item.url).replace('/upload/', '/upload/f_auto,q_auto,w_800/')}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7', objectPosition: aspectRatio === '9/14' ? 'top' : 'center' }}
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

            <div style={{ padding: '15px' }}>
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
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.95rem', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {item.title}
                        <i
                            className="fas fa-pencil-alt"
                            style={{ fontSize: '0.8rem', opacity: 0.3, cursor: 'pointer' }}
                            onClick={() => startEditing(item)}
                            title="Editar nome"
                        ></i>
                    </h4>
                )}
                <p style={{ color: '#444', fontSize: '0.75rem', margin: 0 }}>ID do Sistema: {item.id}</p>
                <div style={{ marginTop: '15px', height: '1px', background: 'rgba(255,255,255,0.03)', width: '100%' }}></div>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#333' }}>
                            {new Date(item.created_at || Date.now()).toLocaleDateString('pt-BR')}
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeItem(item.id);
                            }}
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
    const [isSaving, setIsSaving] = useState(false);

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
            // Ensure every item has a section, default to 'Modelo 1' if missing
            const itemsWithSection = (data || []).map(item => ({
                ...item,
                section: item.section || 'Modelo 1'
            }));
            setPortfolioItems(itemsWithSection);
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

        // Handle pending items (locally only)
        if (id.toString().startsWith('temp-')) {
            setPendingItems(prev => prev.filter(item => item.id !== id));
            setHasUnsavedChanges(true);
            return;
        }

        // Handle published items (from database)
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
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // 5px movement required to start dragging, allows clicks to pass through
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findContainer = (id) => {
        if (id === 'Modelo 1' || id === 'Modelo 2' || id === 'Geral' || id === 'Sites' || id === 'Aplicativos') return id;
        const allItems = [...portfolioItems, ...pendingItems];
        const item = allItems.find(i => i.id === id);
        if (!item) return null;
        return item.section || 'Geral';
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        // Prevent moving between videos and images sections
        const isVideoSection = (c) => c === 'Modelo 1' || c === 'Modelo 2';
        const isImageSection = (c) => c === 'Geral' || c === 'Sites' || c === 'Aplicativos';

        // Revised logic: active ID type must match target container type
        const activeItem = [...portfolioItems, ...pendingItems].find(i => i.id === activeId);
        if (!activeItem) return;

        const targetIsVideoSection = isVideoSection(overContainer);
        if (activeItem.type === 'video' && !targetIsVideoSection) return;
        if (activeItem.type !== 'video' && targetIsVideoSection) return;

        const updateItems = (items) => items.map(i => i.id === activeId ? { ...i, section: overContainer } : i);
        setPortfolioItems(prev => updateItems(prev));
        setPendingItems(prev => updateItems(prev));
        setHasUnsavedChanges(true);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        // Allow reordering within the same container (including 'Images')
        if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            return;
        }

        const allItems = [...portfolioItems, ...pendingItems];
        const activeIndex = allItems.findIndex((item) => item.id === activeId);
        const overIndex = allItems.findIndex((item) => item.id === overId);

        if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
            const newItems = arrayMove(allItems, activeIndex, overIndex);

            const published = newItems.filter(item => !item.isPending);
            const pending = newItems.filter(item => item.isPending);

            setPortfolioItems(published);
            setPendingItems(pending);
            setHasUnsavedChanges(true);
        }
    };

    const saveChanges = async () => {
        if (isSaving) return;
        setIsSaving(true);

        try {
            let allItemsInOrder = [...portfolioItems, ...pendingItems];
            let itemsWithRealIds = [];

            // 1. Insert pending items first
            if (pendingItems.length > 0) {
                const itemsToInsert = pendingItems.map(({ id, isPending, ...item }) => item);

                const { data: insertedData, error: insertError } = await supabase
                    .from('portfolio')
                    .insert(itemsToInsert)
                    .select();

                if (insertError) {
                    throw new Error('Erro ao inserir novos itens: ' + insertError.message);
                }

                // Create a map of items in order with their new IDs from Supabase
                // We use URL as the key since it's unique in the draft stage
                itemsWithRealIds = allItemsInOrder.map(uiItem => {
                    if (uiItem.isPending) {
                        const dbItem = insertedData.find(d => d.url === uiItem.url);
                        return dbItem ? { ...dbItem, isPending: false } : uiItem;
                    }
                    return uiItem;
                });
            } else {
                itemsWithRealIds = allItemsInOrder;
            }

            // 2. Prepare all updates for display_order and section
            const updates = itemsWithRealIds.map((item, index) => ({
                id: item.id,
                display_order: index + 1,
                section: item.section || 'Modelo 1'
            }));

            // 3. Batch updates with granular error tracking
            const errors = [];
            for (const update of updates) {
                const { error: updateError } = await supabase
                    .from('portfolio')
                    .update({
                        display_order: update.display_order,
                        section: update.section
                    })
                    .eq('id', update.id);

                if (updateError) {
                    errors.push(`ID ${update.id}: ${updateError.message}`);
                }
            }

            if (errors.length > 0) {
                const hasSectionError = errors.some(e => e.toLowerCase().includes('section') || e.includes('404') || e.includes('column'));

                let errorMessage = `Ocorreram ${errors.length} erros ao salvar:\n\n` + errors.slice(0, 3).join('\n');
                if (errors.length > 3) errorMessage += `\n...e mais ${errors.length - 3} erros.`;

                if (hasSectionError) {
                    errorMessage += '\n\n⚠️ IMPORTANTE: Parece que a coluna "section" não existe no banco de dados. Você executou o comando SQL no Supabase?';
                }

                alert(errorMessage);
                throw new Error('Falha parcial ao salvar - verifique o console.');
            }

            // 4. Success Reset
            setPendingItems([]);
            setHasUnsavedChanges(false);
            await fetchPortfolio();
            alert('✅ Todas as alterações (incluindo seções) foram publicadas com sucesso!');
        } catch (error) {
            console.error('Erro crítico ao salvar:', error);
            if (!error.message.includes('Erro ao inserir')) {
                alert('Ocorreu um erro ao salvar: ' + error.message);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const openCloudinaryWidget = (defaultSection = 'Geral') => {
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

                    setPendingItems(prev => [...prev, { ...newItem, section: defaultSection }]);
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
                width: '240px',
                background: 'rgba(5, 10, 16, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(0, 210, 255, 0.1)',
                padding: '30px 15px',
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
                padding: '30px 40px',
                background: 'radial-gradient(circle at top right, rgba(0, 210, 255, 0.05), transparent 40%)',
                minWidth: 0 // Prevent flex shrink issues
            }}>
                <div className="admin-dashboard-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '40px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '1.8rem',
                            margin: 0,
                            background: 'linear-gradient(to right, #fff, #00d2ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px'
                        }}>Portfólio Dinâmico</h1>
                        <p style={{ color: '#555', marginTop: '10px' }}>Gerencie a vitrine digital da Macaé Digital</p>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <button
                            onClick={saveChanges}
                            disabled={!hasUnsavedChanges || isSaving}
                            style={{
                                padding: '15px 35px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                background: isSaving
                                    ? 'rgba(0, 210, 255, 0.4)'
                                    : (hasUnsavedChanges ? 'linear-gradient(135deg, #00d2ff, #0072FF)' : '#333'),
                                color: '#fff',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: (hasUnsavedChanges && !isSaving) ? 'pointer' : 'not-allowed',
                                opacity: (hasUnsavedChanges || isSaving) ? 1 : 0.5,
                                boxShadow: (hasUnsavedChanges && !isSaving) ? '0 10px 30px rgba(0, 210, 255, 0.4)' : 'none',
                                transition: 'all 0.3s ease',
                                fontWeight: '600'
                            }}
                        >
                            {isSaving ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <i className="fas fa-save"></i>
                            )}
                            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                            {!isSaving && (pendingItems.length > 0 || hasUnsavedChanges) && (
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
                                padding: '12px 25px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '0 8px 25px rgba(0, 210, 255, 0.3)'
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

                {/* Videos Section - Shared DndContext for all videos to allow moving between Modelo 1 and 2 */}
                {([...portfolioItems, ...pendingItems].filter(item => item.type === 'video').length > 0) && (
                    <DndContext id="dnd-videos-root" sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>

                        {/* Modelo 1 */}
                        <div style={{ marginBottom: '60px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '15px', color: '#00d2ff' }}>
                                    <i className="fas fa-play-circle"></i> Vídeos longos personalizados
                                </h2>
                                <button
                                    onClick={() => openCloudinaryWidget('Modelo 1')}
                                    style={{
                                        background: 'rgba(0, 210, 255, 0.1)',
                                        border: '1px solid rgba(0, 210, 255, 0.2)',
                                        color: '#00d2ff',
                                        padding: '8px 15px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.1)'}
                                >
                                    <i className="fas fa-upload"></i> Upload para Vídeos Longos
                                </button>
                            </div>
                            <SortableContext id="Modelo 1" items={[...portfolioItems, ...pendingItems].filter(item => item.type === 'video' && item.section === 'Modelo 1').map(item => item.id)} strategy={rectSortingStrategy}>
                                <DroppableSection id="Modelo 1">
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                        gap: '25px',
                                        minHeight: '120px',
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '15px',
                                        border: '1px dashed rgba(255,255,255,0.05)'
                                    }}>
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type === 'video' && item.section === 'Modelo 1').map(item => (
                                            <SortableItem key={item.id} id={item.id}>
                                                <PortfolioCard item={item} editingId={editingId} editValue={editValue} setEditValue={setEditValue} saveTitle={saveTitle} cancelEditing={cancelEditing} startEditing={startEditing} removeItem={removeItem} aspectRatio="4/5" />
                                            </SortableItem>
                                        ))}
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type === 'video' && item.section === 'Modelo 1').length === 0 && (
                                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#444' }}>
                                                Arraste vídeos aqui para Vídeos Longos
                                            </div>
                                        )}
                                    </div>
                                </DroppableSection>
                            </SortableContext>
                        </div>

                        {/* Modelo 2 */}
                        <div style={{ marginBottom: '80px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '15px', color: '#00d2ff' }}>
                                    <i className="fas fa-play-circle"></i> Vídeos curtos personalizados
                                </h2>
                                <button
                                    onClick={() => openCloudinaryWidget('Modelo 2')}
                                    style={{
                                        background: 'rgba(0, 210, 255, 0.1)',
                                        border: '1px solid rgba(0, 210, 255, 0.2)',
                                        color: '#00d2ff',
                                        padding: '8px 15px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.1)'}
                                >
                                    <i className="fas fa-upload"></i> Upload para Vídeos Curtos
                                </button>
                            </div>
                            <SortableContext id="Modelo 2" items={[...portfolioItems, ...pendingItems].filter(item => item.type === 'video' && item.section === 'Modelo 2').map(item => item.id)} strategy={rectSortingStrategy}>
                                <DroppableSection id="Modelo 2">
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                        gap: '25px',
                                        minHeight: '120px',
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '15px',
                                        border: '1px dashed rgba(255,255,255,0.05)'
                                    }}>
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type === 'video' && item.section === 'Modelo 2').map(item => (
                                            <SortableItem key={item.id} id={item.id}>
                                                <PortfolioCard item={item} editingId={editingId} editValue={editValue} setEditValue={setEditValue} saveTitle={saveTitle} cancelEditing={cancelEditing} startEditing={startEditing} removeItem={removeItem} aspectRatio="4/5" />
                                            </SortableItem>
                                        ))}
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type === 'video' && item.section === 'Modelo 2').length === 0 && (
                                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#444' }}>
                                                Arraste vídeos aqui para Vídeos Curtos
                                            </div>
                                        )}
                                    </div>
                                </DroppableSection>
                            </SortableContext>
                        </div>
                    </DndContext>
                )}

                {/* Images Context (Shared for all image sections) */}
                {([...portfolioItems, ...pendingItems].filter(item => item.type !== 'video').length > 0) && (
                    <DndContext id="dnd-images-root" sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>

                        {/* Geral Section */}
                        <div style={{ marginBottom: '60px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '15px', color: '#00d2ff' }}>
                                    <i className="fas fa-images"></i> Imagens totalmente personalizadas com sua identidade
                                </h2>
                                <button
                                    onClick={() => openCloudinaryWidget('Geral')}
                                    style={{
                                        background: 'rgba(0, 210, 255, 0.1)',
                                        border: '1px solid rgba(0, 210, 255, 0.2)',
                                        color: '#00d2ff',
                                        padding: '8px 15px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.1)'}
                                >
                                    <i className="fas fa-upload"></i> Upload para Geral
                                </button>
                            </div>
                            <SortableContext id="Geral" items={[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && (item.section === 'Geral' || item.section === 'Modelo 1' || !item.section)).map(item => item.id)} strategy={rectSortingStrategy}>
                                <DroppableSection id="Geral">
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                        gap: '20px',
                                        minHeight: '120px',
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '15px',
                                        border: '1px dashed rgba(255,255,255,0.05)'
                                    }}>
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && (item.section === 'Geral' || item.section === 'Modelo 1' || !item.section)).map(item => (
                                            <SortableItem key={item.id} id={item.id}>
                                                <PortfolioCard item={item} editingId={editingId} editValue={editValue} setEditValue={setEditValue} saveTitle={saveTitle} cancelEditing={cancelEditing} startEditing={startEditing} removeItem={removeItem} aspectRatio="4/5" />
                                            </SortableItem>
                                        ))}
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && (item.section === 'Geral' || item.section === 'Modelo 1' || !item.section)).length === 0 && (
                                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#444' }}>
                                                Arraste outras imagens aqui
                                            </div>
                                        )}
                                    </div>
                                </DroppableSection>
                            </SortableContext>
                        </div>

                        {/* Sites Section */}
                        <div style={{ marginBottom: '60px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '15px', color: '#00d2ff' }}>
                                    <i className="fas fa-desktop"></i> Criação de site profissional
                                </h2>
                                <button
                                    onClick={() => openCloudinaryWidget('Sites')}
                                    style={{
                                        background: 'rgba(0, 210, 255, 0.1)',
                                        border: '1px solid rgba(0, 210, 255, 0.2)',
                                        color: '#00d2ff',
                                        padding: '8px 15px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.1)'}
                                >
                                    <i className="fas fa-upload"></i> Upload para Sites
                                </button>
                            </div>
                            <SortableContext id="Sites" items={[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && item.section === 'Sites').map(item => item.id)} strategy={rectSortingStrategy}>
                                <DroppableSection id="Sites">
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                        gap: '30px',
                                        minHeight: '150px',
                                        padding: '20px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '15px',
                                        border: '1px dashed rgba(255,255,255,0.05)'
                                    }}>
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && item.section === 'Sites').map(item => (
                                            <SortableItem key={item.id} id={item.id}>
                                                <PortfolioCard item={item} editingId={editingId} editValue={editValue} setEditValue={setEditValue} saveTitle={saveTitle} cancelEditing={cancelEditing} startEditing={startEditing} removeItem={removeItem} aspectRatio="9/14" />
                                            </SortableItem>
                                        ))}
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && item.section === 'Sites').length === 0 && (
                                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#444' }}>
                                                Arraste imagens de Sites aqui
                                            </div>
                                        )}
                                    </div>
                                </DroppableSection>
                            </SortableContext>
                        </div>

                        {/* Apps Section */}
                        <div style={{ marginBottom: '60px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '15px', color: '#00d2ff' }}>
                                    <i className="fas fa-mobile-alt"></i> Criação de aplicativo profissional
                                </h2>
                                <button
                                    onClick={() => openCloudinaryWidget('Aplicativos')}
                                    style={{
                                        background: 'rgba(0, 210, 255, 0.1)',
                                        border: '1px solid rgba(0, 210, 255, 0.2)',
                                        color: '#00d2ff',
                                        padding: '8px 15px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 210, 255, 0.1)'}
                                >
                                    <i className="fas fa-upload"></i> Upload para Aplicativos
                                </button>
                            </div>
                            <SortableContext id="Aplicativos" items={[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && item.section === 'Aplicativos').map(item => item.id)} strategy={rectSortingStrategy}>
                                <DroppableSection id="Aplicativos">
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                        gap: '30px',
                                        minHeight: '150px',
                                        padding: '20px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '15px',
                                        border: '1px dashed rgba(255,255,255,0.05)'
                                    }}>
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && item.section === 'Aplicativos').map(item => (
                                            <SortableItem key={item.id} id={item.id}>
                                                <PortfolioCard item={item} editingId={editingId} editValue={editValue} setEditValue={setEditValue} saveTitle={saveTitle} cancelEditing={cancelEditing} startEditing={startEditing} removeItem={removeItem} aspectRatio="9/14" />
                                            </SortableItem>
                                        ))}
                                        {[...portfolioItems, ...pendingItems].filter(item => item.type !== 'video' && item.section === 'Aplicativos').length === 0 && (
                                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#444' }}>
                                                Arraste imagens de Apps aqui
                                            </div>
                                        )}
                                    </div>
                                </DroppableSection>
                            </SortableContext>
                        </div>
                    </DndContext>
                )}
            </main>
        </div>
    );
}

export default Admin;
