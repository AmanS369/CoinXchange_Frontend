"use client";
import DarkModeToggle from "./DarkModeToggle";
import React, { useState, useEffect } from "react";
import { fetchCryptoStats, fetchDeviation, fetchMarketChart } from "../api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  LineChartIcon as ChartLine,
  Moon,
  Sun,
  Bitcoin,
  EclipseIcon as Ethereum,
  Triangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CryptoDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [stats, setStats] = useState(null);
  const [deviation, setDeviation] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme, setTheme } = useTheme();

  // Fix for hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const coins = [
    { id: "bitcoin", name: "Bitcoin", icon: <Bitcoin className="w-5 h-5" /> },
    {
      id: "ethereum",
      name: "Ethereum",
      icon: <Ethereum className="w-5 h-5" />,
    },
    {
      id: "matic-network",
      name: "Polygon (MATIC)",
      icon: <Triangle className="w-5 h-5" />,
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, deviationData, marketChartData] = await Promise.all([
        fetchCryptoStats(selectedCoin),
        fetchDeviation(selectedCoin),
        fetchMarketChart(selectedCoin, 30),
      ]);

      setStats(statsData);
      setDeviation(deviationData);

      const formattedChartData = marketChartData.prices.map(
        ([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: parseFloat(price.toFixed(2)),
        }),
      );
      setChartData(formattedChartData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCoin]);

  if (!mounted) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
          Crypto Analytics Dashboard
        </h1>
        <div className="flex items-center space-x-2 bg-secondary/50 p-2 rounded-full">
          <DarkModeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="inline-flex gap-2 bg-secondary/50 p-2 rounded-full">
          {coins.map((coin) => (
            <motion.button
              key={coin.id}
              onClick={() => setSelectedCoin(coin.id)}
              className={`min-w-[140px] px-4 py-2 rounded-full transition-all flex items-center justify-center gap-2 ${
                selectedCoin === coin.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-primary/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {coin.icon}
              {coin.name}
            </motion.button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <motion.div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && stats && deviation && chartData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PriceStatisticsCard stats={stats} />
            <DeviationAnalysisCard deviation={deviation} />
          </div>
          <PriceHistoryCard chartData={chartData} />
        </div>
      )}
    </div>
  );
};

const PriceStatisticsCard = ({ stats }) => (
  <Card className="overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-violet-500 to-indigo-500">
      <CardTitle className="flex items-center gap-2 text-white">
        <DollarSign className="w-5 h-5" />
        Price Statistics
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-6">
        <StatItem
          label="Current Price"
          value={`$${stats.price?.toLocaleString()}`}
        />
        <StatItem
          label="24h Change"
          value={`${stats.change24h?.toFixed(2)}%`}
          icon={
            stats.change24h >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )
          }
          color={stats.change24h >= 0 ? "text-green-500" : "text-red-500"}
        />
        <StatItem
          label="Market Cap"
          value={`$${stats.marketCap?.toLocaleString()}`}
        />
      </div>
    </CardContent>
  </Card>
);

const DeviationAnalysisCard = ({ deviation }) => (
  <Card className="overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500">
      <CardTitle className="flex items-center gap-2 text-white">
        <TrendingUp className="w-5 h-5" />
        Price Deviation Analysis
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-6">
        <StatItem
          label="Standard Deviation"
          value={`$${deviation.deviation?.toLocaleString()}`}
        />
        <StatItem label="Mean Price" value={`$${deviation.mean?.toFixed(2)}`} />
        <StatItem
          label="Variance"
          value={`$${deviation.variance?.toFixed(2)}`}
        />
      </div>
    </CardContent>
  </Card>
);

const PriceHistoryCard = ({ chartData }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-violet-500 to-indigo-500">
      <CardTitle className="flex items-center gap-2 text-white">
        <ChartLine className="w-5 h-5" />
        Price History (30 Days)
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="opacity-50"
              stroke="var(--border)"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval={6}
              stroke="var(--foreground)"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              stroke="var(--foreground)"
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="url(#colorGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8, fill: "var(--primary)" }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const StatItem = ({ label, value, icon, color }) => (
  <div className="bg-secondary/20 p-4 rounded-lg">
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-bold flex items-center gap-2 ${color || ""}`}>
      {icon}
      {value}
    </p>
  </div>
);

export default CryptoDashboard;
