"use client";

import { useEffect, useMemo, useState } from "react";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ApiPayload = {
  total?: { [year: string]: number };
  contributions?: ContributionDay[];
};

type GitHubActivityProps = {
  username?: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GitHubActivity({ username = "swaraj06643" }: GitHubActivityProps) {
  const defaultYear = 2026;
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [contributionsByDate, setContributionsByDate] = useState<Map<string, ContributionDay>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const yearOptions = useMemo(() => {
    const latest = Math.max(currentYear, defaultYear);
    return Array.from({ length: 6 }, (_, i) => latest - i);
  }, [currentYear]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/github-activity?username=${encodeURIComponent(username)}&year=${selectedYear}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }
        const data = (await response.json()) as ApiPayload;
        if (!Array.isArray(data.contributions)) {
          throw new Error("Invalid contributions payload");
        }
        const mapped = new Map<string, ContributionDay>();
        data.contributions.forEach((day) => {
          mapped.set(day.date, day);
        });
        setContributionsByDate(mapped);
        setError(null);
      } catch {
        setError("Failed to load GitHub activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username, selectedYear]);

  const allDaysInYear = useMemo(() => {
    const days: ContributionDay[] = [];
    const start = new Date(selectedYear, 0, 1);
    const end = new Date(selectedYear, 11, 31);
    const cursor = new Date(start);

    while (cursor <= end) {
      const yyyy = cursor.getFullYear();
      const mm = String(cursor.getMonth() + 1).padStart(2, "0");
      const dd = String(cursor.getDate()).padStart(2, "0");
      const key = `${yyyy}-${mm}-${dd}`;
      const existing = contributionsByDate.get(key);
      days.push(
        existing
          ? { ...existing, count: Number(existing.count || 0), level: Number(existing.level || 0) }
          : { date: key, count: 0, level: 0 }
      );
      cursor.setDate(cursor.getDate() + 1);
    }

    return days;
  }, [contributionsByDate, selectedYear]);

  const totalContributions = useMemo(() => {
    return allDaysInYear.reduce((sum, day) => sum + Number(day.count || 0), 0);
  }, [allDaysInYear]);

  const normalizedDaysInYear = useMemo(() => {
    const maxCount = allDaysInYear.reduce((max, day) => Math.max(max, Number(day.count || 0)), 0);
    if (maxCount === 0) return allDaysInYear.map((day) => ({ ...day, level: 0 }));

    return allDaysInYear.map((day) => {
      const count = Number(day.count || 0);
      if (count <= 0) return { ...day, count: 0, level: 0 };

      const ratio = count / maxCount;
      let level = 1;
      if (ratio >= 0.75) level = 4;
      else if (ratio >= 0.5) level = 3;
      else if (ratio >= 0.25) level = 2;

      return { ...day, count, level };
    });
  }, [allDaysInYear]);

  const weeks = useMemo(() => {
    const groupedWeeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    const firstDayOfWeek = new Date(selectedYear, 0, 1).getDay();
    for (let i = 0; i < firstDayOfWeek; i += 1) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }

    normalizedDaysInYear.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        groupedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: 0, level: 0 });
      }
      groupedWeeks.push(currentWeek);
    }

    return groupedWeeks;
  }, [normalizedDaysInYear, selectedYear]);

  const monthLabels = useMemo(() => {
    const labels: Array<{ month: string; position: number }> = [];
    const monthStartWeek = new Map<number, number>();

    weeks.forEach((week, weekIndex) => {
      const validDay = week.find((d) => d.date);
      if (!validDay) return;
      const month = new Date(validDay.date).getMonth();
      if (!monthStartWeek.has(month)) {
        monthStartWeek.set(month, weekIndex);
      }
    });

    for (let month = 0; month < 12; month += 1) {
      labels.push({ month: MONTHS[month], position: monthStartWeek.get(month) ?? 1 });
    }

    return labels;
  }, [weeks]);

  const colorByLevel = (level: number) => {
    const safe = Math.max(0, Math.min(4, level));
    const shades = [
      "bg-muted",
      "bg-emerald-200 dark:bg-emerald-900",
      "bg-emerald-300 dark:bg-emerald-700",
      "bg-emerald-400 dark:bg-emerald-600",
      "bg-emerald-500 dark:bg-emerald-500",
    ];
    return shades[safe];
  };

  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-5 md:mt-10 md:p-6">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Featured</p>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">GitHub Activity</h3>
        </div>
        <div className="flex items-center gap-3">
          {!loading && !error && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{totalContributions.toLocaleString()}</span> contributions
            </p>
          )}
          <label className="sr-only" htmlFor="github-year">
            Select year
          </label>
          <select
            id="github-year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-foreground/20"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-[repeat(53,1fr)] gap-[2px]">
          {Array.from({ length: 53 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div key={dayIndex} className="aspect-square w-full rounded-[2px] bg-muted animate-pulse" />
              ))}
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="py-6 text-center text-sm text-muted-foreground">{error}</p>
      ) : (
        <>
          <div className="mb-2 grid text-[10px] text-muted-foreground sm:text-xs" style={{ gridTemplateColumns: `repeat(${weeks.length || 53}, 1fr)` }}>
            {monthLabels.map((label) => (
              <div key={`${label.month}-${label.position}`} style={{ gridColumn: label.position + 1 }}>
                {label.month}
              </div>
            ))}
          </div>

          <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${weeks.length || 53}, 1fr)` }}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`aspect-square w-full rounded-[2px] transition-colors ${colorByLevel(day.level)}`}
                    title={
                      day.date
                        ? `${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`
                        : "No contributions"
                    }
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-muted-foreground sm:text-xs">
            <span>Less</span>
            <div className="flex gap-[2px]">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`h-[10px] w-[10px] rounded-[2px] ${colorByLevel(level)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </>
      )}
    </section>
  );
}
