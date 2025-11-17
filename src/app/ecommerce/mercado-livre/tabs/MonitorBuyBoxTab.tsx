'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms';
import { Target, TrendingUp, TrendingDown, RefreshCw, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface BuyBoxItem {
  anuncio: string;
  sku: string;
  preco_atual: number;
  preco_campeao: number;
  diferenca_percent: number;
  status_buybox: 'ganhando' | 'perdendo' | 'sem_dados';
  ultima_atualizacao: string;
  ml_id: string;
}

export default function MonitorBuyBoxTab() {
  const [items, setItems] = useState<BuyBoxItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // Mock data para demonstração
  const mockData: BuyBoxItem[] = [
    {
      anuncio: 'Furadeira 500W Profissional',
      sku: 'SKU-223',
      preco_atual: 199.90,
      preco_campeao: 189.99,
      diferenca_percent: 5.2,
      status_buybox: 'perdendo',
      ultima_atualizacao: '5 min atrás',
      ml_id: 'MLB123456789'
    },
    {
      anuncio: 'Parafusadeira 12V Bivolt',
      sku: 'SKU-445',
      preco_atual: 289.90,
      preco_campeao: 299.90,
      diferenca_percent: -3.3,
      status_buybox: 'ganhando',
      ultima_atualizacao: '2 min atrás',
      ml_id: 'MLB987654321'
    }
  ];

  useEffect(() => {
    // Carregar dados do BuyBox
    loadBuyBoxData();
  }, []);

  const loadBuyBoxData = async () => {
    setIsLoading(true);
    try {
      // TODO: Fazer chamada real para API
      // const response = await fetch('/api/ml/buybox');
      // const data = await response.json();
      
      // Por enquanto, usar dados mock
      setTimeout(() => {
        setItems(mockData);
        setLastUpdate(new Date().toLocaleString('pt-BR'));
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao carregar dados BuyBox:', error);
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ganhando':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            Ganhando
          </span>
        );
      case 'perdendo':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
            <XCircle className="h-4 w-4" />
            Perdendo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
            <AlertTriangle className="h-4 w-4" />
            Sem dados
          </span>
        );
    }
  };

  const stats = {
    total: items.length,
    ganhando: items.filter(i => i.status_buybox === 'ganhando').length,
    perdendo: items.filter(i => i.status_buybox === 'perdendo').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Total Monitorados</p>
                <p className="text-4xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <Target className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Ganhando BuyBox</p>
                <p className="text-4xl font-bold text-green-900">{stats.ganhando}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 mb-1">Perdendo BuyBox</p>
                <p className="text-4xl font-bold text-red-900">{stats.perdendo}</p>
              </div>
              <TrendingDown className="h-12 w-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BuyBox Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monitor de BuyBox em Catálogo</CardTitle>
            <div className="flex items-center gap-3">
              {lastUpdate && (
                <span className="text-sm text-gray-500">
                  Atualizado: {lastUpdate}
                </span>
              )}
              <button
                onClick={loadBuyBoxData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Atualizando...' : 'Atualizar'}
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <Target className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum item no catálogo</h3>
              <p className="text-gray-600 mb-4">
                Seus anúncios que participam do catálogo do Mercado Livre aparecerão aqui
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto text-left">
                <h4 className="font-semibold text-blue-900 mb-2">📖 Sobre o BuyBox</h4>
                <p className="text-sm text-blue-800 mb-2">
                  O BuyBox é a posição destacada na página do produto no Mercado Livre. 
                  Quem ganha o BuyBox tem maior visibilidade e mais vendas.
                </p>
                <p className="text-sm text-blue-800">
                  Fatores importantes: preço competitivo, reputação, tempo de entrega e estoque disponível.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Anúncio</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Preço Atual</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Preço Campeão</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Diferença</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Status BuyBox</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Atualização</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{item.anuncio}</p>
                          <p className="text-xs text-gray-500">{item.ml_id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
                          {item.sku}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="font-semibold text-gray-900">
                          R$ {item.preco_atual.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="font-semibold text-green-600">
                          R$ {item.preco_campeao.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 font-semibold ${
                          item.diferenca_percent > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {item.diferenca_percent > 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {item.diferenca_percent > 0 ? '+' : ''}{item.diferenca_percent.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {getStatusBadge(item.status_buybox)}
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600">
                          {item.ultima_atualizacao}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">💡 Dica de Otimização</h3>
              <p className="text-gray-700 text-sm">
                Para ganhar o BuyBox, mantenha seu preço competitivo (próximo ou abaixo do preço campeão), 
                boa reputação como vendedor, e estoque disponível. Atualize seus preços regularmente ou use 
                a funcionalidade de <strong>ajuste automático com IA</strong>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
