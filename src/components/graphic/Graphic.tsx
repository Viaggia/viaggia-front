import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import api from '../../services/api';
import { BalanceResponse, BalanceItem } from '../../types/Balance';
import { GraphicService } from '../../services/GraphicService'; 

// Registrar os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Graphic() {
  const [balanceData, setBalanceData] = useState<BalanceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  // Função para buscar dados da API
  const fetchBalanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await GraphicService();
      setBalanceData(response);
    } catch (err) {
      setError('Erro ao carregar dados do balanço');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados quando o componente monta
  useEffect(() => {
    fetchBalanceData();
  }, []);

  // Função para formatar valores em BRL
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount / 100); // Dividir por 100 pois a API retorna em centavos
  };

  // Preparar dados para o gráfico de pizza
  const preparePieChartData = () => {
    if (!balanceData || !balanceData.available || !balanceData.pending) return null;

    const availableAmount = balanceData.available.reduce((sum: number, item: BalanceItem) => sum + item.amount, 0);
    const pendingAmount = balanceData.pending.reduce((sum: number, item: BalanceItem) => sum + item.amount, 0);

    return {
      labels: ['Saldo Disponível', 'Saldo Pendente'],
      datasets: [
        {
          data: [availableAmount, pendingAmount],
          backgroundColor: [
            '#28a745', // Verde para disponível
            '#ffc107', // Amarelo para pendente
          ],
          borderColor: [
            '#1e7e34',
            '#e0a800',
          ],
          borderWidth: 2,
          hoverBackgroundColor: [
            '#34ce57',
            '#ffcd39',
          ],
        },
      ],
    };
  };

  // Preparar dados para o gráfico de barras
  const prepareBarChartData = () => {
    if (!balanceData || !balanceData.available || !balanceData.pending) return null;

    const availableAmount = balanceData.available.reduce((sum: number, item: BalanceItem) => sum + item.amount, 0);
    const pendingAmount = balanceData.pending.reduce((sum: number, item: BalanceItem) => sum + item.amount, 0);

    return {
      labels: ['Saldo Disponível', 'Saldo Pendente'],
      datasets: [
        {
          label: 'Valores (R$)',
          data: [availableAmount / 100, pendingAmount / 100], // Convertendo para reais
          backgroundColor: [
            'rgba(40, 167, 69, 0.8)',
            'rgba(255, 193, 7, 0.8)',
          ],
          borderColor: [
            'rgba(40, 167, 69, 1)',
            'rgba(255, 193, 7, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // Opções do gráfico de pizza
  const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const formattedValue = formatCurrency(value);
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${formattedValue} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Opções do gráfico de barras
  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Balanço Financeiro da Plataforma',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const formattedValue = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value);
            return `${label}: ${formattedValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value as number);
          },
        },
      },
    },
  };

  const pieChartData = preparePieChartData();
  const barChartData = prepareBarChartData();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5>Erro ao carregar gráfico</h5>
        <p>{error}</p>
        <button className="btn btn-outline-danger" onClick={fetchBalanceData}>
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!pieChartData || !barChartData) {
    return (
      <div className="alert alert-warning" role="alert">
        Nenhum dado disponível para exibir no gráfico.
      </div>
    );
  }

  const availableTotal = balanceData?.available?.reduce((sum: number, item: BalanceItem) => sum + item.amount, 0) || 0;
  const pendingTotal = balanceData?.pending?.reduce((sum: number, item: BalanceItem) => sum + item.amount, 0) || 0;
  const grandTotal = availableTotal + pendingTotal;

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="fas fa-chart-pie me-2"></i>
            Balanço da Plataforma
          </h5>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${chartType === 'pie' ? 'btn-light' : 'btn-outline-light'}`}
              onClick={() => setChartType('pie')}
            >
              <i className="fas fa-chart-pie me-1"></i>
              Pizza
            </button>
            <button
              type="button"
              className={`btn btn-sm ${chartType === 'bar' ? 'btn-light' : 'btn-outline-light'}`}
              onClick={() => setChartType('bar')}
            >
              <i className="fas fa-chart-bar me-1"></i>
              Barras
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        {/* Resumo em cards */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h6>Saldo Disponível</h6>
                <h4>{formatCurrency(availableTotal)}</h4>
                <small>
                  <i className="fas fa-check-circle me-1"></i>
                  Pronto para saque
                </small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-dark">
              <div className="card-body text-center">
                <h6>Saldo Pendente</h6>
                <h4>{formatCurrency(pendingTotal)}</h4>
                <small>
                  <i className="fas fa-clock me-1"></i>
                  Em processamento
                </small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white">
              <div className="card-body text-center">
                <h6>Total Geral</h6>
                <h4>{formatCurrency(grandTotal)}</h4>
                <small>
                  <i className="fas fa-calculator me-1"></i>
                  Receita total
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="row">
          <div className="col-12">
            <div style={{ height: '400px', position: 'relative' }}>
              {chartType === 'pie' ? (
                <Pie data={pieChartData} options={pieChartOptions} />
              ) : (
                <Bar data={barChartData} options={barChartOptions} />
              )}
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card border-0 bg-light">
              <div className="card-body text-center">
                <h6 className="text-muted">Percentual Disponível</h6>
                <h3 className="text-success">
                  {grandTotal > 0 ? ((availableTotal / grandTotal) * 100).toFixed(1) : 0}%
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-light">
              <div className="card-body text-center">
                <h6 className="text-muted">Percentual Pendente</h6>
                <h3 className="text-warning">
                  {grandTotal > 0 ? ((pendingTotal / grandTotal) * 100).toFixed(1) : 0}%
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Botão para atualizar dados */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <button className="btn btn-outline-primary" onClick={fetchBalanceData}>
              <i className="fas fa-sync-alt me-2"></i>
              Atualizar Dados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphic;
