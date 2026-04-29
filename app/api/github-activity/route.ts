import { NextRequest, NextResponse } from "next/server";

type GitHubContributionDay = {
  date: string;
  contributionCount: number;
};

type GraphQlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: Array<{
            contributionDays?: GitHubContributionDay[];
          }>;
        };
      };
    };
  };
  errors?: Array<{ message?: string }>;
};

const GITHUB_API_URL = "https://api.github.com/graphql";
const FALLBACK_PUBLIC_API_URL = "https://github-contributions-api.jogruber.de/v4";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  const yearParam = request.nextUrl.searchParams.get("year");
  const year = Number(yearParam);

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }
  if (!Number.isInteger(year) || year < 2007 || year > 2100) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    // Fallback: show public contribution calendar even without a GitHub token.
    // This avoids the GitHub card disappearing on Vercel when env vars are not set.
    type PublicContribution = { date: string; count: number; level: number };
    type PublicApiResponse = { contributions?: PublicContribution[]; total?: Record<string, number> };

    try {
      const url = `${FALLBACK_PUBLIC_API_URL}/${encodeURIComponent(username)}?y=${year}`;
      const response = await fetch(url, {
        method: "GET",
        // Cache on the edge for ~1 hour (the upstream also does caching).
        cache: "force-cache",
        headers: {
          "Accept": "application/json",
          "User-Agent": "portfolio-github-activity",
        },
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Failed to fetch GitHub activity (public fallback)" },
          { status: response.status }
        );
      }

      const payload = (await response.json()) as PublicApiResponse;
      const contributions = Array.isArray(payload.contributions) ? payload.contributions : [];
      return NextResponse.json({ contributions });
    } catch {
      return NextResponse.json(
        { error: "Failed to load GitHub activity (public fallback)" },
        { status: 500 }
      );
    }
  }

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query Contributions($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { username, from, to },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch GitHub activity" }, { status: response.status });
  }

  const payload = (await response.json()) as GraphQlResponse;
  if (payload.errors?.length) {
    const message = payload.errors[0]?.message ?? "GitHub API error";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const contributions = weeks.flatMap((week) =>
    (week.contributionDays ?? []).map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: 0,
    }))
  );

  return NextResponse.json({ contributions });
}
