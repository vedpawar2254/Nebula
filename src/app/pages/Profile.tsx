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
  const [loadingGithubActivity, setLoadingGithubActivity] =
    useState<boolean>(false);

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
        console.error(
          `Error fetching GitHub activity for ${user.githubId}:`,
          err
        );
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
          <section className="mb-12 p-8 rounded-2xl bg-[#3b2a530f] ">
            <h3 className="mb-6 text-4xl font-bold text-[#B8A9CF] border-b border-[#533B6B] pb-3">
              Profile Details
            </h3>
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
                  <span className="font-semibold text-[#A997CA]">
                    GitHub ID:
                  </span>{" "}
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

        <section className="mb-12">
          <h3 className="mb-6 text-4xl font-bold text-[#B8A9CF] border-b border-[#533B6B] pb-3">
            Managed Repositories
          </h3>
          {repositories.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {repositories.map((repo, index) => (
                <li
                  key={index}
                  className="p-6 bg-[#422b6111] rounded-xl hover:bg-[#422b6122] transition duration-300 ease-in-out"
                >
                  <p className="text-[#B0A3CC] font-semibold text-xl mb-1">
                    {repo.owner}
                  </p>
                  <p className="text-[#A28FC0] font-medium text-lg">
                    {repo.name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#A997CA] font-medium">
              No repositories managed.
            </p>
          )}
        </section>

        {user?.githubId && (
          <section>
            <h3 className="mb-6 text-4xl font-bold text-[#B8A9CF] border-b border-[#533B6B] pb-3">
              GitHub Activity
            </h3>

            {loadingGithubActivity ? (
              <p className="text-[#A997CA] font-semibold">
                Loading GitHub activity...
              </p>
            ) : (
              <>
                {commitDetails.length > 0 && (
                  <div className="mb-10">
                    <h4 className="mb-5 text-3xl font-semibold text-[#B0A3CC]">
                      Commits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {commitDetails.map((commit, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl bg-[#4B3A75] shadow-md hover:shadow-lg transition-shadow"
                        >
                          <p className="text-sm text-[#A28FC0] font-semibold mb-1">
                            {commit.repoName}
                          </p>
                          <p className="text-lg text-[#CFC3E1] font-semibold mb-2">
                            "{commit.message}"
                          </p>
                          <p className="text-xs text-[#998BC3] mb-2">
                            Committed on{" "}
                            <time dateTime={commit.date}>{commit.date}</time>
                          </p>
                          <a
                            href={commit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-[#A997CA] hover:underline font-semibold"
                          >
                            View Commit
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mergeDetails.length > 0 && (
                  <div>
                    <h4 className="mb-5 text-3xl font-semibold text-[#B0A3CC]">
                      Merged Pull Requests
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mergeDetails.map((merge, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl bg-[#4B3A75] shadow-md hover:shadow-lg transition-shadow"
                        >
                          <p className="text-sm text-[#A28FC0] font-semibold mb-1">
                            {merge.repoName}
                          </p>
                          <p className="text-lg text-[#CFC3E1] font-semibold mb-2">
                            "{merge.title}"
                          </p>
                          <p className="text-xs text-[#998BC3] mb-2">
                            Merged on{" "}
                            <time dateTime={merge.date}>{merge.date}</time>
                          </p>
                          <a
                            href={merge.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-[#A997CA] hover:underline font-semibold"
                          >
                            View Pull Request
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {commitDetails.length === 0 && mergeDetails.length === 0 && (
                  <p className="text-[#A997CA] font-semibold">
                    No public GitHub activity found for this user.
                  </p>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Profile;
