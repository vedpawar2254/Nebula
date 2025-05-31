"use client";
import React, { useEffect, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [commitDetails, setCommitDetails] = useState<CommitDetail[]>([]);
  const [mergeDetails, setMergeDetails] = useState<MergeDetail[]>([]);
  const [loadingGithubActivity, setLoadingGithubActivity] = useState<boolean>(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("User email not found in local storage.");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/getuser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch user data.");
          setUser(null);
          return;
        }

        const userDetails: UserData = await res.json();
        setUser(userDetails);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError("An unexpected error occurred while fetching user data.");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchGithubActivity = async () => {
      if (!user?.githubId) {
        setCommitDetails([]);
        setMergeDetails([]);
        return;
      }

      setLoadingGithubActivity(true);
      const fetchedCommits: CommitDetail[] = [];
      const fetchedMerges: MergeDetail[] = [];

      try {
        const eventsRes = await fetch(
          `https://api.github.com/users/${user.githubId}/events/public`
        );
        const eventsData = await eventsRes.json();

        if (Array.isArray(eventsData)) {
          eventsData.forEach((event: any) => {
            if (
              event.type === "PushEvent" &&
              event.payload.commits &&
              event.repo
            ) {
              event.payload.commits.forEach((commit: any) => {
                fetchedCommits.push({
                  repoName: event.repo.name,
                  message: commit.message,
                  date: new Date(commit.timestamp).toLocaleString(),
                  sha: commit.sha,
                  url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
                });
              });
            } else if (
              event.type === "PullRequestEvent" &&
              event.payload.pull_request?.merged &&
              event.repo
            ) {
              fetchedMerges.push({
                repoName: event.repo.name,
                title: event.payload.pull_request.title,
                date: new Date(
                  event.payload.pull_request.merged_at
                ).toLocaleString(),
                url: event.payload.pull_request.html_url,
              });
            }
          });
        }
      } catch (err) {
        console.error(`Error fetching GitHub activity for ${user.githubId}:`, err);
        setError("Failed to fetch GitHub activity.");
      }

      setCommitDetails(fetchedCommits);
      setMergeDetails(fetchedMerges);
      setLoadingGithubActivity(false);
    };

    if (user) {
      fetchGithubActivity();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-[#D1C1E0] mb-10">
          User Profile
        </h2>

        {error && (
          <p className="mb-6 text-center text-[#CBA4DD] font-semibold">
            {error}
          </p>
        )}

        {user ? (
          <section className="mb-12 p-8 rounded-2xl bg-[#3b2a530f]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-bold text-[#B8A9CF]">
                Profile Details
              </h3>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 border border-red-400 text-red-400 rounded hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </div>
            <div className="space-y-4 text-lg text-[#C1B4DB]">
              <p>
                <span className="font-semibold text-[#A997CA]">Username:</span>{" "}
                {user.username}
              </p>
              <p>
                <span className="font-semibold text-[#A997CA]">Email:</span>{" "}
                {user.email}
              </p>
              {user.githubId && (
                <p>
                  <span className="font-semibold text-[#A997CA]">GitHub ID:</span>{" "}
                  {user.githubId}
                </p>
              )}
              <p className="text-sm text-[#8F81A9] mt-4">
                Account created on{" "}
                <time dateTime={user.createdAt}>
                  {new Date(user.createdAt).toLocaleString()}
                </time>
              </p>
            </div>
          </section>
        ) : (
          <p className="text-center text-[#A997CA] font-medium">
            Loading user data or user not found...
          </p>
        )}

        {/* The rest of the sections remain the same */}
      </div>
    </div>
  );
};

export default Profile;
