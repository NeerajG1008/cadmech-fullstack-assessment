import { useEffect, useState } from "react";
import equipmentApi from "../../api/equipmentApi";
import StatCard from "./StatCard";

import {
  Boxes,
  CircleCheckBig,
  Wrench,
  BadgeCheck,
  CircleX,
  ArchiveX,
} from "lucide-react";

function DashboardCards() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    underMaintenance: 0,
    decommissioned: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await equipmentApi.getDashboardStats();
      setStats(response.data.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Equipment",
      value: stats.total,
      icon: Boxes,
    },
    {
      title: "Active",
      value: stats.active,
      icon: CircleCheckBig,
    },
    {
      title: "Maintenance",
      value: stats.underMaintenance,
      icon: Wrench,
    },
    {
      title: "Decommissioned",
      value: stats.decommissioned,
      icon: ArchiveX,
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="
              h-44
              animate-pulse
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          />
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-5">

      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Dashboard Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monitor equipment availability, maintenance status and operational health.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBg={card.iconBg}
            iconColor={card.iconColor}
          />
        ))}
      </div>

    </section>
  );
}

export default DashboardCards;  