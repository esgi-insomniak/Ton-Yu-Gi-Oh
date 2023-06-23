import { useAuth } from "@/helpers/api/hooks";
import { useMe } from "@/helpers/api/hooks/users";

const ProfilePage = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useMe(user?.id);
    console.log(data)
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
        <p>{data?.username}</p>
        <p>{data?.email}</p>
    </div>
  );
};

export default ProfilePage;
