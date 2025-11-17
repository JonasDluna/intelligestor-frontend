'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms';
import { Package, Search, Filter } from 'lucide-react';

export default function MeusAnunciosTab() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - será substituído por dados reais da API
  const anuncios = [];

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar anúncios por título, SKU ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
              <Filter className="h-5 w-5" />
              Filtros
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Anuncios List */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Anúncios ({anuncios.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {anuncios.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum anúncio encontrado</h3>
              <p className="text-gray-600 mb-4">
                Clique no botão abaixo para sincronizar seus anúncios do Mercado Livre
              </p>
              <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors">
                Sincronizar Anúncios
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Produto</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Preço</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estoque</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Dados virão aqui */}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
