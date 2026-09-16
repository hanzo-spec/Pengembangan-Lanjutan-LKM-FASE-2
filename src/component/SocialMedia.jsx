function SocialMedia() {
    const socials = [
        {
            id: 1,
            platform: "TikTok",
            username: "@TikTok",
            url: "https://www.tiktok.com/@frhanzo",
        },
        {
            id: 2,
            platform: "Instagram",
            username: "@Instagram",
            url: "https://www.instagram.com/farhannrrhmn14",
        }
    ];

    return (
        <div className="social-media">
            <h3>Media Sosial</h3>
            <ul>
                {socials.map((item) =>(
                    <li key={item.id}>
                        {item.platfrom}:{" "}
                        <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        >
                            {item.username}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SocialMedia;