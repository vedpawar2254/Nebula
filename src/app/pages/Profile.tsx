"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const ContributionGraph = dynamic(() => import("react-github-calendar"), { ssr: false });
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Repo {
  owner: string;
  name: string;
}

interface ProfileProps {
  repositories: Repo[];
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  githubId?: string;
  createdAt: string;
  updatedAt: string;
  profilePic?: string;
}

interface CommitDetail {
  repoName: string;
  message: string;
  date: string;
  sha: string;
  url: string;
}

interface MergeDetail {
  repoName: string;
  title: string;
  date: string;
  url: string;
}

const Profile: React.FC<ProfileProps> = ({ repositories }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    githubId: "",
    profilePic: "",
  });
  const [commitDetails, setCommitDetails] = useState<CommitDetail[]>([]);
  const [mergeDetails, setMergeDetails] = useState<MergeDetail[]>([]);
  const [repoMeta, setRepoMeta] = useState<any[]>([]);
  const [lastFetched, setLastFetched] = useState<number | null>(null);
  const [nextFetchTime, setNextFetchTime] = useState<string>("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    const savedProfile = localStorage.getItem("savedProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setFormData(parsed);
      setUser((prev) => ({ ...(prev as UserData), ...parsed }));
    }

    fetch("/api/getuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData((prev) => ({ ...data, ...prev }));
      });
  }, []);

  const handleSave = () => {
    if (!formData.username || !formData.githubId) {
      toast.error("Username and GitHub ID are required.");
      return;
    }
    localStorage.setItem("savedProfile", JSON.stringify(formData));
    toast.success("Profile changes saved locally!");
    setUser({ ...(user as UserData), ...formData });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profilePic: reader.result as string });
    };
    if (file) reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchAll = async () => {
      if (!formData.githubId) return;
      const now = Date.now();
      if (lastFetched && now - lastFetched < 5 * 60 * 1000) return;

      try {
        const [eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${formData.githubId}/events/public`),
          fetch(`https://api.github.com/users/${formData.githubId}/repos`),
        ]);

        const events = await eventsRes.json();
        const repos = await reposRes.json();

        if (!Array.isArray(repos)) {
          console.error("GitHub Repos API error:", repos);
          setRepoMeta([]);
        } else {
          setRepoMeta(repos);
        }

        const commits: CommitDetail[] = [];
        const merges: MergeDetail[] = [];

        if (Array.isArray(events)) {
          events.forEach((event: any) => {
            if (event.type === "PushEvent") {
              event.payload.commits.forEach((c: any) => {
                commits.push({
                  repoName: event.repo.name,
                  message: c.message,
                  date: new Date(event.created_at).toLocaleString(),
                  sha: c.sha,
                  url: `https://github.com/${event.repo.name}/commit/${c.sha}`,
                });
              });
            } else if (
              event.type === "PullRequestEvent" &&
              event.payload.pull_request?.merged
            ) {
              merges.push({
                repoName: event.repo.name,
                title: event.payload.pull_request.title,
                date: new Date(event.payload.pull_request.merged_at).toLocaleString(),
                url: event.payload.pull_request.html_url,
              });
            }
          });
        } else {
          console.error("GitHub Events API error:", events);
          toast.error("Could not fetch GitHub events. Please check username or try later.");
        }

        setCommitDetails(commits);
        setMergeDetails(merges);
        setLastFetched(now);

        const next = new Date(now + 5 * 60 * 1000);
        setNextFetchTime(next.toLocaleTimeString());
      } catch (err) {
        console.error("Unexpected GitHub fetch error:", err);
        toast.error("GitHub API failed. Possibly rate-limited or user not found.");
      }
    };

    const interval = setInterval(fetchAll, 5 * 60 * 1000);
    fetchAll();
    return () => clearInterval(interval);
  }, [formData.githubId, lastFetched]);

  const stars = Array.isArray(repoMeta)
    ? repoMeta.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
    : 0;
  const forks = Array.isArray(repoMeta)
    ? repoMeta.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)
    : 0;

  const barData = commitDetails.reduce((acc: any, commit) => {
    const date = commit.date.split(",")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const formattedChartData = Object.entries(barData).map(([date, count]) => ({ date, count }));

  return (
    <div className="min-h-screen p-6 bg-[#0B0B22] text-white font-orbitron">
      <Toaster />

      <div className="flex justify-between items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Welcome, {formData.username}</h1>
          <p className="text-sm text-gray-400">Next update at: {nextFetchTime}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm bg-[#2a2f4a] px-3 py-1 rounded-full">⭐ Stars: {stars}</div>
          <div className="text-sm bg-[#2a2f4a] px-3 py-1 rounded-full">🍴 Forks: {forks}</div>
          <button onClick={handleLogout} className="ml-4 text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Username</span>
            <input
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded bg-[#1E1E3F] border border-gray-600"
              placeholder="Enter your name"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">GitHub Username</span>
            <input
              value={formData.githubId}
              onChange={(e) => setFormData({ ...formData, githubId: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded bg-[#1E1E3F] border border-gray-600"
              placeholder="GitHub handle"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Upload Profile Picture</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full text-sm text-gray-400"
            />
          </label>

          <button
            onClick={handleSave}
            className="px-4 py-2 mt-2 rounded bg-green-600 hover:bg-green-700 text-sm"
          >
            Save Changes
          </button>
        </div>

        {formData.profilePic && (
          <div className="flex justify-center">
            <img
              src={formData.profilePic}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#4fc3f7]"
            />
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-[#3b2a530f] p-4 rounded-xl">
          <p className="text-md font-bold text-[#9DA4F2] mb-2">Contribution Heatmap</p>
          {formData.githubId && (
            <ContributionGraph username={formData.githubId} colorScheme="dark" />
          )}
        </div>

        <div className="bg-[#3b2a530f] p-4 rounded-xl">
          <p className="text-md font-bold text-[#9DA4F2] mb-2">Commits Per Day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={formattedChartData}>
              <XAxis dataKey="date" hide tick={false} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4fc3f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;