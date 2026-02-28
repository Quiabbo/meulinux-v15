import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Save, LogOut, Edit, Image as ImageIcon, Type, Plus, Trash2, Settings } from 'lucide-react';
import { DISTROS } from '../constants';

const ADMIN_EMAIL = 'filipii.hadji.dsg@gmail.com';
const ADMIN_PASSWORD = 'Greg1314@';

export const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'distros' | 'texts'>('distros');
  const [distros, setDistros] = useState(DISTROS);
  const [editingDistro, setEditingDistro] = useState<any>(null);
  const [editingTexts, setEditingTexts] = useState<any>(null);
  const [selectedPage, setSelectedPage] = useState('home');

  const pages = [
    { id: 'home', name: 'Página Inicial' },
    { id: 'sobre', name: 'Sobre' },
    { id: 'contato', name: 'Contato' }
  ];

  useEffect(() => {
    const savedDistros = localStorage.getItem('meulinux_distros_override');
    if (savedDistros) {
      setDistros(JSON.parse(savedDistros));
    }
    
    const session = sessionStorage.getItem('meulinux_admin_session');
    if (session === 'active') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'texts') {
      const saved = localStorage.getItem(`meulinux_translations_${selectedPage}`);
      setEditingTexts(saved ? JSON.parse(saved) : {});
    }
  }, [activeTab, selectedPage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('meulinux_admin_session', 'active');
      setError('');
    } else {
      setError('Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('meulinux_admin_session');
  };

  const saveDistros = (updatedDistros: any[]) => {
    setDistros(updatedDistros);
    localStorage.setItem('meulinux_distros_override', JSON.stringify(updatedDistros));
    alert('Alterações salvas com sucesso!');
  };

  const saveTexts = () => {
    localStorage.setItem(`meulinux_translations_${selectedPage}`, JSON.stringify(editingTexts));
    alert('Textos salvos com sucesso!');
  };

  const handleEditDistro = (distro: any) => {
    setEditingDistro({ ...distro });
  };

  const handleUpdateDistro = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = distros.map(d => d.id === editingDistro.id ? editingDistro : d);
    saveDistros(updated);
    setEditingDistro(null);
  };

  const updateText = (lang: string, key: string, value: string) => {
    setEditingTexts({
      ...editingTexts,
      [lang]: {
        ...(editingTexts[lang] || {}),
        [key]: value
      }
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-display font-bold text-dark">Painel Administrativo</h1>
            <p className="text-gray-500">Acesse para gerenciar o conteúdo do site</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Email</label>
              <input 
                type="email" 
                className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Senha</label>
              <input 
                type="password" 
                className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button className="w-full bg-dark text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary transition-all shadow-lg">
              Entrar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-6 sticky top-20 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold text-dark flex items-center gap-3">
            <Settings className="text-primary" /> Painel Admin
          </h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold transition-colors"
          >
            <LogOut size={20} /> Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('distros')}
            className={`px-6 py-3 rounded-[6px] font-bold transition-all ${activeTab === 'distros' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
          >
            Gerenciar Distros
          </button>
          <button 
            onClick={() => setActiveTab('texts')}
            className={`px-6 py-3 rounded-[6px] font-bold transition-all ${activeTab === 'texts' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
          >
            Editar Textos
          </button>
        </div>

        {activeTab === 'distros' && (
          <div className="space-y-6">
            {editingDistro ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Editando: {editingDistro.name}</h2>
                  <button 
                    onClick={() => setEditingDistro(null)}
                    className="text-gray-400 hover:text-dark"
                  >
                    Cancelar
                  </button>
                </div>

                <form onSubmit={handleUpdateDistro} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Nome</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.name}
                        onChange={(e) => setEditingDistro({...editingDistro, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Subtítulo</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.subtitle}
                        onChange={(e) => setEditingDistro({...editingDistro, subtitle: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Descrição</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 resize-none"
                      value={editingDistro.description}
                      onChange={(e) => setEditingDistro({...editingDistro, description: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Baseado em</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.basedOn}
                        onChange={(e) => setEditingDistro({...editingDistro, basedOn: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">País</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.country}
                        onChange={(e) => setEditingDistro({...editingDistro, country: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Tamanho ISO</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.isoSize}
                        onChange={(e) => setEditingDistro({...editingDistro, isoSize: e.target.value})}
                      />
                    </div>
                  </div>

                  <button className="w-full bg-primary text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Save size={20} /> Salvar Alterações
                  </button>
                </form>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {distros.map(distro => (
                  <div key={distro.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={distro.logo} alt={distro.name} className="w-12 h-12 object-contain" />
                      <div>
                        <h3 className="font-bold text-lg">{distro.name}</h3>
                        <p className="text-sm text-gray-500">{distro.id}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-6 flex-grow">
                      {distro.subtitle}
                    </p>
                    <button 
                      onClick={() => handleEditDistro(distro)}
                      className="w-full bg-gray-50 text-dark py-3 rounded-[6px] font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Edit size={16} /> Editar Conteúdo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'texts' && (
          <div className="space-y-6">
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {pages.map(page => (
                <button 
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className={`px-4 py-2 rounded-[6px] text-sm font-bold whitespace-nowrap transition-all ${selectedPage === page.id ? 'bg-dark text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                >
                  {page.name}
                </button>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Editando textos: {pages.find(p => p.id === selectedPage)?.name}</h2>
                <button 
                  onClick={saveTexts}
                  className="bg-primary text-white px-6 py-2 rounded-[6px] font-bold hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <Save size={18} /> Salvar Tudo
                </button>
              </div>

              <div className="space-y-12">
                {['pt', 'en', 'es'].map(lang => (
                  <div key={lang} className="space-y-6">
                    <h3 className="text-lg font-bold uppercase tracking-widest text-primary border-b border-primary/10 pb-2">
                      Idioma: {lang.toUpperCase()}
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      {selectedPage === 'home' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Título Hero</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.heroTitle || ''}
                              onChange={(e) => updateText(lang, 'heroTitle', e.target.value)}
                              placeholder="Título principal da home"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Subtítulo Hero</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.heroSubtitle || ''}
                              onChange={(e) => updateText(lang, 'heroSubtitle', e.target.value)}
                              placeholder="Subtítulo da home"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Título Barra Laranja</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.postDownloadTitle || ''}
                              onChange={(e) => updateText(lang, 'postDownloadTitle', e.target.value)}
                              placeholder="Texto da barra laranja"
                            />
                          </div>
                        </>
                      )}
                      {selectedPage === 'sobre' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Título Hero</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.hero_title || ''}
                              onChange={(e) => updateText(lang, 'hero_title', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Texto Principal</label>
                            <textarea 
                              rows={4}
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 resize-none"
                              value={editingTexts[lang]?.main_text || ''}
                              onChange={(e) => updateText(lang, 'main_text', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Título Footer</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.footer_title || ''}
                              onChange={(e) => updateText(lang, 'footer_title', e.target.value)}
                            />
                          </div>
                        </>
                      )}
                      {selectedPage === 'contato' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Título</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.title || ''}
                              onChange={(e) => updateText(lang, 'title', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Subtítulo</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.subtitle || ''}
                              onChange={(e) => updateText(lang, 'subtitle', e.target.value)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
