import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user } = useAuth();
    return (
        <section className="profile">
            <h2>Profile Saya</h2>
            <p>Nama: {user.name}</p>
            <p>Email: {user.email}</p>
        </section>
    );
}

export default Profile;