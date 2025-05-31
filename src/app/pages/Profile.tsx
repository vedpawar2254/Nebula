"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

// Interfaces
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

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    fetch("/api/getuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          username: data.username,
          githubId: data.githubId || "",
          profilePic: data.profilePic || "",
        });
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

  return (
    <div className="min-h-screen p-6  text-white font-orbitron">
      <Toaster />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-[#3b2a530f] rounded-2xl p-6 flex flex-col items-center text-center">
          <img
            src={formData.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#A997CA] mb-4"
          />
          <input type="file" onChange={handleImageChange} className="mb-2 text-sm text-gray-300" />

          <input
            className="w-full text-center bg-[#1E1B2F] p-2 mb-2 rounded-md"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Full Name"
          />
          <input
            className="w-full text-center bg-[#1E1B2F] p-2 mb-2 rounded-md"
            value={formData.githubId}
            onChange={(e) => setFormData({ ...formData, githubId: e.target.value })}
            placeholder="GitHub Username"
          />
          <p className="text-xs text-[#A997CA] mt-2">{user?.email}</p>
          <p className="text-xs mt-1 text-green-400">
            Next update at: {nextFetchTime || "Fetching..."}
          </p>

          <button
            onClick={handleSave}
            className="mt-4 w-full px-4 py-2 text-sm font-semibold border-2 border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            Save Changes
          </button>
        </div>

        {/* Right Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#3b2a530f] rounded-xl p-4 text-center">
              <p className="text-sm text-[#C1B4DB] mb-2">Issues Created</p>
              <p className="text-3xl font-bold text-[#A997CA]">{commitDetails.length}</p>
            </div>
            <div className="bg-[#3b2a530f] rounded-xl p-4 text-center">
              <p className="text-sm text-[#C1B4DB] mb-2">Pull Requests</p>
              <p className="text-3xl font-bold text-[#A997CA]">{mergeDetails.length}</p>
            </div>
            <div className="bg-[#3b2a530f] rounded-xl p-4 text-center">
              <p className="text-sm text-[#C1B4DB] mb-2">Stars/Forks</p>
              <p className="text-lg text-[#9DA4F2]">⭐ {stars} / 🍴 {forks}</p>
            </div>
          </div>

          <div className="bg-[#3b2a530f] p-6 rounded-xl">
            <p className="text-lg font-semibold text-[#B8A9CF] mb-4">Recent GitHub Activity</p>

            <div>
              <p className="text-md font-bold text-[#9DA4F2] mb-2">Commits</p>
              <div className="overflow-hidden relative h-32">
                <motion.div
                  className="absolute space-y-2"
                  animate={{ y: [0, -128, -256] }}
                  transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                >
                  {commitDetails.slice(0, 9).map((commit, idx) => (
                    <div key={idx} className="py-1">
                      <a
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#4fc3f7]"
                      >
                        [{commit.repoName}] {commit.message}
                      </a>
                      <span className="ml-2 text-xs text-gray-400">{commit.date}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-md font-bold text-[#9DA4F2] mb-2">Merged Pull Requests</p>
              <div className="overflow-hidden relative h-32">
                <motion.div
                  className="absolute space-y-2"
                  animate={{ y: [0, -128, -256] }}
                  transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                >
                  {mergeDetails.slice(0, 9).map((pr, idx) => (
                    <div key={idx} className="py-1">
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#4fc3f7]"
                      >
                        [{pr.repoName}] {pr.title}
                      </a>
                      <span className="ml-2 text-xs text-gray-400">{pr.date}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-sm font-semibold border-2 border-red-400 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
