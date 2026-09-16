# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





📚 Tutorial React Fase 2

Autentikasi, Dashboard, Projects & Dynamic Navbar

1. Gambaran Umum

Tutorial ini merupakan lanjutan dari proyek Portofolio React yang sebelumnya sudah memiliki:

Home

About

Contact

Navbar

React Router


Pada fase ini ditambahkan:

Halaman Projects

Halaman Login

Halaman Dashboard

Halaman Profile

Sistem autentikasi sederhana

Navbar yang berubah sesuai status login

Dropdown pengguna

PrivateRoute

GuestRoute

Halaman 404 Not Found

Penyimpanan status login menggunakan localStorage


Namun perlu diperhatikan bahwa login pada tutorial ini belum menggunakan database atau server. Login hanya simulasi di sisi frontend menggunakan Context API + localStorage.  


---

2. Struktur Folder

Struktur proyek setelah mengikuti tutorial kurang lebih seperti ini:

src/
│
├── context/
│   └── AuthContext.jsx
│
├── component/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── SkillCard.jsx
│   ├── ProjectCard.jsx
│   ├── UserDropdown.jsx
│   ├── PrivateRoute.jsx
│   └── GuestRoute.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── main.jsx
└── assets/
    └── styles.css

Struktur tersebut merupakan struktur yang ditambahkan/diperbarui dalam tutorial. 

Fungsi setiap folder

Folder/File	Fungsi

context/	Menyimpan Context untuk data global
component/	Komponen yang dapat digunakan kembali
pages/	Halaman-halaman website
AuthContext.jsx	Mengatur status login
Navbar.jsx	Navigasi website
ProjectCard.jsx	Kartu proyek
UserDropdown.jsx	Dropdown akun pengguna
PrivateRoute.jsx	Melindungi halaman dari pengguna yang belum login
GuestRoute.jsx	Mencegah pengguna yang sudah login membuka halaman login
App.jsx	Mengatur routing
main.jsx	Titik awal aplikasi React
styles.css	Styling website



---

3. AuthContext.jsx

File:

src/context/AuthContext.jsx

Kode dasarnya:

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

createContext

createContext(null)

Digunakan untuk membuat Context.

Context memungkinkan data digunakan oleh banyak komponen tanpa harus mengirim data melalui props satu per satu.

Contohnya:

App
 └── Navbar
      └── UserDropdown

Tanpa Context, data user mungkin harus dikirim:

App → Navbar → UserDropdown

Ini disebut prop drilling.

Dengan Context:

AuthContext
 ├── Navbar
 ├── Login
 ├── Dashboard
 └── Profile

Semua komponen tersebut bisa mengambil data login secara langsung. Tutorial menjelaskan Context API sebagai cara membagikan status login ke banyak komponen tanpa prop drilling. 


---

4. AuthProvider

export function AuthProvider({ children }) {

AuthProvider adalah komponen yang menyediakan data autentikasi kepada komponen di dalamnya.

children

{ children }

children berarti isi yang berada di dalam komponen.

Contohnya:

<AuthProvider>
    <App />
</AuthProvider>

Maka:

children

berisi:

<App />


---

5. State User

const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("portofolio_user");
    return saved ? JSON.parse(saved) : null;
});

Ini bagian yang sangat penting.

useState

const [user, setUser] = useState(...)

Membuat state bernama:

user

dan fungsi untuk mengubahnya:

setUser

Ketika belum login:

user = null

Ketika login:

user = {
    name: "farhan",
    email: "farhan@gmail.com"
}


---

6. localStorage

Kode:

localStorage.getItem("portofolio_user");

digunakan untuk mengambil data yang sebelumnya disimpan di browser.

Misalnya browser memiliki:

portofolio_user

dengan isi:

{
  "name": "farhan",
  "email": "farhan@gmail.com"
}

Kemudian:

JSON.parse(saved)

mengubah teks JSON menjadi object JavaScript.

Tutorial menggunakan localStorage agar status login tidak hilang ketika halaman di-refresh. Namun ini bukan sistem keamanan autentikasi sungguhan. 


---

7. useEffect

useEffect(() => {
    if (user) {
        localStorage.setItem(
            "portofolio_user",
            JSON.stringify(user)
        );
    } else {
        localStorage.removeItem("portofolio_user");
    }
}, [user]);

Fungsinya adalah menjalankan sesuatu ketika user berubah.

Jika user login:

localStorage.setItem(...)

menyimpan data.

Jika logout:

localStorage.removeItem(...)

menghapus data.

Kenapa menggunakan JSON.stringify()?

Karena localStorage menyimpan data dalam bentuk string.

Object:

{
    name: "Farhan",
    email: "farhan@gmail.com"
}

diubah menjadi:

"{\"name\":\"Farhan\",\"email\":\"farhan@gmail.com\"}"

dengan:

JSON.stringify(user)


---

8. Fungsi Login

function login(email, password) {
    if (!email.trim() || !password.trim()) {
        return false;
    }

    setUser({
        name: email.split("@")[0],
        email
    });

    return true;
}

Fungsi ini menerima:

email
password

Memeriksa input

if (!email.trim() || !password.trim()) {
    return false;
}

Artinya:

> Jika email kosong ATAU password kosong, login gagal.




---

Membuat nama pengguna

email.split("@")[0]

Misalnya:

farhan@gmail.com

maka:

email.split("@")

menghasilkan:

["farhan", "gmail.com"]

Kemudian:

[0]

mengambil:

farhan

Sehingga user menjadi:

{
    name: "farhan",
    email: "farhan@gmail.com"
}

Tutorial memang menggunakan bagian sebelum @ sebagai nama pengguna. 


---

9. Fungsi Logout

function logout() {
    setUser(null);
}

Saat logout:

user
↓
null

Kemudian useEffect mendeteksi perubahan tersebut dan menghapus:

portofolio_user

dari localStorage.


---

10. AuthContext.Provider

<AuthContext.Provider value={{ user, login, logout }}>
    {children}
</AuthContext.Provider>

Bagian:

value={{ user, login, logout }}

menentukan data/fungsi apa saja yang bisa digunakan oleh komponen lain.

Jadi komponen lain bisa memperoleh:

user
login()
logout()


---

11. useAuth()

export function useAuth() {
    return useContext(AuthContext);
}

Ini adalah custom hook.

Daripada menulis:

useContext(AuthContext)

berulang kali, kita cukup menggunakan:

useAuth()

Contoh:

const { user } = useAuth();

Artinya:

> Ambil data user dari AuthContext.




---

12. main.jsx

Kode penting:

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);

Urutannya:

StrictMode
    ↓
BrowserRouter
    ↓
AuthProvider
    ↓
App

BrowserRouter

Digunakan React Router untuk menangani perpindahan halaman seperti:

/
 /about
 /projects
 /contact
 /login
 /dashboard
 /profile

AuthProvider

Membuat status login tersedia untuk seluruh aplikasi.

Tutorial memang mengharuskan <App /> dibungkus <AuthProvider> agar komponen yang menggunakan useAuth() dapat mengakses Context. 


---

13. Login.jsx

File:

src/pages/Login.jsx

Import:

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

Fungsinya:

useState → menyimpan data form

useNavigate → berpindah halaman

useAuth → mengambil fungsi login



---

State form

const [form, setForm] = useState({
    email: "",
    password: ""
});

Menyimpan:

email
password


---

State error

const [error, setError] = useState("");

Digunakan untuk menyimpan pesan error.

Contohnya:

Email dan password wajib diisi.


---

14. handleChange

function handleChange(e) {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
}

Ini salah satu kode yang penting untuk dipahami.

Misalnya input:

<input
    type="email"
    name="email"
    value={form.email}
    onChange={handleChange}
/>

Ketika user mengetik:

farhan@gmail.com

maka:

e.target.name

bernilai:

email

dan:

e.target.value

berisi:

farhan@gmail.com

Sehingga state menjadi:

{
    email: "farhan@gmail.com",
    password: ""
}


---

15. Operator ...form

{
    ...form,
    [e.target.name]: e.target.value
}

...form digunakan untuk mempertahankan data yang sudah ada.

Misalnya:

form = {
    email: "farhan@gmail.com",
    password: ""
}

Ketika password diisi:

12345

hasil akhirnya:

{
    email: "farhan@gmail.com",
    password: "12345"
}


---

16. handleSubmit

function handleSubmit(e) {
    e.preventDefault();

    const success = login(
        form.email,
        form.password
    );

    if (success) {
        navigate("/dashboard");
    } else {
        setError("Email dan password wajib diisi.");
    }
}

e.preventDefault()

Mencegah form melakukan reload halaman secara default.

Kemudian:

login(form.email, form.password)

memanggil fungsi login dari AuthContext.

Jika berhasil:

navigate("/dashboard");

pengguna diarahkan ke:

/dashboard

Jika gagal:

setError(...)

menampilkan pesan kesalahan.


---

17. Navbar Dinamis

Navbar menggunakan:

const { user } = useAuth();

Kemudian:

{user ? (
    <UserDropdown />
) : (
    <NavLink to="/login">
        Login
    </NavLink>
)}

Ini disebut conditional rendering.

Jika:

user = null

maka tampil:

Login

Jika:

user = {...}

maka tampil:

Nama Pengguna ▾

Tutorial menggunakan pola ini agar Navbar berubah otomatis berdasarkan status login. 


---

18. UserDropdown.jsx

Dropdown memiliki state:

const [open, setOpen] = useState(false);

open menentukan apakah menu sedang terbuka.

false → tertutup
true  → terbuka

Saat tombol diklik:

onClick={() => setOpen(!open)}

Jika:

false

menjadi:

true

dan sebaliknya.


---

19. useRef dan Click Outside

const menuRef = useRef(null);

Digunakan untuk mendapatkan referensi elemen dropdown.

Kemudian:

if (
    menuRef.current &&
    !menuRef.current.contains(e.target)
) {
    setOpen(false);
}

Artinya:

> Jika user mengklik sesuatu yang berada di luar dropdown, tutup dropdown.



Tutorial menyebut pola ini sebagai click outside to close. 


---

20. goTo()

function goTo(path) {
    setOpen(false);
    navigate(path);
}

Fungsinya:

1. Menutup dropdown.


2. Pindah halaman.



Contoh:

goTo("/profile")

akan membuka:

/profile


---

21. Logout

function handleLogout() {
    logout();
    setOpen(false);
    navigate("/");
}

Urutannya:

Logout
 ↓
user menjadi null
 ↓
dropdown ditutup
 ↓
kembali ke Home


---

22. PrivateRoute

File:

src/component/PrivateRoute.jsx

Kode:

function PrivateRoute({ children }) {
    const { user } = useAuth();

    return user
        ? children
        : <Navigate to="/login" replace />;
}

Ini digunakan untuk melindungi halaman.

Jika:

user ada

maka:

children

ditampilkan.

Jika:

user = null

maka:

<Navigate to="/login" />

pengguna dikirim ke Login.

Tutorial menggunakan PrivateRoute untuk Dashboard dan Profile. 


---

23. Dashboard.jsx

const { user } = useAuth();

Kemudian:

<p>Selamat datang kembali, {user.name}!</p>

Misalnya user:

{
    name: "farhan",
    email: "farhan@gmail.com"
}

maka tampil:

Selamat datang kembali, farhan!

Karena Dashboard dilindungi PrivateRoute, user seharusnya sudah tersedia ketika halaman tersebut ditampilkan. 


---

24. Profile.jsx

Profile mengambil:

const { user } = useAuth();

Kemudian menampilkan:

<p>Nama: {user.name}</p>
<p>Email: {user.email}</p>

Contoh:

Nama: farhan
Email: farhan@gmail.com


---

25. ProjectCard.jsx

Komponen:

function ProjectCard({
    title,
    desc,
    image,
    tech,
    githubUrl,
    demoUrl
}) {

Ini menggunakan props.

Artinya ProjectCard menerima data dari komponen induknya.

Contohnya:

<ProjectCard
    title="Website Portofolio"
    desc="Website pribadi"
    image="/image/project.png"
    tech={["React", "CSS"]}
/>

Jadi:

title     → judul
desc      → deskripsi
image     → gambar
tech      → teknologi
githubUrl → link GitHub
demoUrl   → link aplikasi


---

26. Array.map()

Bagian:

{tech.map((t) => (
    <span key={t} className="tech-badge">
        {t}
    </span>
))}

Misalnya:

tech = ["React", "CSS", "JavaScript"]

.map() membuat:

React
CSS
JavaScript

menjadi beberapa elemen <span>.

key={t} digunakan agar React dapat membedakan setiap elemen dalam daftar. Tutorial juga menjelaskan bahwa elemen hasil .map() perlu memiliki key yang unik.  


---

27. Conditional Rendering demoUrl

Kode:

{demoUrl && (
    <a href={demoUrl}>
        Lihat Aplikasi
    </a>
)}

Artinya:

> Tampilkan tombol Lihat Aplikasi hanya jika demoUrl tersedia.



Misalnya:

demoUrl: "https://website-saya.com"

maka tombol muncul.

Kalau properti demoUrl tidak ada, tombol tidak ditampilkan. 


---

28. Projects.jsx

Data proyek disimpan dalam array:

const projects = [
    {
        id: 1,
        title: "Website Portofolio Pribadi",
        desc: "...",
        image: "/image/project-portofolio.png",
        tech: ["React", "React Router", "CSS"],
        githubUrl: "...",
        demoUrl: "..."
    }
];

Kemudian:

{projects.map((p) => (
    <ProjectCard key={p.id} {...p} />
))}

Artinya setiap data proyek dibuat menjadi:

ProjectCard


---

29. Apa arti {...p}?

Misalnya:

p = {
    title: "Portofolio",
    desc: "Website saya",
    image: "/image.png"
}

Kemudian:

<ProjectCard {...p} />

kurang lebih sama seperti:

<ProjectCard
    title="Portofolio"
    desc="Website saya"
    image="/image.png"
/>

Jadi ...p digunakan untuk mengirim semua properti object sebagai props.


---

30. App.jsx dan Routing

Contoh:

<Route path="/" element={<Home />} />

Artinya:

URL /
↓
Home.jsx

Kemudian:

<Route path="/about" element={<About />} />

berarti:

/about
↓
About.jsx

Begitu juga:

/projects → Projects
/contact  → Contact
/login    → Login


---

31. Protected Route di App.jsx

Dashboard:

<Route
    path="/dashboard"
    element={
        <PrivateRoute>
            <Dashboard />
        </PrivateRoute>
    }
/>

Alurnya:

/dashboard
     ↓
PrivateRoute
     ↓
Apakah user login?
   ↙       ↘
 YA        TIDAK
 ↓           ↓
Dashboard   Login


---

32. GuestRoute

Tutorial kemudian memperbaiki celah pada sistem login dengan membuat:

GuestRoute.jsx

Kode:

function GuestRoute({ children }) {
    const { user } = useAuth();

    return user
        ? <Navigate to="/dashboard" replace />
        : children;
}

Fungsinya kebalikan PrivateRoute.

PrivateRoute

Belum login → Login
Sudah login → halaman

GuestRoute

Belum login → Login boleh dibuka
Sudah login → Dashboard

Dengan demikian, pengguna yang sudah login tidak perlu melihat form login lagi. 


---

33. Mengingat Halaman Sebelumnya

Tutorial juga memperbaiki masalah seperti:

User membuka /profile
        ↓
Belum login
        ↓
/login
        ↓
Login
        ↓
Kembali ke /profile

PrivateRoute menggunakan:

<Navigate
    to="/login"
    state={{ from: location }}
    replace
/>

Kemudian Login mengambil:

const redirectTo =
    location.state?.from?.pathname || "/dashboard";

Jadi aplikasi mengetahui halaman yang sebelumnya ingin dibuka. 


---

34. Apa arti ?.?

Kode:

location.state?.from?.pathname

menggunakan optional chaining.

Artinya:

> Coba ambil property tersebut, tetapi jangan error jika bagian sebelumnya tidak ada.



Contoh jika:

location.state = null

maka aplikasi tidak langsung error.

Jika tidak ada tujuan sebelumnya:

|| "/dashboard"

akan menggunakan:

/dashboard

sebagai tujuan default. 


---

35. Halaman 404

File:

src/pages/NotFound.jsx

Route:

<Route path="*" element={<NotFound />} />

* berarti:

> Semua URL yang tidak cocok dengan route sebelumnya.



Contohnya:

/abc
/hello
/apasaja

akan masuk ke:

404 — Halaman Tidak Ditemukan

Route * harus diletakkan paling akhir. 


---

36. Styling

Beberapa CSS baru digunakan untuk:

Dropdown

.user-dropdown {
    position: relative;
}

Membuat dropdown menjadi acuan posisi untuk menu.

Menu dropdown

.user-dropdown-menu {
    position: absolute;
    right: 0;
    top: 28px;
}

Membuat menu muncul secara absolut di bawah tombol.

Project Grid

.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}

Artinya proyek ditampilkan dalam grid 2 kolom.

Pada layar kecil:

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}

menjadi satu kolom agar lebih cocok untuk HP. 


---

37. Alur Keseluruhan Aplikasi

Bagian paling penting untuk dipahami adalah hubungan semua file.

main.jsx
                       │
                       ▼
                 AuthProvider
                       │
                       ▼
                    App.jsx
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
       Navbar                    Routes
          │                         │
          │             ┌───────────┼────────────┐
          │             ▼           ▼            ▼
          │           Home       Projects      Login
          │
          ▼
    Apakah user login?
       ↙          ↘
     Tidak        Ya
      ↓            ↓
    Login      UserDropdown
                   │
            ┌──────┼──────┐
            ▼      ▼      ▼
        Dashboard Profile Logout
            │       │
            └───┬───┘
                ▼
           PrivateRoute


---

38. Alur Login

User membuka /login
        ↓
Mengisi email & password
        ↓
handleSubmit()
        ↓
login()
        ↓
Apakah input kosong?
      ↙       ↘
    Ya        Tidak
    ↓           ↓
 Error       setUser()
                ↓
          localStorage
                ↓
        navigate("/dashboard")


---

39. Alur Refresh

Ketika halaman di-refresh:

Browser refresh
      ↓
AuthProvider dibuat
      ↓
localStorage.getItem()
      ↓
Ada data user?
   ↙        ↘
 Ya         Tidak
 ↓            ↓
JSON.parse   user = null
 ↓
user tersedia

Itulah alasan status login tetap ada setelah refresh. 


---

40. Istilah Penting yang Harus Kamu Pahami

Istilah	Arti sederhana

Component	Bagian UI yang dapat digunakan
Props	Data yang dikirim ke component
State	Data yang dapat berubah
Context API	Tempat berbagi data global
useContext	Mengambil data dari Context
useState	Membuat state
useEffect	Menjalankan efek samping
useRef	Menyimpan referensi elemen
useNavigate	Pindah halaman lewat kode
useLocation	Membaca informasi URL
Routing	Mengatur URL → halaman
PrivateRoute	Melindungi halaman
GuestRoute	Membatasi halaman untuk user belum login
localStorage	Penyimpanan di browser
.map()	Mengulang data array
Conditional Rendering	Menampilkan UI berdasarkan kondisi
Prop Drilling	Mengoper props terlalu banyak tingkat
SPA	Single Page Application
404	Halaman tidak ditemukan


Istilah-istilah tersebut juga dirangkum dalam glosarium tutorial. 


---

41. ⚠️ Hal yang Sangat Penting Tentang Login Tutorial Ini

Jangan menganggap sistem ini sebagai login sungguhan.

Kode:

function login(email, password) {
    if (!email.trim() || !password.trim()) {
        return false;
    }

    setUser({
        name: email.split("@")[0],
        email
    });

    return true;
}

tidak memeriksa apakah email dan password benar.

Jadi:

Email: apa saja
Password: apa saja

selama keduanya tidak kosong → dianggap berhasil.

Tutorial sendiri menyatakan bahwa login ini masih berupa simulasi frontend, belum terhubung ke server/database. 

Untuk aplikasi sungguhan, tahap selanjutnya adalah menggunakan autentikasi backend seperti Firebase/Supabase atau membuat REST API dengan Node.js/Express dan database. 


---

42. Error yang Sering Terjadi

useAuth() error

Biasanya karena:

<App />

belum dibungkus:

<AuthProvider>
    <App />
</AuthProvider>


---

user.name error

Jika:

user.name

tetapi:

user = null

maka akan error.

Solusinya adalah memastikan Dashboard/Profile dilindungi:

<PrivateRoute>
    <Dashboard />
</PrivateRoute>

Tutorial mencantumkan kedua masalah tersebut dalam daftar debugging. 


---

Gambar proyek tidak muncul

Pastikan:

public/
└── image/
    ├── project-portofolio.png
    └── project-catatan.png

dan path:

image: "/image/project-portofolio.png"

sesuai nama file. 


---

43. Checklist Setelah Selesai

Menurut tutorial, fitur yang perlu diuji antara lain:

[ ] Sebelum login muncul Login

[ ] Login kosong menghasilkan error

[ ] Login berhasil masuk Dashboard

[ ] Navbar berubah menjadi nama pengguna

[ ] Dropdown muncul

[ ] Klik luar dropdown menutup dropdown

[ ] /dashboard tidak dapat dibuka tanpa login

[ ] /profile tidak dapat dibuka tanpa login

[ ] Logout mengembalikan Navbar

[ ] Refresh tidak menghilangkan status login

[ ] Projects menampilkan kartu proyek

[ ] GitHub link bekerja

[ ] Demo hanya muncul jika demoUrl tersedia

[ ] URL yang tidak dikenal menampilkan 404


Checklist ini sesuai dengan bagian pengujian tutorial. 


---

📌 Kesimpulan

Secara sederhana, proyek ini mengajarkan 5 konsep besar React:

1. Context API
      ↓
   Data login global

2. State
      ↓
   Menyimpan data yang berubah

3. React Router
      ↓
   Perpindahan halaman

4. Protected/Guest Route
      ↓
   Mengatur akses halaman

5. Reusable Component
      ↓
   Komponen dapat digunakan berulang

Dan hubungan terpentingnya:

AuthContext
    │
    ├── Login
    │     └── login()
    │
    ├── Navbar
    │     └── user
    │
    ├── UserDropdown
    │     ├── user
    │     └── logout()
    │
    ├── Dashboard
    │     └── user
    │
    └── Profile
          └── user

Jadi inti dari tutorial ini adalah membuat sebuah portofolio React yang mulai terasa seperti aplikasi sungguhan: ada login, status pengguna, navigasi dinamis, halaman yang dilindungi, halaman proyek, dan penanganan 404. Tutorial menutup dengan roadmap seperti deployment, dark mode, autentikasi sungguhan, pencarian proyek, dan automated testing. 

Kalau dokumentasi ini akan kamu masukkan ke GitHub, lebih baik dibuat sebagai README.md yang rapi, bukan sekadar menyalin PDF. Saya juga bisa membuatkan file `README.md` siap upload ke repository GitHub, lengkap dengan struktur folder, penjelasan kode, cara menjalankan project (npm install, npm run dev, npm run build), fitur, dan bagian pembelajaran.
