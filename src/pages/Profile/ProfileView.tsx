import { useEffect, useState } from "react";
import { request, Method } from "../../api/base";

interface Profile {
  name: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  education: string;
  certifications: string[];
}

export default function ProfileView() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    request<Profile>({ url: "/Profile", method: Method.GET })
      .then(setProfile)
      .catch((e) => setError(e?.message || "Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>City: {profile.city}</p>
      <p>Skills: {profile.skills.join(", ")}</p>
      <p>Education: {profile.education}</p>
      <p>Certifications: {profile.certifications.join(", ")}</p>
    </div>
  );
}
